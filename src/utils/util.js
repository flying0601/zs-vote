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
   * @msg:获取参数B备用
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
  }
}

export default Util
