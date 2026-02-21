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

    setTimeout(() => {
      wx.hideLoading();

      wx.showToast({
        title: '录入成功(模拟)',
        icon: 'success',
        duration: 2000
      });
    }, 1500); 
  }
});