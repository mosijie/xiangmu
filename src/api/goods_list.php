<?php
    /*
        需求：
            查询数据库数据，做成指定字符串格式传给前端
            查询第几页往后多少条
            limit index,qty;
            (page-1)*qty=index
            page=页
            qty=内容
        
    */
    include 'conn.php';
    //写qsl语句查询整个表
    $qsl1 = "SELECT * FROM goodslistmiya";
    //执行语句
    $res1 = $conn->query($qsl1);

    //接受post数据
    $page = isset($_POST['page']) ? $_POST['page'] : '';
    $qty = isset($_POST['qty']) ? $_POST['qty'] : '';

    //写qsl语句(page-1)*qty=index
    
    // $qsl = "SELECT * FROM goodslistmiya LIMIT $index,$qty";

    $pageUP = isset($_POST['pageUP']) ? $_POST['pageUP'] : '';
    $qtyUP = isset($_POST['qtyUP']) ? $_POST['qtyUP'] : '';
    
    $pageDown = isset($_POST['pageDown']) ? $_POST['pageDown'] : '';
    $qtyDown = isset($_POST['qtyDown']) ? $_POST['qtyDown'] : '';
   
    
    if($page&&$qty){
        $index = ($page-1) * $qty;
        $qsl = "SELECT * FROM goodslistmiya LIMIT $index,$qty";
    }else if($pageDown&&$qtyDown){
        $index = ($pageDown-1) * $qtyDown;
        $qsl = "SELECT * FROM goodslistmiya  ORDER BY new_price DESC LIMIT $index,$qtyDown";
    }else if($pageUP&&$qtyUP){
        $index = ($pageUP-1) * $qtyUP;
        $qsl = "SELECT * FROM goodslistmiya  ORDER BY new_price ASC LIMIT $index,$qtyUP";
    }
    
    
    $res = $conn->query($qsl);
    $arr = $res->fetch_all(MYSQLI_ASSOC);
    
    //关联数据返回给前端状态
    $datalist = array(
          'list'  => $arr,//返回查询结果
          'total' => $res1->num_rows,//查询所以数据的条数
          'page'  => $page,//页数
          'qty'   => $qty//内容数
    );
    
    echo json_encode($datalist,JSON_UNESCAPED_UNICODE); 
    
?>