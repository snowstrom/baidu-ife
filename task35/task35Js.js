/**
 * Created by Administrator on 2016/05/05.
 */
window.onload=function(){
    var rotate = 0;
    var left = 250;
    var top = 250;
    var col_index=1;
    var textarea_row_num = 8;
    var validate_command=[];
    //构建行号函数
    function create_row_count(){
        var row_obj=document.getElementsByClassName("row_count")[0];
        for(var i=0;i<10;i++){
            var li_obj=document.createElement("li");
            li_obj.innerText=i+1;
            row_obj.appendChild(li_obj);
        }
    }
    //构建列号函数
    function create_col_count(){
        var col_obj=document.getElementsByClassName("col_count")[0];
        for(var i=0;i<10;i++){
            var li_obj=document.createElement("li");
            li_obj.innerText=i+1;
            col_obj.appendChild(li_obj);
        }
    }
    //构建格子空间
    function create_grid(){
        var main_panel = document.getElementsByClassName("main_panel")[0];
        for(var i=0;i<100;i++){
            var cell = document.createElement("div");
            cell.className="grid_cell";
            main_panel.appendChild(cell);
        }
    }
    //创建操作方块
    function create_block(){
        var block=document.createElement("div");
        var main_panel = document.getElementsByClassName("main_panel")[0];
        block.className="block";
        block.style.left=left+"px";
        block.style.top=top+"px";
        main_panel.appendChild(block);
    }
    //获取方块的当前方向
    function get_direction(){
        var dir = rotate % 360;
        if(dir == 0)return 0;
        if(dir == -270 || dir == 90)return 1;
        if(dir == -180 || dir == 180)return 2;
        if(dir == -90 || dir == 270) return 3;
    }
    //在input中输入命令的操作函数
    function operate_input(){
        var command = document.getElementById("command").value;
        var block = document.getElementsByClassName("block")[0];
        execute(command);
        block.style.left=left+"px";
        block.style.top=top+"px";
        block.style.transform = "rotate("+rotate+"deg)";
    }

    //在textarea中输入多个命令时的参数函数
    function operate_textarea(){
        var block = document.getElementsByClassName("block")[0];
        block.addEventListener("transitionend",command_fun);
        var i=0;
        var len =validate_command.length;
        execute(validate_command[i]);
        block.style.left=left+"px";
        block.style.top=top+"px";
        block.style.transform = "rotate("+rotate+"deg)";
        i++;
        function command_fun(){
            if(i<len){
                execute(validate_command[i]);
                block.style.left=left+"px";
                block.style.top=top+"px";
                block.style.transform = "rotate("+rotate+"deg)";
                i++;
            }else {
                block.removeEventListener("transitionend",command_fun);
            }
        }
    }
    //执行命令command命令
    function execute(command){
        if(command == "GO" || command.indexOf("MOV")!=-1){
            var dir = get_direction();
            if(command == "GO"){
                if(dir==0)top-=50;
                if(dir==1)left+=50;
                if(dir==2)top+=50;
                if(dir==3)left-=50;
            }else {
                switch (command) {
                    case "MOV LEF":
                        left -= 50;
                        if (dir == 0)rotate -= 90;
                        if (dir == 1)rotate += 180;
                        if (dir == 2)rotate += 90;
                        break;
                    case "MOV TOP":
                        top -= 50;
                        if (dir == 1)rotate -= 90;
                        if (dir == 2)rotate += 180;
                        if (dir == 3)rotate += 90;
                        break;
                    case "MOV RIG":
                        left += 50;
                        if (dir == 0)rotate += 90;
                        if (dir == 2)rotate -= 90;
                        if (dir == 3)rotate += 180;
                        break;
                    case "MOV BOT":
                        top += 50;
                        if (dir == 0)rotate += 180;
                        if (dir == 1)rotate += 90;
                        if (dir == 3)rotate -= 90;
                        break;
                }
            }
        }else {
            switch (command) {
                case "TUN LEF":
                    rotate -= 90;
                    break;
                case "TUN RIG":
                    rotate += 90;
                    break;
                case "TUN BAC":
                    rotate += 180;
                    break;
                case "TRA LEF":
                    left -= 50;
                    break;
                case "TRA TOP":
                    top -= 50;
                    break;
                case "TRA RIG":
                    left += 50;
                    break;
                case "TRA BOT":
                    top += 50;
                    break;
            }
        }
        if(top < 0)top = 0;
        if(top > 450)top = 450;
        if(left < 0)left = 0;
        if(left > 450)left = 450;
    }
    //清屏函数
    function clear_screen(){
        var command = document.getElementById("command_set");
        var col_num_ul=document.getElementsByClassName("col_num")[0];
        command.value = "";
        validate_command=[];
        command.rows="8";
        col_num_ul.innerHTML="";
        col_num_ul.style.height="162px";
        col_index=1;
        command.onfocus = begin_col_count;
    }
    //让方块回到初始位置
    function reset(){
        var block = document.getElementsByClassName("block")[0];
        var dir = get_direction();
        if(dir == 1)rotate -= 90;
        if(dir == 2)rotate += 180;
        if(dir == 3)rotate += 90;
        left = 250;
        top = 250;
        block.style.left=left+"px";
        block.style.top=top+"px";
        block.style.transform = "rotate("+rotate+"deg)";
    }
    //textarea获取焦点时开始显示列号
    function begin_col_count(){
        var col_num_ul=document.getElementsByClassName("col_num")[0];
        var command = document.getElementById("command_set");
        var num_li = document.createElement("li");
        num_li.className = "li_num";
        num_li.innerText = col_index++;
        col_num_ul.appendChild(num_li);
        command.onfocus=null;
    }
    //检测用户在textarea中的输入显示相应行号
    function col_num(event){
        var col_num_ul=document.getElementsByClassName("col_num")[0];
        var command = document.getElementById("command_set");
        if(event.keyCode == 13){
            var start = command.value.lastIndexOf("\n",command.value.length-2);
            var last_command = command.value.substring(start+1,command.value.length);
            if(!test(last_command)){
               col_num_ul.lastChild.style.backgroundColor= "red";
            }else {
                validate_command.push(last_command);
            }
            if(col_index > 7){
                command.rows=textarea_row_num++;
                col_num_ul.style.height="auto";
            }
            var num_li = document.createElement("li");
            num_li.className = "li_num";
            num_li.innerText = col_index++;
            col_num_ul.appendChild(num_li);
        }
    }
    //验证命令的正确性 str为验证的命令
    function test(str){
        var command_td = document.getElementsByTagName("td");
        for(var i=0 ;i< command_td.length ; i++){
            if(str == command_td[i].innerText){
                return true;
            }
        }
        return false;
    }
    function init(){
        create_row_count();
        create_col_count();
        create_grid();
        create_block();
        var btn_execute =document.getElementById("execute");
        var btn_reset =document.getElementById("reset");
        var btn_exec_set=document.getElementById("exec_set");
        var btn_refresh = document.getElementById("refresh");
        var textarea_obj = document.getElementById("command_set");
        btn_execute.onclick = operate_input;
        btn_reset.onclick =reset;
        btn_exec_set.onclick = operate_textarea;
        btn_refresh.onclick = clear_screen;
        textarea_obj.onfocus=begin_col_count;
        textarea_obj.onkeydown = col_num;
    }
    init();
}