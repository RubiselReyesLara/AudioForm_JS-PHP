// import estados from './estados.json' assert { type: 'json' };
import Final from "./final.js";

export default function GenerarFormulario(divPrincipal, Blobs){

    fetch("./estados.json")
    .then(response => {
    return response.json();
    })
    .then(data => {
        const estados = data;
        
        const GENEROS = ['H','M','NB'];
        let ciudades = estados.Aguascalientes;
    
        // Form
        const FORM = document.createElement('form');
        FORM.id = 'formulario';
        FORM.onsubmit = subirInfo.bind(null, FORM, Blobs, divPrincipal);
    
        // Titulo
        const spanTitulo = document.createElement('span');
        spanTitulo.textContent = 'Formulario';
    
        // Instruccion
        const pInstruccion = document.createElement('p');
        pInstruccion.textContent = 'Por favor llene el siguiente formulario';
    
        // CP
        const labelCP = document.createElement('label');
        labelCP.textContent = 'Código postal: ';
        labelCP.setAttribute('for', 'CP');
    
        const inputCP = document.createElement('input');
        inputCP.setAttribute('type', 'number');
        inputCP.setAttribute('name', 'CP');
        inputCP.setAttribute('placeholder', '93990');
    
        // Pais
        const labelPais = document.createElement('label');
        labelPais.textContent = 'País: ';
        labelPais.setAttribute('for', 'pais');
    
        const selectPais = document.createElement('select');
        selectPais.setAttribute('name', 'pais');
    
        const option = document.createElement('option');
        option.value = 'Mexico';
        option.textContent = 'México';
        selectPais.append(option);
    
        // Estado
        const labelEstado = document.createElement('label');
        labelEstado.textContent = 'Estado: ';
        labelEstado.setAttribute('for', 'estado');
    
        const selectEstado = document.createElement('select');
        selectEstado.setAttribute('name', 'estado');
    
        Object.entries(estados).forEach((cadaEstado) => {
            const [key] = cadaEstado;
            const option = document.createElement('option');
            option.value = key;
            option.textContent = key;
            selectEstado.append(option);
        });
    
        selectEstado.addEventListener("change", () => {
            selectCiudad.innerHTML = '';
            ciudades = estados[selectEstado.value];
            for(let i = 0; i < ciudades.length; i++){
                const option = document.createElement('option');
                option.value = ciudades[i];
                option.textContent = ciudades[i];
                selectCiudad.append(option);
            }
        });
    
        // Ciudad
        const labelCiudad = document.createElement('label');
        labelCiudad.textContent = 'Ciudad: ';
        labelCiudad.setAttribute('for', 'ciudad');
    
        const selectCiudad = document.createElement('select');
        selectCiudad.setAttribute('name', 'ciudad');
    
        for(let i = 0; i < ciudades.length; i++){
            const option = document.createElement('option');
            option.value = ciudades[i];
            option.textContent = ciudades[i];
            selectCiudad.append(option);
        }
    
        // Genero
        const labelGenero = document.createElement('label');
        labelGenero.textContent = 'Género: ';
        labelGenero.setAttribute('for', 'genero');
    
        const selectedGenero = document.createElement('select');
        selectedGenero.setAttribute('name', 'genero');
    
        for(let i = 0; i < 3; i++){
            const option = document.createElement('option');
            option.value = GENEROS[i];
            option.textContent = GENEROS[i];
            selectedGenero.append(option);
        }
    
        // Edad
        const labelEdad = document.createElement('label');
        labelEdad.textContent = 'Edad: ';
        labelEdad.setAttribute('for', 'edad');
    
        const inputEdad = document.createElement('input');
        inputEdad.setAttribute('type', 'number');
        inputEdad.setAttribute('name', 'edad');
        inputEdad.setAttribute('placeholder', '20');
    
        // Boton Submit
        const submit = document.createElement('input');
        submit.setAttribute('type', 'submit');
        submit.setAttribute('value', 'Enviar');
    
        FORM.append(spanTitulo);
        FORM.append(pInstruccion);
    
        FORM.append(labelCP);
        FORM.append(inputCP);
    
        FORM.append(labelPais);
        FORM.append(selectPais);
    
        FORM.append(labelEstado);
        FORM.append(selectEstado);
    
        FORM.append(labelCiudad);
        FORM.append(selectCiudad);
    
        FORM.append(labelGenero);
        FORM.append(selectedGenero);
    
        FORM.append(labelEdad);
        FORM.append(inputEdad);
    
        FORM.append(submit);
    
        divPrincipal.appendChild(FORM);

    });

}

function subirInfo(FORM, arregloBlobs, divPrincipal){
    const DATOS = new FormData(FORM);

    if(DATOS.get('CP').length > 0 && DATOS.get('CP').length < 10 &&
         DATOS.get('edad').length > 0 && DATOS.get('edad').length < 3){

        DATOS.append('dato_audio1', arregloBlobs[0], 1);
        DATOS.append('dato_audio2', arregloBlobs[1], 2);
        DATOS.append('dato_audio3', arregloBlobs[2], 3);

        fetch('subirAudio.php', {
            method: 'POST',
            body: DATOS
        }).then(respuesta => respuesta.text()).then(ID => {
            console.log(ID);
            Final(divPrincipal, ID);
        });
    } else {
        alert('Tiene algunos campos sin llenar, puede ser el de Código Postal, o el de Edad. Verifique por favor');
    }

    return false;
}

