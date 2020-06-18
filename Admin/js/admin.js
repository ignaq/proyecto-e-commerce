const BASE_URL = 'http://localhost:8080/webproj';


function mostrarModal(event){
    
    //Obtengo el data ID del botón 
    let idCliente = event.currentTarget.getAttribute('data-cliente-id');
    
    getCliente(idCliente).then(
        json => {
                                
            let dataCliente = json.data[0];

            $('#id-cliente').val(dataCliente.id);
            $('#nombre').val(dataCliente.nombre);
            $('#apellido').val(dataCliente.apellido);
            $('#email').val(dataCliente.email);
            
            $('#titulo-modal-cliente').html('Editar Cliente');    

            $('#modal-editor-cliente').modal('show');
        }
    )

}


//tiene que esperar la función asíncrona
function cargarListadoClientes(){
    getClientes().then(
        json => {
            generarTabla (json.data);
        }
    ); 
}


// Está funcion va a buscar los datos
async function getClientes(){
    let url = BASE_URL + '/clientesjson';

    let response = await fetch(url);

    let json = await response.json();

    return json;

}

async function getCliente(id){
    let url = BASE_URL + '/clientesjson?id=' + id;

    let response = await fetch(url);

    let json = await response.json();

    return json;

}
// función que genera la tabla
function generarTabla (data){
    let container = document.getElementById('tablaContenedor');

    let contendidoHTML = '';

    for (cliente of data) {

        contendidoHTML += `
                            <tr class="table-light">
                                <td>${cliente.id}</td>
                                <td>${cliente.nombre}</td>
                                <td>${cliente.apellido}</td>
                                <td>${cliente.email}</td>
                                
                                <td>
                                    <button data-cliente-id="${cliente.id}" class="btn-editar btn btn-success">Editar</button>
                                
                              
                                    <button data-cliente-id="${cliente.id}" class="btn-eliminar btn btn-danger">Eliminar</button>
                                </td>
                            
                            </tr>
        
                         `
        
    }


    container.innerHTML = contendidoHTML;

    $('.btn-editar').click(mostrarModal);

}


cargarListadoClientes();