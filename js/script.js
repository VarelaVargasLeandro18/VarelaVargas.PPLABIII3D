const $ = (query) => document.querySelector(query);
const ultimoId = 0;

import { 
    removerSpinner, 
    agregarSpinner 
} from '../Spinner/spinner.js';

import {
    crearMascotaDeForm,
    cargarAForm,
    agregarMascotaATabla,
    deTablaAForm

} from './Mascota.js';

function asignarEventListeners() {

    document.body.addEventListener( 'click', (event) => {

        if (event.target.matches('button')) {
            event.preventDefault();
        }

        if ( event.target.matches('#guardar') ) {
            const mascota = crearMascotaDeForm({});
            mascota.id = ultimoId;
            agregarMascotaATabla(mascota);
            ultimoId++;
        }

        if ( event.target.matches("#eliminar") ) {
            
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