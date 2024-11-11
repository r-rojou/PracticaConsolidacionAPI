const asignarEventos = ()=>{
    let divPopulares = document.getElementById('divPopulares');
    divPopulares.addEventListener('mouseenter', pintarPopulares);

    let divJobros = document.getElementById('divJobros');
    divJobros.addEventListener('mouseenter', pintarJobros);

    let divOtros = document.getElementById('divOtros');
    divOtros.addEventListener('mouseenter', pintarOtros);

};

let contadorPopulares = 1;
let contadorJobros = 6;
let contadorOtros = 12;

var generadorCrearCardPopulares = crearCardPopulares();
var generadorCrearCardJobros = crearCardJobros();
var generadorCrearCardOtros = crearCardOtros();

const consumirAPICompleta = ()=>{
    console.log('Consumiendo API');
    let url = `https://stand-by-me.herokuapp.com/api/v1/characters/`;
    fetch(url)
        .then((respuesta)=>{
            // Respuesta cruda de la API
            console.log(respuesta);

            // Transformación de cruda a objeto legible por JS
            respuesta.json()
                     .then((objJsonRespuesta)=>{
                        console.log(objJsonRespuesta);
                        
                       
                     })
                     .catch((errorTransformacion)=>{
                        console.log('Error transformando en JSON la respuesta: ', errorTransformacion)
                     });
        })
        .catch((error)=>{
            console.log('Error consumiendo la API: ', error);
        });
};

const consumirAPI = (contador, color)=>{
    console.log('Consumiendo API');
    let url = `https://stand-by-me.herokuapp.com/api/v1/characters/${contador}`;
    fetch(url)
         .then((respuesta)=>{
            console.log(respuesta);
            respuesta.json()
                     .then((objJsonRespuesta)=>{
                        console.log(objJsonRespuesta);

                        let divCard = document.createElement('div');
                        divCard.setAttribute("class", "estilosCards");
                        let laClaseCirculo = '';

                        switch(color){
                            case 'rojo':
                                laClaseCirculo = "circuloRojo";
                                break;
                            case 'verde':
                                laClaseCirculo = "circuloVerde";
                                break;
                            case 'azul':
                                laClaseCirculo = "circuloAzul";
                                break;
                            default:
                                laClaseCirculo = "circuloDefault";

                        }
                        let img = `./assets/img/${objJsonRespuesta.image}`;
                        let contenidoCard = `     <div class="card" style="width: 18rem;">
                                                    <img src="${img}" class="card-img-top img-fluid" alt="" id="imgJojo">
                                                    <div class="card-body">
                                                      <div class=${laClaseCirculo}></div> <h5 class="card-title" id="txtNombre">${objJsonRespuesta.name} </h5>
                                                      <div class="container">
                                                        <div class="row">
                                                          <div class="col-6">
                                                            <p><b>Nacionalidad</b> <span id="txtNacionalidad">${objJsonRespuesta.nationality}</span></p>
                                                          </div>
                                                          <div class="col-6">
                                                            <p><b>Catchphrase</b> <span id="txtFrase">${objJsonRespuesta.catchphrase}</span></p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    <div>`;
                        divCard.innerHTML = contenidoCard;
                        document.getElementById('contenedorCards').appendChild(divCard);
                     })
                     .catch((errorTransformacion)=>{
                        console.log('Error transformando en JSON la respuesta: ', errorTransformacion);
                     });
         })
         .catch((error)=>{
            console.log('Error consumiendo la API: ', error);
         });
};

const pintarPopulares = ()=>{
    console.log('Pintando Populares');
    generadorCrearCardPopulares.next();
    console.log('Contador Populares: ', contadorPopulares);
}

const pintarJobros = ()=>{
    console.log('Pintando JoBros');
    generadorCrearCardJobros.next();
    console.log('Contador JoBros: ', contadorJobros);
}

const pintarOtros = ()=>{
    console.log('Pintando Otros');
    generadorCrearCardOtros.next();
    console.log('Contador Otros: ', contadorOtros);
}

function* crearCardPopulares(){
    while(contadorPopulares<=5){
        consumirAPI(contadorPopulares, 'rojo');

        yield contadorPopulares++;
    }
}

function* crearCardJobros(){
    while(contadorJobros<=11){
        consumirAPI(contadorJobros, 'verde');
        
        yield contadorJobros++;

    }
}

function* crearCardOtros(){
    while(contadorOtros<=17){
        consumirAPI(contadorOtros, 'azul');

        yield contadorOtros++;
    }
}

const listaPersonajes = ()=>{
    fetch("https://stand-by-me.herokuapp.com/api/v1/characters")
        .then(respuesta => respuesta.json())
        .then(data =>{
            const containerLista = document.getElementById('listaJojos');
            const lista = document.createElement("ul");
            lista.style.listStyleType = 'circle';

            data.forEach(personaje =>{
                const personajeLista = document.createElement("li");
                personajeLista.textContent = `${personaje.id} - ${personaje.name}`;
                lista.appendChild(personajeLista);
                
            });

            containerLista.appendChild(lista);
        })
        .catch((error)=>{
            console.log("Error consumiendo la API lista: ", error)
        });

}

listaPersonajes();

const buscarPersonaje = (event)=>{
    event.preventDefault();

    const id = document.getElementById('busquedaJojo').value;
    if(!id){
        alert("Por favor, ingrese un número de 1 a 175");
        return
    }

    fetch(`https://stand-by-me.herokuapp.com/api/v1/characters/${id}`)
        .then(respuesta => respuesta.json())
        .then(personaje =>{
            mostrarPersonajeSeleccionado(personaje);
        })
        .catch((error=>{
            console.log("Error al buscar el personaje: ", error);
        }));
}

const mostrarPersonajeSeleccionado = (personaje)=>{
    const contenedorPersonaje = document.getElementById('contenedorCardSeleccionada');
    const rutaImagen = `./assets/img/${personaje.image}`
    contenedorPersonaje.innerHTML = `
                                        <div class="card mb-3" style="width: 18rem;">
                                          <img src="${rutaImagen}" class="card-img-top img-fluid" alt="${personaje.name}">
                                          <div class="card-body">
                                            <h5 class="card-title">${personaje.name}</h5>
                                            <p><b>Nacionalidad:</b> ${personaje.nationality}</p>
                                            <p><b>Catchphrase:</b> ${personaje.catchphrase}</p>
                                          </div>
                                        </div>`;
}
