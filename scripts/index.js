import { GrabarAudio, Siguiente } from './grabador.js';

const div_Principal = document.getElementById('div-principal');
const span_Tiempo = document.getElementById('span-tiempo');
const p_Frase = document.getElementById('p-frase');
const div_respuesta = document.getElementById('div-respuesta');
const icono_BtnGuardar = document.getElementById('iconoGrabar');

const PUNTEROS = [document.getElementById('puntero1'),
                  document.getElementById('puntero2'),
                  document.getElementById('puntero3')];

const btn_Grabar = document.getElementById('btn-grabar');
btn_Grabar.addEventListener('click', GrabarAudio.bind(null, btn_Grabar, div_Principal, span_Tiempo, p_Frase, div_respuesta, icono_BtnGuardar), false);

document.getElementById('btn-siguiente').addEventListener('click', Siguiente.bind(null, PUNTEROS), false);