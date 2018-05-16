$(function(){
    $("#username").blur(function(){
       if(this.value == ""){
           $(".name").html("用户名不能为空").addClass("error").removeClass("correct");
       }else if(this.value.length < 4 || this.value.length > 11){
        $(".name").html("用户名长度应为4~10个字符").addClass("error").removeClass("correct");
       }else{
        $(".name").html("用户名完成").addClass("correct").removeClass("error");
       }
    })
    $("#psd").blur(function(){
        if(this.value == ""){
            $(".psd").html("密码不能为空").addClass("error").removeClass("correct");
        }else if(this.value.length < 4 || this.value.length > 11){
         $(".psd").html("密码长度应为4~10个字符").addClass("error").removeClass("correct");
        }else{
            $(".psd").html("密码完成").addClass("correct").removeClass("error");; 
        }
     })
     $("#psd2").blur(function(){
        if(this.value ==""){
            $(".psd2").html("确认密码不能为空").addClass("error").removeClass("correct");
        }else if(this.value ==  $("#psd").val()){
            $(".psd2").html("密码确认完成").addClass("correct").removeClass("error");; 
        }else{
            $(".psd2").html("两次密码不相同").addClass("error").removeClass("correct");
        }
     })
     $("button").click(function(){
        
       if($("button").html() == "登录"){
           
        if($(".name").html() =="用户名完成" &&  $(".psd").html()  == "密码完成"){
            alert("登录成功");
            window.location.href = "./index.html";
        }
       }else{
        if($(".name").html() =="用户名完成" &&  $(".psd").html()  == "密码完成" && $(".psd2").html() == "密码确认完成"){
            alert("注册成功");
            window.location.href = "./login.html";
        } 
       }
        
        
    })
})
