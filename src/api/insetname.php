<?php
    //符合注册制作另个一存到数据库的接口
    include 'conn.php';

    //接收用户名数据
    $name = isset($_POST['username']) ? $_POST['username'] : '';
    $psw = isset($_POST['password']) ? $_POST['password'] : '';

    //插入数据
    $sql = "INSERT INTO username_list (name,password) VALUES ('$name','$psw')";
    
    //执行
    $res = $conn -> query($sql);

    // var_dump($res)//D:\1812\mosijie3-1\api\insname.php:16:boolean true

    //返回给前段一个状态
    if($res){
        echo 'yes';
    } else {
        echo 'no';
    }

?>