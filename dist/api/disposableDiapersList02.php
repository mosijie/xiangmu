<?php
    include 'conn.php';
    //查询千克
    $kg = isset($_GET['kg']) ? $_GET['kg'] : '';
    
    $sql = "SELECT * FROM goodslistmiya WHERE weight LIKE $kg";
    
    $arr1 = $conn->query($sql);//num_rows' => int 33
    // var_dump($arr1);
    $arr2 = $arr1->fetch_all(MYSQLI_ASSOC);
    
    echo json_encode($arr2,JSON_UNESCAPED_UNICODE);
    
?>