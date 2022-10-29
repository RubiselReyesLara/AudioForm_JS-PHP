import { GrabarAudio, Siguiente } from './grabador.js';

const div_Principal = document.getElementById('div-principal');
const span_Tiempo = document.getElementById('span-tiempo');
const p_Frase = document.getElementById('p-frase');
const div_respuesta = document.getElementById('div-respuesta');
const icono_BtnGuardar = document.getElementById('iconoGrabar');

document.getElementById('btn-grabar').addEventListener('click', GrabarAudio.bind(null, div_Principal, span_Tiempo, p_Frase, div_respuesta, icono_BtnGuardar), false);

document.getElementById('btn-siguiente').addEventListener('click', Siguiente);