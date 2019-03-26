$(function () {
    function show(arr) {
        var html = arr.map(function (item) {
            var price = item.num * item.price;//小计价格
            return `<ul class="order_lists clearfix" data-id="${item.id}">
                                <li class="list_chk">
                                    <div class="inputwarp">
                                        <input type="checkbox" id="checkbox_${item.id}" class="son_check">
                                        <label for="checkbox_${item.id}"></label>
                                    </div>
                                </li>
                                <li class="list_con">
                                    <div class="list_img">
                                        <a href="javascript:;">
                                            <img src="../img/${item.img}" alt="">
                                        </a>
                                    </div>
                                    <div class="list_text">
                                    <a href="javascript:;">${item.name}</a>
                                    </div>
                                </li>
                                <li class="list_price">
                                    <p class="price">￥${item.price}</p>
                                    <p class="goodmp">${item.old_price}</p>
                                </li>
                                <li class="list_amount">
                                    <div class="amount_box">
                                        <a href="javascript:;" class="reduce reSty">-</a>
                                        <input type="text" value="${item.num}" class="sum">
                                        <a href="javascript:;" class="plus">+</a>
                                    </div>
                                </li>
                                <li class="list_sum">
                                    <p class="sum_price">￥${price}</p>
                                </li>
                                <li class="list_op">
                                    <p class="del">
                                    <a href="javascript:;" class="delBtn">删除</a>
                                    </p>
                                </li>
                    </ul>`
        }).join('');
        $('.order_content').html(html);
    }
    //渲染
    $.ajax({
        type: 'get',
        url: '../api/cart.php',
        async: false,
        success: function (str) {
            var arr = JSON.parse(str);
            // console.log(arr)
            // console.log(arr.length)
            show(arr);
        }
    });

    //全局的checkbox选中和未选中的样式
    var $allCheckbox = $('input[type="checkbox"]'),     //全局的全部checkbox
        $wholeChexbox = $('.whole_check'),
        $cartBox = $('.cartBox'),                       //每个商铺盒子
        $shopCheckbox = $('.shopChoice'),               //每个商铺的checkbox
        $sonCheckBox = $('.son_check');                 //每个商铺下的商品的checkbox
    $allCheckbox.click(function () {
        if ($(this).is(':checked')) {
            $(this).parents('.inputwarp').addClass('mark');
        } else {
            $(this).parents('.inputwarp').removeClass('mark');
        }
    });

    //===============================================全局全选与单个商品的关系================================
    $wholeChexbox.click(function () {
        var $checkboxs = $cartBox.find('input[type="checkbox"]');
        if ($(this).is(':checked')) {
            $checkboxs.prop("checked", true);
            $checkboxs.parents('.inputwarp').addClass('mark');
            $shopCheckbox.prop("checked", true);
            $shopCheckbox.parents('.inputwarp').addClass('mark');
            //上全选
            $('#all').prop("checked", true);
            $('#all').parents('.inputwarp').addClass('mark');
            //下全选
            $('#all_del').prop("checked", true);
            $('#all_del').parents('.inputwarp').addClass('mark');
        } else {
            $checkboxs.prop("checked", false);
            $checkboxs.parents('.inputwarp').removeClass('mark');
            $shopCheckbox.prop("checked", false);
            $shopCheckbox.parents('.inputwarp').removeClass('mark');
            //上全选
            $('#all').prop("checked", false);
            $('#all').parents('.inputwarp').removeClass('mark');
            //下全选    
            $('#all_del').prop("checked", false);
            $('#all_del').parents('.inputwarp').removeClass('mark');
        }
        totalMoney();
    });

    $sonCheckBox.each(function () {
        $(this).click(function () {
            if ($(this).is(':checked')) {
                //判断：所有单个商品是否勾选
                var len = $sonCheckBox.length;
                var num = 0;
                $sonCheckBox.each(function () {
                    if ($(this).is(':checked')) {
                        num++;
                    }
                });
                if (num == len) {
                    $wholeChexbox.prop("checked", true);
                    $wholeChexbox.parents('.inputwarp').addClass('mark');
                    $shopCheckbox.prop("checked", true);
                    $shopCheckbox.parents('.inputwarp').addClass('mark');
                    $('#all_del').prop("checked", true);
                    $('#all_del').parents('.inputwarp').addClass('mark');

                }
            } else {
                //单个商品取消勾选，全局全选取消勾选
                $wholeChexbox.prop("checked", false);
                $wholeChexbox.parents('.inputwarp').removeClass('mark');
                $('#all_del').prop("checked", false);
                $('#all_del').parents('.inputwarp').removeClass('mark');
            }
        })
    })

    //=======================================每个店铺checkbox与全选checkbox的关系/每个店铺与其下商品样式的变化===================================================

    //店铺有一个未选中，全局全选按钮取消对勾，若店铺全选中，则全局全选按钮打对勾。
    $shopCheckbox.eq(0).each(function () {
        $(this).click(function () {
            if ($(this).is(':checked')) {
                //判断：店铺全选中，则全局全选按钮打对勾。
                var len = $shopCheckbox.length;
                var num = 0;
                $shopCheckbox.each(function () {
                    if ($(this).is(':checked')) {
                        num++;
                    }
                });
                if (num == len) {
                    $wholeChexbox.prop("checked", true);
                    $wholeChexbox.parents('.inputwarp').addClass('mark');
                    $('#all_del').prop("checked", true);
                    $('#all_del').parents('.inputwarp').addClass('mark');
                }

                //店铺下的checkbox选中状态
                $(this).parents('.cartBox').find('.son_check').eq(0).prop("checked", true);
                $(this).parents('.cartBox').find('.son_check').eq(1).parents('.inputwarp').addClass('mark');
            } else {
                //否则，全局全选按钮取消对勾
                $wholeChexbox.prop("checked", false);
                $wholeChexbox.parents('.inputwarp').removeClass('mark');

                //店铺下的checkbox选中状态
                $(this).parents('.cartBox').find('.son_check').prop("checked", false);
                $(this).parents('.cartBox').find('.son_check').parents('.inputwarp').removeClass('mark');
                $('#all_del').prop("checked", false);
                $('#all_del').parents('.inputwarp').removeClass('mark');
            }
            totalMoney();
        });
    });


    //========================================每个店铺checkbox与其下商品的checkbox的关系======================================================

    //店铺$sonChecks有一个未选中，店铺全选按钮取消选中，若全都选中，则全选打对勾
    $cartBox.each(function () {
        var $this = $(this);
        var $sonChecks = $this.find('.son_check');
        $sonChecks.each(function () {
            $(this).click(function () {
                if ($(this).is(':checked')) {
                    //判断：如果所有的$sonChecks都选中则店铺全选打对勾！
                    var len = $sonChecks.length;
                    var num = 0;
                    $sonChecks.each(function () {
                        if ($(this).is(':checked')) {
                            num++;
                        }
                    });
                    if (num == len) {
                        $(this).parents('.cartBox').find('.shopChoice').prop("checked", true);
                        $(this).parents('.cartBox').find('.shopChoice').parents('.inputwarp').addClass('mark');
                    }

                } else {
                    //否则，店铺全选取消
                    $(this).parents('.cartBox').find('.shopChoice').prop("checked", false);
                    $(this).parents('.cartBox').find('.shopChoice').parents('.inputwarp').removeClass('mark');
                }
                totalMoney();
            });
        });
    });


    //=================================================商品数量==============================================
    var $plus = $('.plus'),
        $reduce = $('.reduce'),
        $all_sum = $('.sum');
    $plus.click(function () {
        var $inputVal = $(this).prev('input'),
            $count = parseInt($inputVal.val()) + 1,
            $obj = $(this).parents('.amount_box').find('.reduce'),
            $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
            $price = $(this).parents('.order_lists').find('.price').html(),  //单价
            $priceTotal = $count * parseInt($price.substring(1));
        $inputVal.val($count);
        $priceTotalObj.html('￥' + $priceTotal);
        if ($inputVal.val() > 1 && $obj.hasClass('reSty')) {
            $obj.removeClass('reSty');
        }
        totalMoney();
    });

    $reduce.click(function () {
        var $inputVal = $(this).next('input'),
            $count = parseInt($inputVal.val()) - 1,
            $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
            $price = $(this).parents('.order_lists').find('.price').html(),  //单价
            $priceTotal = $count * parseInt($price.substring(1));
        if ($inputVal.val() > 1) {
            $inputVal.val($count);
            $priceTotalObj.html('￥' + $priceTotal);
        }
        if ($inputVal.val() == 1 && !$(this).hasClass('reSty')) {
            $(this).addClass('reSty');
        }
        totalMoney();
    });

    $all_sum.keyup(function () {
        var $count = 0,
            $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
            $price = $(this).parents('.order_lists').find('.price').html(),  //单价
            $priceTotal = 0;
        if ($(this).val() == '') {
            $(this).val('1');
        }
        $(this).val($(this).val().replace(/\D|^0/g, ''));
        $count = $(this).val();
        $priceTotal = $count * parseInt($price.substring(1));
        $(this).attr('value', $count);
        $priceTotalObj.html('￥' + $priceTotal);
        totalMoney();
    })

    //======================================移除商品========================================

    var $order_lists = null;
    var $order_content = '';
    $('.delBtn').click(function () {
        $order_lists = $(this).parents('.order_lists');
        $order_content = $order_lists.parents('.order_content');
        $('.model_bg').fadeIn(300);
        $('.my_model').fadeIn(300);
        var id = $order_lists.data('id');

        //关闭模态框
        $('.closeModel').click(function () {
            closeM();
        });
        $('.dialog-close').click(function () {
            closeM();
        });
        function closeM() {
            $('.model_bg').fadeOut(300);
            $('.my_model').fadeOut(300);
        }
        //确定按钮，移除商品
        $('.dialog-sure').click(function () {
            $order_lists.remove();
            $.ajax({
                type: 'get',
                url: '../api/deleteCart.php',
                data: 'gid=' + id,
                success: function (str) {
                    console.log(str)
                }
            });
            if ($order_content.html().trim() == null || $order_content.html().trim().length == 0) {
                $order_content.parents('.cartBox').remove();
                update();
            }
            closeM();
            $sonCheckBox = $('.son_check');
            totalMoney();
        })
    });

    //购物列表没商品出现提示
    function update() {
        if ($('.cartBox').size() <= 0) {
            $('.cartMain').css('display', 'none');
            $('.myShoppingCart').css('display', 'block');
        }
    }
    update();




    //全删
    $('.all_delBtn').click(function () {
        $sonCheckBox.each(function () {
            if ($(this).is(':checked')) {
                //判断：所有单个商品是否勾选
                var len = $sonCheckBox.length;
                var num = 0;
                $sonCheckBox.each(function () {
                    if ($(this).is(':checked')) {
                        num++;
                    }
                });
                if (num == len) {
                    $order_lists = $('.order_lists');
                    $order_content = $order_lists.parents('.order_content');
                    $('.model_bg').fadeIn(300);
                    $('.my_model').fadeIn(300);
                    $('.closeModel').click(function () {
                        closeM();
                    });
                    $('.dialog-close').click(function () {
                        closeM();
                    });
                    function closeM() {
                        $('.model_bg').fadeOut(300);
                        $('.my_model').fadeOut(300);
                    }
                    //确定按钮，移除商品
                    $('.dialog-sure').click(function () {
                        $.ajax({
                            type: 'get',
                            url: '../api/deleteCart.php',
                            data: 'gid=',
                            success: function (str) {
                                console.log(str)
                            }
                        })
                        $order_lists.remove();
                        if ($order_content.html().trim() == null || $order_content.html().trim().length == 0) {
                            $order_content.parents('.cartBox').remove();
                            update()

                        }
                        closeM();
                        $sonCheckBox = $('.son_check');
                        totalMoney();
                    })
                }
            }
        });

    });
    //======================================总计==========================================

    function totalMoney() {
        var total_money = 0;
        var total_count = 0;
        var calBtn = $('.calBtn a');
        $sonCheckBox.each(function () {
            if ($(this).is(':checked')) {
                var goods = parseInt($(this).parents('.order_lists').find('.sum_price').html().substring(1));
                var num = parseInt($(this).parents('.order_lists').find('.sum').val());
                total_money += goods;
                total_count += num;
            }
        });
        $('.total_text').html('￥' + total_money);
        $('.piece_num').html(total_count);

        // console.log(total_money,total_count);

        if (total_money != 0 && total_count != 0) {
            if (!calBtn.hasClass('btn_sty')) {
                calBtn.addClass('btn_sty');
            }
        } else {
            if (calBtn.hasClass('btn_sty')) {
                calBtn.removeClass('btn_sty');
            }
        }
    }

    //结算吸底
    // $(window).scroll(function (ev) {
    //     var scl = window.innerHeight//获取滚动值
    //     var sclHeight = $('.Genuine').offset().top;
    //     console.log(scl / 1.5)
    //     if (scl >= 800) {
    //         $('.bar-wrapper').css({ 'position': '', 'bottom': 0 });
    //     } else {
    //         $('.bar-wrapper').css({ 'position': 'fixed', 'bottom': -1 });
    //     }
    // });

    //登录更新
    function updeta() {
        var username = cookie.get('usn');
        var uid = cookie.get('id');
        // console.log(uid)
        if (uid != '0') {
            $('#loginedBox').css('display', 'block');
            $('#unloginBox').css('display', 'none');
            $('#logined_username').html(username);
        } else {
            $('#loginedBox').css('display', 'none');
            $('#unloginBox').css('display', 'block');
        }
    }
    updeta();

    //点击退出
    $('#logOut').click(function () {
        // cookie.remove('id');
        cookie.remove('id');
        updeta();
    });

});
