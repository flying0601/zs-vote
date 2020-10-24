/* eslint-disable */
var replaceAllImg = (html) => {
  var newContent = html.replace(/<img[^>]*>/gi, function (str, capture) {
    // console.log('==', str);
    var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i
      var url = str.match(srcReg)
      console.log(url[1])
      var mat = str.replace(/src=\"(.*)\"/gi, 'data-src=' + url[1])
      return mat
  })

  return newContent
};
export default replaceAllImg