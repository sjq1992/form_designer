<%--
  Created by IntelliJ IDEA.
  User: sjq
  Date: 2017/6/27
  Time: 11:47
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>注册登录</title>
    <script src="/js/jquery211.min.js"></script>
    <script type="text/javascript" src="/js/bootstrap.js"></script>
    <script src="/js/login.js"></script>
    <link rel="stylesheet" href="/css/bootstrap.css">
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/tab.css">
    <link rel="stylesheet" href="/css/login.css">
</head>
<body style="background-color: #f0f0f0; text-align:center">
<div style="height: 120px"></div>
<div style="margin:0 auto;width: 400px;height: 350px;background-color: white">
    <div style="height: 47px;border-bottom: 1px solid #d0d0d0;">
        <ul class="nav nav-tabs mt1" style="margin-left: 100px">
            <li class="active">
                <a class="tab-a" href="#login" data-toggle="tab">用户登录</a>
            </li>
            <li>
                <a class="tab-a" id="tab2" href="#register" data-toggle="tab">用户注册</a>
            </li>
        </ul>
    </div>
    <div class="tab-content">
        <div class="tab-pane active" id="login">
            <div style="height: 30px"></div>
            <div style="margin-bottom: 15px">
                <input id="l-username"class="login-input pl1" placeholder="用户名">
            </div>
            <div style="margin-bottom: 20px">
                <input id="l-password"class="login-input pl1" type="password" placeholder="密码">
            </div>
            <div>
                <button id="login-btn" type="submit" class="login-btn btn">登陆</button>
            </div>
        </div>
        <div class="tab-pane" id="register">
            <div style="height: 30px"></div>
            <div style="margin-bottom: 15px">
                <input id="r-username" class="login-input pl1" placeholder="用户名">
            </div>
            <div style="margin-bottom: 15px">
                <input id="r-password" class="login-input pl1" type="password" placeholder="密码">
            </div>
            <div style="margin-bottom: 20px">
                <input id="confirm" class="login-input pl1" type="password" placeholder="确认密码">
            </div>
            <div>
                <button id="register-btn" class="login-btn btn">注册</button>
            </div>
        </div>
        <div class="mt1">
            <p id="info" style="color: red;"></p>
        </div>
    </div>

</div>

</body>
</html>
