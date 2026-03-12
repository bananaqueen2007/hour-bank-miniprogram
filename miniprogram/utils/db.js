const db = wx.cloud.database()
const hoursCollection = db.collection('hours')

/**
 * 根据学号查询记录
 * @param {string} studentId 
 * @returns {Promise<object|null>}
 */
async function findRecordByStudentId(studentId) {
  if (!studentId) {
    console.error('学号不能为空')
    return null
  }

  try {
    const res = await hoursCollection.where({
      studentId: studentId
    }).get()
    return res.data.length > 0 ? res.data[0] : null
  } catch (err) {
    console.error('查询记录失败：', err)
    throw err
  }
}

/**
 * 新增工时记录
 * @param {string} name 
 * @param {string} studentId 
 * @param {number} hours 
 * @returns {Promise<object>}
 */
async function addRecord(name, studentId, hours) {
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
 * @param {string} recordId 
 * @param {number} additionalHours 
 * @returns {Promise<object>}
 */
async function updateHours(recordId, additionalHours) {
  if (!recordId) {
    throw new Error('记录ID不能为空')
  }
  if (typeof additionalHours !== 'number' || additionalHours <= 0) {
    throw new Error('增加的工时必须为正数')
  }

  try {
    const record = await hoursCollection.doc(recordId).get()
    const newHours = record.data.hours + additionalHours
    const res = await hoursCollection.doc(recordId).update({
      data: { 
        hours: newHours,
        updateTime: new Date()
      }
    })
    console.log('更新记录成功：', res)
    return res
  } catch (err) {
    console.error('更新记录失败：', err)
    throw err
  }
}

module.exports = {
  findRecordByStudentId,
  addRecord,
  updateHours
}