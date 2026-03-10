const dbUtils = require('../../utils/db.js')

Page({
  data: {
    hasData: false,
    totalHours: 0,
    workDays: 0
  },

  onLoad() {
    this.loadStats()
  },

  onShow() {
    // 每次显示页面时刷新数据
    this.loadStats()
  },

  async loadStats() {
    try {
      const records = await dbUtils.getAllRecords()
      if (records.length > 0) {
        let total = 0
        records.forEach(item => {
          total += item.hours || 0
        })
        this.setData({
          hasData: true,
          totalHours: total.toFixed(1),
          workDays: records.length
        })
      }
    } catch (err) {
      console.error('加载统计数据失败', err)
    }
  },

  goToInput() {
    wx.switchTab({
      url: '/pages/input/input'
    })
  },

  goToQuery() {
    wx.switchTab({
      url: '/pages/query/query'
    })
  }
})