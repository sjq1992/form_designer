<%--
  Created by IntelliJ IDEA.
  User: sjq
  Date: 2017/7/16
  Time: 17:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>编辑图表</title>
    <script src="/js/jquery211.min.js"></script>
    <script src="/js/bootstrap.js"></script>
    <script src="/js/echarts.min.js"></script>
    <script src="/js/charts.js" charset="UTF-8"></script>
    <link rel="stylesheet" href="/css/bootstrap.css">
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/edit_form.css">
    <link rel="stylesheet" href="/css/tab.css">
    <link rel="stylesheet" href="/css/font-awesome.css">
    <%
        String username = request.getParameter("username");
        String title = request.getParameter("title");
        if(title == null){
            title = "";
        }
    %>
</head>

<div class="modal fade" id="add_modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content"  style="width: 700px;">
            <div class="modal-header">
                <h4 class="modal-title">添加信息</h4>
            </div>
            <div id="add_form">
                <div class="modal-body" style="height:400px;padding-top:5px;padding-bottom:5px;overflow-y:scroll;overflow-x:hidden;">
                    <div id="addform">
                        <div class="row" style="width: 700px;position: relative;top:5px">
                            <div id="modal0" class="col-lg-6 col-md-6 col-sm-6 col-xs-6 modal_body">
                            </div>
                            <div id="modal1" class="col-lg-6 col-md-6 col-sm-6 col-xs-6 modal_body">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="padding-top:5px;padding-bottom: 5px;margin-top: 5px">
                    <p style="float: left;color:red" id="add_info"></p>
                    <button id = "cancel" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button id="add" class="btn" style="background-color: #0DB3A6;color: white">提交</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="mend_modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content"  style="width: 700px;">
            <div class="modal-header">
                <h4 class="modal-title">添加信息</h4>
            </div>
            <div>
                <div class="modal-body" style="height:400px;padding-top:5px;padding-bottom:5px;overflow-y:scroll;overflow-x:hidden;">
                    <div id="mendform">
                        <div class="row" style="width: 700px;position: relative;top:5px">
                            <div id="_modal0" class="col-lg-6 col-md-6 col-sm-6 col-xs-6 modal_body">
                            </div>
                            <div id="_modal1" class="col-lg-6 col-md-6 col-sm-6 col-xs-6 modal_body">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="padding-top:5px;padding-bottom: 5px;margin-top: 5px">
                    <p style="float: left;color:red" id="mend_info"></p>
                    <button class="btn btn-default" data-dismiss="modal">取消</button>
                    <button id="mend" class="btn" style="background-color: #0DB3A6;color: white">提交</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="img_modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content"  style="width: 700px;">
            <div class="modal-header">
                <h4 class="modal-title">显示图片</h4>
            </div>
            <div>
                <div class="modal-body" style="height:400px;padding-top:5px;padding-bottom:5px;overflow-y:scroll;overflow-x:hidden;">
                    <div style="text-align:center">
                        <img id="img" style="width: 350px;height: 350px">
                    </div>
                </div>
                <div class="modal-footer" style="padding-top:5px;padding-bottom: 5px;margin-top: 5px">
                    <button class="btn btn-default" data-dismiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>
</div>
<body>
<div>
    <div class="height5"></div>
    <label class="mt1 ml2 mr1" style="font-size: 16px">图表名称</label>
    <input id="form_title" class="form_head mt1" style="font-size: 16px">
    <li class="dropdown mr2 mt1" style="float: right">
        <a class="dropdown-toggle icon-user icon-2x" data-toggle="dropdown" style="color: black;text-decoration:none"></a>
        <ul class="dropdown-menu pull-right">
            <li style="border-bottom: 1px solid #e0e0e0"><a id="user"><%=username%></a></li>
            <li><a href="#">注销</a></li>
        </ul>
    </li>
</div>
<div style="clear: both"></div>
<div class="mt1" style="background-color: #f1f1f1;height: 45px">
    <ul class="nav nav-tabs" style="width:300px; margin:0 auto;">
        <li class="active">
            <a id="tab1" href="#design" data-toggle="tab">创建图表</a>
        </li>
    </ul>
</div>
<div style="clear: both"></div>
<div class="tab-content" style="width: 1350px">
    <div class="tab-pane active" id="design">
        <div class="row">
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2" style="border-right: 2px solid #a0a0a0;height: 500px;margin-left: 10px">
                <label class="pt1" style="font-size: 16px;font-weight: 600">基础字段</label>
                <div class="row">
                    <div class="col-md-6" style="padding-right: 3px">
                        <div id="_bar" class="item" style="vertical-align:middle;" draggable="true" ondragstart="drag(event)">
                            <span>柱状图</span>
                        </div>
                        <div style="clear: both;height: 10px"></div>
                        <div id="_radar" class="item" style="vertical-align:middle;" draggable="true" ondragstart="drag(event)">
                            <span>雷达图</span>
                        </div>
                    </div>
                    <div class="col-md-6" style="padding-left: 3px">
                        <div id="_line" class="item" style="vertical-align:middle;" draggable="true" ondragstart="drag(event)">
                            <span>折线图</span>
                        </div>
                        <div style="clear: both;height: 10px"></div>
                        <div id="_board" class="item" style="vertical-align:middle;" draggable="true" ondragstart="drag(event)">
                            <span>仪表盘</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-7 col-md-7 col-sm-7 col-xs-7 ml2" style="border-right:2px solid #a0a0a0;height:500px;padding: 0">
                <div class="pl2" style="height: 40px;border-bottom: 1px solid #d0d0d0;margin-top: 5px">
                    <button id="save" class="btn btn-success" style="float: left">保存</button>
                    <button id="removeTable" class="btn btn-danger" style="float: left;position: relative;left:10px">删除</button>
                </div>
                <div style="clear: both"></div>
                <ul id="form_body" ondrop="drop(event)" ondragover="allowDrop(event)" style="height:450px;overflow:scroll;padding-left: 0">
                </ul>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"  style="width:335px;height:500px;background-color: #FAFAFA">
                <div style="border-bottom: solid 1px #E0E0E0">
                    <ul class="nav nav-tabs" style="width:200px; margin:0 auto;">
                        <li class="active">
                            <a href="#control" style="font-size: 15px;line-height: 0.9" data-toggle="tab">控件属性</a>
                        </li>
                    </ul>
                </div>

                <div class="tab-pane active mt1" id="control" style="margin-bottom: 10px;">
                    <label style="font-size: 15px">标题</label><br>
                    <input id="title" style="width: 225px">
                    <div style="height: 5px"></div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>


</body>
</html>
