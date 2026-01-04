import fs from 'fs/promises';
import path from 'path';

// 1. Get the directory path from terminal arguments
// process.argv[0] is node, [1] is the script path, [2] is our argument
const targetDir = process.argv[2] || '.';

async function organizeFiles(directory) {
	try {
		//Resolve the absolute path
		const resolvePath = path.resolve(directory);
		const files = await fs.readdir(resolvedPath);

		console.log('Organizing: ${resolvedPath}...');

		for (const file of files) {
			const fullPath = path.join(resolvedPath, file);
			const stat = await fs.lstat(fullPath);

			//Only process files, skip directories
			if (stat.isFile()) {
				const ext = path.extname(file).toLowerCase().replace('.', '');

				if (!ext) continue; //Skip files without extensions (like .gitignore)

				const targetFolder = path.join(resolvedPath, ext.toUpperCase());

				// Create the folder (mkdir with recursive: true won't error if it exists)
				await fs.mkdir(targetFolder, { recursive: true});

				// Move the file
				const oldPath = fullPath
				const newPath = path.join(targetFolder, file);

				await fs.rename(oldPath, newPath);
				console.log(`Moved: ${file} → ${ext.toUpperCase()}/`);
			}
 		}
 		console.log('✅ Organization Complete!');
 	}   catch (error) {
        console.error('❌ Error:', error.message);
 	}
}

organizeFiles(targetDir);