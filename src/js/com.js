$(function () {
    //登录状态后我的蜜芽滑动显示下拉菜单
    $('.my-mia').hover(function () {
        $('.my-mia ul').toggle();
    });

    //下拉菜单对应高亮
    $('.my-mia').find('li').hover(function () {
        $(this).css({ 'background': '#f5f5f5' })
            .find('a')
            .css({ 'color': ' #fa4b9b' });
    }, function () {
        $(this).css({ 'background': '' })
            .find('a')
            .css({ 'color': '' });;
    });

    //购物车滑过显示购物车内容
    $('.func-cart').hover(function () {
        $(this).attr('class', 'func-cart hover');
    }, function () {
        $(this).attr('class', 'func-cart');
    });

    //搜索框是使用事件委托点击id对应就显示热门搜，不是就隐藏
    $('body').click(function (ev) {
        if (ev.target.id == 'productWord') {
            var str = $('.lenovoWord').find('.stylecolor').html()
            $('.lenovoWord').show();
            $('#productWord').val(str);
        } else {
            $('.lenovoWord').hide();
        }
    });

    //正品保证下拉菜单
    $('.nav-guarantee').hover(function () {
        $('.list').toggle();
    });

    //二级菜单
    $('.dls').children('dl').hover(function () {
        $(this).attr('class', 'hover');
    }, function () {
        $(this).attr('class', '');
    });


    //显示回到顶部
    $(window).scroll(function () {
        var scl = window.scrollY//获取滚动值
        var sclHeihgt = $('.header').outerHeight() - 20//临界值
        if (scl >= sclHeihgt) {
            $('.sideBar').show();
        } else {
            $('.sideBar').hide();
        }
        //缓慢版
        $('.side-top').click(function () {
            if (scl > 0) {
                $("html,body").stop().animate({ scrollTop: 0 });
            }
        });
    });

    //登录更新
    function updeta() {
        var username = cookie.get('usn');
        var uid = cookie.get('id');
        console.log(uid)
        if (uid != '0'&& uid != null) {
            $('#loginedBox').css('display', 'block');
            $('#unloginBox').css('display', 'none');
            $('#logined_username').html(username);
        } else {
            $('#loginedBox').css('display', 'none');
            $('#unloginBox').css('display', 'block');
        }
    }
    

    //点击退出
    $('#logOut').click(function () {
        // cookie.remove('id');
        cookie.remove('id');
        updeta();
    });
    updeta();

   

});
