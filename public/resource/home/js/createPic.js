function showPicDiv(url) {
    $(".box").show();
    var create = $(".box1").attr("create");
    if (create != 'true') {
        var divHight = $(".box1").height();
        var screenHight = $(window).height();
        var divWidth = $(".box1").width();
        var screenWidth = $(window).width();
        var top = (screenHight - divHight) / 2;
        var left = (screenWidth - divWidth) / 2;
        var options = {
            render: "canvas", //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
            text: url, //
            width: "90", //二维码的宽度
            height: "90", //二维码的高度
            background: "#ffffff", //二维码的后景色
            foreground: "#020001" //二维码的前景色
        };
        $('#UmErm').empty().qrcode(options);
        var mycanvas1 = document.getElementsByTagName('canvas')[0];
        var base64Img = convertCanvasToImage(mycanvas1);
        $('#UmErm').html(base64Img);
        setTimeout(function() {
            createPic(divWidth, divHight);
            $(".box1").attr("style", "top:" + top + "px;left:" + left + "px;");
            $(".tips").attr("style", "margin-top:" + (top - 40) + "px;");
        }, 50);
    }
}

function createPic(divWidth, divHight) {
    //创建一个新的canvas
    var canvas2 = document.createElement("canvas");
    var w = Number(divWidth);
    var h = Number(divHight);
    //将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
    canvas2.width = w * 2;
    canvas2.height = h * 2;
    canvas2.style.width = w + "px";
    canvas2.style.height = h + "px";
    //可以按照自己的需求，对context的参数修改,translate指的是偏移量
    //  var context = canvas.getContext("2d");
    //  context.translate(0,0);
    var context = canvas2.getContext("2d");
    context.scale(2, 2);
    var opts = {
        scale: 2,
        canvas: canvas2,
        logging: true,
        width: w,
        height: h
    };
    html2canvas($(".box1"), opts).then(function(canvas) {
        var imgUri = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); // 获取生成的图片的url
        $(".box1").html("<img src='" + imgUri + "' style='width:100%;height:100%'/>");
        $(".box1").attr("create", "true");
    });
}
//从 canvas 提取图片 image
function convertCanvasToImage(canvas) {
    //新Image对象，可以理解为DOM
    var image = new Image();
    // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
    // 指定格式 PNG
    image.src = canvas.toDataURL("image/png");
    return image;
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL("image/png"); // 可选其他值 image/jpeg
    return dataURL;
}