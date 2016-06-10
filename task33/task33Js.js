/**
 * Created by Administrator on 2016/05/05.
 */
window.onload=function(){
    var rotate = 0;
    var left = 250;
    var top = 250;

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
    //操作
    function operate(){
        var command = document.getElementById("command").value;
        var block = document.getElementsByClassName("block")[0];
        switch (command){
            case "GO":go(get_direction());
                        block.style.left=left+"px";
                        block.style.top =top +"px";
                break;
            case "TUN LEF":rotate -= 90;
                break;
            case "TUN RIG":rotate +=90;
                break;
            case "TUN BAC":rotate +=180;
                break;
            default:alert("the command is wrong!");
        }
        block.style.transform = "rotate("+rotate+"deg)";
    }

    function go(dir){
        if(dir == 0)top -= 50;
        if(dir == 1)left += 50;
        if(dir == 2)top += 50;
        if(dir == 3)left -=50;
        if(top < 0)top = 0;
        if(top > 450)top = 450;
        if(left < 0)left = 0;
        if(left > 450)left = 450;
    }
    function init(){
        create_row_count();
        create_col_count();
        create_grid();
        create_block();
        var btn =document.getElementsByTagName("button")[0];
        btn.onclick = operate;
    }
    init();
}