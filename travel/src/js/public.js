$(function(){
    Scroll();
    SubmitConcat();
})
// 导航滚动事件
function Scroll() {
    window.onscroll = function () {
      var t = document.documentElement.scrollTop || document.body.scrollTop;
      if (t >= 200) {
        $("header").addClass("fixed");
        $(".linkbox").css("position","fixed");
       
      }
      else{
        $("header").removeClass("fixed");
        $(".linkbox").css("position","");
      }
      
      if (t >= 400) {
        $(".rightnav").css("display", 'block');
      }else{
        $(".rightnav").css("display", 'none');
      }
      
    }
    // 返回顶部
    $(".gototop").click(function(){
  
      $('body,html').animate({ scrollTop: 0 }, 100); 
      return false;
     });
  }
// 征求意见提交
function SubmitConcat(){
    $("#submitbtn").click(function(){
      if($('input[name="name"]').val() == '' || $('input[name="name"]').val() == '姓名'  ){
        alert("姓名不能为空");
        return;
      }
      if($('input[name="email"]').val() == ''|| $('input[name="name"]').val() == '邮箱'  ){
        alert("邮箱不能为空");
        return;
      }
      if($('input[name="phone"]').val() == ''|| $('input[name="name"]').val() == '电话'){
        alert("电话不能为空");
        return;
      }
      if($("textarea").val()=="你的意见" || $("textarea").val()==""){
        alert("意见不能为空");
        return;
      }
      alert("提交成功");
    })
  }