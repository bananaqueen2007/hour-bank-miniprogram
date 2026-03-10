const db = wx.cloud.database()
const hoursCollection = db.collection('hours')

Page({
  async submitForm(e) {
    const { name, studentId, hours } = e.detail.value
    console.log('表单提交数据：', { name, studentId, hours })

    // 验证输入
    if (!name || !studentId || !hours) {
      wx.showToast({ title: '请填写完整信息', icon: 'none' })
      return
    }
    
    const hoursNum = parseFloat(hours)
    if (isNaN(hoursNum) || hoursNum <= 0) {
      wx.showToast({ title: '工时必须为正数', icon: 'none' })
      return
    }

    wx.showLoading({ title: '处理中...' })

    try {
      // 1. 先查询这个学号是否已经存在
      console.log('正在查询学号：', studentId)
      const existingRes = await hoursCollection.where({
        studentId: studentId
      }).get()
      
      console.log('查询结果：', existingRes.data)

      if (existingRes.data.length > 0) {
        // 2. 学号已存在，进行累加
        const existingRecord = existingRes.data[0]
        const newTotal = existingRecord.hours + hoursNum
        console.log('原工时：', existingRecord.hours, '新加工时：', hoursNum, '总工时：', newTotal)
        
        await hoursCollection.doc(existingRecord._id).update({
          data: {
            hours: newTotal
          }
        })
        
        wx.showToast({ 
          title: `累加成功！总工时：${newTotal}`, 
          icon: 'success' 
        })
      } else {
        // 3. 学号不存在，新建记录
        console.log('学号不存在，新建记录')
        await hoursCollection.add({
          data: {
            name: name,
            studentId: studentId,
            hours: hoursNum,
            createTime: new Date()
          }
        })
        
        wx.showToast({ 
          title: '录入成功！', 
          icon: 'success' 
        })
      }
    } catch (err) {
      console.error('操作失败：', err)
      wx.showToast({ 
        title: '操作失败', 
        icon: 'error' 
      })
    } finally {
      wx.hideLoading()
    }
  }
})