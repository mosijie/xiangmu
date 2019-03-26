<?php
/*
    点击加入购物车，先查询订单表，然后更新订单表
        get:
            gid:商品id
            num：商品数量
        返回：
            订单表的所有数量
 */

    //加入购物车，把数据写入订单表
    include 'conn.php';

    $num=isset($_GET['num']) ? $_GET['num'] : '';
    $gid=isset($_GET['gid']) ? $_GET['gid'] : '';

    //查询订单表是否有该gid商品
    $sql="SELECT num FROM neworders WHERE id='$gid';";
    $res=$conn->query($sql);
    $res2 = null;

    if($res->num_rows>0){
        $data = $res->fetch_all(MYSQLI_ASSOC);
        $gnum = $data[0]['num'];
        $num = $num + $gnum;
        $sql2="UPDATE neworders SET num=$num WHERE id=$gid;";
        $res2=$conn->query($sql2);
    }else{
        $sql3="SELECT * FROM  goodslistmiya WHERE id=$gid";
        $res3=$conn->query($sql3);
        if($res3->num_rows>0){
            $data3=$res3->fetch_all(MYSQLI_ASSOC);
            $gname = $data3[0]['name'];
            $gNewprice = $data3[0]['new_price'];
            $gOldprice = $data3[0]['old_price'];
            $gimg1 = $data3[0]['img'];
            $sql4="INSERT INTO neworders(id,name,price,img,num,old_price) VALUES ('$gid','$gname','$gNewprice','$gimg1','$num','$gOldprice');";
            $res2=$conn->query($sql4);
        }
    }
    if($res2){
        echo 1;
    }else{
        echo 0;
    }
    

?>