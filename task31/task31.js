window.onload= function () {
    //定义大学的名称
    var stu_school = {
        北京:["北京大学","清华大学","北京师范大学","北京交通大学","北京邮电大学","中国人民大学","北京理工大学","首都师范大学"],
        上海:["复旦大学","同济大学","上海交通大学","华东师范大学","上海理工大学","上海财经大学","上海海洋大学","东华大学","上海大学"],
        广州:["中山大学","华南理工大学","暨南大学","广东财经大学","广州外语外贸大学","广州航海学院","广州美术学院","广州体育学院"],
        杭州:["浙江大学","杭州电子科技大学","浙江工业大学","浙江理工大学","浙江中医学院","杭州师范大学","浙江传媒学院","浙江财经学院","中国计量学院"],
        香港:["香港中文大学","香港科技大学","香港大学","岭南大学","香港侵会大学","香港理工大学","香港城市大学"]
    }
    var status = 0; //用于标识是否是第一次填充选择框
    //绘制选择表单
    function drawn_select(city_name){
        var city_sel = document.getElementsByClassName("city")[0];
        var school_sel = document.getElementsByClassName("school")[0];
        if(status == 0) {   //当为0时说明没有填充过城市选择框，当为1时，说明是在根据城市名重置学校名，则不执行填充城市名选择框
            status = 1;
            for (var key in stu_school) {
                var option_city = document.createElement('option');
                option_city.value = key;
                option_city.innerText = key;
                city_sel.appendChild(option_city);
            }
        }
        for(var index in stu_school[city_name]){
            var option_school = document.createElement('option');
            option_school.value = stu_school[city_name][index];
            option_school.innerText =stu_school[city_name][index] ;
            school_sel.appendChild(option_school);
        }
    }
    //单选按钮选中事件处理程序
    function radio_select(event){
        var stu_wrap_obj = document.getElementsByClassName("stu_wrap")[0];
        var no_stu_wrap_obj = document.getElementsByClassName("no_stu_wrap")[0];
        if(event.target.className == "stu"){
            no_stu_wrap_obj.style.display = "none";
            stu_wrap_obj.style.display = "block";
            var city_sel = document.getElementsByClassName("city")[0];
            city_sel.selectedIndex = 0;
            var school_sel = document.getElementsByClassName("school")[0];
            while (school_sel.hasChildNodes()){
                school_sel.removeChild(school_sel.firstChild);
            }
            drawn_select("北京");
        }else if(event.target.className == "no_stu"){
            stu_wrap_obj.style.display = "none";
            no_stu_wrap_obj.style.display = "block";
        }
    }
    //城市选择框改变事件处理程序（让学校选择框的内容改变）
    function city_change_handle(event){
        var city_name = event.target.options[event.target.selectedIndex].value;
        var school_sel = document.getElementsByClassName("school")[0];
        while (school_sel.hasChildNodes()){
            school_sel.removeChild(school_sel.firstChild);
        }
        drawn_select(city_name);

    }
    //初始化工作
    function  init(){
        var stu_radio = document.getElementsByClassName("stu")[0];
        var no_stu_radio = document.getElementsByClassName("no_stu")[0];
        stu_radio.onclick = no_stu_radio.onclick = radio_select;
        var city_sel = document.getElementsByClassName("city")[0];
        city_sel.onchange = city_change_handle;
    }
    init();
}