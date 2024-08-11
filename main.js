const { app, BrowserWindow, Menu } = require("electron");

// Set Environment
process.env.NODE_ENV = "development";

const isDev = process.env.NODE_ENV !== "production" ? true : false;

// Identifying the operating system of the user
const isMac = process.platform === "darwin" ? true : false;
const isWin = process.platform === "win32" ? true : false;
const isLinux = process.platform === "linux" ? true : false;

let mainWindow;

// Main Window: This function contains the neccesary properties of our UI, laater called when the app initializes
function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "ImageShrink",
    width: 500,
    height: 600,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: isDev,
  });

  mainWindow.loadFile(`${__dirname}/app/index.html`);
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
  ...(isMac ? [{ role: "appMenu" }] : []), // Only applicable for mac devices, they have a different menu style(why tf?) idk/idc
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        click: () => app.quit(),
      },
    ],
  },
];

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
