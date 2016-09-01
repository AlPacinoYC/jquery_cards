/**
 * Created by wxh on 2016/7/7.
 */

//防止iphone自带浏览器拖动bug
document.ontouchmove = function(e) {
    if (e.target.tagName.toUpperCase() !== 'IFRAME') {
        e.preventDefault();
    }
};
/*赋值删除功能 */
Zepto(".clear").live("touchstart",function(){
    $(".sort_list").slideDown();
    $(".input").val("");
    $(".input").trigger('change');
});


/*
 解决iscroll与lazyload冲突问题
 */
function doSomething(){
    $('.wrapper').trigger('scroll');//iscroller和loadlazy.js 图片缓冲完毕后不能及时刷新，加上这个模拟浏览器被滑动，那么图片就可以刷新了
}


/*
 iscroll调用
 */
         myScroll = new IScroll('.wrapper',{
            preventDefault:false
        });
        myScroll.on('scrollStart',function(){
            //开始滚动
            myScroll.options.preventDefault = true;
        });
        myScroll.on('scrollEnd',function(){
            //滚动结束
            myScroll.options.preventDefault = false;
        })

        myScroll.refresh();





//时间排序滚动iscroll
    var myScroll1 = new IScroll('.wrapper1',{
        preventDefault:false
    });

    myScroll1.on('scrollStart',function(){
        //开始滚动
        myScroll1.options.preventDefault = true;
    });
    myScroll1.on('scrollEnd',function(){
        doSomething()
        //滚动结束
        myScroll1.options.preventDefault = false;
    });
    myScroll1.refresh();

if(window.name == '' ){
    window.name = "1_0";
}


    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);


//滚动获取到滚动的距离
function updatePosition () {
    myScroll.refresh();
    myScroll1.refresh();
	myScroll.y = parseInt(myScroll.y);
    if(window.name.split("_")[0] == '1'){
        var numb = myScroll.y;

    }else{
        var numb = myScroll1.y;
    }
    //console.info(numb);
    window.name = window.name.split("_")[0]+"_"+numb;
    //console.log(window.name);
}
$(window).scroll(function(){
    updatePosition ();
    $('.filterinput').blur();
})

//懒加载图片
$(function() {
    $("img.lazy").lazyload({
        effect: "fadeIn",
        container: $(".wrapper")
    });
});
//2个.wrapper滚动需重新container下
$(function() {
    $("img.lazy").lazyload({
        // effect: "fadeIn",
        container: $(".wrapper1")
    });
});

//页面一加载跳转到显示的位置
$(function() {
    //console.log(1);
    myScroll.refresh();
    //切换显示与隐藏相对应的wrapper
    if( window.name.split("_")[0] == '1'){
        $('#form form').html('')

        filterList($("#form"), $("#list"));

        $('#initials').removeClass('dis_n');
        $('#list').removeClass('dis_n');
        $('#list2').addClass('dis_n');
        $('#contact_word').addClass('check');
        $('#contact_time').removeClass('check');
        $('.wrapper').show();
        $('.wrapper1').hide();

        //doSomething();
        $('.no_result').hide();
		
        myScroll.scrollTo(0, window.name.split("_")[1], 100, IScroll.utils.ease.elastic);
        //myScroll.refresh();
        //updatePosition();
    }else{

        //console.log(2)
        $('#form form').html('');

        filterList($("#form"), $("#list2"));

        $('#initials').addClass('dis_n');
        $('#list').addClass('dis_n');
        $('#list2').removeClass('dis_n');
        $('#contact_word').removeClass('check');
        $('#contact_time').addClass('check');
        $('.wrapper1').show();
        $('.wrapper').hide();

        //doSomething();
        $('.no_result').hide();
        myScroll1.scrollTo(0, window.name.split("_")[1],100, IScroll.utils.ease.elastic);
        myScroll1.refresh();
        updatePosition();
    }
});
$('.sort').on('touchstart',function(e){
    e.preventDefault();
    $(".no_result").css("display","none");
    $('ul li').css("height","auto");
    $(".sort_letter").css("display","block");
    if(event.target.id=="contact_word"){
        //点击字母排序与时间排序隐藏删除按钮
        $('.sort_list').children('a').css({
            right: '0%'
        });
        window.name = '1_'+window.name.split("_")[1];
        //console.log(2)
        $('#form form').html('')
        $(function() {
            filterList($("#form"), $("#list"));
        });
        $('#initials').removeClass('dis_n');
        $('#list').removeClass('dis_n');
        $('#list2').addClass('dis_n');
        $('#contact_word').addClass('check');
        $('#contact_time').removeClass('check');
        $('.wrapper').show();
        $('.wrapper1').hide();
        //myScroll.refresh();
        doSomething();
        $('.no_result').hide();
    }else if(event.target.id=="contact_time"){
        //点击字母排序与时间排序隐藏删除按钮
        $('.sort_list').children('a').css({
            right: '0%'
        });
        window.name = '2_'+window.name.split("_")[1];
        t=setTimeout(function(){$(window).trigger('resize')},100);
        //console.log(2)
        $('#form form').html('');
        $(function() {
            filterList($("#form"), $("#list2"));
        });
        $('#initials').addClass('dis_n');
        $('#list').addClass('dis_n');
        $('#list2').removeClass('dis_n');
        $('#contact_word').removeClass('check');
        $('#contact_time').addClass('check');
        $('.wrapper1').show();
        $('.wrapper').hide();
        myScroll1.refresh();
        doSomething();
        $('.no_result').hide();
    }else if(event.target.id=="card_group"){
        window.location.href = APP+"/card/group/toManageCardGroup.do";
    }
});
$('.sort_letter').prev('li').find('dd').css('box-shadow','0 0');
$('#list2 span').prev('li').find('dd').css('box-shadow','0 0');
//A,B,C排序功能
$(function(){

    var wrapper = parseInt($('.wrapper').css('height'));
    var srollHeight =  parseInt($('#scroller').css('height'));

    var Initials=$('#initials');
    var LetterBox=$('#letter');
    Initials.find('ul').append('<li>A</li><li>B</li><li>C</li><li>D</li><li>E</li><li>F</li><li>G</li><li>H</li><li>I</li><li>J</li><li>K</li><li>L</li><li>M</li><li>N</li><li>O</li><li>P</li><li>Q</li><li>R</li><li>S</li><li>T</li><li>U</li><li>V</li><li>W</li><li>X</li><li>Y</li><li>Z</li><li>#</li>');
    // initials();
	myScroll.on('scrollEnd', doSomething);
    myScroll.refresh();
    Initials.children().children().on("touchstart", function(e) {
        e.preventDefault();
        var touch = event.touches[0];
        var moveY = touch.pageY;
        //切换ABC排序功能删除按钮隐藏
        $('.sort_list').children('a').css({
            right: '0%'
        });
        $("#initials").find("li").each(function() {
            var code,top,found=false;
            var bet = Math.ceil($(this).offset().top)-moveY+15;
            if (-10<bet&10>bet) {
                LetterBox.text($(this).text());
                LetterBox.show();
                if(LetterBox.text()=="#"){
                    code="Z".charCodeAt()+1;
                }else {
                    code = LetterBox.text().charCodeAt();
                }
                //console.log("click"+LetterBox.text()+"---"+code);

                $('.letter').find(".sort_letter").each(function(){
                    if(found){
                        return;
                    }
                    var $this= $(this);
                    var $text = $this.text();
                    var wrapperHeight = $('.wrapper').css('top');
                    hgtNum = parseInt(wrapperHeight);
                    //console.log(hgg)
                    top = $this.offset().top;
                    if($text.charCodeAt() >= code){
                        if(top==0){
                            if(wrapper>srollHeight){
                                myScroll.destroy();

                                }else{
                                    myScroll.scrollBy(0, -top);
                                }
                            }else{
                                if(wrapper>srollHeight){
                                    myScroll.destroy();

                                }else{
                                    myScroll.scrollBy(0, -top+hgtNum);
                                }
                            }
                            //跳转到执行下懒加载触发函数
                            doSomething();
                            found = true;
                        }
                    });
                    if(!found){
                        if(top==0){
                            if(wrapper>srollHeight){
                                myScroll.destroy();

                            }else{
                                myScroll.scrollBy(0, -top);
                            }

                    }else{
                        if(wrapper>srollHeight){
                            myScroll.destroy();

                            }else{
                                myScroll.scrollBy(0, -top+hgtNum);
                            }
                        }
                        doSomething();
                        return;
                    }

            }


        });

    }).on("touchmove", function(e) {
        e.preventDefault();
        // console.log(moveY)
        var touch = event.touches[0];
        var moveY = touch.pageY;
        $("#initials").find("li").each(function() {
            var code,top,found=false;
            var bet = Math.ceil($(this).offset().top)-moveY+15;
            if (-10<bet&10>bet) {
                LetterBox.text($(this).text());
                LetterBox.show();
                if(LetterBox.text()=="#"){
                    code="Z".charCodeAt()+1;
                }else {
                    code = LetterBox.text().charCodeAt();
                }
                //  console.log("click"+LetterBox.text()+"---"+code);

                $('.letter').find(".sort_letter").each(function(){
                    if(found){
                        return;
                    }
                    var $this= $(this);
                    var $text = $this.text();
                    top = $this.offset().top;
                    var wrapperHeight = $('.wrapper').css('top');
                    hgtNum = parseInt(wrapperHeight);
                    //  console.log($text+"---"+$text.charCodeAt());

                        if($text.charCodeAt() >= code){
                            //解决顶部点击下去
                            if(top==0){
                                if(wrapper>srollHeight){
                                    myScroll.destroy();

                                }else{
                                    myScroll.scrollBy(0, -top);
                                }
                            }else{
                                if(wrapper>srollHeight){
                                    myScroll.destroy();

                                }else{
                                    myScroll.scrollBy(0, -top+hgtNum);
                                }
                            }
                            doSomething();
                            found = true;
                        }
                    });
                    if(!found){
                        console.log("end---"+top);
                        if(top==0){
                            if(wrapper>srollHeight){
                                myScroll.destroy();

                            }else{
                                myScroll.scrollBy(0, -top);
                            }
                        }else{
                            if(wrapper>srollHeight){
                                myScroll.destroy();
                            }else{
                                myScroll.scrollBy(0, -top+hgtNum);
                            }
                        }
                        doSomething();
                        return;
                    }

            }


        });

    }).on("touchend", function(e) {
        updatePosition();
        e.preventDefault();
        LetterBox.hide();
    });
    function do_adapt(){
        var windowHeight=$(window).height();
        var headerHeight = $('header').height();
        var sortHeight = $('.sort').height();
        var InitHeight=windowHeight-(headerHeight * 1.33)-(sortHeight * 1.38);
        Initials.height(InitHeight);
        var LiHeight=InitHeight/29;
        Initials.find('li').height(LiHeight);
    }

    do_adapt();
    window.onresize=function(){
        do_adapt();
    }


});
(function($) {
    // 定义伪类选择器。
    $.expr[":"].Contains = function(a, i, m) {
        return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };
    // filter_list() 函数返回包含所有得到支持的过滤器的一个数组。
    function filterList(header, list) {
        //@header 头部元素
        //@list 无需列表
        //创建一个搜素表单
        var form = $("<form>").attr({
            "class":"filterform",
            "action":"#"
        }), input = $("<input>").attr({
            "class":"filterinput input",
            "type":"text",
            "placeholder": "共有"+list.find('li').length+"张名片，输入关键字"
        }),a=$('<a></a>').attr("class","clear");
        $(form).append(input).appendTo(header);
        $(form).append(a).appendTo(header);
        $(input).change(function() {
            var filter = $(this).val().trim();
            if (filter) {
                if(typeof(t) == "undefined"){console.info("no t")}else{clearTimeout(t);}
                t=setTimeout(function(){
                    $(".clear").css('display',"block");
                    $matches = $(list).find("a:Contains(" + filter + ")").parent();
                    /*$(".new").stop(true,true).slideUp(1000,function(){$(window).trigger("resize")});
                     $("li", list).not($matches).slideUp(1000,function(){$(window).trigger("resize")});
                     $matches.stop(true,true).slideDown(1000,function(){$(window).trigger("resize")});
                     $(".sort_letter").stop(true,true).slideUp(1000,function(){$(window).trigger("resize")});*/
                    $("li", list).not($matches).css('height',"0");
                    $matches.css("height","auto");
                    $(".sort_letter").css("display","none");
                    $(window).trigger("resize");
                    if($("li", list).not($matches).length==$("li", list).length){
                        //时间排序显示位置bug
                        var listSpanHeight = $('#list2').height();
                        var sort = $('.sort').height();
                        $('.no_result').css("display","block");
                        $('.no_result').css('top',listSpanHeight+sort+10);
                    }else{
                        $(".no_result").css('display',"none");
                    }
                },250);
            } else {
                $(".clear").css('display',"none");
                /*$(".new").stop().slideDown();
                 $(list).find("li").stop().slideDown();
                 $(".sort_letter").stop().slideDown();
                 $(".no_result").css('display',"none");*/

                $(list).find("li").css("height","auto");
                $(".sort_letter").css("display","block");
                $(".no_result").css('display',"none");

            }

            myScroll.refresh();
            myScroll1.refresh();
            return false;
        }).keyup(function() {
            $(this).change();
        }).focus(function() {
            //搜索获得焦点删除按钮失去
            $('.sort_list').children('a').css({
                right: '0%'
            });
            if($(this).val()){
                $(".clear").css('display', "block");
            }
            $(".filterinput").css({
                "text-indent": "0%",
                "background-position": "2% center"
            })
        }).blur(function() {
            if($(this).val().trim()){
                return
            }else {
                $(".filterinput").css({
                    "text-indent": "25%",
                    "background-position": "25% center"
                });
                $(".clear").css('display', "none");
            }
        })

    }
    window['filterList']=filterList;
})(jQuery);

/*后台数据导入*/
// var p = [
//         {name:"kitty", age:12},
//         {name:"sonny", age:9},
//         {name:"jake", age:13},
//         {name:"fun", age:24}
//     ]
// /*添加标签*/
// var $dl = "<li>"
// $.each(p, function (key, value) {
//     $dl += "<span>" + key + "</span>" + "<dl>" + "<dt>" + "<img>" + "</dt>" + "<dd>" + "<h2>" + key + "</h2>"+ "<em>" + value + "</em>" + "</dd>" + "</dl>"
// })
// $dl += "</li>";
// $("#list").append($dl);


 /* 左滑出现删除*/
 $('.sort_list a').append("<strong>删除</strong>");
 var obj = $('.sort_list');
 var win = window;
 var del = obj.children().children('strong');
 var len = obj.length;
 var flag = 1;
 var startPosition, endPosition, deltaX, deltaY, moveLength;
 var left;
 $(function() {
     function prevent_default(e) {
         e.preventDefault();
     }
     function disable_scroll() {
         $(document).on('touchmove', prevent_default);
     }
     function enable_scroll() {
         $(document).unbind('touchmove', prevent_default)
     }
     var x;
     for (var i=0; i < len; i++) {
         obj.eq(i).on('touchstart', function(e) {
             key = true;
             $(this).css('left', '0') // close em all
             // $(this).find('strong').addClass('open')
             var touch = e.originalEvent.targetTouches[0];
             startX = touch.clientX;
             startY = touch.clientY;
             left = 0;
         })
             .on('touchmove', function(e) {
                 if(key){
                    if (flag == 0) {
                        obj.children('a').animate({right: 0}, 250)
                    };
                     $that = $(this);
                     var touch = e.originalEvent.targetTouches[0];
                     endX =  touch.clientX;
                     endY =  touch.clientY;
                     var XNum = (endX-startX)<0 ? startX-endX : endX-startX;
                     var YNum = (endY-startY)<0 ? startY-endY : endY-startY;
                     if(XNum >= YNum){//水平滑动
                         e.preventDefault();
                         var new_left;
                         if((endX-startX) <= -5){//从右往左
                             //$('strong').show();
                             new_left = '22%';
                             flag = 0;
                             $(this).find('a').animate({right: new_left}, 250)
                         }else if((endX-startX) >= 5){//从左往右
                             new_left = '0%';
                             //右滑直接隐藏
                             //$('strong').hide();
                             $(this).find('a').animate({right: new_left}, 250)
                         }else {
                             new_left = '0px'
                         }
                     }
                 }
                 key = false;//这个就是为了执行一次。
             })

     }
     $('.wrap-contact').on('click', 'strong', function(e) {
         e.preventDefault();
         myScroll.options.preventDefault=false;
         myScroll1.options.preventDefault=false;
         flag = 1;
         var r = confirm('你确定要删除该名片吗？');
         if(r==true){
            $(this).parents('li').slideUp('fast', function() {
             $(this).remove();
             myScroll.refresh();
             myScroll1.refresh();
             doSomething();
            })
         }else{
            $that.find('a').animate({right: 0}, 250)
         }
         
     })

 });