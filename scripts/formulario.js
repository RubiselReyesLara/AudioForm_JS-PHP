
export default function GenerarFormulario(divPrincipal, Blobs){

    console.log(Blobs[0]);

    // Form
    const FORM = document.createElement('form');
    FORM.onsubmit = subirInfo.bind(null, FORM, Blobs);

    // Titulo
    const spanTitulo = document.createElement('span');
    spanTitulo.textContent = 'Formulario';

    // Instruccion
    const pInstruccion = document.createElement('p');
    pInstruccion.textContent = 'Por favor llene el siguiente formulario';

    // CP
    const inputCP = document.createElement('input');
    inputCP.setAttribute('type', 'text');
    inputCP.setAttribute('name', 'CP');
    inputCP.setAttribute('placeholder', 'Código Postal');

    // Pais
    const inputPais = document.createElement('input');
    inputPais.setAttribute('type', 'text');
    inputPais.setAttribute('name', 'pais');
    inputPais.setAttribute('placeholder', 'País');

    // Estado
    const inputEstado = document.createElement('input');
    inputEstado.setAttribute('type', 'text');
    inputEstado.setAttribute('name', 'estado');
    inputEstado.setAttribute('placeholder', 'Estado');

    // Ciudad
    const inputCiudad = document.createElement('input');
    inputCiudad.setAttribute('type', 'text');
    inputCiudad.setAttribute('name', 'ciudad');
    inputCiudad.setAttribute('placeholder', 'Ciudad');

    // Genero
    const inputGenero = document.createElement('input');
    inputGenero.setAttribute('type', 'text');
    inputGenero.setAttribute('name', 'genero');
    inputGenero.setAttribute('placeholder', 'Genero');

    // Edad
    const inputEdad = document.createElement('input');
    inputEdad.setAttribute('type', 'number');
    inputEdad.setAttribute('name', 'edad');
    inputEdad.setAttribute('placeholder', 'Edad');

    // Boton Submit
    const submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', 'Enviar');

    FORM.append(spanTitulo);
    FORM.append(pInstruccion);
    FORM.append(inputCP);
    FORM.append(inputPais);
    FORM.append(inputEstado);
    FORM.append(inputCiudad);
    FORM.append(inputGenero);
    FORM.append(inputEdad);
    FORM.append(submit);

    divPrincipal.appendChild(FORM);
}

function subirInfo(FORM, arregloBlobs){
    const DATOS = new FormData(FORM);
    DATOS.append('dato_audio1', arregloBlobs[0], 1);
    DATOS.append('dato_audio2', arregloBlobs[1], 2);
    DATOS.append('dato_audio3', arregloBlobs[2], 3);

    fetch('subirAudio.php', {
        method: 'POST',
        body: DATOS
    }).then(respuesta => respuesta.text()).then(dato => {
        console.log(dato);
    });

    return false;
}

