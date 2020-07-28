/** 工具类
 * @author ylf
 * @param date 2018.01.04
 */
var Util = {
  /**
   * @msg:获取参数
   * @param {type}
   * @return:
   */
  GetQueryString (name, url = window.location.href.toString()) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    let arr = url.split('?')
    let r = arr[1].match(reg)
    if (r != null) return unescape(r[2])
    return null
  },
  /**
   * @msg:获取参数备用
   * @param {type}
   * @return:
   */
  GetQueryStringBak (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return unescape(r[2])
    }
    return null
  },
  /**
   * @msg:修改参数
   * @param {type}
   * @return:
   */
  updateQueryString (key, value) {
    let uri = window.location.href.toString()
    if (!value) {
      return uri
    }
    let re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i')
    let separator = uri.indexOf('?') !== -1 ? '&' : '?'
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + '=' + value + '$2')
    } else {
      return uri + separator + key + '=' + value
    }
  },
  /**
   * @msg:更新url
   * @param {type}
   * @return:
   */
  updUrl (key, value) {
    let newUrl = this.updateQueryString(key, value)
    // console.log('newUrl: ', newUrl)
    history.pushState({ page: value }, '', newUrl)
  },
  /**
   * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
   * sHex为传入的十六进制的色值
   * alpha为rgba的透明度
   */
  colorRgba: (sHex, alpha = 1) => {
    // 十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    /* 16进制颜色转为RGB格式 */
    let sColor = sHex.toLowerCase()
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = '#'
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
        }
        sColor = sColorNew
      }
      //  处理六位的颜色值
      var sColorChange = []
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
      }
      // return sColorChange.join(',')
      // 或
      return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')'
    } else {
      return sColor
    }
  },
  colorTo16 (color) {
    var values = color
      .replace(/rgba?\(/, '')
      .replace(/\)/, '')
      .replace(/[\s+]/g, '')
      .split(',')
    var a = parseFloat(values[3] || 1)
    var r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255)
    var g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255)
    var b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255)
    return '#' +
      ('0' + r.toString(16)).slice(-2) +
      ('0' + g.toString(16)).slice(-2) +
      ('0' + b.toString(16)).slice(-2)
  }

}

export default Util
