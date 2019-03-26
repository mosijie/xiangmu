<?php

     include 'conn.php';
     
     $sql = "SELECT * FROM goodslistmiya LIMIT 0,15";
    //  echo '成功';
     $arr1 = $conn->query($sql);
    
     $arr2 = $arr1->fetch_all(MYSQLI_ASSOC);
     
     echo json_encode($arr2,JSON_UNESCAPED_UNICODE);
     
?>