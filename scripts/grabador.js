import Recorder from './recorder.js';
import GenerarFormulario from './formulario.js';
import FRASES from './frases.js';

let numeroFrase = 0;
let segundos = 0;

let divPrincipal;
let spanTiempo;
let pFrase;
let divRespuesta;
let icono;

let estadoGrabando = false;
let grabacionLista = false;

let cronometro;
let contextoAudio;
let streamActual;
let entrada;
let grabacion;
let temporizador;

let blobArreglo = [];
let blobAudio;

function GrabarAudio(div_Principal, span_Tiemppo, p_frase, div_respuesta, iconoBtnGrabar){
    if(!estadoGrabando){
        divPrincipal = div_Principal;
        spanTiempo = span_Tiemppo
        pFrase = p_frase;
        divRespuesta = div_respuesta;
        icono = iconoBtnGrabar;

        segundos = 0;
        spanTiempo.textContent = '00 - 30s';

        estadoGrabando = true;
        grabacionLista = false;
        blobAudio = null;

        divRespuesta.innerHTML = '';

        icono.classList = 'fa-solid fa-stop fa-3x';

        const PERMISO_NAVEGADOR = navigator.mediaDevices.getUserMedia({
            audio: true, video: false,
        });

        PERMISO_NAVEGADOR.then(
            (stream) => {
                contextoAudio = new AudioContext();
                streamActual = stream;
                entrada = contextoAudio.createMediaStreamSource(stream);

                grabacion = new Recorder(entrada, { numChannels: 1 });

                grabacion.record();

                cronometro = setInterval(medicion, 1000);

                temporizador = setTimeout(() => {
                    grabacionLista = true;
                    estadoGrabando = false;

                    icono.classList = 'fa-solid fa-rotate-right fa-3x';
                    
                    grabacion.stop();
                    streamActual.getAudioTracks()[0].stop();
                    grabacion.exportWAV(mostrarAudio);
                    clearInterval(cronometro);
                }, 30000);
            });
    } else {
        segundos = 0;
        grabacionLista = true;
        estadoGrabando = false;
        icono.classList = 'fa-solid fa-rotate-right fa-3x';
        clearInterval(temporizador);
        clearInterval(cronometro);

        grabacion.stop();
        streamActual.getAudioTracks()[0].stop();
        grabacion.exportWAV(mostrarAudio);
    }
}

function medicion(){
    segundos++;
    if(segundos < 10){
        spanTiempo.textContent = `0${ segundos } - 30s`;
    } else {
        spanTiempo.textContent = `${ segundos } - 30s`;
    }
}

function mostrarAudio(blob){
    blobAudio = blob;
    let url = URL.createObjectURL(blob);
    let audio = document.createElement('audio');

    audio.controls = true;
    audio.src = url;

    divRespuesta.append(audio);
}


function Siguiente(){
    if(grabacionLista && numeroFrase < 2) {
        segundos = 0;
        spanTiempo.textContent = '00 - 30s';

        grabacionLista = false;
        blobArreglo.push(blobAudio); // Almacenaje de cada audio
        pFrase.textContent = FRASES[numeroFrase]; 

        icono.classList = 'fa-solid fa-microphone fa-3x';

        divRespuesta.innerHTML = '';

        numeroFrase++;
    } else if(grabacionLista && numeroFrase == 2){
        blobArreglo.push(blobAudio);
        console.log('Done!');
        divPrincipal.innerHTML='';

        GenerarFormulario(divPrincipal, blobArreglo);
    }
}

export { GrabarAudio, Siguiente };