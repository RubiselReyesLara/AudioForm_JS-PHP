export default function Final(divPrincipal, ID){
    divPrincipal.innerHTML = '';

    const divMensaje = document.createElement('div');
    divMensaje.id = 'div-mensaje-final';

    const iIcono = document.createElement('i');
    iIcono.classList = "fa-solid fa-user-check";

    const spanTitulo = document.createElement('span');
    spanTitulo.textContent = '¡El cuestionario se respondio con exito!';

    const pMensaje = document.createElement('p');
    pMensaje.textContent = 'Usted se registró con el ID: ' + ID;
    pMensaje.id = 'p-mensaje';

    const pfirma = document.createElement('p');
    pfirma.textContent = 'CÓDIGO LATE S.A. de C.V.';
    pfirma.id = 'p-firma';

    divMensaje.append(iIcono);
    divMensaje.append(spanTitulo);
    divMensaje.append(pMensaje);
    divMensaje.append(pfirma);

    divPrincipal.append(divMensaje);
    
}