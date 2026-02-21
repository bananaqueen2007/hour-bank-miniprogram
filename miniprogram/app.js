// app.js
App({
  onLaunch: function () {
    // 初始化云开发环境
    wx.cloud.init({
      env: 'cloud1-9g7orf7l9019a6c2',  // ⚠️ 替换成你的实际云环境ID！
      traceUser: true            // 追踪用户，便于调试
    })
  }
})
