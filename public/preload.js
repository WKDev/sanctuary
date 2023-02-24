// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const { contextBridge, ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }

  // electron dialog 원격에서 열 수 있게 해줌 // 221230 chson
  // ipcRenderer.invoke("showDialog", "message");
});

// window.ipcRenderer = require('electron').ipcRenderer;
