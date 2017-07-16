<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>主页</title>
    <script src="/js/jquery211.min.js"></script>
    <script src="/js/bootstrap.js"></script>
    <script src="/js/bootstrap-table.js"></script>
    <script src="/js/bootstrap-table-zh-CN.js"></script>
    <script src="/js/home.js"></script>
    <link rel="stylesheet" href="/css/font-awesome.css">
    <link rel="stylesheet" href="/css/bootstrap.css">
    <link rel="stylesheet" href="/css/bootstrap-table.css">
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/table.css">
    <link rel="stylesheet" href="/css/tab.css">
    <link rel="stylesheet" href="/css/modal.css">
    <%
        String username = request.getParameter("username");
    %>
</head>
<body>
<div style="border-bottom: 1px solid #d0d0d0;height: 50px">
    <div class="height5"></div>
    <li class="dropdown mr2 mt1" style="float: right;">
        <a class="dropdown-toggle icon-user icon-2x" data-toggle="dropdown" style="color: black;text-decoration:none"></a>
        <ul class="dropdown-menu pull-right">
            <li style="border-bottom: 1px solid #e0e0e0"><a id="user"><%=username%></a></li>
            <li><a href="#">注销</a></li>
        </ul>
    </li>
</div>
<div style="clear: both"></div>
<div class="row">
    <div class="col-lg-2" style="border-right: solid 1px #d0d0d0;height: 600px;padding: 0">
        <div>
            <table id="table1"></table>
        </div>
    </div>
    <div class="col-lg-10">
        <div style="height: 60px"></div>
        <div id="editform" style="float:left; width:190px;height:210px;background-color: #f8faf9;border: 1px solid #e0e0e0;margin-left: 300px">
            <a class="btn btn-large" style="width: 100%;height: 100%">
                <div style="height: 20px"></div>
                <img src="/img/form.png" style="width: 40%;height: 40%">
                <div style="height: 20px"></div>
                <p style="color: black;font-size: 16px">数据报表</p>
            </a>
        </div>
        <div id="chartform" style="float:left; width:190px;height:210px;background-color: #f8faf9;border: 1px solid #e0e0e0;margin-left: 50px">
            <a class="btn btn-large" style="width: 100%;height: 100%; text-align: center" href="#">
                <div style="height: 20px"></div>
                <img src="/img/chart.png" style="width: 40%;height: 40%">
                <div style="height: 20px"></div>
                <p style="color: black;font-size: 16px">图表</p>
            </a>
        </div>
    </div>
</div>
</body>
</html>
</body>
</html>
