window.onload= function () {
    var arr_obj = []; //按顺序存放待遍历的节点
    var clear_time;


    //前序遍历函数
    function front(root){
        if(root != null) {
            arr_obj.push(root);
            front(root.firstElementChild);
            front(root.lastElementChild);
        }
    }

    //中序遍历函数
    function middle(root){
        if(root != null) {
            middle(root.firstElementChild);
            arr_obj.push(root);
            middle(root.lastElementChild);
        }
    }

    //后序遍历函数
    function behind(root){
        if(root != null) {
            behind(root.firstElementChild);
            behind(root.lastElementChild);
            arr_obj.push(root);
        }
    }

    //将arr_obj中排好顺序的节点，以动画形式显示
    function animation(arr){
        var index = 0;
        arr_obj[index].style.background="green";
        clear_time = setInterval(function () {
            index ++;
            if(index < arr_obj.length){
                arr_obj[index-1].style.background="white";
                arr_obj[index].style.background = "green";
            }else {
                clearInterval(clear_time);
                arr_obj[arr_obj.length-1].style.background = "white";
            }
        },1000);
    }

    //清除上一个遍历的动画,注意，此函数一次性将所有的div的背景色设置为了白色，就是为什么在后来动画显示的时候，
    //将某一个div的背景设置为绿色后，此div的子元素的背景色还是白色，而不是被父元素的背景色覆盖！！
    function clear_animation(){
        var div_obj = document.getElementsByTagName("div");
        for(var index = 0; index<div_obj.length;index++){
            div_obj[index].style.background = "white";
        }
        clearInterval(clear_time);
        arr_obj=[];
    }
    function  init(){
        var root_obj = document.getElementsByClassName("wrap")[0];
        var front_btn = document.getElementById("front");
        front_btn.addEventListener("click", function () {
            clear_animation();
            front(root_obj);
            animation(arr_obj);
        });
        var front_btn = document.getElementById("middle");
        front_btn.addEventListener("click", function () {
            clear_animation();
            middle(root_obj);
            animation(arr_obj);
        });
        var front_btn = document.getElementById("behind");
        front_btn.addEventListener("click", function () {
            clear_animation();
            behind(root_obj);
            animation(arr_obj);
        })
    }
    init();
}