<?php
    include 'conn.php';
    
    $gid=isset($_GET['gid']) ? $_GET['gid'] : '';
    
    if($gid){
        echo 1;
        $sql = "delete from neworders where id=$gid";
    }else {
        $sql = "delete from neworders";
    }
    $res=$conn->query($sql);
    
    if($res){
        echo 1;
    }else{
        echo 0;
    }
    
?>