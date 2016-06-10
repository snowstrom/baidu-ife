window.onload= function () {
    var table_obj = document.getElementsByTagName("table")[0];
    var table_thead = document.getElementsByTagName("thead")[0];
    var last_tr = document.getElementById("last");
    window.onscroll = function () {
        var top_num = table_obj.getBoundingClientRect().top;
        var last_num = last_tr.getBoundingClientRect().top;
        console.log(last_num);
        if(top_num < 0){
            table_thead.style.position = "fixed";
            table_thead.style.top = 0+"px";
        }
        if(  top_num > 0){
            table_thead.style.position = "static";
        }
        if(last_num < -40) {
            table_thead.style.display = "none";
        }
        if(last_num> -40){
            table_thead.style.display = "table-header-group";
        }

    }
}