const $ = (query) => document.querySelector(query);
let ultimoId = 0;

import { 
    removerSpinner, 
    agregarSpinner 
} from '../Spinner/spinner.js';

import {
    crearMascotaDeForm,
    agregarMascotaATabla,
    deTablaAForm,
    eliminarPorId

} from './Mascota.js';

function validarForm () {
    let ret = true;
    const elements = $('form').elements;

    for ( let formIndex = 0; formIndex < elements.length; formIndex++ ) {
        const elem = elements[formIndex];

        if ( elem.type === "text" ||
             elem.type === "number" || 
            elem.type === "date" && 
            elem.value === "" )
            return false;

    }

    return ret;
}

function asignarEventListeners() {

    document.body.addEventListener( 'click', (event) => {

        if (event.target.matches('button')) {
            event.preventDefault();
        }

        if ( event.target.matches('#guardar') ) {

            if ( !validarForm() ){
                alert('FALTAN DATOS.');
                return
            }

            const mascota = crearMascotaDeForm({});
            mascota.id = ultimoId;
            agregarMascotaATabla(mascota);
            ultimoId++;
        }

        if ( event.target.matches("#eliminar") ) {
            const id = parseInt($('form').id.value);
            eliminarPorId( id, $('tbody') );
        }

        if ( event.target.matches('td') ) {
            const tr = event.target.parentElement;
            deTablaAForm(tr, $('form'));
        }

        if ( event.target.matches('#cancelar') ) {
            const form = $('form');
            form.reset();
        }

    } );

}

(function main() {

    asignarEventListeners();

})();