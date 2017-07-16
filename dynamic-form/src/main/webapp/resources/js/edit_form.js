var li_cnt = 0;
var span_cnt = 0;
var choose;
var cur_page;
var defaultName = {_text:"单行文本",_radio:"单选按钮",_select:"下拉框",_pic:"图片"};
var defaultOptions = ["选项1","选项2","选项3"];
var fields = [];
var param = {};
var url_create = "http://localhost:2223/createform";
var url_removetable = "http://localhost:2223/removeform";
var url_querytable = "http://localhost:2223/queryform";
var url_add = "http://localhost:2223/add";
var url_query = "http://localhost:2223/query";
var url_delete = "http://localhost:2223/remove";
var url_update = "http://localhost:2223/update";
var url_removefield = "http://localhost:2223/removefield";
var url_upload = "http://localhost:2223/uploadfile";

function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function guid() {
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

/*创建元素函数*/
function createBr(parent){
    var br = document.createElement("div");
    parent.appendChild(br);
}
function createRemove(parent){
    var remove = document.createElement("i");
    $(remove).addClass("remove");
    $(remove).addClass("icon-trash");
    $(remove).addClass("icon-2x");
    remove.addEventListener("click",function(event){
        var msg;
        var cur_li = $(this).parent();
        $.ajax({
            type:'post',
            url:url_removefield,
            data:{
                title:document.getElementById("form_title").value,
                user:document.getElementById("user").innerText,
                field:cur_li[0].getElementsByTagName("label")[0].innerText
            },
            async:false,
            success:function(response){
                msg = response.msg;
            },
            error:function(){alert("删除失败");},
        });
        if(msg == "success"){
            var next = cur_li.next();
            var prev = cur_li.prev();
            cur_li.remove();
            if(next[0] != null){
                next.addClass("selected");
                var _type = next[0].getAttribute("_type");
                if(_type == "_text"){text_attr();}
                else if(_type == "_radio"){radio_attr();}
                else if(_type == "_select"){select_attr();}
            }
            else if(prev[0] != null){
                prev.addClass("selected");
                var _type = prev[0].getAttribute("_type");
                if(_type == "_text"){text_attr();}
                else if(_type == "_radio"){radio_attr();}
                else if(_type == "_select"){select_attr();}
            }
            else{
                attr_display(null);
                $("#control").css("display","none");
            }

        }
        else{alert("删除失败");}
        event.stopPropagation();
    });
    parent.appendChild(remove);
}
function createText(parent){
    var element = document.createElement("input");
    $(element).addClass("text");
    parent.appendChild(element);
    parent.setAttribute("date","false");
}
function createSelect(parent,options){
    var select = document.createElement("select");
    for(var i = 0; i < options.length; i++){
        var value = options[i];
        select.options.add(new Option(value,value));
    }
    parent.appendChild(select);
}
function createRadio(parent,options,name){
    for(var i = 0; i < options.length; i++){
        var element  = document.createElement("input");
        element.setAttribute("type","radio");
        element.name = name;
        parent.appendChild(element);
        var span = document.createElement("span");
        span.innerText = options[i];
        parent.appendChild(span);
        createBr(parent);
    }
}
function createPic(parent){
    var span = document.createElement("span");
    $(span).addClass("btn btn-default fileinput-button");
    parent.appendChild(span);
    var span1 = document.createElement("span");
    span1.innerText = "上传图片";
    span.appendChild(span1);
    var input = document.createElement("input");
    input.setAttribute("type","file");
    span.appendChild(input);
}
function createLi(_type, name, existed,options, _id){
    var form_body = document.getElementById("form_body");
    var li = document.createElement("li");
    if(existed == "false"){
        _id = guid();
        li.setAttribute('_id',_id);
    }
    else{
        li.setAttribute('_id',_id);
    }
    li.setAttribute('_type',_type);
    li.setAttribute('existed',existed);
    $(li).addClass("form_item");
    $(".form_item").removeClass("selected");
    $(li).addClass("selected");
    form_body.appendChild(li);
    /*
    if(choose != null){
        $(choose).removeClass("choose");
    }
    choose = div;
    $(choose).addClass("choose");
    */
    var label = document.createElement('label');
    label.innerText = name;
    li.appendChild(label);
    createRemove(li);
    createBr(li);
    if(_type == "_text"){
        createText(li);
        text_attr();
        li.addEventListener("click",function(){
            $(".form_item").removeClass("selected");
            $(this).addClass("selected");
            text_attr();
        });
    }
    else if(_type == "_select"){
        createSelect(li,options);
        select_attr();
        li.addEventListener("click",function(){
            $(".form_item").removeClass("selected");
            $(this).addClass("selected");
            select_attr();
        });
    }
    else if(_type == "_radio"){
        createRadio(li,options,name);
        radio_attr();
        li.addEventListener("click",function(){
            $(".form_item").removeClass("selected");
            $(this).addClass("selected");
            radio_attr();
        });
    }
    else if(_type = "_pic"){
        createPic(li);
        pic_attr();
        li.addEventListener("click",function(){
            $(".form_item").removeClass("selected");
            $(this).addClass("selected");
            pic_attr();
        });
    }
}
/*元素属性编辑*/
function attr_display(_type){
    $("#control").css("display","block");
    if(_type == "_text"){$("#text_attr").css("display","block"); }
    else{$("#text_attr").css("display","none");}
    if(_type == "_radio"){$("#radio_attr").css("display","block"); }
    else{$("#radio_attr").css("display","none");}
    if(_type == "_selext"){$("#select_attr").css("display","block"); }
    else{$("#select_attr").css("display","none");}
    if(_type == "_pic"){$("#pic_attr").css("display","block"); }
    else{$("#pic_attr").css("display","none");}
}
function text_attr(){
    var cur_li = document.getElementsByClassName("selected")[0];
    if(cur_li != 0){
        attr_display("_text");
        var name = cur_li.getElementsByTagName("label")[0].innerText;
        document.getElementById("title").value = name;
        var date = cur_li.getAttribute("date");
        if(date == "false"){document.getElementById("inputtype")[0].selected = true;}
        else{document.getElementById("inputtype")[1].selected = true;}
    }
}
function radio_attr(){
    var cur_li = document.getElementsByClassName("selected")[0];
    if(cur_li != 0){
        attr_display("_radio")
        var radio_opts = document.getElementById("radio_opts");
        radio_opts.innerHTML = "";
        document.getElementById("title").value =  cur_li.getElementsByTagName("label")[0].innerText;
        var options = cur_li.getElementsByTagName("span");
        for(var i = 0; i < options.length; i++){
            var attr_option = document.createElement("input");
            attr_option.value = options[i].innerText;
            $(attr_option).bind('input propertychange', function(){
                var index = $("#radio_opts input").index(this);
                $(cur_li).find("span").eq(index)[0].innerText = this.value;
                $(cur_li).find("input").eq(index)[0].value = this.value;
            });
            radio_opts.appendChild(attr_option);
            var attr_remove = document.createElement('span');
            $(attr_remove).addClass("icon-remove-sign");
            $(attr_remove).addClass("icon-large");
            attr_remove.addEventListener("click",function () {
                var cur_li = document.getElementsByClassName("selected")[0];
                if(cur_li != null){
                    var index = $("#radio_opts span").index(this);
                    $(cur_li).find("span").eq(index).remove();
                    $(cur_li).find("input").eq(index).remove();
                    $("#radio_opts input").eq(index).remove();
                    $(this).remove();
                }
            });
            radio_opts.appendChild(attr_remove);
            createBr(radio_opts);
        }
    }
}
function select_attr(){
    var cur_li = document.getElementsByClassName("selected")[0];
    if(cur_li != 0){
        attr_display("_select");
        var select_opts = document.getElementById("select_opts");
        select_opts.innerHTML = "";
        document.getElementById("title").value =  cur_li.getElementsByTagName("label")[0].innerText;
        var options = cur_li.getElementsByTagName("select")[0].options;
        for(var i = 0; i < options.length; i++){
            var attr_option = document.createElement("input");
            attr_option.value = options[i].value;
            $(attr_option).bind('input propertychange', function(){
                var index = $("#select_opts input").index(this);
                options[index].value = options[index].text = this.value;
            });
            select_opts.appendChild(attr_option);
            var attr_remove = document.createElement('span');
            $(attr_remove).addClass("icon-remove-sign");
            $(attr_remove).addClass("icon-large");
            attr_remove.addEventListener("click",function () {
                var cur_li = document.getElementsByClassName("selected")[0];
                if(cur_li != null){
                    var index = $("#select_opts span").index(this);
                    var select = cur_li.getElementsByTagName("select")[0];
                    select.options.remove(index);
                    $("#select_opts input").eq(index).remove();
                    $(this).remove();
                }
            });
            select_opts.appendChild(attr_remove);
            createBr(select_opts);
        }
    }
}
function pic_attr(){
    var cur_li = document.getElementsByClassName("selected")[0];
    if(cur_li != 0) {
        attr_display(null);  //修改
        var name = cur_li.getElementsByTagName("label")[0].innerText;
        document.getElementById("title").value = name;
    }
}
function dateType(value) {
    var cur_li = document.getElementsByClassName("selected")[0];
    if(cur_li != null){
        var input = cur_li.getElementsByTagName("input")[0];
        var date = input.getAttribute("date");
        if(value == "text"){
            cur_li.setAttribute("date","false");
            $(input).datetimepicker("remove");
        }
        else{
            cur_li.setAttribute("date","true");
            $(input).datetimepicker({
                language:  'zh-CN',
                format: 'yyyy-mm-dd',
                autoclose: true,
                todayBtn: true,
                startView: 'month',
                minView:'month',
                maxView:'decade'
            });
        }
    }
}

function editModal(_name, fields, _type) {
    for(var i = 0; i < fields.length; i++){
        var modal = document.getElementById(_name+(i%2));
        var div = document.createElement("div");
        $(div).addClass("modal-item");
        modal.appendChild(div);
        var type = fields[i].type;
        var name = fields[i].name;
        var label = document.createElement("label");
        label.innerText = name;
        modal.appendChild(label);
        var br  = document.createElement("div");
        modal.appendChild(br);
        if(type == "_text"){
            var input = document.createElement("input");
            input.setAttribute("name",fields[i]._id);
            input.setAttribute("type","text");
            if(fields[i].date == "true"){
                $(input).datetimepicker({
                    language:  'zh-CN',
                    format: 'yyyy-mm-dd',
                    autoclose: true,
                    todayBtn: true,
                    startView: 'month',
                    minView:'month',
                    maxView:'decade'
                });
            }
            modal.appendChild(input);
        }
        else if(type == "_radio"){
            var opts = fields[i].opts;
            if(opts.length != 0){
                for(var j = 0; j < opts.length; j++){
                    var input = document.createElement("input");
                    input.setAttribute("type","radio");
                    input.setAttribute("name",fields[i]._id);
                    input.value = opts[j];
                    modal.appendChild(input);
                    var span = document.createElement("span");
                    span.innerHTML = opts[j];
                    modal.appendChild(span);
                    br = document.createElement("div");
                    modal.appendChild(br);
                }
            }
        }
        else if(type == "_select"){
            var opts = fields[i].opts;
            if(opts.length != 0){
                var select = document.createElement("select");
                select.setAttribute("name",fields[i]._id);
                for(var j = 0; j < opts.length; j++){
                    select.options.add(new Option(opts[j],opts[j]));
                }
                modal.appendChild(select);
            }
        }
        else if(type == "_pic"){
            var _id = fields[i]._id + _type;
            var span = document.createElement("span");
            $(span).addClass("btn btn-default fileinput-button");
            var span1 = document.createElement("span");
            span1.innerText = "上传图片";
            span.appendChild(span1);
            var input = document.createElement("input");
            input.setAttribute("name",fields[i]._id);
            input.setAttribute("id",_id);
            input.setAttribute("type","text");
            input.setAttribute("img","true");
            input.style.display = "none";
            modal.appendChild(input);
            var _input = document.createElement("input");
            _input.setAttribute("type","file");
            _input.setAttribute("_id",_id);
            span.appendChild(_input);
            modal.appendChild(span);
            var remove = document.createElement("span");
            remove.setAttribute("class","icon-trash icon-large");
            remove.setAttribute("_id",_id);
            remove.setAttribute("id","remove"+_id);
            remove.style.display = "none";
            modal.appendChild(remove);
            var img = document.createElement("img");
            img.setAttribute("alt","");
            img.setAttribute("id","img"+_id);
            img.style.display = "none";
            img.style.width = "80px";
            img.style.height = "80px";
            modal.appendChild(img);
            _input.addEventListener("change",function(){
                var _id = this.getAttribute("_id");
                var remove = document.getElementById("remove"+_id);
                remove.style.display = "inline";
                var base64 = null;
                var imgFile = new FileReader();
                imgFile.readAsDataURL(this.files[0]);
                imgFile.onload = function(e){
                    base64 = e.target.result;
                    var img = document.getElementById("img"+_id);
                    img.setAttribute("src",base64);
                    img.style.display = "block";
                    var input = document.getElementById(_id);
                    input.value = base64;
                };
            });
            remove.addEventListener("click",function(){
                var _id = this.getAttribute("_id");
                var input = document.getElementById(_id);
                input.value = "";
                var img = document.getElementById("img"+_id);
                img.setAttribute("src","");
                img.style.display = "none";
                this.style.display = "none";
            });
        }
    }
}
function editToolbar(fields){
    for(var i = 0; i < 6; i++){
        document.getElementById("toolbar"+i).innerHTML = "";
    }
    for(var i = 0; i < fields.length; i++){
        var index = i % 6;
        var div = document.getElementById("toolbar"+index);
        var label = document.createElement("label");
        label.innerHTML = fields[i].name;
        div.appendChild(label);
        createBr(div);
        var input = document.createElement("input");
        input.setAttribute("name",fields[i]._id);
        div.appendChild(input);
        createBr(div);
    }
}
function formatter(value, row, index) {
    return [
        '<a>查看</a>'
    ].join('');
}
window.operateEvents = {
    'click a': function (e, value, row, index) {
        var img = document.getElementById("img");
        img.setAttribute("src",value);
        $('#img_modal').modal();
    }
};
function inittable(table,fields) {
    var columns = [];
    columns[0] = {radio: true,field:"radio"};
    for(var i = 0; i < fields.length; i++){
        if(fields[i].type != "_pic"){
            var column = {};
            column['title'] = fields[i].name;
            column['field'] = fields[i]._id;
            column['align'] = 'center';
            columns[i+1] = column;
        }
        else{
            var column = {};
            column['field'] = fields[i]._id;
            column['title'] = fields[i].name;
            column['align'] = 'center';
            column['events'] = operateEvents;
            column['formatter'] = formatter;
            columns[i+1] = column;
        }
    }
    $(table).bootstrapTable({
        columns:columns,
        height:302
    });
}

function success(data){alert(JSON.stringify(data));}
function error(){
    alert("error");
}

function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("Text",ev.target.id);
}
function drop(ev) {
    ev.preventDefault();
    var _type = ev.dataTransfer.getData("Text");
    var form_body = document.getElementById("form_body");
    var _id;
    createLi(_type,defaultName[_type],"false",defaultOptions,_id);
}

$(document).ready(function() {
    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']);

    $.ajax({
        url:url_querytable,
        type:'get',
        dataType:'json',
        data:{
            title:document.getElementById("form_title").value,
            user:document.getElementById("user").innerText
        },
        success:function(response){
            var msg = response.msg;
            if(msg == "success"){
                var _fields = response.table.fields;
                for(var i = 0; i < _fields.length; i++){
                    var _type = _fields[i].type;
                    var name = _fields[i].name;
                    var opts = [];
                    var _id = _fields[i]._id;
                    if(_type != "_text"){
                        opts = _fields[i].opts;
                    }
                    createLi(_type,name,"true",opts,_id);
                }
            }
        }
    });

    $("#add_radio").click(function () {
        var cur_li = document.getElementsByClassName("selected")[0];
        if(cur_li != null){
            var option = document.createElement("input");
            option.value = "选项";
            $(option).bind('input propertychange', function(){
                var index = $("#radio_opts input").index(this);
                $(cur_li).find("span").eq(index)[0].innerText = this.value;
                $(cur_li).find("input").eq(index)[0].value = this.value;
            });
            var radio_opts = document.getElementById("radio_opts");
            radio_opts.appendChild(option);
            var attr_remove = document.createElement('span');
            $(attr_remove).addClass("icon-remove-sign");
            $(attr_remove).addClass("icon-large");
            attr_remove.addEventListener("click",function () {
                var cur_li = document.getElementsByClassName("selected")[0];
                if(cur_li != null){
                    var index = $("#radio_opts span").index(this);
                    $(cur_li).find("span").eq(index).remove();
                    $(cur_li).find("input").eq(index).remove();
                    $("#radio_opts input").eq(index).remove();
                    $(this).remove();
                }
            });
            radio_opts.appendChild(attr_remove);
            createBr(radio_opts);
            var element  = document.createElement("input");
            var name = document.getElementsByTagName("input")[0];
            element.setAttribute("type","radio");
            element.name = name;
            cur_li.appendChild(element);
            var span = document.createElement("span");
            span.innerText = "选项";
            cur_li.appendChild(span);
            createBr(cur_li);
        }
    });

    $("#add_select").click(function () {
        var cur_li = document.getElementsByClassName("selected")[0];
        if(cur_li != null){
            var option = document.createElement("input");
            option.value = "选项";
            $(option).bind('input propertychange', function(){
                var options = cur_li.getElementsByTagName("select")[0].options;
                var index = $("#select_opts input").index(this);
                options[index].value = options[index].text = this.value;
            });
            var select_opts = document.getElementById("select_opts");
            select_opts.appendChild(option);
            var select = cur_li.getElementsByTagName("select")[0];
            select.options.add(new Option("选项","选项"));
            var attr_remove = document.createElement('span');
            $(attr_remove).addClass("icon-remove-sign");
            $(attr_remove).addClass("icon-large");
            attr_remove.addEventListener("click",function () {
                var cur_li = document.getElementsByClassName("selected")[0];
                if(cur_li != null){
                    var index = $("#select_opts span").index(this);
                    var select = cur_li.getElementsByTagName("select")[0];
                    select.options.remove(index);
                    $("#select_opts input").eq(index).remove();
                    $(this).remove();
                }
            });
            select_opts.appendChild(attr_remove);
            createBr(select_opts);
        }
    });

    $('#title').bind('input propertychange', function(){
        var cur_li = document.getElementsByClassName("selected")[0];
        if(cur_li != null){
            var label = cur_li.getElementsByTagName('label')[0];
            label.innerText = this.value;
        }
    });

    $("#save").click(function () {
        var data = {};
        var fields = [];
        var form_body = document.getElementById("form_body");
        var divs = form_body.getElementsByClassName("form_item");
        for(var j = 0; j < divs.length; j++){
            var field = {};
            var div = divs[j];
            field["_id"] = div.getAttribute("_id");
            field["type"] = div.getAttribute("_type");
            field["existed"] = div.getAttribute("existed");
            field["name"] = div.getElementsByTagName("label")[0].innerText;
            if(field["type"] == "_text"){field["date"] = div.getAttribute("date");}
            else if(field["type"] == "_radio"){
                var opts = [];
                var spans = div.getElementsByTagName("span");
                for(var i = 0; i < spans.length; i++){opts[i] = spans[i].innerText;}
                field["opts"] = opts;
            }
            else if(field["type"] == "_select"){
                var select = div.getElementsByTagName("select")[0];
                var opts = [];
                for(var i = 0; i < select.options.length; i++){opts[i] = select.options[i].value;}
                field["opts"] = opts;
            }
            fields[j] = field;
        }
        data['fields'] = JSON.stringify(fields);
        data['title'] = document.getElementById("form_title").value;
        data['user'] = document.getElementById("user").innerText;
        $.ajax({
            type:'post',
            url:url_create,
            data:data,
            dataType:'json',
            success: function(response){
                var msg = response.msg;
                if(msg == "success"){
                    alert("操作成功");
                }
                if(msg == "existed"){
                    alert("表单已存在")
                }
            },
            error: function(){
                alert("异常出错")
            }
        })
    });

    $("#removeTable").click(function(){
        var data = {};
        data['title'] = document.getElementById("form_title").value;
        data['user'] = document.getElementById("user").innerText;
        $.ajax({
            type:'post',
            url:url_removetable,
            data:data,
            dataType:'json',
            success:function(){
                //修改
                var form_body = document.getElementById("form_body");
                form_body.innerHTML = "";
                attr_display(null);
                $("#control").css("display","none");
            }
        })

    });

    $("#tab2").click(function(){
        document.getElementById("page_panel").innerHTML = "";
        var data = {};
        data["user"] = document.getElementById("user").innerText;
        data["title"] = document.getElementById("form_title").value;
        $.ajax({
            type:'get',
            url:url_querytable,
            dataType:'json',
            data:data,
            success:function(response){
                var msg = response.msg;
                if(msg == "success"){
                    var _fields = response.table.fields;
                    var modal0 = document.getElementById("modal0");
                    modal0.innerHTML = "";
                    var modal1 = document.getElementById("modal1");
                    modal1.innerHTML = "";
                    var _modal0 = document.getElementById("_modal0");
                    _modal0.innerHTML = "";
                    var _modal1 = document.getElementById("_modal1");
                    _modal1.innerHTML = "";
                    editModal("modal",_fields,0);
                    editModal("_modal",_fields,1);
                    var panel = document.getElementById("table_panel");
                    panel.innerHTML = "";
                    var table = document.createElement("table");
                    table.id = "table1";
                    panel.appendChild(table);
                    inittable(table,_fields);
                    editToolbar(_fields);
                }
                else{alert("表单不存在")}
            }
        });
    });

    $("#btn_add").click(function () {
        document.getElementById("add_info").innerHTML = "";
        $('#add_modal').modal();
    });
    $("#add").click(function(){
        var data = {};
        data["user"] = document.getElementById("user").innerText;
        data["title"] = document.getElementById("form_title").value;
        var addform = document.getElementById("addform");
        var inputs = addform.getElementsByTagName("input");
        var selects = addform.getElementsByTagName("select");
        var items = {};
        var row_id = guid();
        items["_id"] = row_id;
        for(var i = 0; i < inputs.length; i++){
            if(inputs[i].type == "radio"){
                if(inputs[i].checked){
                    items[inputs[i].name] = inputs[i].value;
                }
            }
            else if(inputs[i].type == "text"){
                items[inputs[i].name] = inputs[i].value;
            }
        }
        for(var i = 0; i < selects.length; i++){
            var index = selects[i].selectedIndex;
            items[selects[i].name] = selects[i].options[index].value;
        }
        items = JSON.stringify(items);
        data["items"] = items;
        $.ajax({
            type:"post",
            dataType:"json",
            url:url_add,
            data:data,
            success:function(response){
                var msg = response.msg;
                if(msg == "success")
                {
                    document.getElementById("add_info").innerHTML = "操作成功";
                }
                else
                {
                    document.getElementById("add_info").innerHTML = "操作失败";
                }
            },
            error:function () {
                document.getElementById("add_info").innerHTML = "操作失败!";
            }
        });
    });

    $("#btn_search").click(function(){
        var inputs = document.getElementById("toolbar").getElementsByTagName("input");
        param = {};
        for(var i = 0; i < inputs.length; i++){
            if(inputs[i].value.length != 0){
                param[inputs[i].name] = inputs[i].value;
            }
        }
        var _param = JSON.stringify(param);
        var data = {};
        data["title"] = document.getElementById("form_title").value;
        data["user"] = document.getElementById("user").innerText;
        data["page"] = "1";
        data["param"] = _param;
        $.ajax({
            type:'get',
            url:url_query,
            data:data,
            dataType:'json',
            traditional: true,
            success:function(response){
                var rows = response.data;
                var total = response.total;
                cur_page = 1;
                $('#table1').bootstrapTable('load',rows);
                var page_panel = document.getElementById("page_panel");
                page_panel.innerHTML = "";
                var page = document.createElement("div");
                $(page).addClass('tcdPageCode');
                $(page).createPage({
                    pageCount:Math.ceil(total/10),
                    current:1,
                    backFn:function(p){
                        cur_page = p;
                        var _param = JSON.stringify(param);
                        var data = {};
                        data["title"] = document.getElementById("form_title").value;
                        data["user"] = document.getElementById("user").innerText;
                        data["page"] = p;
                        data["param"] = _param;
                        $.ajax({
                            type: 'get',
                            url: url_query,
                            data: data,
                            dataType: 'json',
                            success: function (response) {
                                var rows = response.data;
                                $('#table1').bootstrapTable('load', rows);
                            }
                        });
                    }
                });
                page_panel.appendChild(page);
            }
        })
    });

    $("#btn_remove").click(function () {
        var data = {};
        var _id = $("#table1").bootstrapTable('getSelections')[0]._id;
        data["_id"] = _id;
        data["title"] = document.getElementById("form_title").value;
        data["user"] = document.getElementById("user").innerText;
        $.ajax({
            type:"post",
            url:url_delete,
            dataType:"json",
            data:data,
            success:function(){
                var data = {};
                data["title"] = document.getElementById("form_title").value;
                data["user"] = document.getElementById("user").innerText;
                var _param = JSON.stringify(param);
                data["param"] = _param;
                data["page"] = cur_page;
                $.ajax({
                    type:'get',
                    url:url_query,
                    data:data,
                    dataType:'json',
                    traditional: true,
                    success:function(msg){
                        $('#table1').bootstrapTable('load',msg.data);
                    }
                })
            },
            error:function(){
                alert("删除失败");
            }
        });
    });

    $("#btn_mend").click(function(){
        var row = $("#table1").bootstrapTable('getSelections')[0];
        document.getElementById("mend_info").innerHTML = "";
        var mendform = document.getElementById("mendform");
        var inputs = mendform.getElementsByTagName("input");
        for(var i = 0; i < inputs.length; i++){
            var input = inputs[i];
            if(input.getAttribute("type") == "text"){
                if(row[input.name] != null){
                    input.value = row[input.name];
                }
            }
            else if(input.getAttribute("type") == "radio"){
                if(input.value == row[input.name]){
                    input.checked = true;
                }
            }
        }
        var selects = mendform.getElementsByTagName("select");
        for(var i = 0; i < selects.length; i++){
            var select = selects[i];
            $(select).val(row[select.name]);
        }
        $('#mend_modal').modal();
    })
    $("#mend").click(function(){
        var data = {};
        data["user"] = document.getElementById("user").innerText;
        data["title"] = document.getElementById("form_title").value;
        var mendform = document.getElementById("mendform");
        var inputs = mendform.getElementsByTagName("input");
        var selects = mendform.getElementsByTagName("select");
        var items = {};
        data["_id"] = $("#table1").bootstrapTable('getSelections')[0]._id;
        for(var i = 0; i < inputs.length; i++){
            if(inputs[i].type == "radio"){
                if(inputs[i].checked){
                    items[inputs[i].name] = inputs[i].value;
                }
            }
            else{
                items[inputs[i].name] = inputs[i].value;
            }
        }
        for(var i = 0; i < selects.length; i++){
            var index = selects[i].selectedIndex;
            items[selects[i].name] = selects[i].options[index].value;
        }
        items = JSON.stringify(items);
        data["items"] = items;
        $.ajax({
            type:"post",
            dataType:"json",
            url:url_update,
            data:data,
            success:function(response){
                var msg = response.msg;
                if(msg == "success")
                {
                    document.getElementById("mend_info").innerHTML = "操作成功";
                    var data = {};
                    data["title"] = document.getElementById("form_title").value;
                    data["user"] = document.getElementById("user").innerText;
                    var _param = JSON.stringify(param);
                    data["param"] = _param;
                    data["page"] = cur_page;
                    $.ajax({
                        type:'get',
                        url:url_query,
                        data:data,
                        dataType:'json',
                        traditional: true,
                        success:function(msg){
                            $('#table1').bootstrapTable('load',msg.data);
                        }
                    })
                }
                else
                {
                    document.getElementById("mend_info").innerHTML = "操作失败";
                }
            },
            error:function () {
                document.getElementById("mend_info").innerHTML = "操作失败!";
            }
        });
    })

});



