$(function () {
    var isok = false;

    $('#slideSon').mousedown(function (ev) {
        var bx = ev.clientX - slideSon.offsetLeft;//相对距离
        $(document).mousemove(function (ev) {
            var move = ev.clientX - bx;//初始位置
            if (move <= 0) {
                move = 0;
            } else if (move >= ($('#slideBox').width() - $('#slideSon').width())) {
                move = $('#slideBox').width() - $('#slideSon').width();//临界点
                if (move) {//抵达临界点
                    $('#slideSon').unbind('mousedown');
                    $(document).unbind('mousemove');
                    $('#right').css('display', 'none');
                    $('#ye').css('display', 'block');
                    $('#slideFont').css('display', 'none');
                    $('#slideColor').html('验证通过');
                    isok = true;
                }
            }
            $('#slideSon').css('left', move)
            $('#slideColor').css('width', move) //进度条增加
            $(document).mouseup(function () {
                $(document).unbind('mousemove');
                if (!isok) {//为false就返回原点
                    $('#slideSon').stop().animate({ left: 0 })
                    $('#slideColor').stop().animate({ width: 0 })
                }
            });
        });
    });

    $('#btn').click(function () {
        console.log('aa')
        var psw = $('#password').val().trim();
        var useName = $('#usename').val().trim();
        if (psw && useName) {
            if (isok) {
                $.ajax({
                    type: 'POST',
                    url: '../api/login.php',
                    data: 'username=' + useName + '&password=' + psw,
                    success: function (str) {
                        // console.log(str)
                        var res = JSON.parse(str);
                        // console.log(res)
                        if (res.res) {
                            alert('登录成功！');
                            $('#usename').val('');
                            $('#password').val('');
                            // 存到cookie
                            var now = new Date();
                            now.setDate(now.getDate() + 1);
                            cookie.set('usn', res.data[0].name, { expires: now, path: '/' });
                            cookie.set('id', res.data[0].id, { expires: now, path: '/' });
                            location.href = '../index.html';//回到首页
                        } else {
                            alert('账号或密码错误');

                        }
                    }
                })
            } else {
                alert('滑动验证');
            }
        } else {
            alert('请输入账户或密码');
        }
    });


});