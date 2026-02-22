// miniprogram/pages/query/query.js
Page({
  // 页面初始数据
  data: {
    name: '',           // 姓名
    studentId: '',      // 学号
    showResult: false,  // 是否显示结果
    totalHours: 0       // 总工时
  },
// 页面加载时执行
onLoad() {
  console.log('查询页面加载成功')
},

// 输入姓名
onNameInput(e) {
  this.setData({
    name: e.detail.value
  })
},

// 输入学号
onStudentIdInput(e) {
  this.setData({
    studentId: e.detail.value
  })
},

// 查询工时（模拟版本）
queryHours() {
  const { name, studentId } = this.data
  
  // 1. 验证输入
  if (!name || !studentId) {
    wx.showToast({
      title: '请填写姓名和学号',
      icon: 'none'
    })
    return
  }
  
  // 2. 显示加载中
  wx.showLoading({
    title: '查询中...'
  })
  
  // 3. 模拟查询（等队友C的数据库工具写好再替换）
  setTimeout(() => {
    wx.hideLoading()
    
    // 模拟不同情况
    if (studentId === '2024001' && name === '张三') {
      // 模拟查询成功
      this.setData({
        showResult: true,
        totalHours: 42.5
      })
      wx.showToast({
        title: '查询成功',
        icon: 'success'
      })
    } else if (studentId === '2024001') {
      // 模拟姓名不匹配
      wx.showToast({
        title: '姓名与学号不匹配',
        icon: 'none'
      })
      this.setData({ showResult: false })
    } else {
      // 模拟学号不存在
      wx.showToast({
        title: '学号不存在',
        icon: 'none'
      })
      this.setData({ showResult: false })
    }
  }, 1000)
},

// 清空输入（可选功能）
clearInput() {
  this.setData({
    name: '',
    studentId: '',
    showResult: false,
    totalHours: 0
  })
}

})