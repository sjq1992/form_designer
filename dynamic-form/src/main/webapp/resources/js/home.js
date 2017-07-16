var url_formlist = "http://localhost:2223/formlist";
var url_editform = "http://localhost:2223/editform";
var url_chartform = "http://localhost:2223/chartform";

$(document).ready(function() {
    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']);
    $('#table1').bootstrapTable({
        url:url_formlist,
        queryParams:{"user": document.getElementById("user").innerText},
        method: 'get',
        dataType:'json',
        columns: [
            {field: 'title', title: '表单名称',align: 'center', width:'100%'}
        ],
        onClickRow: function(row){
            var url= url_editform;
            url += "?title=" + row.title + "&" + "username=" + document.getElementById("user").innerText;
            window.location.href = url;
        }
    });

    $("#editform").click(function(){
        var url = url_editform;
        url += "?username=" + document.getElementById("user").innerText;
        window.location.href = url;
    });

    $("#chartform").click(function(){
        var url = url_chartform;
        url += "?username=" + document.getElementById("user").innerText;
        window.location.href = url;
    });

});
