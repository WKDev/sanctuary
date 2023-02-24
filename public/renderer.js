const { ipcMain } = require('electron')

window.onload = () => {
//   const btnEl = document.getElementById('btn')

//   btnEl.addEventListener('click', (evt) => {
//     const inputValue = document.getElementById('text-input').value

//     // onInputValue 이벤트 송신
//     ipcRenderer.send('onInputValue', inputValue)
//   })

// console.log('renderer .js ,,,')

  // // replyInputValue에 대한 응답 수신
  // ipcRenderer.on('replyInputValue', (evt, payload) => {
  //   // document.getElementById('text-box').textContent = payload
  // })

  // // onWebcontentsValue에 대한 이벤트 수신
  // ipcRenderer.on('asynchronous-message', (evt, payload) => {
  //       console.log(payload)
  //       ipcRenderer.send('asynchronous-message', 'pong')

    // document.getElementById('text-box').textContent = payload
  // })

}   