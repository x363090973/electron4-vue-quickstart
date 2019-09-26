const {
  autoUpdater
} = require("electron-updater")
const {
  ipcMain
} = require('electron')
let webContents;
const uploadUrl = 'http://106.15.234.206:1234/assets/electron-version4'
// 检测更新，在你想要检查更新的时候执行，renderer事件触发后的操作自行编写

export function updateHandle(_win) {
  webContents = _win.webContents;
  let message = {
    error: '检查更新出错',
    checking: '正在检查更新……',
    updateAva: '检测到新版本，正在下载……',
    updateNotAva: '现在使用的就是最新版本，不用更新',
  };


  autoUpdater.setFeedURL(uploadUrl);

  autoUpdater.on('error', function (message) {
    sendUpdateMessage('error', message)
  });

  autoUpdater.on('checking-for-update', function (info) {
    sendUpdateMessage('checking-for-update', message.checking)
  });
  autoUpdater.on('update-available', function (info) {

    sendUpdateMessage('update-available', message.updateAva)
  });
  autoUpdater.on('update-not-available', function (info) {
    sendUpdateMessage('update-not-available', message.updateNotAva)
  });

  // 更新下载进度事件
  autoUpdater.on('download-progress', function (progressObj) {
    sendUpdateMessage('download-progress', progressObj)
  })
  autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate,
    updateUrl, quitAndUpdate) {
    ipcMain.on('updateNow', (e, arg) => {
      //some code here to handle event
      autoUpdater.quitAndInstall();
    })
    sendUpdateMessage('isUpdateNow');

  });

  ipcMain.on("checkForUpdate", () => {

    //执行自动更新检查
    autoUpdater.checkForUpdates();
  })
}

// 通过main进程发送事件给renderer进程，提示更新信息
function sendUpdateMessage(message, data) {
  webContents.send('updateMessage', {
    message,
    data
  })
}
