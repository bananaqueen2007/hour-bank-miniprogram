const dbUtils = require('../../utils/db.js')

Page({
  data: {
    result: '点击按钮开始测试'
  },

  // 测试新增
  async testAdd() {
    try {
      const res = await dbUtils.addRecord('测试用户', 'test001', 2.5)
      this.setData({ 
        result: `新增成功：${JSON.stringify(res, null, 2)}` 
      })
    } catch (err) {
      this.setData({ result: `新增失败：${err.message}` })
    }
  },

  // 测试查询
  async testQuery() {
    try {
      const record = await dbUtils.findRecordByStudentId('test001')
      this.setData({ 
        result: `查询结果：${JSON.stringify(record, null, 2)}` 
      })
    } catch (err) {
      this.setData({ result: `查询失败：${err.message}` })
    }
  },

  // 测试更新
  async testUpdate() {
    try {
      // 先查询到记录
      const record = await dbUtils.findRecordByStudentId('test001')
      if (!record) {
        this.setData({ result: '记录不存在，请先测试新增' })
        return
      }
      // 更新
      const res = await dbUtils.updateHours(record._id, 1.5)
      // 再次查询显示新值
      const newRecord = await dbUtils.findRecordByStudentId('test001')
      this.setData({ 
        result: `更新成功，最新记录：${JSON.stringify(newRecord, null, 2)}` 
      })
    } catch (err) {
      this.setData({ result: `更新失败：${err.message}` })
    }
  },

  // 测试获取所有
  async testGetAll() {
    try {
      const records = await dbUtils.getAllRecords()
      this.setData({ 
        result: `共有 ${records.length} 条记录：\n${JSON.stringify(records, null, 2)}` 
      })
    } catch (err) {
      this.setData({ result: `获取失败：${err.message}` })
    }
  }
})