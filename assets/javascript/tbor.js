/* Javascript Class */
class Tbor{
    constructor(){
        this.storage = window.localStorage;
        this.ua = navigator.userAgent;
    }
    redirect(url){
        location.href=url
    }
    access(){
        this.storage.clear()
        let log = JSON.parse(this.storage.getItem("access_log"));
        if(log == null || typeof log != "object"){
            log = [];
        }
        log.push(this.ua);
        this.storage.setItem("access_log", JSON.stringify(log));
        // console.log(this.storage.getItem("access_log"));
    }
    canvas(Element){
        Element=document.getElementById("cap01")
        // return Element.getContext("2D");
    }
}
// 継承 /
String.prototype.format = function(){
    // "A{}BC{}....{}".format(val1, val2, ...valN)
    values = arguments;
    strings = this.split(/{}/);
    string = "";
    for (i=0;i<values.length;i++){
        string += strings[i]+=values[i];
    }
    return string;
}

var stg = window.localStorage;
var ua = navigator.userAgent;
stg.setItem("ua", ua);
// console.log(new Date().getTime())
if (typeof stg.getItem("access") == "undefined"){
    stg.setItem("access",0);
}
else{
    access = Number(stg.getItem("access"));
    if(access < 3){
        stg.setItem("access", access+1);
    }else{
        stg.setItem("access", 0);
    } 
}

function Login(){
    auth=prompt("パスワード:");
    var sha256 = new jsSHA('SHA-256', "TEXT", {eccoding:'UTF-8'});
    sha256.update(auth);
    var digest = sha256.getHash("HEX");
    // Easy authlize
    // 本番 - sha 256
    url = "/"+digest+"/";
    if(navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)){
        // location.replace("./404.html");
        alert("PCでご覧ください。");
        $("body").html("");
    }else{
        location.replace(url);
    }
    
}
/* preload image */
var preload_image_dir = "/assets/img/";
var preload_image_content = ['jekyll','py','hongo','machimura','across','kakeru','mixi'];
var _preload_num = 15;
$(function(){
    
    /* preload image */
    for(i=0;i<preload_image_content.length;i++){
        for(j=0;j<_preload_num;j++){
            var image = new Image();
            str = j;
            if( j < 10 ) str = "0"+j;
            image.src = preload_image_dir + preload_image_content + '/screen000' + str;
        }
    }
    var body = document.body;
    var navi = ".navi";
    var article="article";
    var navi_a = navi + " a";
    var top_btn = ".top_btn";
    var left=($(window).innerWidth()-260)/2;
    var height = ($(window).innerHeight());

    if (typeof(position)=="undefined") position=0;
    var speed = 750;
    var pos = 0;
    for(var i=0;i<$(article).length;i++){
        pos+=height;
        $($(navi_a)[i]).attr("data-pos", pos)
    }

    $(top_btn).css("left",left);
    if(position>0){
        $(top_btn).css("display","block");
    }
    else{
        $(top_btn).css("display","none");
        $('html, body').animate({scrollTop:position}, speed, "swing");
    }
    $(navi).css("height", height-10);    
    $(navi_a).css("height",(height/2)-400)
    $(navi).css("grid-template-rows", "repeat(auto-fit, "+(height/2)+"px)");
    $(navi_a).click(function(){
        // document.body.requestFullscreen();
        position=Number($(this).attr("data-pos"));
        $('html, body').animate({scrollTop:position}, speed, "swing");
        $(top_btn).attr('data-pos',position-100);
        $(top_btn).animate({top:position+height-80},speed,"swing");
        $(top_btn).css("display","block");
        // console.log($(document.body).offset().top,window.innerHeight)
    });
    // Back Button
    $(".top_btn a").click(function(){
        position=0;
        if(position==0){
            $(top_btn).css("display","none");
        }
        $('html, body').animate({scrollTop:0}, speed, "swing");
        $(top_btn).attr('data-pos',position-100);
        $(top_btn).animate({top:position+400}, speed, "swing");
    });

    $(window).resize(function(){
        height = ($(window).innerHeight());
        pos = 0;
        for(var i=0;i<$(article).length;i++){
            pos+=height;
            $($(navi_a)[i]).attr("data-pos", pos)
        }
        $(navi_a).css("height",(height/2)-400);
        $(navi).css("height", height-10);
        $(navi).css("grid-template-rows", "repeat(auto-fit, "+(height/2)+"px)");
        $('html, body').animate({scrollTop:0}, speed, "swing");
    });

    if(navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)==null){
        //PC
        $("body").css("overflow","hidden");
    }

<<<<<<< HEAD
    
=======
    if(navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)){
        // location.replace("./404.html");
        alert("PCでご覧ください。");
        $("body").html("");
    }
>>>>>>> c566e0da003f8ec702956610867ba89c198d49e2
    function SlideShow(){
        // slide show
        counter = 0;
        setID=setInterval(function(){
            var max = $("article").length;
            if (typeof(position)=="undefined") position=0;
            // console.log( position,max,setID,counter,$(navi_a)[counter])
            position=Number($($(navi_a)[counter]).attr("data-pos"));
            if ( counter % (max+1) == 0 ){
                position=0;
            }
            if (counter>max){
                clearInterval(setID);
            }
            $('html, body').animate({scrollTop:position}, speed, "swing");
            counter++;
        },1000);
    }
});
// alert(location.href);