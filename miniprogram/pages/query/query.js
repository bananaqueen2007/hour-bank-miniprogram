const dbUtils = require('../../utils/db.js')

Page({
  data: {
    name: '',
    studentId: '',
    showResult: false,
    totalHours: 0
  },

  onNameInput(e) {
    this.setData({ 
      name: e.detail.value,
      showResult: false
    })
  },

  onStudentIdInput(e) {
    this.setData({ 
      studentId: e.detail.value,
      showResult: false
    })
  },

  async queryHours() {
    const { name, studentId } = this.data
    if (!name || !studentId) {
      wx.showToast({ title: '请填写姓名和学号', icon: 'none' })
      return
    }

    wx.showLoading({ title: '查询中...' })

    try {
      const record = await dbUtils.findRecordByStudentId(studentId)
      if (!record) {
        wx.showToast({ title: '学号不存在', icon: 'none' })
        this.setData({ showResult: false })
        return
      }
      if (record.name !== name) {
        wx.showToast({ title: '姓名与学号不匹配', icon: 'none' })
        this.setData({ showResult: false })
        return
      }
      this.setData({
        showResult: true,
        totalHours: record.hours.toFixed(2)
      })
    } catch (err) {
      console.error(err)
      wx.showToast({ title: '查询失败', icon: 'error' })
    } finally {
      wx.hideLoading()
    }
  },

  clearInput() {
    this.setData({
      name: '',
      studentId: '',
      showResult: false,
      totalHours: 0
    })
  }
})