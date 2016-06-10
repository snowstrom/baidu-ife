/**
 * Created by Administrator on 2016/05/05.
 */
window.onload=function(){
    function Block (left,top,rotate){
        this.left=left;
        this.top=top;
        this.rotate=0;
        this.orders={};
    }
    Block.prototype.get_direction=function(){
        var dir = this.rotate % 360;
        if(dir == 0)return 0;
        if(dir == -270 || dir == 90)return 1;
        if(dir == -180 || dir == 180)return 2;
        if(dir == -90 || dir == 270) return 3;
    };
    Block.prototype.add_order=function(order,fn){
        this.orders[order]=fn;
    };
    Block.prototype.avoid__out_boundary=function(){
        if(this.top < 0)this.top = 0;
        if(this.top > 450)this.top = 450;
        if(this.left < 0)this.left = 0;
        if(this.left > 450)this.left = 450;
    };
    Block.prototype.init = function(){
        var block=document.createElement("div");
        var main_panel = document.getElementsByClassName("main_panel")[0];
        this.block_dom = main_panel.appendChild(block);
        this.block_dom.className="block";
        this.block_dom.style.left=this.left+"px";
        this.block_dom.style.top=this.top+"px";
    };
    function go(){
        var dir = this.get_direction();
        if(dir == 0)this.top -= 50;
        if(dir == 1)this.left += 50;
        if(dir == 2)this.top += 50;
        if(dir == 3)this.left -=50;
    }
    function tun_lef(){
        this.rotate -= 90;
    }
    function tun_rig(){
        this.rotate += 90;
    }
    function tun_bac(){
        this.rotate += 180;
    }
    function tar_lef(){
        this.left -= 50;
    }
    function tar_top(){
        this.top -= 50;
    }
    function tar_rig(){
        this.left += 50;
    }
    function tar_bot(){
        this.top += 50;
    }
    function mov_lef() {
        this.left -= 50;
        var dir = this.get_direction();
        if (dir == 0)this.rotate -= 90;
        if (dir == 1)this.rotate += 180;
        if (dir == 2)this.rotate += 90;
    }
    function mov_top() {
        this.top -= 50;
        var dir = this.get_direction();
        if (dir == 1)this.rotate -= 90;
        if (dir == 2)this.rotate += 180;
        if (dir == 3)this.rotate += 90;
    }
    function mov_rig() {
        this.left += 50;
        var dir = this.get_direction();
        if (dir == 0)this.rotate += 90;
        if (dir == 2)this.rotate -= 90;
        if (dir == 3)this.rotate += 180;
    }
    function mov_bot() {
        this.top += 50;
        var dir = this.get_direction();
        if (dir == 0)this.rotate += 180;
        if (dir == 1)this.rotate += 90;
        if (dir == 3)this.rotate -= 90;
    }

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
    /*验证命令是否合法
     *@command:待验证的命令
     * @block 可执行命令的对象
     */
    function validate(command,block){
        for(var order in block.orders){
            if(command === order)return true;
        }
        return false;
    }
    (function init(){
        create_row_count();
        create_col_count();
        create_grid();
        var block = new Block(250,250);
        block.init();
        block.add_order("GO",go);
        block.add_order("TUN LEF",tun_lef);
        block.add_order("TUN RIG",tun_rig);
        block.add_order("TUN BAC",tun_bac);
        block.add_order("TRA LEF",tar_lef);
        block.add_order("TRA TOP",tar_top);
        block.add_order("TRA RIG",tar_rig);
        block.add_order("TRA BOT",tar_bot);
        block.add_order("MOV LEF",mov_lef);
        block.add_order("MOV TOP",mov_top);
        block.add_order("MOV RIG",mov_rig);
        block.add_order("MOV BOT",mov_bot);
        var btn_execute =document.getElementById("execute");
        var btn_reset = document.getElementById("reset");
        btn_execute.onclick = function(){
            var command = document.getElementById("command").value;
            if(!validate(command,block)){
                alert("this command is wrong");
                return;
            }
            block.orders[command].apply(block);
            block.avoid__out_boundary();
            block.block_dom.style.left = block.left + "px";
            block.block_dom.style.top = block.top + "px";
            block.block_dom.style.transform = "rotate("+block.rotate+"deg)";
        };
        btn_reset.onclick=function(){
            var dir = block.get_direction();
            if(dir == 1)block.rotate -= 90;
            if(dir == 2)block.rotate += 180;
            if(dir == 3)block.rotate += 90;
            block.left = 250;
            block.top = 250;
            block.block_dom.style.left=block.left+"px";
            block.block_dom.style.top=block.top+"px";
            block.block_dom.style.transform = "rotate("+block.rotate+"deg)";
        }
    })()
}