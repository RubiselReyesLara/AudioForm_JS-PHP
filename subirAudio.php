<?php

// Checar si el servidor tiene la carpeta de respuestas
$ruta = $_SERVER['DOCUMENT_ROOT'] . "/Respuestas_Subidas/";
if(!file_exists($ruta)){
    mkdir($_SERVER['DOCUMENT_ROOT'] . "/Respuestas_Subidas/");
}

if(isset($_POST)){
    $cp = $_POST['CP'];
    $pais = $_POST['pais'];
    $estado = $_POST['estado'];
    $ciudad = $_POST['ciudad'];
    $genero = $_POST['genero'];
    $edad = $_POST['edad'];


       // Llamado a MySQL
    $servidor = "localhost";
    $usuario = "cmpapele_ederqwer";
    $password = "asdqwe123";
    $db = "cmpapele_usuarios_audio";
    
    // Create connection
    $conexion = new mysqli($servidor, $usuario, $password, $db);
    
    // Check connection
    if ($conexion->connect_error) {
      die("Conexion fallida: " . $conexion->connect_error);
    }
    
    
    $sql = 'INSERT INTO usuarios (cp, pais, estado, ciudad, genero, edad) 
              VALUES ('.$cp.', "'.$pais.'","'.$estado.'","'.$ciudad.'","'.$genero.'",'.$edad.')';

    if ($conexion->query($sql)) {
      $id_usuario = $conexion->insert_id;
    } else {
      echo "Error: " . $sql . "<br>" . $conexion->error;
    }

    $conexion->close();

    // Guardardo de los audios en el servidor
    $nuevaRuta = $_SERVER['DOCUMENT_ROOT'] . "/Respuestas_Subidas/".$id_usuario;
    mkdir($nuevaRuta);

    $nombreTemporal1 = $_FILES['dato_audio1']['tmp_name'];
    $nombreTemporal2 = $_FILES['dato_audio2']['tmp_name'];
    $nombreTemporal3 = $_FILES['dato_audio3']['tmp_name'];

    $nombre1 = $nuevaRuta .'/'. $_FILES['dato_audio1']['name']. '.mp3';
    $nombre2 = $nuevaRuta .'/'. $_FILES['dato_audio2']['name']. '.mp3';
    $nombre3 = $nuevaRuta .'/'. $_FILES['dato_audio3']['name']. '.mp3';

    move_uploaded_file($nombreTemporal1, $nombre1);
    move_uploaded_file($nombreTemporal2, $nombre2);
    move_uploaded_file($nombreTemporal3, $nombre3);
        
    echo $id_usuario; // Retorno al front end

}
?>