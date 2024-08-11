const path = require("path");
const os = require("os");
const { app, BrowserWindow, Menu, ipcMain, shell } = require("electron");
const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
const slash = require("slash");
const log = require("electron-log");

// Set Environment
process.env.NODE_ENV = "production";

const isDev = process.env.NODE_ENV !== "production" ? true : false;

// Identifying the operating system of the user
const isMac = process.platform === "darwin" ? true : false;

let mainWindow;
let aboutWindow;

// Main Window: This function contains the neccesary properties of our UI, laater called when the app initializes
function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "ImageShrink",
    width: 500,
    height: 600,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: isDev,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (isDev) {
    mainWindow.openDevTools({ mode: "undocked" }); // If we are in developer mode, this will automatically open dev tools (in a new window) as soon as our application is launched
  }

  mainWindow.loadFile(`${__dirname}/app/index.html`);
}

function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    title: "About ImageShrink",
    width: 300,
    height: 300,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: isDev,
    backgroundColor: "white",
  });

  aboutWindow.loadFile(`${__dirname}/app/about.html`);
}

app.on("ready", () => {
  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu); // Building our own menu
  Menu.setApplicationMenu(mainMenu); // Setting menu to our own custom built menu

  mainWindow.on("closed", () => (mainWindow = null));
});

/*
 ** Menu Array is used to make
 ** a custom Menu element in our
 ** application
 */
const menu = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: "About",
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []), // Only applicable for mac devices, they have a different menu style(why tf?) idk/idc
  {
    role: "fileMenu",
  },
  ...(isDev
    ? [
        {
          label: "Developer",
          submenu: [
            { role: "reload" },
            { role: "forcereload" },
            { role: "separator" },
            { role: "toggledevtools" },
          ],
        },
      ]
    : []),
  ...(!isMac
    ? [
        {
          label: "Help",
          submenu: [
            {
              label: "About",
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
];

ipcMain.on("image:minimize", (e, options) => {
  options.dest = path.join(os.homedir(), "imageshrink"); // imageshrink is the folder created when image is compressed
  shrinkImage(options);
});

async function shrinkImage({ imgPath, quality, dest }) {
  try {
    const pngQuality = quality / 100;
    const files = await imagemin([slash(imgPath)], {
      destination: dest,
      plugins: [
        imageminMozjpeg(quality),
        imageminPngquant([pngQuality, pngQuality]),
      ],
    });
    log.info(files);

    shell.openPath(dest); // Opens the directory where the newly compressed file is saved

    mainWindow.webContents.send("image:done");
  } catch (error) {
    log.error(err);
  }
}

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
