window.onload= function () {
    //
    //
    //验证名称输入的有效性函数
    function validate_name (str){
        var val_name = document.getElementById("name_val");
        var input_name = document.getElementById("name");
        if(str.length==0){
            val_name.innerText = "姓名不能为空";
            val_name.style.color="red";
            input_name.style.borderColor = "red";
            return false;
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
            val_name.innerText = "名称格式正确";
            val_name.style.color="green";
            input_name.style.borderColor = "green";
			return true;
        }else if(len>0 && len<4 || len>16){
            val_name.innerText = "名称格式错误";
            val_name.style.color="red";
            input_name.style.borderColor = "red";
			return false;
        }

    }
    //验证密码输入有效性
    function validate_psd(str){
        var val_password = document.getElementById("password_val");
        var input_password = document.getElementById("password");
        if(str.length==0){
            val_password.innerText = "密码不能为空";
            val_password.style.color="red";
            input_password.style.borderColor = "red";
            return false;
        }
        var pattern = /^[a-zA-Z0-9]+$/
        if(pattern.test(str)){
            val_password.innerText = "密码可用";
            val_password.style.color="green";
            input_password.style.borderColor = "green";
			return true;
        }else {
            val_password.innerText = "密码格式错误";
            val_password.style.color="red";
            input_password.style.borderColor = "red";
			return false;
        }
    }
    //确认密码验证有效性
    function validate_confirm_psd(str){
        var val_confirm_psd = document.getElementById("confirm_psd_val");
        var input_confirm_psd = document.getElementById("confirm_psd");
        var input_password = document.getElementById("password");
        if(str == input_password.value){
            if(str.length == 0){
                val_confirm_psd.innerText="密码不能为空";
                val_confirm_psd.style.color="red";
                input_confirm_psd.style.borderColor="red";
                return false;
            }
            val_confirm_psd.innerText="密码输入一致";
            val_confirm_psd.style.color="green";
            input_confirm_psd.style.borderColor="green";
			return true;
        }else {
            val_confirm_psd.innerText="密码输入不一致";
            val_confirm_psd.style.color="red";
            input_confirm_psd.style.borderColor="red";
			return false;
        }

    }
    //验证邮箱的有效性
    function validate_email(str){
        var val_email = document.getElementById("email_val");
        var input_email = document.getElementById("email");
        if(str.length==0){
            val_email.innerText = "邮箱不能为空";
            val_email.style.color="red";
            input_email.style.borderColor = "red";
            return false;
        }
        var pattern = /[\w.]+@[\w.]+\.\w+/;

        if(pattern.test(str)){
            val_email.innerText = "邮箱格式正确";
            val_email.style.color="green";
            input_email.style.borderColor = "green";
			return true;
        }else {
            val_email.innerText = "邮箱格式错误";
            val_email.style.color="red";
            input_email.style.borderColor = "red";
			return false;
        }
    }
    //验证手机号格式有效性
    function validate_tel (str){
        var val_tel = document.getElementById("tel_val");
        var input_tel = document.getElementById("tel");
        if(str.length==0){
            val_tel.innerText = "手机号不能为空";
            val_tel.style.color="red";
            input_tel.style.borderColor = "red";
            return false;
        }
        var pattern = /^\d{11}$/;

        if(pattern.test(str)){
            val_tel.innerText = "手机号格式正确";
            val_tel.style.color="green";
            input_tel.style.borderColor = "green";
			return true;
        }else {
            val_tel.innerText = "手机号格式错误";
            val_tel.style.color="red";
            input_tel.style.borderColor = "red";
			return false;
        }
    }
    //表单失去焦点事件处理函数（验证输入的有效性）
    function  input_blur(event){
        switch (event.target.id){
            case "name":
                validate_name(event.target.value);
                break;
            case "password":
                validate_psd(event.target.value);
                break;
            case "confirm_psd":
                validate_confirm_psd(event.target.value);
                break;
            case "email":
                validate_email(event.target.value);
                break;
            case "tel":
                validate_tel(event.target.value);
				break;
        }
    }
    //表单获取焦点事件处理函数（显示填写规则）
    function input_focus(event){
        var val_p = document.getElementById(event.target.id+"_val");
        val_p.style.visibility="visible";
        switch (event.target.id){
            case "name":{
                document.getElementById("name_val").innerText="必填，长度为4～16个字符";
                document.getElementById("name_val").style.color = "black";
                document.getElementById("name").style.borderColor="#eeeeee"
            }
                break;
            case "password":{
                document.getElementById("password_val").innerText="必填，大小写字母或数字";
                document.getElementById("password_val").style.color = "black";
                document.getElementById("password").style.borderColor="#eeeeee"
            }
                break;
            case "confirm_psd":{
                document.getElementById("confirm_psd_val").innerText="必填，请与上面密码相同";
                document.getElementById("confirm_psd_val").style.color = "black";
                document.getElementById("confirm_psd").style.borderColor="#eeeeee"
            }
                break;
            case "email":{
                document.getElementById("email_val").innerText="必填，请输入有效邮箱";
                document.getElementById("email_val").style.color = "black";
                document.getElementById("email").style.borderColor="#eeeeee"
            }
                break;
            case "tel":{
                document.getElementById("tel_val").innerText="必填，需为11位数字";
                document.getElementById("tel_val").style.color = "black";
                document.getElementById("tel").style.borderColor="#eeeeee"
            }
                break;
        }
    }
    //提交按钮提交事件处理函数
    function submit_handle (){
        var input_name = document.getElementById("name").value;
        var input_password = document.getElementById("password").value;
        var input_confirm_psd = document.getElementById("confirm_psd").value;
        var input_email = document.getElementById("email").value;
        var input_tel = document.getElementById("tel").value;
        var validate1 = validate_name(input_name);
        var validate2 = validate_psd(input_password);
        var validate3 = validate_confirm_psd(input_confirm_psd);
        var validate4 = validate_email(input_email);
        var validate5 = validate_tel(input_tel);
        var val_p = document.getElementsByTagName("p");
        for(var i=0;i<val_p.length;i++){
            val_p[i].style.visibility="visible";
        }
		if(validate1 && validate2 && validate3 && validate4 && validate5){
			alert("提交成功");
		}
		else 
			alert("提交失败");
        return false;
    }
    //初始化函数
    function init(){
        var input_name = document.getElementsByTagName("input");
        for(var i = 0;i<input_name.length;i++){
            input_name[i].onfocus = input_focus;
            input_name[i].onblur = input_blur;
        }
        var submit_btn = document.getElementById('submit');
        submit_btn.onclick =submit_handle;
    }
    init();
}