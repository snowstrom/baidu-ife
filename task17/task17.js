/*
实现了全部的功能!!!
 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = [];
var width_num=10;
var margin_num =0;

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}
//定义一个颜色数组，用于在绘制图表时给每一个柱状图上色
var color_arr = ["red","yellow","blue","green","black","brown","pink"];
/**
 * 渲染图表
 */
function renderChart() {
    var obj = document.getElementsByClassName("aqi_chart_wrap")[0];
    obj.style.position="relative";
    obj.style.top="500px";
    for(var i = 0;i<chartData.length;i++){
        var column = document.createElement("div");
        column.style.width =width_num+"px";
        column.style.marginLeft=margin_num +"px";
        column.style.height =chartData[i][1]+"px";
        column.style.backgroundColor = color_arr[Math.floor(Math.random()*7)];
        column.style.position="absolute";
        column.style.left=i*width_num+"px";
        column.style.bottom="0px";
        column.title=chartData[i][0];
        obj.appendChild(column);
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化
    // 设置对应数据
    // 调用图表渲染函数
    chartData.splice(0,chartData.length); //注意要先清除原来的数据，再push！！！

    switch (pageState.nowGraTime){
        case "day":{
            width_num = 10;
            margin_num =0;
            for(var key in aqiSourceData[pageState.nowSelectCity]){
                chartData.push([key,aqiSourceData[pageState.nowSelectCity][key]]);
            }
        }
            break;
        case "week":{
            width_num = 20;
            margin_num =100;
            var temp = [];  //临时数组，用于存放一个城市的所有空气质量数据
            var week_index = 1;  //某一周的索引号
            var sum = 0;
            for(var key in aqiSourceData[pageState.nowSelectCity]){
                temp.push(aqiSourceData[pageState.nowSelectCity][key]);
            }
            sum = sum + temp[0] + temp[1] + temp[2];  //2016-01-01 是周五，所以第一周只有三天。
            chartData.push(["第"+week_index+"周",Math.floor(sum/7)]); //我们将平均值取整数。因为不存在小数个像素！！！
            sum = 0;
            week_index++;
            var flag = 0; //用于判断最后一周的天数
            for(var i = 3 ; i < temp.length;i++){
                if((i-2)%7 !=0){
                    sum += temp[i];
                    flag++;
                }
                else {
                    sum += temp[i];
                    flag++;
                    chartData.push(["第"+week_index+"周",Math.floor(sum/flag)]);
                    sum = 0;
                    week_index++;
                    flag = 0;
                }
            }
            chartData.push(["第"+week_index+"周",Math.floor(sum/flag)]);
        }
            break;
        case "month":{
            width_num=40;
            margin_num=200;
            var temp = [];  //临时数组，用于存放一个城市的所有空气质量数据
            var sum = 0;
            for(var key in aqiSourceData[pageState.nowSelectCity]){
                temp.push(aqiSourceData[pageState.nowSelectCity][key]);
            }
            for(var i=0;i<31 ;i++){
                sum += temp[i];
            }
            chartData.push(["一月份",Math.floor(sum/31)]); //我们将平均值取整数。因为不存在小数个像素！！！
            sum = 0;

            for(var i=31;i< 60 ;i++){
                sum += temp[i];
            }
            chartData.push(["二月份",Math.floor(sum/29)]); //我们将平均值取整数。因为不存在小数个像素！！！
            sum = 0;
            for(var i=60;i< 91 ;i++){
                sum += temp[i];
            }
            chartData.push(["三月份",Math.floor(sum/31)]); //我们将平均值取整数。因为不存在小数个像素！！！
        }
            break;
        default:break;
    }
    var obj = document.getElementsByClassName("aqi_chart_wrap")[0];
    obj.innerHTML="";   //先清除以前的数据！！！
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    // 设置对应数据
    // 调用图表渲染函数
    chartData.splice(0,chartData.length); //注意要先清除原来的数据，再push！！！
    graTimeChange();

}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var radio_obj = document.getElementsByName("gra_time");
    for(var i = 0; i<radio_obj.length;i++){
        radio_obj[i].addEventListener("click", function (event) {
            if(event.target.checked && event.target.value !== pageState.nowGraTime){
                pageState.nowGraTime = event.target.value;
                graTimeChange();
            }
        })
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项,暂时先不考虑,在html文件中设置好了
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    for( var j in aqiSourceData)
    var select_obj = document.getElementById("city_select");
    select_obj.addEventListener("change", function (event) {
        var city_name= select_obj.options[select_obj.selectedIndex].value;
        pageState.nowSelectCity = city_name;
        citySelectChange();

    })

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    //默认 城市为北京，显示格式为以日为单位显示，将北京的所有数据以日为单位存入chartDate数组中。
    //chartDate是数组的数组，每个项为[日期，数据]，日期为字符串，数据为整数
    pageState.nowGraTime = "day";
    pageState.nowSelectCity="北京";
    for(var key in aqiSourceData.北京){
        chartData.push([key,aqiSourceData.北京[key]])
    }
}

/**
 * 初始化函数
 */
function init() {
   initGraTimeForm()
   initCitySelector();
    initAqiChartData();
    renderChart();
}

init();

