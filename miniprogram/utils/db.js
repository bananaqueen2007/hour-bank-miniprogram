
/**
 * 数据库操作工具模块
 * 提供工时记录的所有数据库操作
 * 队长开发
 */

// 初始化数据库
const db = wx.cloud.database()
const hoursCollection = db.collection('hours')

/**
 * 根据学号查询记录
 * @param {string} studentId - 学号
 * @returns {Promise<object|null>} 返回记录对象或null
 */
async function findRecordByStudentId(studentId) {
  // 参数验证
  if (!studentId) {
    console.error('学号不能为空')
    return null
  }

  try {
    const res = await hoursCollection.where({
      studentId: studentId
    }).get()
    
    // 返回第一条记录（学号应该是唯一的）
    return res.data.length > 0 ? res.data[0] : null
  } catch (err) {
    console.error('查询记录失败：', err)
    throw err // 抛出错误，让调用者处理
  }
}

/**
 * 新增工时记录
 * @param {string} name - 姓名
 * @param {string} studentId - 学号
 * @param {number} hours - 工时数
 * @returns {Promise<object>} 返回添加结果
 */
async function addRecord(name, studentId, hours) {
  // 参数验证
  if (!name || !studentId || !hours) {
    throw new Error('参数不能为空')
  }
  if (typeof hours !== 'number' || hours <= 0) {
    throw new Error('工时必须为正数')
  }

  try {
    const res = await hoursCollection.add({
      data: {
        name: name.trim(),
        studentId: studentId.trim(),
        hours: hours,
        createTime: new Date()
      }
    })
    console.log('新增记录成功：', res)
    return res
  } catch (err) {
    console.error('新增记录失败：', err)
    throw err
  }
}

/**
 * 更新工时（累加）
 * @param {string} recordId - 文档ID
 * @param {number} additionalHours - 增加的工时
 * @returns {Promise<object>} 返回更新结果
 */
async function updateHours(recordId, additionalHours) {
  // 参数验证
  if (!recordId) {
    throw new Error('记录ID不能为空')
  }
  if (typeof additionalHours !== 'number' || additionalHours <= 0) {
    throw new Error('增加的工时必须为正数')
  }

  try {
    // 先获取当前记录
    const record = await hoursCollection.doc(recordId).get()
    const currentHours = record.data.hours || 0
    const newHours = currentHours + additionalHours
    
    // 更新记录
    const res = await hoursCollection.doc(recordId).update({
      data: {
        hours: newHours,
        updateTime: new Date() // 可选：添加更新时间
      }
    })
    console.log('更新记录成功：', res)
    return res
  } catch (err) {
    console.error('更新记录失败：', err)
    throw err
  }
}

/**
 * 获取所有记录（可选功能，用于测试）
 * @returns {Promise<Array>} 返回所有记录
 */
async function getAllRecords() {
  try {
    const res = await hoursCollection.get()
    return res.data
  } catch (err) {
    console.error('获取所有记录失败：', err)
    throw err
  }
}

/**
 * 删除记录（可选功能，用于测试）
 * @param {string} recordId - 文档ID
 * @returns {Promise<object>} 返回删除结果
 */
async function deleteRecord(recordId) {
  if (!recordId) {
    throw new Error('记录ID不能为空')
  }
  
  try {
    const res = await hoursCollection.doc(recordId).remove()
    console.log('删除记录成功：', res)
    return res
  } catch (err) {
    console.error('删除记录失败：', err)
    throw err
  }
}

// 导出所有函数，供页面调用
module.exports = {
  findRecordByStudentId,
  addRecord,
  updateHours,
  getAllRecords,  // 可选导出
  deleteRecord    // 可选导出
}
