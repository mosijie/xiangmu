$(function () {
    var id = decodeURI(location.search).slice(1) * 1;
    // console.log(id)
    //渲染
    function show(arr) {
        var html = arr.map(function (item) {
            return ` <div class="breadCrumbs">
                        <div class="container songti">
                            <a href="/index.html">蜜芽首页</a>
                            >
                            <a target="" href="###" title="${item.name}">${item.name}</a>
                            >${item.tite}
                        </div>
                    </div>
                    <div class="content detail">
                                <div class="container">
                                    <!-- 商品 -->
                                    <div class="show clearfix">
                                        <div class="left fl rel">
                                            <!-- 图片 -->
                                            <div class="big rel" id="bigImg">
                                                <img src="../img/${item.img}"
                                                    width="400" height="400" alt="${item.name}">
                                                <div id="magMove" style="display:none;top:0;left: 0;"></div>
                                            </div>
                                            <div class="small">
                                                <img src="../img/${item.img}"
                                                    alt="" class="change_pic select_small_img">
                                                <img src="../img/${item.img}"
                                                    alt="" class="change_pic">
                                                <img src="../img/${item.img}"
                                                    alt="" class="change_pic">
                                                <img src="../img/${item.img}"
                                                    alt="" class="change_pic">
                                                <img src="../img/${item.img}"
                                                    alt="" class="change_pic">
                                            </div>
                                        </div>
                                        <!-- 放大镜 -->
                                        <div id="magnifImg" style="display:none">
                                            <img src="../img/${item.img}"
                                                width="620" height="620" alt="黄金酵素 酵素升级版120粒/袋">
                                        </div>
                                        <!-- 售价规格 -->
                                        <div class="right fr right-groupon">
                                            <div class="M_productInfo">
                                                <div class="country f14 mb10 clearfix">
                                                    <div class="fl">
                                                        <span>保税仓商家发货</span>
                                                    </div>
                                                </div>
                                                <div class="brand f14 mb10">
                                                    <span class="baoyou">[包税包邮]</span>
                                                    <a href="" target="_blank">
                                                        IDG</a>
                                                    <span>${item.name}</span>
                                                </div>
                                                <div class="titlecon clearfix mb10 f14">
                                                    <div class="left yahei fl">
                                                        <a href="" class="pink"></a>
                                                        ${item.tite}</div>
                                                </div>
                                                <div class="pi_price_box">
                                                    <div class="price_info">
                                                        <span class="tit_txt yahei">售价</span>
                                                        <span class="pbox_price"><i class="pbox_yen">¥</i><em id="item_price">${item.new_price}</em>
                                                        </span>
                                                        <span class="pbox_market"><span>¥</span> <del id="mprice" class="f14">${item.old_price}</del>
                                                        </span>
                                                        <span class="jks">进口税
                                                            <span class="layer_shui">由第三方商家承担</span>
                                                        </span>
                                                    </div>
                                                    <div id="i_youhui_bak" class="i_youhui clearfix">
                                                        <dt class="num_name tit_txt yahei" style="float:left;">优惠</dt>
                                                        <dt class="num_txt" style="float:left;"><a href="/promotion-82088.html">
                                                                <div class="markwarp"><i class="mark-tejia">直降</i>直降</div>
                                                            </a></dt>
                                                    </div>
                                                </div>
                                                <div class="pi_attr_box">
                                                    <div id="popupSkuArea" class="color">
                                                        <div class="sku_kind tit_txt">可选</div>
                                                        <div class="sku_choose" id="skuPop1">
                                                            <span class="item_list active" no="1" data-text="默认" dis="0">默认</span>
                                                            <span class="item_list" no="1" data-text="默认" dis="0">推荐</span>
                                                        </div>
                                                        <div class="sku_kind tit_txt">规格</div>
                                                        <div class="sku_choose" id="skuPop2">
                                                            <span class="item_list active" no="2" data-text="默认" dis="0">默认</span>
                                                            <span class="item_list " no="1" data-text="中份" dis="0">中</span>
                                                            <span class="item_list " no="1" data-text="大份" dis="0">大</span>
                                                        </div>
                                                    </div>
                                                    <dl id="J_num_select" class="i_num clearfix">
                                                        <dt class="num_name tit_txt fz14">数量</dt>
                                                        <dd class="i_notice_msg J_num_tips"></dd>
                                                        <dd class="num_box">
                                                            <span class="num_reduce J_num_act_reduce"></span>
                                                            <em class="num_input" id="buyAmount">1</em>
                                                            <span class="num_add J_num_act_add"></span>
                                                        </dd>
                                                    </dl>
                                                    <div class="clearfix cartAdd_submit hide" id="fcart">
                                                        <div class="button_f" id="itemProcess1" style="display:block">
                                                            <a href="javascript:void(0)" class="btn_07 f14" id="J_cartAdd_submit">加入购物车</a>
                                                            <p id="sepcailNotice"></p>
                                                        </div>
                                                        <div class="button_f" id="itemProcess3" style="display:none">
                                                            <a href="javascript:void(0)" class="btn_07 f14"
                                                                id="J_cartAdd_submit">商品已经加入购物车</a>
                                                            <p id="sepcailNotice"></p>
                                                        </div>
                                                        <div class="button_f" id="itemAttention">
                                                            <a href="javascript:void(0)" class="btn_07_f f14" id="attend_submit">
                                                                <i class="mia_icons"></i>
                                                                <span>收藏</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <dl class="other" style="padding-bottom:5px;">
                                                        <dt class="other_name">编码：</dt>
                                                        <dd class="other_box">${item.id}</dd>
                                                    </dl>
                                                    <div class="pbox_pms yahei clearfix mb10">
                                                        <ul>
                                                            <li>
                                                                <i>●</i>非自营<span>本商品由商家发货并提供售后服务</span>
                                                            </li>
                                                            <li>
                                                                <i>●</i>满88包邮<span>单笔订单金额（不含运费）满88元包邮，不足金额的订单收取10元运费（偏远地区加收10元运费）</span>
                                                            </li>
                                                            <li>
                                                                <i>●</i>不支持7天放心退<span>本商品不支持7天无理由退货</span>
                                                            </li>
                                                            <li>
                                                                <i>●</i>包税<span>本商品包税，如遇海关抽检产生税金，可联系客服报销</span>
                                                            </li>
                                                            <li>
                                                                <i>●</i>正品保障<span>所有商品均有太平洋保险承包产品质量保证险</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 猜你喜欢 -->
                                    <div class="poppro nolie J_tuijian">
                                        <h4>猜你喜欢</h4>
                                        <div class="cell">
                                            <a href="/item-3005088.html#1000103-99-13-40|b151fdb4-c188-4104-9d61-08b05ff50097"
                                                target="_blank" title="${item.tite}">
                                                <img
                                                    src="../img/${item.img}"
                                                    alt="${item.tite}" width="217" class="img">
                                                    </a>
                                            <p class="p1">
                                                <a
                                                    href="">"${item.name}"</a>
                                                    </p>
                                            <p class="p2">￥${item.new_price}</p>
                                        </div>
                                        <div class="cell">
                                            <a href="/item-3005088.html#1000103-99-13-40|b151fdb4-c188-4104-9d61-08b05ff50097"
                                                target="_blank" title="${item.tite}"><img
                                                    src="../img/${item.img}"
                                                    alt="${item.tite}" width="217" class="img"></a>
                                            <p class="p1"><a
                                                    href="">"${item.name}"</a></p>
                                            <p class="p2">￥${item.new_price}</p>
                                        </div>
                                        <div class="cell">
                                            <a href="/item-3005088.html#1000103-99-13-40|b151fdb4-c188-4104-9d61-08b05ff50097"
                                                target="_blank" title="${item.tite}"><img
                                                    src="../img/${item.img}"
                                                    alt="${item.tite}" width="217" class="img"></a>
                                            <p class="p1"><a
                                                    href="">"${item.name}"</a></p>
                                            <p class="p2">￥${item.new_price}</p>
                                        </div>
                                    </div>
                                    <!-- 商品详细 -->
                                    <div class="introduction clearfix">
                                        <div class="right fr" id="seeing">
                                            <div class="pop_license">
                                                <div class="right_block">
                                                    <div class="pubtitle yahei">服务</div>
                                                    <ul class="pubcon yahei">
                                                        <li>
                                                            <label>工商执照：</label>
                                                            <a href="/supplier/license/637" target="_blank" title="">
                                                                <img src="../img/192f4f559a52ee5a36ecb66d89c951f0188224298.png" alt="">
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="left fl" id="hash_myq">
                                            <div class="moduleFixed">
                                                <div class="moFixed moTab">
                                                    <ul class="title yahei">
                                                        <li class="current">商品详情</li>
                                                        <li class="">评价<span></span></li>
                                                        <li class="">蜜芽优势</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="p10 con_detail">
                                                <div class="area clearfix cs rel" style="padding-bottom: 12px; display: block;">
                                                    <ul class="clearfix" id="wrap_con" style="height: 100px;">
                                                        <li><b>商品名称:</b> ${item.name}</li>
                                                        <li><b>品牌:</b>VitaRealm</li>
                                                        <li><b>分类:</b>${item.name}</li>
                                                        <li><b>商品条码:</b>||||||||</li>
                                                        <li><b>商品编码:</b>${item.id}</li>
                                                        <li><b>商品名称:</b>VitaRealm${item.name}</li>
                                                        <li><b>品牌:</b>${item.name}</li>
                                                        <li><b>分类:</b>${item.name}</li>
                                                        <li><b>产品剂型:</b>${item.tite}</li>
                                                        <li><b>适用性别:</b>通用</li>
                                                        <li><b>包装方式:</b>盒装</li>
                                                        <li><b>适用对象:</b>通用</li>
                                                        <li><b>产地:</b>中国</li>
                                                        <li><b>储存方式:</b>避光,干燥,阴凉,通风</li>
                                                        <li><b>净含量:</b>${item.num}</li>
                                                        <li><b>保质期:</b>3年</li>
                                                    </ul>
                                                    <div id="read_more" style="cursor: pointer;"><a href="###">展开</a>
                                                    </div>
                                                    <div class="clearfix datacon">
                                                        <div class="dtit">
                                                            <img src="../img/sp02.gif" alt="商品详情">
                                                        </div>
                                                        <img class="lazyload" width="750px" alt="loading"
                                                            src="../img/55435e31f40e30d8d0edc817749972d2742968754.jpg"
                                                            data-src="../img/55435e31f40e30d8d0edc817749972d2742968754.jpg">
                                                        <img class="lazyload" width="750px" alt="loading"
                                                            src="../img/ad83daf96337a692f99ea48508cc2aab.jpg"
                                                            data-src="../img/ad83daf96337a692f99ea48508cc2aab.jpg">
                                                        <img class="lazyload" width="750px" alt="loading"
                                                            src="../img/fa836902b9d65d084a7b455f44e449ac983065254.jpg"
                                                            data-src="../img/fa836902b9d65d084a7b455f44e449ac983065254.jpg">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
        }).join('');
        $('.warp').html(html);
    }

    $.ajax({
        type: 'post',
        url: '../api/goods_center.php',
        data: 'uid=' + id,
        async: false,
        success: function (str) {
            // console.log(str)
            var arr = JSON.parse(str);
            show(arr)
        }
    });

    //详情页需要滑动显示二级菜单
    $('#navMenus').hover(function () {
        $('.dls').toggle();
    });
    //展开跟多
    var isok = true;
    $('#read_more').click(function () {
        if (isok) {
            $('#wrap_con').stop().animate({ height: 240 });
            $('#read_more').children('a').html('收起')
        } else {
            $('#wrap_con').stop().animate({ height: 100 });
            $('#read_more').children('a').html('更多');
        }
        isok = !isok
    });

    //渲染最后一个小图去掉margin-right:0
    $('.small').children().last().attr('id', 'mr0');

    //规格选项
    $('#skuPop1').children().click(function () {
        $('#skuPop1').children().attr('class', 'item_list');
        $(this).attr('class', 'item_list active');
    });
    $('#skuPop2').children().click(function () {
        $('#skuPop2').children().attr('class', 'item_list');
        $(this).attr('class', 'item_list active');
    });
    //购买数量增加和减少
    $('.num_box span').click(function (ev) {
        var num = $('#buyAmount').html() * 1;
        if (ev.target.className == 'num_reduce J_num_act_reduce') {
            num--
            if (num <= 1) {
                num = 1
            }
        } else if (ev.target.className == 'num_add J_num_act_add') {
            num++
            if (num >= 99) {
                num = 99;
            }
        }
        $('#buyAmount').html(num)
    });

    //滑过小图切换对应大图和放大镜图片
    $('.small img').mouseover(function () {
        $('.small').children().attr('class', '');
        $(this).attr('class', 'select_small_img');
        var url = $(this)[0].src;//获取路径
        $('#bigImg').children().attr('src', url);//大图
        $('#magnifImg').children().attr('src', url);//放大镜
    });


    // 放大镜
    $('#bigImg').hover(function () {//滑入显示
        $('#magMove').show()
        $('#magnifImg').show()
    }, function () {
        $('#magMove').hide()
        $('#magnifImg').hide()
    });

    //滚动距离
    var scrollHeight = 0;
    $(document).scroll(function(){
        scrollHeight = window.scrollY;
        
    });

    //抚摸移动遮罩
    $('#bigImg').mousemove(function (ev) {
        //可视窗口的位置
        var cliX = ev.clientX;
        var cliY = ev.clientY + scrollHeight ;

        //获取img 盒子 距离 body 顶部的距离
        var moveTop = $('#bigImg').offset().top;
        var moveLeft = $('#bigImg').offset().left;
        // console.log(moveTop+','+moveLeft);

        //计算遮罩 move 的 位置
        var l = cliX - moveLeft;
        var t = cliY - moveTop;
        var mw = $('#magMove').width() / 2;
        var mh = $('#magMove').height() / 2;

        //动起来
        $('#magMove').css({ left: l - mw + 'px', top: t - mh + 'px' });
        // 获取小框框的偏移位置
        var lw = $('#magMove').position().left;
        var lh = $('#magMove').position().top;
        var maxW = $('#bigImg').width() - $('#magMove').width()
        var maxH = $('#bigImg').height() - $('#magMove').height()
        //判断move 的临界点
        if (lw <= 0) {
            lw = $('#magMove').css({ left: '0px' });
        } else if (lw >= maxW) {
            lw = $('#magMove').css({ left: maxW + 'px' });
        }
        if (lh <= 0) {
            lh = $('#magMove').css({ top: '0px' });
        } else if (lh >= maxH) {
            lh = $('#magMove').css({ top: maxH + 'px' });
        }
        //计算鼠标 水平 和 垂直 移动的比例
        var Top = lh / ($('#bigImg').height() - $('#magMove').height());
        var Left = lw / ($('#bigImg').width() - $('#magMove').width());
        // 大图移动比例
        var moveTop = Top * ($('#magnifImg img').outerHeight() - $('#magnifImg').outerHeight());
        var moveLeft = Left * ($('#magnifImg img').width() - $('#magnifImg').width());
        $('#magnifImg img').css('top', -moveTop)
        $('#magnifImg img').css('left', -moveLeft)
    });

    //添加购物车效果
    $('#itemProcess1').click(function () {
        cart_num();//更新效果
        $('#itemProcess3').show();
        $('#itemProcess3').css({ left: 0, top: 0, opacity: 1 });
        //飞入购物车数值给的是固定的
        //1秒后飞入
        var timer = null;
        timer = setTimeout(function () {
            $('#itemProcess3').animate({ left: 390, top: -560, opacity: 0 }, 500);
            clearTimeout(timer);
        }, 1000);
        //1.5秒后关闭
        var timer1 = null;
        timer1 = setTimeout(function () {
            $('#itemProcess3').hide();
            clearTimeout(timer1);
        }, 1500);

        var id = decodeURI(location.search).slice(1);
        var num = $('#buyAmount').html()
        // console.log(num)
        $.ajax({
            type: 'get',
            url: '../api/newOrders.php',
            data: 'gid=' + id + '&num=' + num,
            success: function (str) {
                // console.log(str);
            }
        })
    });

    //购物车是否有东西
    $('#cart_num').mouseover(function () {
        cart_num();
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
