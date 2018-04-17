/*幸运魔盘*/
$(function () {
    {
    //请求动画帧
        window.requestAnimFrame = (function () {
            return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
              window.setTimeout(callback, 20);
            };
        })();
        var totalDeg = 360 * 3 + 0; //总距离,两个部分，第一部分360*10为至少转多少圈，第二部分15是最终要停住的位置(单位都是度)
        var steps = []; //步值
        var totalDegArr =[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5];
       var totalWordArr =["西门子滚筒洗衣机","美宝莲绝色唇膏","偶尔卖萌几率翻倍","小米运动手环","HABA鲨烷精纯美容油","飞吻一枚再接再厉","Fila运动手表","换个姿势再抽一次"];
        // 奖品
        var w=0;//文字
        var count = 0;//和
        var now = 0;//当前
        var a = 0.02; //减速度
        var outter, inner, timer, running = false;
        var ran=0;//随机数
        function countSteps() {
            var t = Math.sqrt(2 * totalDeg / a); 
            var v = a * t;
            for (var i = 0; i < t; i++) {
                steps.push((2 * v * i - a * i * i) / 2);
            }
            steps.push(totalDeg);
    }
        function step() {
            outter.style.webkitTransform = 'rotate(' + steps[now++] + 'deg)';
            outter.style.MozTransform = 'rotate(' + steps[now++] + 'deg)';

            if (now < steps.length) {
                requestAnimFrame(step);
            } else {
                setTimeout(function () {
                    switch(ran){
                        case 0:
                            $('.winning_lose_layer p .win_tips').html(totalWordArr[0]);
                            $('.winning_lose_layer').eq(0).show();//中奖弹出层;
                            fnLayboxH($('.winning_lose_layer'),$('.actvie_alertbox_overlay'));
                            $(window).scrollTop(0);
                            break;
                        case 1:
                            $('.winning_lose_layer p .win_tips').html(totalWordArr[1]);
                            $('.winning_lose_layer').eq(0).show();//中奖弹出层;
                            fnLayboxH($('.winning_lose_layer'),$('.actvie_alertbox_overlay'));
                            $(window).scrollTop(0);
                            break;
                        case 2:
                            $('.winning_lose_layer').eq(3).show();//不中奖弹出层;
                            fnLayboxH($('.winning_lose_layer'),$('.actvie_alertbox_overlay'));
                            $(window).scrollTop(0);
                            $(".btn_lost").click(function(){
                                $('.winning_lose_layer').eq(3).hide();
                                $('body').height(bodyH);
                            });
                            break;
                        case 3:
                            $('.winning_lose_layer').eq(0).show();//中奖弹出层;
                            fnLayboxH($('.winning_lose_layer'),$('.actvie_alertbox_overlay'));
                            $(window).scrollTop(0);
                            break;
                        case 4:
                            $('.winning_lose_layer p .win_tips').html(totalWordArr[4]);
                            $('.winning_lose_layer').eq(0).show();//中奖弹出层;
                            fnLayboxH($('.winning_lose_layer'),$('.actvie_alertbox_overlay'));
                            $(window).scrollTop(0);
                            break;
                        case 5:
                            $('.winning_lose_layer').eq(2).show();//不中奖弹出层;
                            fnLayboxH($('.winning_lose_layer'),$('.actvie_alertbox_overlay'));
                            $(window).scrollTop(0);
                            $(".btn_lost").click(function(){
                                $('.winning_lose_layer').eq(2).hide();
                                $('body').height(bodyH);
                            });
                            break;
                        case 6:
                            $('.winning_lose_layer p .win_tips').html(totalWordArr[6]);
                            $('.winning_lose_layer').eq(0).show();//中奖弹出层;
                            fnLayboxH($('.winning_lose_layer'),$('.actvie_alertbox_overlay'));
                            $(window).scrollTop(0);
                            break;
                        case 7:
                            $('.winning_lose_layer').eq(1).show();//不中奖弹出层;
                            fnLayboxH($('.winning_lose_layer'),$('.actvie_alertbox_overlay'));
                            $(window).scrollTop(0);
                            $(".btn_lost").click(function(){
                                $('.winning_lose_layer').eq(1).hide();
                                $('body').height(bodyH);
                            });
                            break;
                        default:
                            alert('出错了');
                    }
                    running = false;
                }, 200);
            }
        }
        function start() {
            ran=parseInt(totalDegArr.length * Math.random());
           var deg =  totalDegArr[ran];
            running = true;
            clearInterval(timer);
            totalDeg = 360 * 5 + deg;
            steps = [];
            now = 0;
            countSteps();
            requestAnimFrame(step);
        }
        window.start = start;
        outter = document.getElementById('prize');
        inner = document.getElementById('point');
        i = 10;
        $("#point").click(function () {
            if (running) return;
            running = true;
            start();
            count++;
        });
    }
        if($('.myscroll ul').outerHeight() > 54) {
            $('.myscroll').css('height', '54px')
        } else {
            $('.myscroll').css('height', 'auto');
        }
        $('.myscroll').myScroll({
            speed: 80, //数值越大，速度越慢
            rowHeight: 18//li的高度
        });
        //显示积分明细
        $(".lucy_detail").find("a").first().click(function(){
            $("#integral_layer").show();
            fnLayboxH($('#integral_layer'),$('.integral_layer'));
            $(window).scrollTop(0);
        });
        $(".btn_integral").click(function(){
            $("#integral_layer").hide();
            $('body').height(bodyH);
        });
        //显示活动规则
        $(".lucy_detail").find("a").last().click(function(){
            $("#activity_rule").show();
            fnLayboxH($('#activity_rule'),$('.integral_layer'));
            $(window).scrollTop(0);
        });
        $(".btn_rule").click(function(){
            $("#activity_rule").hide();
            $(window).scrollTop(0);
        });
        //显示积分不足

        //计算弹层高度
        var bodyH = $('body').height();
        function fnLayboxH(obj,objM){
            var winH = $(document).height();
            var boxH = objM.height()+280;
            if(winH > boxH){
                $('.bg_body').height(winH);
                obj.height(winH);
            }else{
                $('.bg_body').height(boxH);
                obj.height(boxH);
            }
        }

});