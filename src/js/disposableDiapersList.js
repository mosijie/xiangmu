// 渲染
$(function () {

    function show(id, arr) {
        var html = arr.map(function (item) {
            return `<div class="znkItem" data-id="${item.id}">
                        <div class="mark_wrap_x46 mark_diaper">
                        </div>
                        <div class="mark_custom_120" data-url="###">
                        </div>
                        <div class="znkPic">
                            <a href="javascript:;" target="_blank" title="${item.name}">
                                <img class="lazyload"
                                    src="../img/loading.gif"
                                    data-src="../img/${item.img}"
                                    alt="" width="232px" height="232px">
                            </a>
                        </div>

                        <div class="znkSc"><span class="f14">112</span><span class="songti f12">件已疯抢！</span></div>

                        <div class="znkPrice">
                            <span class="ver nfp1">¥</span>
                            <span class="nfp2">${item.new_price}</span>
                            <span class="nfp4 songti">${item.old_price}</span>
                        </div>
                        <div class="znkDes">
                            <a href="/item-2434891.html" target="_blank" title="${item.name}">
                                ${item.name} </a>
                        </div>
                    </div>`
        }).join('');
        $('#' + id + ' .znkList').html(html);
    }


    function now() {
        $.ajax({
            type: 'GET',
            url: '../api/disposableDiapersList.php',
            data: 'name=花王',
            async: false,
            success: function (str) {
                var arr = JSON.parse(str);
                // console.log(arr);
                show('znk_hw', arr);
            }
        });
        $.ajax({
            type: 'GET',
            url: '../api/disposableDiapersList.php',
            data: 'name=尤妮佳',
            async: false,
            success: function (str) {
                var arr = JSON.parse(str);
                // console.log(arr);
                show('znk_ynj', arr);
            }
        });
    }
    now();

    //详情页需要滑动显示二级菜单
    $('#navMenus').hover(function () {
        $('.dls').toggle();
    });
    //点击更多加载
    $('#brandMore').click(function () {
        $('#brandMore').toggleClass('brand-more');
        var str = $('#brandMore').html()//开关
        if (str == '更多') {//更多的时候显示
            $('#brandMore').html('收起');
            $('#nfBox').attr('class', 'filtBox');
            $('.brand-logo').attr('class', 'brand-logo');
            $('#filtMore').children('i').attr('class', 'cur');
        } else {
            $('#brandMore').html('更多');
            $('#nfBox').attr('class', 'filtBox nfBox');
            $('.brand-logo').attr('class', 'brand-logo nfLogo');
        }
    });
    //排序吸顶
    $(window).scroll(function () {
        var scl = window.scrollY//获取滚动值
        var sclHeight = $('#znk_hw').offset().top
        if (scl >= sclHeight) {
            $('#nfBar').show().css({ 'position': 'fixed', 'top': 0 });
        } else {
            $('#nfBar').hide().css('position', '');
            // $('#brandMore').css('display', 'block');
        }
    });

    var iSok = false;
    //体重筛选拖拽查询
    $('#moveBtn').mousedown(function (ev) {
        var bx = ev.clientX - moveBtn.offsetLeft;//相对距离
        iSok = true;
        $(document).mousemove(function (ev) {
            var move = ev.clientX - bx;//初始位置
            // console.log(move)
            if (move <= 0) {
                move = 0;
            } else if (move >= ($('.nat').width() - $('#moveBtn').width())) {
                move = ($('.nat').width() - $('#moveBtn').width());
            }
            $('#moveBtn').css('left', move);
            $('.cross').css('width', move) //进度条增加
            //滚动数值跟着变动
            //计算比例
            var scal = move / ($('.nat').width() - $('#moveBtn').width());
            //乘以最大体重数
            var MaxNum = $('.weightLine').next().html().slice(0, 2) * 1
            var num = parseInt(scal * MaxNum);
            // console.log(num)
            $('#weightNum').html(num);
        });
        if (iSok) {
            $(document).mouseup(function () {
                $(document).unbind('mousemove');
                var kg = $('#weightNum').html() * 1;
                iSok = false;
                console.log(kg);
                if (kg) {//不能为0千克
                    //查询相应千克的内容
                    $.ajax({
                        type: 'get',
                        url: '../api/disposableDiapersList02.php',
                        data: 'kg=' + kg,
                        success: function (str) {
                            // console.log(str);
                            var arr = JSON.parse(str);
                            $('.weightbg').hide();//隐藏滑动条
                            $('#znk_hw .znkTitle').hide();//隐藏列表头部广告
                            $('#znk_ynj').hide();//隐藏尤尼佳
                            show('znk_hw', arr);//查询渲染
                            $(document).unbind('mouseup');//停止事件
                        }
                    });
                    $('.seterm-on').show();//显示查询的条数
                    $('#se_weightNum').html(kg + 'kg');//获取到的kg渲染到显示条
                }
            });
        }
    });

    //点击关闭查询到的kg内容还原初始化渲染
    $('#se_weightBtn').click(function(){
        $('#znk_hw .znkTitle').show();
        $('#znk_ynj').show();
        $('.weightbg').show();
        now();
        $('.seterm-on').hide();//显示查询的条数
    });

    //懒加载
    function lazyload() { //监听页面滚动事件
        var seeHeight = document.documentElement.clientHeight; //可见区域高度
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动条距离顶部高度
        //触发点显示
        $('.znkPic img').each(function (i, item) {
            var url = $('.znkPic img').eq(i).data('src')
            var sclHeihgt = $('.znkPic img').eq(i).offset().top;
            if (sclHeihgt < seeHeight + scrollTop) {
                if (url == url) {
                    $('.znkPic img').eq(i).attr('src', url);
                }
            }
        });

    }
    //简单的节流函数
    function throttle(fun, delay, time) {
        var timeout,
            startTime = new Date();
        return function () {
            var context = this,
                args = arguments,
                curTime = new Date();
            clearTimeout(timeout);
            // 如果达到了规定的触发时间间隔，触发 handler
            if (curTime - startTime >= time) {
                fun.apply(context, args);
                startTime = curTime;
                // 没达到触发间隔，重新设定定时器
            } else {
                timeout = setTimeout(function () {
                    fun.apply(context, args);
                }, delay);
            }
        };
    };
    // 实际想绑定在 scroll 事件上的 handler
    // 采用了节流函数
    window.addEventListener('scroll', throttle(lazyload, 500, 1000));

    // 跳转详情页
    $('.znkItem').click(function () {
        var uid = $(this).data('id')
        location.href = 'goods_center.html?' + uid;
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
