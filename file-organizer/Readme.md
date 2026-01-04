
---

```markdown
# FileOrganizer CLI

A lightweight, high-performance Node.js command-line tool designed to clean up cluttered directories by automatically categorizing files into folders based on their extensions.

### Real-World Use Case

Imagine you have a **Downloads** folder with 1,000 mixed files. Running this script would instantly turn that mess into a clean set of folders:

* 📁 **PDF** (All your resumes and ebooks)
* 📁 **PNG** (All your screenshots)
* 📁 **ZIP** (All your downloaded software)
* 📁 **MP4** (All your videos)


## 🚀 Features
- **Fast Asynchronous I/O**: Uses `fs/promises` for non-blocking file operations.
- **Cross-Platform**: Built with the `path` module to work seamlessly on Windows, macOS, and Linux.
- **Zero Dependencies**: Pure Node.js implementation—no heavy `node_modules` required.
- **Recursive Safety**: Automatically creates target directories if they don't exist.

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/saadxsalman/file-organizer.git](https://github.com/saadxsalman/file-organizer.git)
   cd file-organizer

```

2. **Initialize the project:**
```bash
npm init -y

```


3. **(Optional) Make it a global command:**
```bash
npm link

```



## 💻 Usage

Run the script by passing the path of the directory you want to organize:

```bash
# Organize the current directory
node organizer.js .

# Organize a specific path
node organizer.js /path/to/your/messy/folder

```

If you ran `npm link`, you can simply use:

```bash
organize .

```

## 📁 How it Works

The tool scans the target directory and identifies files. It then:

1. Extracts the file extension (e.g., `.jpg`, `.pdf`).
2. Creates a folder named after the extension (e.g., `JPG/`).
3. Moves the file into its respective folder.

**Before:**
`photo.jpg, report.pdf, script.js`

**After:**
`JPG/photo.jpg, PDF/report.pdf, JS/script.js`

## 📝 License

MIT

```

---

### Final Steps to GitHub

To get this live on your profile, run these commands in your project folder:

1. **Initialize Git:** `git init`
2. **Add Files:** `git add .`
3. **Commit:** `git commit -m "Initial commit: Functional FileOrganizer CLI"`
4. **Create Repo:** Go to GitHub, create a new repo named `file-organizer`.
5. **Push:**
   ```bash
   git remote add origin https://github.com/saadxsalman/file-organizer.git
   git branch -M main
   git push -u origin main

```
