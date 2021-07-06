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
    eliminarDeLocalStoragePorId,
    updateDeLocalStoragePorId
} from './Anuncio_Mascota.js';

import {
    validarForm
} from './form-validation.js';

function asignarEventListeners() {

    document.body.addEventListener( 'click', (event) => {

        if (event.target.matches('button')) {
            event.preventDefault();

            if (event.target.matches("#guardar")
                && !validarForm('form') ) {
                window.alert('Faltan CAMPOS!');
                return
            }
        }

        if ( event.target.matches('#guardar') ) {
            agregarSpinner({});
            setTimeout( () => {
                const id = parseInt($('form').id.value);
                const mascota = crearMascotaDeForm({});
                
                if ( id <= 0 ) {
                    mascota.id = ultimoId++;
                    agregarMascotaATabla(mascota);
                    cargarAlLocalStorage(mascota, 'animales');
                    removerSpinner();
                    $('form').reset();
                    return
                }

                updateDeLocalStoragePorId(id, 'animales', mascota);
                eliminarPorId(id, $('tbody'));
                agregarMascotaATabla(mascota);
                removerSpinner();
                $('form').reset();
            }, tiempoSpinner );
        }

        if ( event.target.matches("#eliminar") ) {
            agregarSpinner({});
            setTimeout( () => {
                const id = parseInt($('form').id.value);
                
                if ( id === 0 ) {
                    window.alert('NO SE SELECCIONÓ NADA');
                    removerSpinner();
                    return
                }
                
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