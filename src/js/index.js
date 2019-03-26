$(function () {
    $.ajax({
        type: 'get',
        url: 'api/ndex.php',
        async: false,
        success: function (str) {
            var arr = JSON.parse(str);
            var arr1 = [];//渲染推荐部分
            for (var i = 0; i < 10; i++) {
                arr1.push(arr[i]);
            }
            arr1 = deepClone(arr1);
            // console.log(arr);
            var html = arr1.map(function (item) {
                return ` <a href="javascript:;"  title="" class="groupblock" id="item_${item.id}"" data-id="${item.id}"">
                                <div class="gds-img">
                                    <img width="219" height="219" src="img/loading.gif" data-src="img/${item.img}" alt="">
                                    <i class="mia-icon mark-qfl"></i>
                                </div>
                                <div class="rim">
                                    <div class="tit">${item.name}</div>
                                    <p class="desc">${item.tite}</p> 
                                    <i class="gsh-mark" style="display:none;">自营</i>
                                    <div class="price"> 
                                        <span class="new">秒杀价:¥<em>${item.new_price}</em></span> 
                                        <span class="old">市场价:¥<em>${item.old_price}</em></span> 
                                    </div>
                                    <p class="buy">12人已买</p> 
                                    <span class="btn">马上抢</span>
                                 </div>
                             </a>`
            }).join('');
            $('#recommend').html(html);

            var arr2 = [];//渲染大牌
            for (var i = 0; i < 5; i++) {
                arr2.push(arr[i]);
            }
            arr2 = deepClone(arr2);
            var html1 = arr2.map(function (item) {
                return `<div class="blank_items" data-id="${item.id}";>
                                <a href="javascript:;">
                                    <div class="gds-img">
                                        <img class="lazyload"
                                            src="img/loading.gif"
                                            data-src="img/${item.img}">
                                        <span class="free_tax">限时秒杀</span>
                                    </div>
                                    <div class="gds-desc">
                                        <p class="tit">${item.name}</p>
                                        <div class="price">
                                            <span class="new">¥<em>${item.new_price}</em></span>
                                            <span class="old">¥<em> ${item.old_price}</em></span>
                                        </div>
                                    </div>
                                </a>
                            </div> `
            }).join('');
            $('.blank_bock').eq(0).html(html1);

            var arr3 = [];//渲染大眼
            for (var i = 10; i < 15; i++) {
                arr3.push(arr[i]);
            }
            arr3 = deepClone(arr3);
            var html2 = arr3.map(function (item) {
                return `<div class="blank_items" data-id="${item.id}";>
                                <a href="javascript:;">
                                    <div class="gds-img">
                                        <img class="lazyload"
                                            src="img/loading.gif"
                                            data-src="img/${item.img}">
                                        <span class="free_tax">限时秒杀</span>
                                    </div>
                                    <div class="gds-desc">
                                        <p class="tit">${item.name}</p>
                                        <div class="price">
                                            <span class="new">¥<em>${item.new_price}</em></span>
                                            <span class="old">¥<em> ${item.old_price}</em></span>
                                        </div>
                                    </div>
                                </a>
                            </div> `
            }).join('');
            $('.blank_bock').eq(1).html(html2);

            var arr4 = [];//渲染大眼
            for (var i = 5; i < 10; i++) {
                arr4.push(arr[i]);
            }
            arr4 = deepClone(arr4);
            var html3 = arr4.map(function (item) {
                return `<div class="blank_items" data-id="${item.id}";>
                                <a href="javascript:;" target="">
                                    <div class="gds-img">
                                        <img class="lazyload"
                                            src="img/loading.gif"
                                            data-src="img/${item.img}">
                                        <span class="free_tax">限时秒杀</span>
                                    </div>
                                    <div class="gds-desc">
                                        <p class="tit">${item.name}</p>
                                        <div class="price">
                                            <span class="new">¥<em>${item.new_price}</em></span>
                                            <span class="old">¥<em> ${item.old_price}</em></span>
                                        </div>
                                    </div>
                                </a>
                            </div> `
            }).join('');
            $('.blank_bock').eq(2).html(html3);

            var arr5 = [];//童装
            for (var i = 0; i < 5; i++) {
                arr5.push(arr[i]);
            }
            arr5 = deepClone(arr5);
            var html4 = arr5.map(function (item) {
                return `<div class="blank_items" data-id="${item.id}";>
                                <a href="javascript:;" target="">
                                    <div class="gds-img">
                                        <img class="lazyload"
                                            src="img/loading.gif"
                                            data-src="img/${item.img}">
                                        <span class="free_tax">限时秒杀</span>
                                    </div>
                                    <div class="gds-desc">
                                        <p class="tit">${item.name}</p>
                                        <div class="price">
                                            <span class="new">¥<em>${item.new_price}</em></span>
                                            <span class="old">¥<em> ${item.old_price}</em></span>
                                        </div>
                                    </div>
                                </a>
                            </div> `
            }).join('');
            $('.blank_bock').eq(3).html(html4);

        }
    });


    // 轮播图swipr插件
    var s1 = new Swiper('.swiper-container', {
        autoplay: {//自动轮播
            delay: 4000,//间隔时间
            disableOnInteraction: false
        },
        loop: true,//无缝
        navigation: {//上下按钮
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {//焦点跟随
            el: '.swiper-pagination',
            clickable: true,//点击焦点跳到指定图片
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';//生成焦点
            }
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: false,
        },//选用:效果
        touchRatio: 0,//取消touch滑动效果
    });

    var oBox = document.getElementById('swiper-container');

    oBox.onmouseover = function () {//鼠标经过停止
        s1.autoplay.stop();
    }

    oBox.onmouseout = function () {//鼠标经过离开
        s1.autoplay.start();
    }


    //懒加载
    function lazyload() { //监听页面滚动事件
        var seeHeight = document.documentElement.clientHeight; //可见区域高度
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动条距离顶部高度
        //触发点显示
        $('.gds-img img').each(function (i, item) {
            var url = $('.gds-img img').eq(i).data('src')
            var sclHeihgt = $('.gds-img img').eq(i).offset().top;
            if (sclHeihgt < seeHeight + scrollTop) {
                if (url == url) {
                    $('.gds-img img').eq(i).attr('src', url);
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

    //推荐跳转
    $('.groupblock').click(function () {
        var uid = $(this).data('id')
        location.href = 'html/goods_center.html?' + uid;
    });
    $('.blank_bock .blank_items').click(function () {
        var uid = $(this).data('id')
        location.href = 'html/goods_center.html?' + uid;
    });



    //购物车是否有东西
    $('#cart_num').mouseover(function () {
        cart_num();
    });
    function cart_num() {
        $.ajax({
            type: 'get',
            url: 'api/cart.php',
            success: function (str) {
                var arr = JSON.parse(str);
                console.log(arr)
                console.log(arr.length);
                var num = arr.length;//下标就是多少件商品
                if (num) {
                    $('#cart_num').show().html(num);
                    var html = arr.map(function (item) {
                        return ` 
                                    <dl>
                                        <dt>
                                            <a href="html/goodslist.html" target="_blank">
                                                <img src="img/${item.img}"
                                                    height="50" width="50" alt="${item.name} ">
                                            </a>
                                        </dt>
                                        <dd>
                                            <p class="tit"><span class="price">¥${item.price}</span>
                                                <a href="html/goodslist.html" target="_blank">${item.name}</a>
                                            </p>
                                            <p class="num">x${item.num}</p>
                                        </dd>
                                    </dl>`
                    }).join('');
                    var HTML = '<h5>最近加入的商品</h5>' + html + '<div class="to"><a href="html/cart.html" target="_blank">查看我的购物车</a></div>'
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
