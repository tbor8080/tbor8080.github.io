/* Javascript Class */
class Tbor{
    index_page = 0;
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
    }
    canvas(Element){}
}
// 継承 /
String.prototype.format = function(){
    // "A{}BC{}....{}".format(val1, val2, ...valN)
    var values = arguments;
    var strings = this.split(/{}/);
    if((values.length+1)!=strings.length){
        return false;
    }
    var string = strings[0];
    for (var i=0;i<values.length;i++){
        string += values[i]+strings[i+1];
    }
    return string;
}

var stg = window.localStorage;
var ua = navigator.userAgent;
stg.setItem("ua", ua);
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
    location.replace(url);
}
/* PC:False/ETC:True */
function isResponsiveAgent(){
    if(navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)){
        return true;
    }
    return false;
}
/* preload image */
var preload_image_dir = "/assets/img/";
var preload_image_content = ['jekyll','py','hongo','machimura','across','kakeru','mixi'];
var _preload_num = 15;
$(function(){
    var body = document.body;
    var navi = ".navi";
    var article="article";
    var navi_a = navi + " a";
    var top_btn = ".top_btn";
    var top_btn_a = top_btn+" a";
    var body = "html, body";
    var left=($(window).innerWidth()-260)/2;
    var height = ($(window).innerHeight() | $(window).height());

    if (typeof(position)=="undefined") position=0;
    var speed = 750;
    var pos = 0;
    for(var i=0;i<$(article).length;i++){
        pos+=height;
        if(isResponsiveAgent()) pos+=50;
        $($(navi_a)[i]).attr("data-pos", pos);
    }

    $(top_btn).css("left",left);
    if(position>0){
        $(top_btn).css("display","block");
    }
    else{
        $(top_btn).css("display","none");
        $(body).animate({scrollTop:position}, speed, "swing");
    }
    $(navi).css("height", height);    
    $(navi_a).css("height",(height/2));
    $(navi).css("grid-template-rows", "repeat(auto-fit, "+(height/2)+"px)");
    $(navi_a).click(function(){
        position=Number($(this).attr("data-pos"));
        $(body).animate({scrollTop:position}, speed, "swing");
        $(top_btn).attr('data-pos',position-100);
        $(top_btn).animate({top:position+height-80},speed,"swing");
        $(top_btn).css("display","block");
    });
    // Back Button
    $(top_btn_a).click(function(){
        position=0;
        if(position==0){
            $(top_btn).css("display","none");
        }
        $(body).animate({scrollTop:0}, speed, "swing");
        $(top_btn).attr('data-pos',position-100);
        $(top_btn).animate({top:position+400}, speed, "swing");
    });
    // Event: Resize
    $(window).resize(function(){
        height = ($(window).innerHeight());
        pos = 0;
        position = 0;
        left=($(window).innerWidth()-260)/2;
        for(var i=0;i<$(article).length;i++){
            pos+=height;
            $($(navi_a)[i]).attr("data-pos", pos)
        }
        $(body).animate({scrollTop:position}, speed, "swing");
        $(navi).css("height", height);
        $(navi_a).css("height",(height/2));
        $(navi).css("grid-template-rows", "repeat(auto-fit, "+(height/2)+"px)");
        $(top_btn).css("left", left);
    });
});
