var app = getApp();

Page({
  data: {
    cache: [
      { iconurl: '/pages/img/wx_app_clear.png', title: '缓存清理', tap: 'clearCache' }
    ],
    device: [
      { iconurl: '/pages/img/wx_app_cellphone.png', title: '系统信息', tap: 'showSystemInfo' },
      { iconurl: '/pages/img/wx_app_network.png', title: '网络状态', tap: 'showNetWork' },
      { iconurl: '/pages/img/wx_app_scan_code.png', title: '二维码', tap: 'scanQRCode' }
    ],
   

    compassVal: 0,
    compassHidden: true,
    shakeInfo: {
      gravityModalHidden: true,
      num: 0,
      enabled: false
    },
    shakeData: {
      x: 0,
      y: 0,
      z: 0
    },
  },

  onLoad: function () {
    this.setData({
      userInfo: app.globalData.g_userInfo
    })
  },

  //显示模态窗口
  showModal: function (title, content, callback) {
    wx.showModal({
      title: title,
      content: content,
      confirmColor: '#1F4BA5',
      cancelColor: '#7F8389',
      success: function (res) {
        if (res.confirm) {
          callback && callback();
        }
      }
    })
  },

  // 缓存清理
  clearCache: function () {
    this.showModal('缓存清理', '确定要清除本地缓存吗？', function () {
      wx.clearStorage({
        success: function (msg) {
          wx.showToast({
            title: "缓存清理成功",
            duration: 1000,
            mask: true,
            icon: "success"
          })
        },
        fail: function (e) {
          console.log(e)
        }
      })
    });
  },
  //显示系统信息
  showSystemInfo: function () {
    wx.navigateTo({
      url: 'device/device',
    });
  },

  //网络状态
  showNetWork: function () {
    var that = this;
    wx.getNetworkType({
      success: function (res) {
        var networkType = res.networkType
        that.showModal('网络状态', '您当前的网络：' + networkType);
      }
    })
  },




  //扫描二维码
  scanQRCode: function () {
    var that = this;
    wx.scanCode({
      success: function (res) {
        console.log(res)
        that.showModal('扫描二维码', res.result, false);
      },
      fail: function (res) {
        that.showModal('扫描二维码', "扫描失败，请重试", false);
      }
    })

  }
})