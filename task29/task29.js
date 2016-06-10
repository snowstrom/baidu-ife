window.onload = function () {
   //获取输入的值
    function get_value(){
        var value = document.getElementsByTagName("input")[0].value;
        return value;
    }
    //验证值的有效性
    function validate (str){
        var remind_p = document.getElementsByTagName("p")[0];
        var input_obj = document.getElementsByTagName("input")[0];
        if(str.length==0){
            remind_p.innerText = "姓名不能为空";
            remind_p.style.color="red";
            input_obj.style.borderColor = "red";
            return;
        }
        var len=0;
        for(var i =0;i<str.length;i++){
            if(str.charCodeAt(i) < 128){
                len += 1;
            }else if(str.charCodeAt(i)>=128) {
                len += 2
            }
        }
        if(len>=4 && len<=16){
            remind_p.innerText = "名称格式正确";
            remind_p.style.color="green";
            input_obj.style.borderColor = "green";
        }else if(len>0 && len<4 || len>16){
            remind_p.innerText = "名称格式错误";
            remind_p.style.color="red";
            input_obj.style.borderColor = "red";
        }

    }
    //验证按钮单击事件处理函数
    function btn_handle(){
        var str = get_value();
        validate(str);
    }
    //input 获取焦点事件处理函数
    function input_handle(event){
        event.target.style.borderColor ="#EEEEEE";
        var rem_p = document.getElementsByTagName("p")[0];
        rem_p.style.color="black";
        rem_p.innerText = "必填，长度为4～16个字符"
    }
    //初始化函数
    function init(){
        var btn = document.getElementsByTagName("button")[0];
        btn.onclick = btn_handle;
        var input_obj = document.getElementsByTagName("input")[0];
        input_obj.onfocus=input_handle;
    }
    init();
}