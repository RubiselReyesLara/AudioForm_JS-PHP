import Recorder from './recorder.js';
import GenerarFormulario from './formulario.js';
import FRASES from './frases.js';

let numeroFrase = 0;
let segundos = 0;

let btnGrabar;
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

function GrabarAudio(btn_Grabar, div_Principal, span_Tiemppo, p_frase, div_respuesta, iconoBtnGrabar){

    if(!estadoGrabando){

        btnGrabar = btn_Grabar;
        divPrincipal = div_Principal;
        spanTiempo = span_Tiemppo
        pFrase = p_frase;
        divRespuesta = div_respuesta;
        icono = iconoBtnGrabar;

        segundos = 0;
        spanTiempo.textContent = '00 • 30s';

        estadoGrabando = true;
        grabacionLista = false;
        blobAudio = null;

        divRespuesta.innerHTML = '';

        btnGrabar.style.backgroundColor = 'tomato';
        icono.classList = 'fa-solid fa-stop fa-3x';
        icono.style.color = '#8A3624';

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

                    btnGrabar.style.backgroundColor = '#4CA87C';
                    icono.classList = 'fa-solid fa-rotate-right fa-3x';
                    icono.style.color = '#013A1F';
                    
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
        btnGrabar.style.backgroundColor = '#4CA87C';
        icono.classList = 'fa-solid fa-rotate-right fa-3x';
        icono.style.color = '#013A1F';
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
        spanTiempo.textContent = `0${ segundos } • 30s`;
    } else {
        spanTiempo.textContent = `${ segundos } • 30s`;
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


function Siguiente(PUNTEROS){
    if(grabacionLista && numeroFrase < 2) {
        segundos = 0;
        spanTiempo.textContent = '00 • 30s';

        grabacionLista = false;
        blobArreglo.push(blobAudio); // Almacenaje de cada audio
        pFrase.textContent = FRASES[numeroFrase]; 

        icono.classList = 'fa-solid fa-microphone fa-3x';

        divRespuesta.innerHTML = '';

        numeroFrase++;

        for(let i = 0; i < numeroFrase; i++){
            PUNTEROS[i].style.color = '#7bff7b';
        }
        PUNTEROS[numeroFrase].style.color = '#437e43';

    } else if(grabacionLista && numeroFrase == 2){
        blobArreglo.push(blobAudio);
        console.log('Done!');
        divPrincipal.innerHTML='';

        GenerarFormulario(divPrincipal, blobArreglo);
    }
}

export { GrabarAudio, Siguiente };