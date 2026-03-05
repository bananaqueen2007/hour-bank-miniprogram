Page({
  data: {
  },

  onLoad(options) {
    console.log('工时录入页面加载完成');
  },

  submitForm(e) {
    const formData = e.detail.value;
    const { name, studentId, hours } = formData;

    console.log('表单提交数据：', formData);

    if (!name || !studentId || !hours) {
      wx.showToast({
        title: '请填写完整信息', 
        icon: 'none',
        duration: 2000
      });
      return;
    }

    const hoursNum = parseFloat(hours);
    if (isNaN(hoursNum) || hoursNum <= 0) {
      wx.showToast({
        title: '工时必须为正数',
        icon: 'none',
        duration: 2000
      });
      return; 
    }

    wx.showLoading({
      title: '处理中...', 
      mask: true 
    });

wx.cloud.callFunction({
  name: 'quickstartFunctions', 
  data: {
    type: 'insertRecord',
    data: {
      name: name,
      studentId: studentId,
      hours: hoursNum,
      submitTime: new Date()
    }
  },
  success: (res) => {
    wx.hideLoading();
    wx.showToast({
      title: '提交成功！',
      icon: 'success'
    });
    console.log('工时记录插入成功，记录ID:', res.result._id || res.result);
  },
  fail: (err) => {
    wx.hideLoading();
    wx.showToast({
      title: '提交失败，请重试',
      icon: 'none'
    });
    console.error('云函数调用失败:', err);
  }
});
  }
});