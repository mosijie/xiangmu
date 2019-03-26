<?php
    include 'conn.php';
     
    $str = isset($_GET['name']) ? $_GET['name'] : '';
    // echo $str;
    $sql = "SELECT * FROM goodslistmiya WHERE name LIKE '%$str%'";

    // echo '成功';
    //花王33条尤妮佳31条进行判断
    $arr1 = $conn->query($sql);//num_rows' => int 33
    // var_dump($arr1);
    $arr2 = $arr1->fetch_all(MYSQLI_ASSOC);
    
    if($arr1->num_rows == 33){
        echo json_encode($arr2,JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode($arr2,JSON_UNESCAPED_UNICODE);
    }
?>