<?php
$connection = mysqli_connect("localhost", "root", "", "piano");
$q2 = "SELECT * FROM sheets ORDER BY title";
    $query2 = mysqli_query($connection, $q2);
    while($sheet = mysqli_fetch_array($query2)){
        $data[] = array(
            'id'    => $sheet['id'],
            'title' => $sheet['title'],
            'sheet' => $sheet['sheet']
        );
    }
    echo json_encode ($data);
?>