$(function () {
    //详情页需要滑动显示二级菜单
    $('#navMenus').hover(function () {
        $('.dls').toggle();
    });
    //价格查询显示按钮
    $('.inp-pce').hover(function () {
        $('.input-submit').toggle();
    });
    //排序吸顶
    $(window).scroll(function () {
        var scl = window.scrollY//获取滚动值
        var sclHeight = $('.reputation').offset().top
        // console.log(sclHeight)
        if (scl >= sclHeight) {
            $('.bmtitle').css({ 'position': 'fixed', 'top': 0 });
        } else {
            $('.bmtitle').css('position', '');
        }
    });

    //每一个右边添加类margin-right0类名
    function mar() {
        var box = $('.block').size();
        for (var i = 0; i < box; i++) {
            if ((i + 1) % 4 == 0) {
                $('.block').eq(i).attr('class', 'block mr0');
            }
        }
    }

    //渲染初始
    function show(arr) {
        var html = arr.map(function (item) {
            return `<div class="block" data-id="${item.id}">
        <div class="mark_wrap_x46">
            <span class="mark_item"></span>
        </div>
        <a href="javascript:;" title="${item.tite}" target="_blank">
            <img src="../img/${item.img}"
                width="267" height="267" alt="${item.tite}">
        </a>
        <div class="bmfo rel" id="item_k_${item.id}">
            <div class="saled">
                <div>
                    <em class="pink fl">¥</em>
                    <span class="Tahoma f20 pink fl blod" bid="3072144"
                        id="sale_price_3072144">${item.new_price}</span>
                    <span class="originalPrice fr">¥${item.old_price}</span>
                    <span class="gsh-mark fl">自营</span>
                    <span class="free_tax fl">包税</span>
                </div>
            </div>
            <p class="hasActive">
                <a href="javascript:;" target="_blank" title="${item.name}">${item.name}</a>
            </p>
            <div class="tahoma_active"><span>直降</span>
                直降 </div>
            <!-- 为你推荐精明之选 列表-->
        </div>
    </div>`
        }).join('');
        $('#Lconlist').html(html);
        //页码渲染
    }

    var isokdown = false;
    var isokup = false;
    var isokNext = true;
    //渲染初始
    $.ajax({
        type: 'post',
        url: '../api/goods_list.php',
        data: 'page=1&qty=10',
        success: function (str) {
            var arr1 = JSON.parse(str).list;
            var arr = JSON.parse(str);
            //渲染
            show(arr1);
            mar();//类名margin-right：0
            hreF()//跳转详情
            //总页数
            var num = Math.ceil(arr.total / arr.qty);
            pageNum(num);
            //初始化人气默认渲染
            $('.bmtitle span').eq(0).click(function () {
                show(arr);//渲染
                mar();//右边添加mr0类名
                $('#UpOrDown i').hide().attr('class', 'iconfont');
                $('.bmtitle span').attr('class', '');
                $(this).attr('class', 'active');
                pageHi()
                isokNext = true;
            });
            //页码跳转
            $('#page a').click(function () {
                $('#page a').attr('class', '');
                $(this).attr('class', 'hover');
                var page = $(this).html();
                //正常下一页
                if (isokNext) {
                    $.ajax({
                        type: 'post',
                        url: '../api/goods_list.php',
                        data: 'page=' + page + '&qty=10',
                        success: function (str) {
                            // console.log(str)
                            var arr = JSON.parse(str).list;
                            show(arr);
                            mar();
                        }
                    });
                }
                //降序下一页
                if (isokdown) {
                    $.ajax({
                        type: 'post',
                        url: '../api/goods_list.php',
                        data: 'pageDown=' + page + '&qtyDown=10',
                        success: function (str) {
                            var arr = JSON.parse(str).list;
                            show(arr);
                            mar();
                        }
                    })
                }
                //升序下一页
                else if (isokup) {
                    $.ajax({
                        type: 'post',
                        url: '../api/goods_list.php',
                        data: 'pageUP=' + page + '&qtyUP=10',
                        success: function (str) {
                            var arr = JSON.parse(str).list
                            show(arr);
                            mar();
                        }
                    })
                }
            });

        }
    });
    //跳转封装
    function hreF() {
        $('.block').click(function () {
            var uid = $(this).data('id')
            location.href = 'goods_center.html?' + uid;
        });
    }

    //升降序
    var isok = true;
    $('#UpOrDown').click(function () {
        $('.bmtitle span').attr('class', '');
        $(this).attr('class', 'active');
        if (isok) {
            $('#UpOrDown i').show().attr('class', 'iconfont');
            $.ajax({
                type: 'post',
                url: '../api/goods_list.php',
                data: 'pageDown=1&qtyDown=10',
                success: function (str) {
                    var arr = JSON.parse(str).list
                    show(arr);
                    mar();
                    pageHi();
                    hreF();
                }
            })
            isokdown = true;
            isokup = false;
            isokNext = false;
        } else {
            $('#UpOrDown i').show().attr('class', 'iconfont up');
            $.ajax({
                type: 'post',
                url: '../api/goods_list.php',
                data: 'pageUP=1&qtyUP=10',
                success: function (str) {
                    var arr = JSON.parse(str).list
                    show(arr);
                    mar();
                    pageHi();
                    hreF();
                }
            });
            isokdown = false;
            isokup = true;
            isokNext = false;
        }
        isok = !isok

    });

    //页数封装
    function pageNum(num) {
        var html1 = '';
        for (var i = 0; i < num; i++) {
            html1 += `<a href="javascript:;">${i + 1}</a>&nbsp;`
        }
        $('#page p').html(html1);//页码渲染
        $('#page a').eq(0).attr('class', 'hover');//第一个高亮
    }

    //当前第一个高亮
    function pageHi() {
        $('#page a').attr('class', '');
        $('#page a').eq(0).attr('class', 'hover');
    }


    $('#searchButton').click(function () {
        var tex = $('#productWord').val().trim();
        if (tex) {
            $.ajax({
                type: 'post',
                url: '../api/goods_like.php',
                data: 'goods=' + tex,
                success: function (str) {
                    var arr = JSON.parse(str);
                    console.log()
                    if (arr.length) {
                        $('#searchEmpty').hide();
                        $('#Lconlist').show()
                        $('#page p').show()
                        show(arr);
                        mar();
                    }
                    else {
                        $('#Lconlist').hide();
                        $('#page').hide();
                        $('#searchEmpty').show();
                    }
                }
            })
        }
    });

    $('#productWord').keydown(function (ev) {
        if (ev.keyCode == '13') {
            var tex = $('#productWord').val().trim();
            if (tex) {
                $.ajax({
                    type: 'post',
                    url: '../api/goods_like.php',
                    data: 'goods=' + tex,
                    success: function (str) {
                        var arr = JSON.parse(str);
                        if (arr.length) {
                            $('#searchEmpty').hide();
                            $('#Lconlist').show()
                            $('#page p').show()
                            show(arr);
                            mar();
                        }
                        else {
                            $('#Lconlist').hide();
                            $('#page').hide();
                            $('#searchEmpty').show();
                        }
                    }
                })
            }
        }
    });

    //购物车是否有东西
    $('#cart_num').mouseover(function () {
        cart_num()
    });
    function cart_num() {
        $.ajax({
            type: 'get',
            url: '../api/cart.php',
            async: true,
            success: function (str) {
                var arr = JSON.parse(str);
                // console.log(arr)
                // console.log(arr.length);
                var num = arr.length;//下标就是多少件商品
                if (num) {
                    $('#cart_num').show().html(num);
                    var html = arr.map(function (item) {
                        return ` 
                                        <dl>
                                            <dt>
                                                <a href="goodslist.html" target="_blank">
                                                    <img src="../img/${item.img}"
                                                        height="50" width="50" alt="${item.name} ">
                                                </a>
                                            </dt>
                                            <dd>
                                                <p class="tit"><span class="price">¥${item.price}</span>
                                                    <a href="goodslist.html" target="_blank">${item.name}</a>
                                                </p>
                                                <p class="num">x${item.num}</p>
                                            </dd>
                                        </dl>`
                    }).join('');
                    var HTML = '<h5>最近加入的商品</h5>' + html + '<div class="to"><a href="cart.html" target="_blank">查看我的购物车</a></div>'
                    $('#shop_cart').html(HTML);
                    $('#shop_cart .empty').hide();
                } else {
                    $('#cart_num').hide().html();
                    $('#shop_cart .empty').show();
                }
            }
        });
    }
    cart_num();

});
