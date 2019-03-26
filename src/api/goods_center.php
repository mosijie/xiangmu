<?php
    include 'conn.php';
    //接收id数据
    $id = isset($_POST['uid']) ? $_POST['uid'] : '';
    //根据id查询数据库
    $sql = "SELECT *FROM goodslistmiya WHERE id=$id";

    $res = $conn->query($sql);

    $arr = $res->fetch_all(MYSQLI_ASSOC);

    echo json_encode($arr,JSON_UNESCAPED_UNICODE);

?>