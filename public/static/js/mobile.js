function audioAutoPlay () {

    var audio=document.getElementById("bgmusic");
    var audio1=document.getElementById("bgmusic1");
    audio.play();
    setTimeout(function () {
        audio1.play();
    },3000)

    document.addEventListener("WeixinJSBridgeReady",function() {

        audio.play();
        audio1.play();
    },false);
    document.addEventListener("YixinJSBridgeReady",function() {
        audio.play();
        audio1.play();
    },false);
}

$(function () {

    audioAutoPlay();
})

$(".video_show").click(function () {
    var oAudio = document.getElementById("bgmusic");
    var oAudio1 = document.getElementById("bgmusic1");
    if($(this).hasClass("xuanzhuan")){
         $(this).removeClass("xuanzhuan");
        oAudio.pause();
        oAudio1.pause();
    }else{
        $(this).addClass("xuanzhuan");
        oAudio.play();
        oAudio1.play();
    }


})