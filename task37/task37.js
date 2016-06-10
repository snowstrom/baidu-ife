window.onload=function(){
    document.getElementsByTagName("button")[0].onclick=function(){
        var my_body = document.body;
        var width = document.getElementById("width").value;
        var height=document.getElementById("height").value;

        var float_obj = document.createElement("div");
        float_obj.innerHTML="<header>这是一个悬浮层</header><p>这是一个悬浮层</p><div class='button_wrap'><button>确定</button><button>取消</button></div>";
        float_obj.className = "float_window";
        float_obj.style.width = width+"px";
        float_obj.style.height=height+"px";
        float_obj.style.marginLeft = '-'+Math.floor(width/2)+'px';
        float_obj.style.marginTop = '-'+Math.floor(height/2)+'px';
        my_body.appendChild(float_obj);

        var mask_obj = document.createElement("div");
        mask_obj.className = "mask";
        mask_obj.style.width =document.documentElement.clientWidth+"px";
        mask_obj.style.height=document.documentElement.clientHeight+"px";
        my_body.appendChild(mask_obj);
        var btn = float_obj.getElementsByTagName("button");
        btn[0].onclick = btn[1].onclick = mask_obj.onclick= function () {
            my_body.removeChild(float_obj);
            my_body.removeChild(mask_obj);
        }

    }
}