<?php
    include 'conn.php';

    $goods = isset($_POST['goods']) ? $_POST['goods'] : '';

    //模糊查询语句
    $sql = "SELECT * FROM goodslistmiya  WHERE name LIKE '%$goods%'";
    
    $res = $conn->query($sql);


    $arr = $res->fetch_all(MYSQLI_ASSOC);


    echo json_encode($arr,JSON_UNESCAPED_UNICODE);


?>