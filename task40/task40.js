window.onload= function () {
    var year_sel = document.getElementsByClassName("year")[0];
    var month_sel = document.getElementsByClassName("month")[0];
    var date_wrap = document.getElementsByClassName("time_content")[0];
//创建年份函数
    function create_year(){
        for(var i = 1980; i<2051;i++){
            var opt = document.createElement("option");
            opt.value = i;
            opt.innerText = i;
            year_sel.appendChild(opt);
        }
    }
   //初始化为当前日期函数
    function now_time(){
        var date = new Date();
        var now_year = date.getFullYear();
        var now_date= date.getDate();
        var now_month = date.getMonth();
        year_sel.options[now_year-1980].selected = true;
        month_sel.options[now_month].selected =true;
        create_date(now_year,now_month,now_date);
    }
    //获取用户选择的年份函数
    function get_year(){
        return year_sel.value;
    }
    //获取用户选择的月份
    function get_month(){
        return month_sel.value;
    }
    //获取用户选择的年和月并绘制时间矩阵
    function draw_date(){
        var year = get_year();
        var month =get_month();
        while(date_wrap.hasChildNodes()){
            date_wrap.removeChild(date_wrap.firstChild);
        }
        var today = new Date();
        if(today.getFullYear() == parseInt(year) && today.getMonth() == parseInt(month)){
            create_date(year,month,today.getDate());
        }else
            create_date(year,month);
    }
    //取得某月的最后一天（28或29或30或31）
    function get_last_date(y,m){
        var new_year = y;
        var new_month = ++m;
        if(m == 12) {
            new_month -=12;
            new_year++;
        }
        var new_date = new Date(new_year,new_month,1);
        return (new Date(new_date.getTime()-1000*60*60*24)).getDate()-1;
    }
    //生成日期图示函数
    function create_date(year,month,date){
        var d = new Date(year,month,1);  //获取本月1日的Date对象
        var first_date = d.getDay();      //获得本月1日是周几
        var last_date = get_last_date(year,month);//获得本月的最后一天是几号

        //需计算出上个月的最后一天来填充本月第一天位置之前的位置
        var last_month = month-1;//获得上个月的月份，
        var new_year = year;  //为了计算上个月的最后一天而设置的变量
        if(last_month < 0){  //如果本月是1月份，则调整上个月是去年的12月份
            last_month = 11;
            new_year--;
        }
        var last_month_last_day = get_last_date(new_year,last_month); //上个月的最后一天；

        var now_month_index = 1;
        var last_month_index =last_month_last_day - first_date + 2 ;
        var next_month_index = 1;
        for(var i = 0;i<42;i++){
            var date_obj=document.createElement("div");
            if(i<first_date){
                date_obj.innerText = last_month_index++;
                date_obj.style.color = "#CCC"
            }else if(i>=first_date && i<= last_date+first_date){
                date_obj.innerText = now_month_index++;
                if(i == (date+first_date-1) ){
                    date_obj.style.backgroundColor="blue";
                    date_obj.style.color = "white";
                }
            }else {
                date_obj.innerText = next_month_index++;
                date_obj.style.color="#CCC";
            }
            date_obj.onclick = date_handle;
            date_wrap.appendChild(date_obj);
        }
    }
    //左箭头单击事件处理函数
    function left_arrow_handle(){
        if(parseInt(month_sel.value) == 0){
            if(parseInt(year_sel.value) > 1980){
                month_sel.selectedIndex = 11 ;
                year_sel.selectedIndex--;
            }
        }else {
            month_sel.selectedIndex --;
        }
        year_sel.onchange();  //注意，需要手动触发onchange事件，否则不行,ie 需要用firEvent
        month_sel.onchange();
    }
    //右箭头单击事件处理函数
    function right_arrow_handle(){
        if(parseInt(month_sel.value) == 11){
            if(parseInt(year_sel.value) < 2050){
                month_sel.selectedIndex = 0 ;
                year_sel.selectedIndex++;
            }
        }else {
            month_sel.selectedIndex++;
        }
        year_sel.onchange();
        month_sel.onchange();
    }
    //将每天的背景色去除
    function clear_bac(){
        var clear_obj = document.querySelectorAll(".time_content div");
        for(var i= 0 ;i<clear_obj.length;i++){
            clear_obj[i].style.backgroundColor = "white";
        }
        var today = new Date();
        if(parseInt(month_sel.value) == today.getMonth()){
            var d = new Date(today.getFullYear(),today.getMonth(),1);
            var index = d.getDay() + today.getDate()-1;
            clear_obj[index].style.backgroundColor = "blue";
        }
    }

    //日期单击事件处理程序，单击日期，则给input表单控件赋值
    function date_handle(event){
        var time_input = document.getElementsByClassName("time")[0];
        time_input.value = year_sel.value+'-'+(parseInt(month_sel.value)+1)+'-'+ event.target.innerText;
        clear_bac();
        event.target.style.backgroundColor = "lightBlue";


    }
    //input中的日期改变时，日历控件做相应的调整。
    function input_change_handle(){
        var time_value = document.getElementsByClassName("time")[0].value.split("-");
        year_sel.selectedIndex = parseInt(time_value[0])-1980;
        month_sel.selectedIndex = parseInt(time_value[1])-1;
        year_sel.onchange();
        month_sel.onchange();
        clear_bac();
        var all_date_obj = document.querySelectorAll(".time_content div");
        var current_month_first_Date = new Date(parseInt(time_value[0]),(parseInt(time_value[1])-1),1);
        var i = current_month_first_Date.getDay() + parseInt(time_value[2])-1;
        all_date_obj[i].style.backgroundColor = "lightBlue";
    }
    //input控件获取焦点时显示日历组件
    function show_date(){
        document.getElementsByClassName("time_wrap")[0].style.display="block";
    }
    function hide_date(){
        document.getElementsByClassName("time_wrap")[0].style.display="none";

    }
    //初始化函数
    function init(){
        create_year();
        now_time();
        year_sel.onchange=draw_date;
        month_sel.onchange=draw_date;
        document.getElementsByClassName("left_arrow")[0].onclick=left_arrow_handle;
        document.getElementsByClassName("right_arrow")[0].onclick=right_arrow_handle;
        document.getElementsByClassName("time")[0].onfocus = show_date;
        document.getElementsByClassName("time")[0].onchange = input_change_handle;
    }
    init();
}