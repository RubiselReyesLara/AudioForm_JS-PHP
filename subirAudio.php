<?php

// Checar si el servidor tiene la carpeta de respuestas
$ruta = $_SERVER['DOCUMENT_ROOT'] . "/respuestasSubidas/";
if(!file_exists($ruta)){
    mkdir($_SERVER['DOCUMENT_ROOT'] . "/respuestasSubidas/");
}

if(isset($_POST)){
    // Guardardo de los audios en el servidor
    $fi = new FilesystemIterator($_SERVER['DOCUMENT_ROOT'] . "/respuestasSubidas/",  // Segun el numero de carpetas en el servidor
                             FilesystemIterator::SKIP_DOTS);                             // sera el numero id del usuario.
    $id_usuario = iterator_count($fi);
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

    // Llamado a MySQL
    echo $_POST['ciudad'];
}


?>