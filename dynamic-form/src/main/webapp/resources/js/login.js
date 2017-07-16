/**
 * Created by sjq on 2017/6/27.
 */
var url_login = "http://localhost:2223/login";
var url_register = "http://localhost:2223/register";
var url_to = "http://localhost:2223/home";

$(document).ready(function() {
    $(".tab-a").click(function(){
        var info = document.getElementById("info");
        info.innerText = "";
    });

    $("#login-btn").click(function () {
        if($("#l-username").val().length == 0){
            var info = document.getElementById("info");
            info.innerText = "用户名不能为空";
            return;
        }
        if($("#l-password").val().length == 0){
            var info = document.getElementById("info");
            info.innerText = "密码不能为空";
            return;
        }
        var data = {};
        data["username"] = $("#l-username").val();
        data["password"] = $("#l-password").val();
        $.ajax({
            type:'post',
            url:url_login,
            data:data,
            dataType:'json',
            success:function (msg) {
                if(msg.status == "1"){
                    var info = document.getElementById("info");
                    info.innerText = "用户名或密码错误"
                }
                else{
                    url_to += "?username=" + $("#l-username").val();
                    window.location.href = url_to;
                }
            }
        })
    })

    $("#register-btn").click(function () {
        if($("#r-username").val().length == 0){
            var info = document.getElementById("info");
            info.innerText = "用户名不能为空";
            return;
        }
        if($("#r-password").val().length == 0){
            var info = document.getElementById("info");
            info.innerText = "密码不能为空";
            return;
        }
        var info = document.getElementById("info");
        var password = $("#r-password").val();
        var confirm = $("#confirm").val();
        if(password != confirm){
            info.innerText = "密码输入不一致"
        }
        else{
            var data = {};
            data["username"] = $("#r-username").val();
            data["password"] = $("#r-password").val();
            $.ajax({
                type:'post',
                url:url_register,
                data:data,
                dataType:'json',
                success:function (msg) {
                    if(msg.status == 0){
                        info.innerText = "注册成功";
                    }
                    else if(msg.status == 1){
                        info.innerText = "用户名已存在";
                    }
                },
                error:function () {
                    info.innerText = "网络异常";
                }
            })
        }
    })
});
