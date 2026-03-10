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
      showResult: false  // 输入时隐藏结果
    })
  },

  onStudentIdInput(e) {
    this.setData({ 
      studentId: e.detail.value,
      showResult: false  // 输入时隐藏结果
    })
  },

  async queryHours() {
    const { name, studentId } = this.data
    console.log('查询输入：', name, studentId)

    if (!name || !studentId) {
      wx.showToast({ title: '请填写姓名和学号', icon: 'none' })
      return
    }

    wx.showLoading({ title: '查询中...' })

    try {
      const record = await dbUtils.findRecordByStudentId(studentId)
      console.log('查询结果：', record)

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
      console.error('查询失败：', err)
      wx.showToast({ title: '查询失败', icon: 'error' })
    } finally {
      wx.hideLoading()
    }
  },

  // 添加清空按钮功能（可选）
  clearInput() {
    this.setData({
      name: '',
      studentId: '',
      showResult: false,
      totalHours: 0
    })
  }
})