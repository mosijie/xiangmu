"use strict";$(function(){var t=!1;$("#slideSon").mousedown(function(e){var o=e.clientX-slideSon.offsetLeft;$(document).mousemove(function(e){var s=e.clientX-o;s<=0?s=0:s>=$("#slideBox").width()-$("#slideSon").width()&&(s=$("#slideBox").width()-$("#slideSon").width())&&($("#slideSon").unbind("mousedown"),$(document).unbind("mousemove"),$("#right").css("display","none"),$("#ye").css("display","block"),$("#slideFont").css("display","none"),$("#slideColor").html("验证通过"),t=!0),$("#slideSon").css("left",s),$("#slideColor").css("width",s),$(document).mouseup(function(){$(document).unbind("mousemove"),t||($("#slideSon").stop().animate({left:0}),$("#slideColor").stop().animate({width:0}))})})}),$("#btn").click(function(){console.log("aa");var e=$("#password").val().trim(),s=$("#usename").val().trim();e&&s?t?$.ajax({type:"POST",url:"../api/login.php",data:"username="+s+"&password="+e,success:function(e){var s=JSON.parse(e);if(s.res){alert("登录成功！"),$("#usename").val(""),$("#password").val("");var o=new Date;o.setDate(o.getDate()+1),cookie.set("usn",s.data[0].name,{expires:o,path:"/"}),cookie.set("id",s.data[0].id,{expires:o,path:"/"}),location.href="../index.html"}else alert("账号或密码错误")}}):alert("滑动验证"):alert("请输入账户或密码")})});