const $ = (query) => document.querySelector(query);

export function Mascota (
    {
    id,
    titulo,
    descripcion,
    animal,
    precio,
    raza,
    fechaNac,
    vacuna
    }
) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.animal = animal;
    this.precio = precio;
    this.raza = raza;
    this.fechaNac = fechaNac;
    this.vacuna = vacuna;
}

export function crearMascotaDeForm ({ form = $('form') }) {
    const id = form.id.value;
    const titulo = form.titulo.value;
    const descripcion = form.descripcion.value;
    const precio = form.precio.value;
    const animal = form.animal.value;
    const raza = form.raza.value;
    const fechaNac = form.fechaNac.value;
    const vacuna = form.vacuna.value;

    return new Mascota ( {
        id,
        titulo,
        descripcion,
        animal,
        precio,
        raza,
        fechaNac,
        vacuna
    } );
} 

export function cargarAForm ( {
    form = $('form'),
    mascota = null
} ) {

    if ( !form || !mascota ) return;

    form.id.value = mascota.id;
    form.titulo.value = mascota.titulo;
    form.descripcion.value = mascota.descripcion;
    form.precio.value = mascota.precio;
    form.animal.value = mascota.animal;
    form.raza.value = mascota.raza;
    form.fechaNac.value = mascota.fechaNac.value;
    form.vacuna.value = mascota.fechaNac.value;

}

export function agregarMascotaATabla ( mascota ) {
    const fragmentForTr = document.createDocumentFragment();
    const tbody = document.querySelector("tbody");
    const tr = document.createElement('tr');
    const mascotaEntries = Object.entries(mascota);

    mascotaEntries.forEach ( ([key, value]) => {
        const td = document.createElement('td');
        
        if ( key !== 'id' ) td.innerText = value;
        else {
            td.innerText = value;
            tr.setAttribute( 'anuncio-id', value );
        }    
        
        fragmentForTr.appendChild(td);
    } );

    tr.appendChild(fragmentForTr);
    tbody.appendChild(tr);
}

export function deTablaAForm ( tr, form ) {
    const childrenTd = tr.children;


    if ( childrenTd === null ) return

    form.id.value = childrenTd[0].innerText; 
    form.titulo.value = childrenTd[1].innerText;
    form.descripcion.value = childrenTd[2].innerText;
    form.precio.value = childrenTd[3].innerText;
    form.animal.value = childrenTd[4].innerText;
    form.raza.value = childrenTd[5].innerText;
    form.fechaNac.value = childrenTd[6].innerText;
    form.vacuna.value = childrenTd[7].innerText;
}