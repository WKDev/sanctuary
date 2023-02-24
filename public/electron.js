const { app, BrowserWindow, ipcMain, dialog, session } = require("electron");
const path = require("path");
const os = require("os");
const url = require("url");
const fs = require("fs");
const Papa = require("papaparse");
const Store = require("electron-store");
const isDev = require("electron-is-dev");

const store = new Store();

// const isDev = process.env.IS_DEV == "true" ? true : false;

// ipcMain에서의 이벤트 수신
// ipcMain.on('CHANNEL_NAME', (evt, payload) => {
//   console.log(payload)

//   evt.reply('IPC_RENDERER_CHANNEL_NAME', 'message')
// })

// app.disableHardwareAcceleration();
// app.commandLine.appendRoutes("force_high_performance_gpu");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1599,
    height: 830,
    autoHideMenuBar: true,

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });
  // mainWindow.setBounds({ x: 0, y: 0, width: 300, height: 300 })
  // mainWindow.webContents.insertCSS('html, body { overflow: hidden; }')

  console.log(__dirname);
  console.log(`${path.join(__dirname, "../build/index.html")}`);
  mainWindow.loadURL(`file:///${path.join(__dirname, "/../build/index.html")}`);
  console.log("file loading done");

  // mainWindow.loadURL("https://github.com");
  // mainWindow.loadURL(`file:///${path.join(__dirname, "../build/index.html")}`);

  // mainWindow.loadURL("http://192.168.30.10:3000");
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
        // console.log(filePath)

        const file = fs.createReadStream(filePath);
        let metadatas = [];
        // Read the CSV file

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

        // console.log(file)
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
            const recent_files = store.get("recent.files");
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
              event.reply("req-recent-history", recent_files);
            } else {
              console.log("already existed in recent array. skipping.");
            }

            // //파일 데이터를 기반으로 메타데이터 이름 추가
            // const new_file = [...(recent_files || []), { "path": filePath, "opened": unixTimestamp, "recorded": recorded_date }];

            // //파일 리스트가 10개를 넘어간다면, 가장 오래된 거 제거
            // if (new_file.length > 10) {
            //   new_file.shift(); // remove the first item
            // }
            // store.set('recent.files', new_file);
            event.reply("etor_csv", results.data);

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
        event.reply("req-recent-history", filteredData);

        // 파일 데이터를 기반으로 메타데이터 이름 추가
        // const new_file = [...(recent_files || []), { "path": filePath, "opened": unixTimestamp, "recorded": recorded_date }];

        // //파일 리스트가 10개를 넘어간다면, 가장 오래된 거 제거
        // if (new_file.length > 10) {
        //   new_file.shift(); // remove the first item
        // }
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
        const recent_files = store.get("recent.files");
        const unixTimestamp = Math.floor(new Date().getTime() / 1000); // opened
        const recorded_date = isNaN(metadatas.time) ? "None" : metadatas.time; // recorded

        // 파일 데이터를 기반으로 메타데이터 이름 추가

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

        // const new_recent_files = [...(recent_files || []), { "path": filePath, "opened": unixTimestamp, "recorded": recorded_date }];

        // 파일 리스트가 10개를 넘어간다면, 가장 오래된 거 제거

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
  const recent_files = store.get("recent.files");
  event.reply("etor_fetch_recent", recent_files);
};

// generated gpt,
// 1. 파일을 선택
// 2. 파일 리스트 local storage에 저장 // TODO
// 3. 메타데이터, 경로 배열을 REACT에 보내줌.
ipcMain.on("rtoe_new_file", handleNewFile);
ipcMain.on("rtoe_prev_file", handlePrevFile);

// 최근항목 리스트 localstorage에서 10개 뽑아서 react에 전송
ipcMain.on("rtoe_fetch_recent", sendRecentHistory);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // const reactDevToolsPath = path.join(
  //   '%LOCALAPPDATA%\\Google\\Chrome\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\4.27.2_0'
  // )

  // if(isDev) await session.defaultSession.loadExtension(reactDevToolsPath)
  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // // onInputValue 이벤트 수신
  // ipcMain.on('onInputValue', (evt, payload) => {
  //   console.log('on ipcMain event:: ', payload)

  //   const computedPayload = payload + '(computed)'

  //   // replyInputValue 송신 또는 응답
  //   evt.reply('replyInputValue', computedPayload)
  // })

  // ipcMain.on('FILE_DIALOG', (evt, payload) => {
  //   console.log(payload)
  //   dialog.showOpenDialog(null, {
  //     properties: ['openFile'], filters: [
  //       { name: '.csv', extensions: ['csv'] },
  //       { name: 'All Files', extensions: ['*'] }
  //     ]
  //   }).then(filePaths => {
  //     evt.sender.send('FILE_DIALOG', filePaths);
  //     console.log(filePaths)
  //     // evt.reply('FILE_DIALOG', filePaths)

  //   });
  // })
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
