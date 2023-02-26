const { app, BrowserWindow, ipcMain, dialog, session } = require("electron");
const path = require("path");
const os = require("os");
const url = require("url");
const fs = require("fs");
const Papa = require("papaparse");
const Store = require("electron-store");
const isDev = require("electron-is-dev");
const remote = require("@electron/remote/main");

remote.initialize();

const store = new Store();
// app.disableHardwareAcceleration();
// app.commandLine.appendRoutes("force_high_performance_gpu");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1599,
    height: 830,
    autoHideMenuBar: true,

    webPreferences: {
      // preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });
  // mainWindow.setBounds({ x: 0, y: 0, width: 300, height: 300 })
  // mainWindow.webContents.insertCSS('html, body { overflow: hidden; }')

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  } else {
    console.log("skip opening devTools since it was built");
  }

  // 웹페이지-->메인프로세스
  // mainWindow.webContents.on('did-finish-load', (evt) => {
  //   // onWebcontentsValue 이벤트 송신
  //   mainWindow.webContents.send('onWebcontentsValue', 'on load...')
  // })
}

const handleNewFile = (event) => {
  console.info("triggered to open new file");
  dialog
    .showOpenDialog(null, {
      properties: ["openFile"],
      filters: [{ name: "CSV Files", extensions: ["csv"] }],
    })
    .then((result) => {
      if (!result.canceled && result.filePaths.length > 0) {
        const filePath = result.filePaths[0];
        console.log(filePath);

        const file = fs.createReadStream(filePath);
        let metadatas = [];

        //reading metadata
        fs.readFile(filePath, "utf8", (error, contents) => {
          if (error) {
            console.error(error);
            return;
          }

          // Split the contents into an array of lines
          const lines = contents.split("\r\n");

          // Create an empty array to store lines starting with '#'
          const commentLines = [];

          // Loop through each line in the file
          for (let i = 0; i < lines.length; i++) {
            // Check if the line starts with '#'
            if (lines[i].startsWith("# ")) {
              // If it does, add it to the commentLines array
              // remove the '#' character from the beginning of the line
              const ret = lines[i].substring(2).split(",");
              commentLines.push({ [ret[0]]: ret[1] });
            }
          }
          metadatas = commentLines.reduce((result, item) => {
            // For each object in the array, loop over its keys and add them to the result object
            Object.keys(item).forEach((key) => {
              result[key] = item[key];
            });
            return result;
          }, {});

          metadatas = { ...metadatas, path: filePath };

          // console.log(metadatas); // Output: { 'foo': 'bar', 'he': 'llo' }

          event.reply("etor_metadata", metadatas);
          console.log("etor_metadata working...!");
          // event.sender.removeListener('etor_metadata');
        });

        console.log("reading metadata done");
        // parsing data
        Papa.parse(file, {
          download: false,
          header: true,
          encoding: "utf8",
          // worker: true,
          comments: "#",
          delimiter: ",",
          skipEmptyLines: true,

          complete: (results) => {
            console.log("papaparse", "init");
            let recent_files = [];
            try {
              recent_files = store.get("recent.files");
              console.log("getting recent_files", "init");
              if (typeof recent_files === "undefined") {
                console.log("recent_files", recent_files);
                recent_files = [];
              }
            } catch (err) {
              console.error("Error accessing value from store:", err);
              // Handle the error here
            }

            // 최근 파일 얻기
            console.log("recent.files", recent_files);
            console.log("recent.files type", typeof recent_files);
            console.log("recent.files len", recent_files.length);

            const unixTimestamp = Math.floor(new Date().getTime() / 1000); // opened
            const recorded_date = isNaN(metadatas.time)
              ? "None"
              : metadatas.time; // recorded

            const rcd = {
              path: filePath,
              opened: unixTimestamp,
              recorded: recorded_date,
            };
            if (!recent_files.some((item) => item.path === rcd.path)) {
              console.log("new data detected! adding it to recent files");
              recent_files.push(rcd);
              if (recent_files.length > 10) {
                recent_files.shift(); // remove the first item
              }
              store.set("recent.files", recent_files);
              event.reply("etor_fetch_recent", recent_files);
            } else {
              console.log("already existed in recent array. skipping.");
            }
            event.reply("etor_csv", results.data);
            console.log("result.data", result.data);
            console.log("etor_csv working...!");

            // csv 배열 전달
          },
        });
      }
    });
};

const handlePrevFile = (event, data) => {
  console.info("triggered to open file from existed");
  const filePath = data;
  // console.log(filePath)
  try {
    const file = fs.createReadStream(filePath);

    let metadatas = [];
    // Read the CSV file

    fs.readFile(filePath, "utf8", (error, contents) => {
      if (error) {
        const recent_files = store.get("recent.files");
        console.log("recent_files", recent_files);

        console.error(error);
        dialog.showErrorBox(
          "Error",
          `파일이 존재하지 않습니다. 최근 파일 리스트에서 제거합니다.\n ${error.message}`
        );

        const filteredData = recent_files.filter(
          (item) => item.path !== filePath
        );
        console.log("recent_files", filteredData);

        store.set("recent.files", filteredData);
        event.reply("etor_fetch_recent", filteredData);
      }

      // Split the contents into an array of lines
      const lines = contents.split("\r\n");

      // Create an empty array to store lines starting with '#'
      const commentLines = [];

      // Loop through each line in the file
      for (let i = 0; i < lines.length; i++) {
        // Check if the line starts with '#'
        if (lines[i].startsWith("# ")) {
          // If it does, add it to the commentLines array
          // remove the '#' character from the beginning of the line
          const ret = lines[i].substring(2).split(",");
          commentLines.push({ [ret[0]]: ret[1] });
        }
      }
      metadatas = commentLines.reduce((result, item) => {
        // For each object in the array, loop over its keys and add them to the result object
        Object.keys(item).forEach((key) => {
          result[key] = item[key];
        });
        return result;
      }, {});

      metadatas = { ...metadatas, path: filePath };

      event.reply("etor_metadata", metadatas);
      console.log("sending etor_metadata to react");
    });

    // parsing data
    Papa.parse(file, {
      download: false,
      header: true,
      encoding: "utf8",
      worker: true,
      comments: "#",
      delimiter: ",",
      skipEmptyLines: true,

      complete: (results) => {
        let recent_files = [];
        try {
          recent_files = store.get("recent.files");
          console.log("getting recent_files", "init");
          if (typeof recent_files === "undefined") {
            console.log("recent_files", recent_files);
          }
        } catch (err) {
          console.error("Error accessing value from store:", err);
          // Handle the error here
        }

        const unixTimestamp = Math.floor(new Date().getTime() / 1000); // opened
        const recorded_date = isNaN(metadatas.time) ? "None" : metadatas.time; // recorded

        // 파일 데이터를 기반으로 메타데이터 이름 추가

        const record_list = {
          path: filePath,
          opened: unixTimestamp,
          recorded: recorded_date,
        };

        // 파일 리스트가 10개를 넘어간다면, 가장 오래된 거 제거
        if (!recent_files.some((item) => item.path === record_list.path)) {
          console.log("new data detected! adding it to recent files");
          recent_files.push(record_list);
          if (recent_files.length > 10) {
            recent_files.shift(); // remove the first item
          }
          store.set("recent.files", recent_files);
          event.reply("etor_fetch_recent", recent_files);
        } else {
          console.log("already existed in recent array. skipping.");
        }

        // const new_recent_files = [...(recent_files || []), { "path": filePath, "opened": unixTimestamp, "recorded": recorded_date }];

        event.reply("etor_csv", results.data);
        console.log("sending etor_csv to react");

        // csv 배열 전달
      },
    });
  } catch (error) {
    dialog.showErrorBox("Error", `Failed to read file: ${error.message}`);
  }
};

const sendRecentHistory = (event) => {
  // rtoe_fetch_recent

  let recent_files = [];
  try {
    recent_files = store.get("recent.files");
    console.log("getting recent_files");
    if (typeof recent_files === "undefined") {
      console.log("recent_files is undefined or not exist", recent_files);
    } else {
      console.log("fetch recent suceeded. seding to react.");
      event.reply("etor_fetch_recent", recent_files);
    }
  } catch (err) {
    console.error("Error accessing value from store:", err);
    // Handle the error here
  }
};

const sendSettings = (event) => {
  let settings = [];
  try {
    settings = store.get("settings");
    console.log("loading settings");
    if (typeof settings === "undefined") {
      console.log("undefined settings, so, saving default data");
      settings = {
        enableApexChart: false,
        referenceLevel: {
          LRDiff: 4, // lrdiff
          Smooth: [3, 3], // 평면성
          HL: [3, 3], // 고저
          Flatness: 1.2, // 평탄성
          InnerDist: 10, // 안내레일내측거리
          Straightness: [3, 3], // 직진도
          gap: 0.5,
        },
        aggregation: 1,
        range: [0, 1],
        globalRange: [0, 1],
      };
      store.set("settings", settings);
    } else {
      console.log("setting exist. sending to react");
      event.reply("etor_fetch_settings", settings);
    }
  } catch (err) {
    console.error("Error accessing value from store:", err);
  }
};

const updateSettings = (event, data) => {
  let settings = [];
  try {
    console.log("changes received:", data);
    store.set("settings", data);
    console.log("\n saving settings");
    if (typeof settings === "undefined") {
      console.log("undefined settings, so, saving default data");
      settings = {
        enableApexChart: false,
        referenceLevel: {
          LRDiff: 4, // lrdiff
          Smooth: [3, 3], // 평면성
          HL: [3, 3], // 고저
          Flatness: 1.2, // 평탄성
          InnerDist: 10, // 안내레일내측거리
          Straightness: [3, 3], // 직진도
          gap: 0.5,
        },
        aggregation: 1,
        range: [0, 1],
        globalRange: [0, 1],
      };
      store.set("settings", settings);
    } else {
      console.log("setting saved. sending to react");
      event.reply("etor_fetch_settings", data);
    }
  } catch (err) {
    console.error("Error accessing value from store:", err);
  }
};

// generated gpt,
// 1. 파일을 선택
// 2. 파일 리스트 local storage에 저장 // TODO
// 3. 메타데이터, 경로 배열을 REACT에 보내줌.
ipcMain.on("rtoe_new_file", handleNewFile);
ipcMain.on("rtoe_prev_file", handlePrevFile);
// 최근항목 리스트 localstorage에서 10개 뽑아서 react에 전송
ipcMain.on("rtoe_fetch_recent", sendRecentHistory);
ipcMain.on("rtoe_fetch_settings", sendSettings);
ipcMain.on("rtoe_update_settings", updateSettings);

app.on("ready", createWindow);
app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// app.whenReady().then(() => {
//   createWindow();

//   app.on("activate", () => {

//     if (BrowserWindow.getAllWindows().length === 0) createWindow();
//   });
// });

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// const { app, BrowserWindow } = require("electron");

// const path = require("path");
// const isDev = require("electron-is-dev");

// const remote = require("@electron/remote/main");
// remote.initialize();

// function createWindow() {
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true,
//       enableRemoteModule: true,
//       contextIsolation: false,
//     },
//   });

//   win.loadURL(
//     isDev
//       ? "http://localhost:3000"
//       : `file://${path.join(__dirname, "../build/index.html")}`
//   );

//   remote.enable(win.webContents);
// }

// app.on("ready", createWindow);

// app.on("window-all-closed", function () {
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });

// app.on("activate", function () {
//   if (BrowserWindow.getAllWindows().length === 0) createWindow();
// });
