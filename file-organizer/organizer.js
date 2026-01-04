import fs from 'fs/promises';
import path from 'path';

const targetDir = process.argv[2] || '.';

async function organizeFiles(directory) {
    try {
        const resolvedPath = path.resolve(directory);
        const files = await fs.readdir(resolvedPath);

        console.log(`Organizing: ${resolvedPath}...`);

        for (const file of files) {
            // Skip the script itself to avoid moving it
            if (file === path.basename(import.meta.url)) continue;

            const fullPath = path.join(resolvedPath, file);
            const stat = await fs.lstat(fullPath);

            if (stat.isFile()) {
                const ext = path.extname(file).toLowerCase().replace('.', '');
                if (!ext) continue;

                const targetFolder = path.join(resolvedPath, ext.toUpperCase());
                await fs.mkdir(targetFolder, { recursive: true });

                const newPath = path.join(targetFolder, file);
                await fs.rename(fullPath, newPath);
                
                console.log(`Moved: ${file} → ${ext.toUpperCase()}/`);
            }
        }
        console.log('✅ Organization Complete!');
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

organizeFiles(targetDir);