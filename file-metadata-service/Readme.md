
---


# File Metadata Microservice with AWS S3 ☁️

A robust Node.js microservice that analyzes file metadata and handles secure uploads directly to AWS S3. Built with Express, Multer, and the AWS SDK v3.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Features

* **Multipart Data Handling**: Uses `Multer` to parse incoming file streams.
* **Cloud Storage**: Integrates with **AWS S3** for persistent file storage.
* **Metadata Extraction**: Instantly returns file name, size, MIME type, and S3 URL.
* **Zero-Disk Footprint**: Files are streamed directly to the cloud without being saved on the local server.
* **Modern UI**: Styled with **Tailwind CSS** for a clean, responsive user experience.
* **Security**: Environment variables managed via `dotenv` to protect AWS credentials.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Middleware**: Multer, Multer-S3
- **Cloud**: AWS S3 (SDK v3)
- **Frontend**: HTML5, Tailwind CSS, JavaScript

## 📋 Prerequisites

Before you begin, ensure you have:
- [Node.js](https://nodejs.org/) installed.
- An **AWS Account** with an S3 Bucket and IAM User credentials.

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/saadxsalman/file-metadata-service.git](https://github.com/saadxsalman/file-metadata-service.git)
   cd file-metadata-service

```

2. **Install dependencies:**
```bash
npm install

```


3. **Configure Environment Variables:**
Create a `.env` file in the root directory:
```env
PORT=3000
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region (e.g., us-east-1)
S3_BUCKET_NAME=your_bucket_name

```


4. **Run the application:**
```bash
node index.js

```



## 🧪 API Usage

### Analyze and Upload File

**Endpoint**: `POST /api/fileanalyse`

**Payload**: `multipart/form-data`
**Field Name**: `upfile`

**Success Response**:

```json
{
  "name": "example-image.png",
  "type": "image/png",
  "size": 45230,
  "s3_url": "[https://your-bucket.s3.amazonaws.com/uploads/1672531200-example.png](https://your-bucket.s3.amazonaws.com/uploads/1672531200-example.png)",
  "s3_key": "uploads/1672531200-example.png"
}

```

## 🛡️ Security Note

This project uses `.gitignore` to prevent the `.env` file containing sensitive AWS keys from being committed to version control. Always ensure your bucket permissions follow the principle of least privilege.

---

Developed by [saadxsalman](https://www.google.com/search?q=https://github.com/saadxsalman)

