<%--
  Created by IntelliJ IDEA.
  User: sjq
  Date: 2017/7/12
  Time: 22:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script src="/js/jquery211.min.js"></script>
    <script src="/js/bootstrap.js"></script>
    <link rel="stylesheet" href="/css/bootstrap.css">
    <style>
        .fileinput-button {
            position: relative;
            display: inline-block;
            overflow: hidden;
        }

        .fileinput-button input{
            position:absolute;
            right: 0px;
            top:0px;
            opacity: 0;
            -ms-filter: 'alpha(opacity=0)';
            font-size: 200px;
        }
    </style>
    <script>
        function uploadFile() {

            $('#upload_form').submit(function(){
                $(this).ajaxSubmit({
                    type:"post",
                    url:"http://localhost:2223/uploadfile",
                    dataType:"json",
                    success:function (response) {
                        alert(JSON.stringify(response));
                    }
                });
                return false;
            });
        }
    </script>
</head>
<body style="margin: 30px">
<form action="http://localhost:2223/uploadfile" method="post" enctype="multipart/form-data">
     <span class="btn btn-default fileinput-button">
         <span>上传图片</span>
         <input name="image" type="file" onchange="submit()">
     </span>
    
     <img src="/img/2.jpg">
</form>
</body>
</html>
