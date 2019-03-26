<?php
    //制作查询账号密码接口，返回一个状态给前端。
    include 'conn.php';

    // echo 'post成功'
    //接受数据
    $name = isset($_POST['username']) ? $_POST['username'] :'';
    $psw = isset($_POST['password']) ? $_POST['password'] :'';

    //查询语句
    $sql = "SELECT *FROM username_list WHERE name='$name' AND password= '$psw'";


    //执行
    $arr1 = $conn->query($sql);
    
    $arr2 = $arr1->fetch_all(MYSQLI_ASSOC);
    // var_dump($arr2);

    
    $datalist = array(
        'data'  => $arr2,//查询到的数据
        'res'  => $arr1->num_rows//num_rows' => int 1 表示存在
    );
    
    //数据给前端
    echo json_encode($datalist,JSON_UNESCAPED_UNICODE);
?>