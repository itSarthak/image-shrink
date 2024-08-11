Here's the `README.md` file with the requested sections:

---

# Image Shrink

## 1. Project Overview

**Image Shrink** is a powerful and user-friendly image compressor application built using Electron, Node.js, and vanilla JavaScript. It allows users to reduce the file size of `.jpg` or `.jpeg` images quickly and efficiently, making it perfect for situations where smaller image sizes are required, such as uploading to websites or sharing via email.

## 2. Technology Used

- **Electron**: Used to create the cross-platform desktop application.
- **Node.js**: Handles the backend processing and file system operations.
- **Vanilla JavaScript**: Implements the frontend logic and user interface.

## 3. Project Structure

```
image-shrink/
│
├── assets/                 # Contains images
│   ├── icons               # Contains icons
├── app/                    # Source files for the application
│   ├── css                 # Contains all the css files
│   ├── js                  # Contains all the javascript files
│   ├── webFonts            # Locally saved Fonts
│   ├── about.html          # About section file
│   └── index.html          # Main UI of our Application
├── .gitignore
├── main.js                 # Server file that contains the application logic
├── package.json            # Contains all the dependencies
└── package-lock.json
```

## 4. How to Install Locally

To install and run the Image Shrink application locally, follow these steps:

1. **Create a new directory for the project:**
   ```bash
   mkdir image-shrink
   ```
2. **Navigate into the project directory:**
   ```bash
   cd image-shrink
   ```
3. **Initialize a new Git repository:**
   ```bash
   git init
   ```
4. **Pull the latest code from the GitHub repository:**
   ```bash
   git pull git@github.com:itSarthak/image-shrink.git
   ```
5. **Install the necessary dependencies:**
   ```bash
   npm install
   ```
6. **Package the app according to your operating system:**
   - **For Windows users:**
     ```bash
     npm run package-win
     ```
   - **For Linux users:**
     ```bash
     npm run package-linux
     ```
   - **For macOS users:**
     ```bash
     npm run package-mac
     ```

## 5. How to Use

1. **Open the Image Shrink application.**
2. **Upload a `.jpg` or `.jpeg` image** by clicking the upload button.
3. **Adjust the compression percentage** using the provided slider.
4. **Click the "Shrink" button** to compress the image.

The compressed image will be saved, and you can then use it for your desired purpose.
