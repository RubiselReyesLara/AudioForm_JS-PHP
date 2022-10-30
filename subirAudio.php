<?php

// Checar si el servidor tiene la carpeta de respuestas
$ruta = $_SERVER['DOCUMENT_ROOT'] . "/respuestasSubidas/";
if(!file_exists($ruta)){
    mkdir($_SERVER['DOCUMENT_ROOT'] . "/respuestasSubidas/");
}

if(isset($_POST)){
    // Llamado a MySQL
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "usuariosformularios";
    
    // Create connection
    $conexion = new mysqli($servername, $username, $password, $dbname);
    
    // Check connection
    if ($conexion->connect_error) {
      die("Conexion fallida: " . $conexion->connect_error);
    }
    
    // prepare and bind
    $stmt = $conexion->prepare("CALL guardarUsuario(?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("issssi", $cp, $pais, $estado, $ciudad, $genero, $edad);
    
    // set parameters and execute
    $cp = $_POST['CP'];
    $pais = $_POST['pais'];
    $estado = $_POST['estado'];
    $ciudad = $_POST['ciudad'];
    $genero = $_POST['genero'];
    $edad = $_POST['edad'];

    $stmt->execute();

    $result = $stmt->get_result();

    $row = $result->fetch_assoc();
    $id_usuario = $row['last_insert_id()'];

    $stmt->close();

    // Guardardo de los audios en el servidor
    $nuevaRuta = $_SERVER['DOCUMENT_ROOT'] . "/respuestasSubidas/".$id_usuario;
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