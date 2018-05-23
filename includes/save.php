<?php
$connection = mysqli_connect("localhost", "root", "", "piano");
$title= $_POST['title']; 
$sheet= $_POST['sheet'];
$title = mysqli_real_escape_string($connection, $title);
$sheet = mysqli_real_escape_string($connection, $sheet);
$q = "INSERT INTO sheets (title,sheet) VALUES ('$title', '$sheet')";
$query = mysqli_query($connection, $q);
if($query){
    $q2 = "SELECT * FROM sheets ORDER BY id DESC LIMIT 1 ";
    $query2 = mysqli_query($connection, $q2);
    $sheet = mysqli_fetch_array($query2);
        $data = array(
            'id'    => $sheet['id'],
            'title' => $sheet['title'],
            'sheet' => $sheet['sheet']
        );
    
    echo json_encode ($data);
}else{
    echo mysqli_error($connection);
}
mysqli_close($connection);

?>
