<?php
    //制作查询该用户接口，返回一个值回去告诉前段是否存在
    include 'conn.php';

    //接收用户名数据：isset()判断是否接入收到值，接收到就用接收到的数据，否则为空
    $name = isset($_POST['username']) ? $_POST['username'] : '';
    // echo '你好'.$name;
    //查询语句
    $sql = "SELECT *FROM username_list WHERE NAME='$name'";
    
    //执行sql语句得到结果集
    $res = $conn -> query($sql);

    // var_dump($res)  public 'num_rows' => int 0

    //结果集num_rows属性，有就是1，没有就是0
    if($res->num_rows){
        echo 'no';
    } else {
        echo 'yes';
    }   
    
?>