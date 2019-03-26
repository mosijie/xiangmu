$(function () {
    //用户验证
    var isok = false;
    var isok1 = false;
    $('#usename').blur(function () {
        var useName = $(this).val().trim();
        if (useName) {
            var res = checkReg.name(useName);//正则验证
            if (res) {
                $.ajax({
                    type: 'POST',
                    url: '../api/username.php',
                    data: 'username=' + useName,
                    success: function (str) {
                        // console.log(str)
                        if (str == 'yes') {
                            $('#infusen').html('✔').css('color', '#58bc58');//通过验证显示
                            $('#infTex').html('');
                            isok = true;
                        } else {
                            $('#infTex').html('该用户名太火爆了，请换一个吧').css('color', '#f450a2');
                            $('#infusen').html('✖').css('color', '#f450a2');
                            isok = false;
                        }
                    }
                });
            } else {
                $('#infTex').html('用户名：字母数字组合6位');
                $('#infusen').html('✖').css('color', '#f450a2');
                isok1 = false;
            }
        } else {
            $('#infTex').html('用户名不能为空');
            $('#infusen').html('✖').css('color', '#f450a2');
            isok1 = false;
        }
    });

    //密码安全性判断
    $('#password').keyup(function () {
        var psw = $('#password').val().trim();
        if (psw) {
            if (psw.length <= 4) {
                $('#infPsw').html('密码安全性：弱').css('color', 'red');
            } else if (psw.length >= 5 && psw.length <= 9) {
                $('#infPsw').html('密码安全性：中').css('color', 'yellowgreen');
            } else if (psw.length > 10) {
                $('#infPsw').html('密码安全性：高').css('color', '#58bc58');
                isok1 = false;
            }
        }
    });

    //确认密码判断
    $('#confPsw').blur(function () {
        var psw = $('#password').val().trim();
        var confpsw = $('#confPsw').val().trim();
        if (psw && confpsw) {
            var res = checkReg.pwwagain(psw, confpsw);//正则匹配密码一致
            if (res) {
                $('#infpsw').html('✔').css('color', '#58bc58');//通过验证显示
                isok1 = true;
            } else {
                $('#infpsw').html('✖').css('color', '#f450a2');
                isok1 = false;
            }
        } else {
            $('#infpsw').html('✖').css('color', '#f450a2');
            isok1 = false;
        }
    });

    //注册账号
    $('#btn').click(function () {
        var psw = $('#password').val().trim();
        var useName = $('#usename').val().trim();
        if (isok && isok1) {
            $.ajax({
                type: 'POST',
                url: '../api/insetname.php',
                data: 'username=' + useName + '&password=' + psw,
                success: function (str) {
                    console.log(str);
                    if (str == 'yes') {
                        alert('注册成功');
                        location.href = 'login.html';
                        $('#password').val('');
                        $('#usename').val('');
                        $('#confPsw').val('')
                    } else {
                        alert('注册失败');
                        $('#password').val('');
                        $('#usename').val('');
                        $('#confPsw').val('')
                        $('#usename').focus();
                    }
                }
            })
        } else {
            alert('注册失败');
            $('#password').val('');
            $('#usename').val('');
            $('#confPsw').val('')
            $('#usename').focus();
        }
    });
});