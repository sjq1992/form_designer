var defaultName = {_bar:"柱状图",_radar:"雷达图",_line:"折线图",_board:"仪表盘"};
var defaultOptions = ["选项1","选项2","选项3"];

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
        event.stopPropagation();
    });
    parent.appendChild(remove);
}
function createBar(parent){
    var div = document.createElement("div");
    div.setAttribute("class","chart");
    div.style.width = "250px";
    div.style.height = "250px";
    var entity = echarts.init(div);
    var option = {
        title: {
            text: '柱状图'
        },
        tooltip: {},
        legend: {
            data:['数值']
        },
        xAxis: {
            data: ["值1","值2","值4"]
        },
        yAxis: {},
        series: [{
            name: '数值',
            type: 'bar',
            data: [20, 20,30]
        }]
    };
    entity.setOption(option);
    parent.appendChild(div);
}
function createLine(parent){
    var div = document.createElement("div");
    div.setAttribute("class","chart");
    div.style.width = "250px";
    div.style.height = "250px";
    var entity = echarts.init(div);
    var option = {
        title: {
            text: '折线图'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['属性1','属性2']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1','2','3','4','5','6','7']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'属性1',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'属性2',
                type:'line',
                stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310]
            }
        ]
    };


    entity.setOption(option);
    parent.appendChild(div);
}
function createBoard(parent){
    var div = document.createElement("div");
    div.setAttribute("class","chart");
    div.style.width = "250px";
    div.style.height = "250px";
    var entity = echarts.init(div);
    var option = {
        title: {
            text: '仪表盘'
        },
        tooltip : {
            formatter: "{a} <br/>{b} : {c}"
        },
        series: [
            {
                name: '数据',
                type: 'gauge',
                detail: {formatter:'{value}'},
                data: [{value: 50}]
            }
        ]
    };
    entity.setOption(option);
    parent.appendChild(div);
}
function createRadar(parent) {
    var div = document.createElement("div");
    div.setAttribute("class","chart");
    div.style.width = "250px";
    div.style.height = "250px";
    var entity = echarts.init(div);
    var option = {
        backgroundColor: '#ffffff',

        title: {
            text: '雷达图',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#222'
            }
        },

        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series : [
            {
                name:'data',
                type:'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data:[
                    {value:335, name:'属性1'},
                    {value:310, name:'属性2'},
                    {value:274, name:'属性3'},
                    {value:400, name:'属性4'}
                ].sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                    normal: {
                        textStyle: {
                            color: '#222'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: '#222'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };
    entity.setOption(option);
    parent.appendChild(div);
}
function createLi(_type, name, existed,options, _id){
    var form_body = document.getElementById("form_body");
    var li = document.createElement("li");
    li.setAttribute("_name",name);
    /*
    if(existed == "false"){
        _id = guid();
        li.setAttribute('_id',_id);
    }
    else{
        li.setAttribute('_id',_id);
    }
    */
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
    createRemove(li);
    createBr(li);
    if(_type == "_bar"){
        createBar(li);
        li.addEventListener("click",function(){
            $(".form_item").removeClass("selected");
            $(this).addClass("selected");
            attr();
        });
    }
    else if(_type == "_line"){
        createLine(li);
        li.addEventListener("click",function(){
            $(".form_item").removeClass("selected");
            $(this).addClass("selected");
            attr();
        });
    }
    else if(_type == "_board"){
        createBoard(li);
        li.addEventListener("click",function(){
            $(".form_item").removeClass("selected");
            $(this).addClass("selected");
            attr();
        });
    }
    else if(_type = "_radar"){
        createRadar(li);
        li.addEventListener("click",function(){
            $(".form_item").removeClass("selected");
            $(this).addClass("selected");
            attr();
        });
    }
    attr();
}
/*元素属性编辑*/
function attr() {
    var cur_li = document.getElementsByClassName("selected")[0];
    if(cur_li != null){
        var _name = cur_li.getAttribute("_name");
        document.getElementById("title").value = _name;
    }
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
    $('#title').bind('input propertychange', function(){
        var cur_li = document.getElementsByClassName("selected")[0];
        if(cur_li != null){
            var option = {
                title: {
                    text: this.value
                }
            };
            var chart = cur_li.querySelectorAll(".chart")[0];
            var entity = echarts.init(chart);
            entity.setOption(option);
        }
    });
});



