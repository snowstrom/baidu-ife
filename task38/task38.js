window.onload= function () {
    var score_arr =[];
    var table_obj = document.getElementsByTagName("table")[0];
    var tbody_obj = table_obj.getElementsByTagName("tbody")[0];
    var sort_btn =document.getElementsByClassName("sort");
    //获取表格中的数据
    function getInfo(){
        var student_info =tbody_obj.getElementsByTagName("tr");
        for (var i =0 ;i<student_info.length;i++){
           var one_stu = student_info[i].getElementsByTagName("td");
            var obj ={};
            obj.name=one_stu[0].innerText;
            obj.chinese=parseInt(one_stu[1].innerText);
            obj.math=parseInt(one_stu[2].innerText);
            obj.english=parseInt(one_stu[3].innerText);
            obj.sum=parseInt(one_stu[4].innerText);
            score_arr.push(obj);
        }
    }
    //重新渲染表格
    function render_table(){
        var tbody_del = table_obj.getElementsByTagName("tbody")[0];
        table_obj.removeChild(tbody_del);
        var tbody_create = document.createElement("tbody");
        for(var i=0 ;i<score_arr.length;i++){
            var line = document.createElement("tr");
            line.innerHTML="<td>"+score_arr[i].name+"</td>"+"<td>"+score_arr[i].chinese+"</td>"+"<td>"+score_arr[i].math+"</td>"+"<td>"+score_arr[i].english+"</td>"+"<td>"+score_arr[i].sum+"</td>";
            tbody_create.appendChild(line);
        }
        table_obj.appendChild(tbody_create);
    }

    //重新让所有的排序三角形为白色
    function change_color(){
        for(var i=0; i<sort_btn.length;i++){
            if(sort_btn[i].classList.contains("up")){
                sort_btn[i].style.borderBottomColor="#FFFFFF";
            }else {
                sort_btn[i].style.borderTopColor="#FFFFFF";
            }
        }
    }
    //生成供数组方法sort调用的函数
    function create_sort_func (str,flag){
        if(flag == "up") {
            return function (a, b) {
                return parseInt(a[str]) - parseInt(b[str]);
            }
        }
        else if(flag=="down"){
            return function (a,b){
                return parseInt(b[str]) - parseInt(a[str]);
            }
        }
    }
    //排序函数
    function sort_func(event){
        if(event.target.classList.contains("ch_up")){
            score_arr.sort(create_sort_func("chinese","up"));
            render_table();
            change_color();
            event.target.style.borderBottomColor = "red";
        }else if(event.target.classList.contains("ma_up")){
            score_arr.sort(create_sort_func("math","up"));
            render_table();
            change_color();
            event.target.style.borderBottomColor = "red";
        }else if(event.target.classList.contains("en_up")){
            score_arr.sort(create_sort_func("english","up"));
            render_table();
            change_color();
            event.target.style.borderBottomColor = "red";
        }else if(event.target.classList.contains("su_up")){
            score_arr.sort(create_sort_func("sum","up"));
            render_table();
            change_color();
            event.target.style.borderBottomColor = "red";
        }else if(event.target.classList.contains("ch_down")){
            score_arr.sort(create_sort_func("chinese","down"));
            render_table();
            change_color();
            event.target.style.borderTopColor = "red";
        }else if(event.target.classList.contains("ma_down")){
            score_arr.sort(create_sort_func("math","down"));
            render_table();
            change_color();
            event.target.style.borderTopColor = "red";
        }else if(event.target.classList.contains("en_down")){
            score_arr.sort(create_sort_func("english","down"));
            render_table();
            change_color();
            event.target.style.borderTopColor = "red";
        }else if(event.target.classList.contains("su_down")){
            score_arr.sort(create_sort_func("sum","down"));
            render_table();
            change_color();
            event.target.style.borderTopColor = "red";
        }
    }
    function bind_sort_func(){
        for (var index = 0 ;index<sort_btn.length;index++){
            sort_btn[index].onclick = sort_func;
        }
    }
    function init() {
        getInfo();
        bind_sort_func();
    }
    init();
}