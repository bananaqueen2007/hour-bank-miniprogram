App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'cloud1-9g7orf7l9019a6c2',  // 从你的截图看是这个环境ID
      traceUser: true
    })
    console.log('云开发初始化完成')
  }
})