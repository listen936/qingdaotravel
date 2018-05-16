/**
 
 */
// import '../lib/jquery.min';
import cats from './cat' ;
import {animal,myname} from './animal' ;
import '../lib/bootstrap';
$(function(){
  Scroll();
  SubmitConcat();
});

function init(){
  // initClick() ;
}
// 导航滚动事件
function Scroll() {
  window.onscroll = function () {
    var t = document.documentElement.scrollTop || document.body.scrollTop;
    if (t <= 0) {
      $("header").removeClass("fixed");
      $(".rightnav").css("display", 'none');
     
    }
    if (t >= 200) {
      $("header").addClass("fixed");
      
    }
    if (t >= 400) {
      $(".rightnav").css("display", 'block');
      
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
function initClick(){
  console.log(cats) ;
  $(".d1").click(function(){
    $(this).animate({height:"300px"},2000) ;
  });
  $('<h1>Cats</h1>').appendTo('body');
  const ul = $('<ul></ul>').appendTo('body');
  // console.log(myname) ;
  for (const cat of cats) {
    $('<li></li>').text(cat).appendTo(ul);
    var cat = new animal(cat) ;
    cat.sayhi() ;
  }
}