"use strict";$(function(){$.ajax({type:"get",url:"../api/cart.php",async:!1,success:function(e){!function(e){var s=e.map(function(e){var s=e.num*e.price;return'<ul class="order_lists clearfix" data-id="'+e.id+'">\n                                <li class="list_chk">\n                                    <div class="inputwarp">\n                                        <input type="checkbox" id="checkbox_'+e.id+'" class="son_check">\n                                        <label for="checkbox_'+e.id+'"></label>\n                                    </div>\n                                </li>\n                                <li class="list_con">\n                                    <div class="list_img">\n                                        <a href="javascript:;">\n                                            <img src="../img/'+e.img+'" alt="">\n                                        </a>\n                                    </div>\n                                    <div class="list_text">\n                                    <a href="javascript:;">'+e.name+'</a>\n                                    </div>\n                                </li>\n                                <li class="list_price">\n                                    <p class="price">￥'+e.price+'</p>\n                                    <p class="goodmp">'+e.old_price+'</p>\n                                </li>\n                                <li class="list_amount">\n                                    <div class="amount_box">\n                                        <a href="javascript:;" class="reduce reSty">-</a>\n                                        <input type="text" value="'+e.num+'" class="sum">\n                                        <a href="javascript:;" class="plus">+</a>\n                                    </div>\n                                </li>\n                                <li class="list_sum">\n                                    <p class="sum_price">￥'+s+'</p>\n                                </li>\n                                <li class="list_op">\n                                    <p class="del">\n                                    <a href="javascript:;" class="delBtn">删除</a>\n                                    </p>\n                                </li>\n                    </ul>'}).join("");$(".order_content").html(s)}(JSON.parse(e))}});var e=$('input[type="checkbox"]'),a=$(".whole_check"),s=$(".cartBox"),t=$(".shopChoice"),n=$(".son_check");e.click(function(){$(this).is(":checked")?$(this).parents(".inputwarp").addClass("mark"):$(this).parents(".inputwarp").removeClass("mark")}),a.click(function(){var e=s.find('input[type="checkbox"]');$(this).is(":checked")?(e.prop("checked",!0),e.parents(".inputwarp").addClass("mark"),t.prop("checked",!0),t.parents(".inputwarp").addClass("mark"),$("#all").prop("checked",!0),$("#all").parents(".inputwarp").addClass("mark"),$("#all_del").prop("checked",!0),$("#all_del").parents(".inputwarp").addClass("mark")):(e.prop("checked",!1),e.parents(".inputwarp").removeClass("mark"),t.prop("checked",!1),t.parents(".inputwarp").removeClass("mark"),$("#all").prop("checked",!1),$("#all").parents(".inputwarp").removeClass("mark"),$("#all_del").prop("checked",!1),$("#all_del").parents(".inputwarp").removeClass("mark")),d()}),n.each(function(){$(this).click(function(){if($(this).is(":checked")){var e=n.length,s=0;n.each(function(){$(this).is(":checked")&&s++}),s==e&&(a.prop("checked",!0),a.parents(".inputwarp").addClass("mark"),t.prop("checked",!0),t.parents(".inputwarp").addClass("mark"),$("#all_del").prop("checked",!0),$("#all_del").parents(".inputwarp").addClass("mark"))}else a.prop("checked",!1),a.parents(".inputwarp").removeClass("mark"),$("#all_del").prop("checked",!1),$("#all_del").parents(".inputwarp").removeClass("mark")})}),t.eq(0).each(function(){$(this).click(function(){if($(this).is(":checked")){var e=t.length,s=0;t.each(function(){$(this).is(":checked")&&s++}),s==e&&(a.prop("checked",!0),a.parents(".inputwarp").addClass("mark"),$("#all_del").prop("checked",!0),$("#all_del").parents(".inputwarp").addClass("mark")),$(this).parents(".cartBox").find(".son_check").eq(0).prop("checked",!0),$(this).parents(".cartBox").find(".son_check").eq(1).parents(".inputwarp").addClass("mark")}else a.prop("checked",!1),a.parents(".inputwarp").removeClass("mark"),$(this).parents(".cartBox").find(".son_check").prop("checked",!1),$(this).parents(".cartBox").find(".son_check").parents(".inputwarp").removeClass("mark"),$("#all_del").prop("checked",!1),$("#all_del").parents(".inputwarp").removeClass("mark");d()})}),s.each(function(){var a=$(this).find(".son_check");a.each(function(){$(this).click(function(){if($(this).is(":checked")){var e=a.length,s=0;a.each(function(){$(this).is(":checked")&&s++}),s==e&&($(this).parents(".cartBox").find(".shopChoice").prop("checked",!0),$(this).parents(".cartBox").find(".shopChoice").parents(".inputwarp").addClass("mark"))}else $(this).parents(".cartBox").find(".shopChoice").prop("checked",!1),$(this).parents(".cartBox").find(".shopChoice").parents(".inputwarp").removeClass("mark");d()})})});var i=$(".plus"),c=$(".reduce"),r=$(".sum");i.click(function(){var e=$(this).prev("input"),s=parseInt(e.val())+1,a=$(this).parents(".amount_box").find(".reduce"),t=$(this).parents(".order_lists").find(".sum_price"),n=$(this).parents(".order_lists").find(".price").html(),i=s*parseInt(n.substring(1));e.val(s),t.html("￥"+i),1<e.val()&&a.hasClass("reSty")&&a.removeClass("reSty"),d()}),c.click(function(){var e=$(this).next("input"),s=parseInt(e.val())-1,a=$(this).parents(".order_lists").find(".sum_price"),t=$(this).parents(".order_lists").find(".price").html(),n=s*parseInt(t.substring(1));1<e.val()&&(e.val(s),a.html("￥"+n)),1!=e.val()||$(this).hasClass("reSty")||$(this).addClass("reSty"),d()}),r.keyup(function(){var e,s,a=$(this).parents(".order_lists").find(".sum_price"),t=$(this).parents(".order_lists").find(".price").html();""==$(this).val()&&$(this).val("1"),$(this).val($(this).val().replace(/\D|^0/g,"")),s=(e=$(this).val())*parseInt(t.substring(1)),$(this).attr("value",e),a.html("￥"+s),d()});var l=null,p="";function o(){$(".cartBox").size()<=0&&($(".cartMain").css("display","none"),$(".myShoppingCart").css("display","block"))}function d(){var a=0,t=0,e=$(".calBtn a");n.each(function(){if($(this).is(":checked")){var e=parseInt($(this).parents(".order_lists").find(".sum_price").html().substring(1)),s=parseInt($(this).parents(".order_lists").find(".sum").val());a+=e,t+=s}}),$(".total_text").html("￥"+a),$(".piece_num").html(t),0!=a&&0!=t?e.hasClass("btn_sty")||e.addClass("btn_sty"):e.hasClass("btn_sty")&&e.removeClass("btn_sty")}function h(){var e=cookie.get("usn");"0"!=cookie.get("id")?($("#loginedBox").css("display","block"),$("#unloginBox").css("display","none"),$("#logined_username").html(e)):($("#loginedBox").css("display","none"),$("#unloginBox").css("display","block"))}$(".delBtn").click(function(){l=$(this).parents(".order_lists"),p=l.parents(".order_content"),$(".model_bg").fadeIn(300),$(".my_model").fadeIn(300);var e=l.data("id");function s(){$(".model_bg").fadeOut(300),$(".my_model").fadeOut(300)}$(".closeModel").click(function(){s()}),$(".dialog-close").click(function(){s()}),$(".dialog-sure").click(function(){l.remove(),$.ajax({type:"get",url:"../api/deleteCart.php",data:"gid="+e,success:function(e){console.log(e)}}),null!=p.html().trim()&&0!=p.html().trim().length||(p.parents(".cartBox").remove(),o()),s(),n=$(".son_check"),d()})}),o(),$(".all_delBtn").click(function(){n.each(function(){if($(this).is(":checked")){var e=n.length,s=0;if(n.each(function(){$(this).is(":checked")&&s++}),s==e){var a=function(){$(".model_bg").fadeOut(300),$(".my_model").fadeOut(300)};l=$(".order_lists"),p=l.parents(".order_content"),$(".model_bg").fadeIn(300),$(".my_model").fadeIn(300),$(".closeModel").click(function(){a()}),$(".dialog-close").click(function(){a()}),$(".dialog-sure").click(function(){$.ajax({type:"get",url:"../api/deleteCart.php",data:"gid=",success:function(e){console.log(e)}}),l.remove(),null!=p.html().trim()&&0!=p.html().trim().length||(p.parents(".cartBox").remove(),o()),a(),n=$(".son_check"),d()})}}})}),h(),$("#logOut").click(function(){cookie.remove("id"),h()})});