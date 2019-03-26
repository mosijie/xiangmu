<?php
    //查询整个购物车表
    include 'conn.php';
       
    $sql = "SELECT *FROM neworders";
    
    $res = $conn->query($sql);


    $arr = $res->fetch_all(MYSQLI_ASSOC);


    echo json_encode($arr,JSON_UNESCAPED_UNICODE);

?>