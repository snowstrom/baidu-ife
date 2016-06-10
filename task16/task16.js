/*需要使用正则表达式检测输入的合法性，尚未完成*/
window.onload = function(){
    var flag = 0;
    var  table_obj = document.getElementById("aqi_table");

    /*单击添加按钮则在table中新添一行，并给删除按钮绑定事件*/
    function renderAqiList() {
        var city_name = document.getElementById("aqi_city_input").value;
        var air_num = document.getElementById("aqi_value_input").value;
        if (flag == 0) {
            flag = 1;
            table_obj.border = 1;
            table_obj.style.borderCollapse = "collapse";
            var tr_obj = document.createElement("tr");
            tr_obj.innerHTML = "<td>城市</td><td>空气质量</td><td>操作</td>";
            table_obj.appendChild(tr_obj);
        }
        var line = document.createElement("tr");
        line.innerHTML = "<td>" + city_name + "</td><td>" + air_num + "</td><td><button>删除</button></td>"
        table_obj.appendChild(line);
        line.getElementsByTagName("button")[0].addEventListener("click",delBtnHandle);
    }

/*删除按钮的单击事件*/
    function delBtnHandle() {
        this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
    }

    function test(){

    }
    var btn = document.getElementById("add_btn");
    btn.addEventListener("click",renderAqiList);
}

