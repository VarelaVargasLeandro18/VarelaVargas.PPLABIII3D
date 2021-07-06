const $ = (query) => document.querySelector(query);
let ultimoId = 1;
const tiempoSpinner = 1500;

import { 
    removerSpinner, 
    agregarSpinner 
} from '../css/Spinner/spinner.js';

import {
    crearMascotaDeForm,
    agregarMascotaATabla,
    deTablaAForm,
    eliminarPorId,
    cargarAlLocalStorage,
    cargarDeLocalStorage,
    agregarVariosATabla,
    eliminarDeLocalStoragePorId
} from './Anuncio_Mascota.js';

function asignarEventListeners() {

    document.body.addEventListener( 'click', (event) => {

        if (event.target.matches('button')) {
            event.preventDefault();
        }

        if ( event.target.matches('#guardar') ) {
            agregarSpinner({});
            setTimeout( () => {
                const mascota = crearMascotaDeForm({});
                mascota.id = ultimoId++;
                agregarMascotaATabla(mascota);
                cargarAlLocalStorage(mascota, 'animales');
                removerSpinner();
            }, tiempoSpinner );
        }

        if ( event.target.matches("#eliminar") ) {
            agregarSpinner({});
            setTimeout( () => {
                const id = parseInt($('form').id.value);
                eliminarPorId( id, $('tbody') );
                eliminarDeLocalStoragePorId(id, 'animales');
                removerSpinner();
            }, tiempoSpinner );
        }

        if ( event.target.matches('td') ) {
            agregarSpinner({});
            setTimeout( () => {
                const tr = event.target.parentElement;
                deTablaAForm(tr, $('form'));
                removerSpinner();
            }, tiempoSpinner );
        }

        if ( event.target.matches('#cancelar') ) {
            const form = $('form');
            agregarSpinner({});
            setTimeout( () => {
                form.reset();
                removerSpinner();
            }, tiempoSpinner );
            
        }

    } );

}

(function main() {

    let mascotas = cargarDeLocalStorage('animales');
    agregarVariosATabla(mascotas);

    if ( Array.isArray(mascotas) && mascotas.length > 0 )
        ultimoId = ++mascotas[ mascotas.length - 1 ].id;

    asignarEventListeners();

})();