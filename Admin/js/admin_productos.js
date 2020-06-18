const BASE_URL = 'http://localhost:8080/webproj';

//desplegar modal nuevo
let btnNewModal = document.getElementById('btn-nuevo');
btnNewModal.addEventListener ('click', showNewModal);

//boton enviar del modal nuevo
let btnGuardar = document.getElementById('btn-guardar');
btnGuardar.addEventListener ('click', guardarProductos);

function showNewModal (event){
    $('#titulo-modal-producto').html('Agregar un nuevo producto');
   
    let inputs = document.querySelectorAll('#modal-editor-producto input, textarea');

   //Limpiar los imputs acá !
   for(let i=0; i<inputs.length; i++){
       inputs[i].value = '';
   }



    $('#modal-editor-producto').modal('show');
}

function mostrarProducto(event){
    
    //Obtengo el data ID del botón 
    let idProducto = event.currentTarget.getAttribute('data-producto-id');
    
    getProducto(idProducto).then(
        json => {
                                
            let dataProducto = json.data[0];
           

            $('#id-producto').val(dataProducto.id);
            $('#nombre').val(dataProducto.nombre);
            $('#descripcion').val(dataProducto.descripcion);
            $('#foto').val(dataProducto.imagen);
            $('#precio').val(dataProducto.precio);
            
            
            $('#titulo-modal-producto').html('Modificar producto');    

            $('#modal-editor-producto').modal('show');
        }
    )

} 


function cargarListadoDeProductos (){
    getProductos().then(
        json => {
            
            generarCard(json.data); //paso sólo la data acá
        }
    )

}

async function getProductos () {
    let url = BASE_URL + '/productosjson';

    let response = await fetch(url);
    let json     = await response.json();


    return json;
}

async function getProducto (id) {
    let url = BASE_URL + '/productosjson?id=' + id;

    let response = await fetch(url);
    let json     = await response.json();

    
    return json;
} 


function generarCard (data){
    let container = document.getElementById('tablaContenedor');
    let contenidoHTML= '';

    for(productos of data){
        contenidoHTML += `
            
                        <tr class="table-light">
                        <td>${productos.id}</td>
                        <td class="text-center">${productos.nombre}</td>
                        <td class="text-center">${productos.descripcion}</td>
                        <td><img src="${productos.imagen} " width="150" height="150" class="rounded mx-auto d-block"</td>
                        <td class="text-center">$${productos.precio}</td>
                        
                       
                        
                        <td class="justify-content-center">
                        
                            <button data-producto-id="${productos.id}" class="btn-editar btn btn-outline-success my-2 ">
                                <i class="fa fa-pencil"></i>
                            </button>
                        
                    
                            <button data-producto-id="${productos.id}" class="btn-eliminar btn btn-outline-danger ">
                                <i class="fa fa-trash-o"></i>
                            </button>
                        </td>
                    
                    </tr>
       
        
                         `
    }


container.innerHTML = contenidoHTML;

    $('.btn-editar').click(mostrarProducto);
    $('.btn-eliminar').click(eliminarPorducto);

}

function guardarProductos(){

    let url = BASE_URL + '/productosjson';

    let nombreProducto      = document.getElementById('nombre').value;
    let descripcionProducto = document.getElementById('descripcion').value;
    let imagenProducto      = document.getElementById('foto').value;
    let precioProducto      = document.getElementById('precio').value;

    let params = `?nombre=${nombreProducto}&descripcion=${descripcionProducto}&foto=${imagenProducto}&precio=${precioProducto}`;

    let method = 'POST';

    if (  $('#id-producto').val() ){

        method = 'PUT';
        params += '&id=' + $('#id-producto').val();
    }



    fetch (url + params,
        {
            method : method
        }
    ).then(
        response => response.json()
    ).then(
        data=>{
            Swal.fire({   //sweetAlert
                title : 'Guardado',
                text : data.message,
                icon: 'success',
                confirmButtonText: 'Aceptar'

            })
            cargarListadoDeProductos();
            $('#modal-editor-producto').modal('hide');
       
        }
    ) 
}



function eliminarPorducto(event){

    let idProducto = event.currentTarget.getAttribute('data-producto-id')
    // Sweet Alert
    Swal.fire({
        title: 'Deseas eliminar este producto ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then(
        
        result => {
            if (result.value) {
                 let url = BASE_URL + '/productosjson?id=' + idProducto;
                
                fetch(url, {
                        method : 'DELETE' }).then(
                        response => response.json()
                    ).then(
                        data => {
                            swal.fire({
                                  title: 'Eliminado',
                                  text: data.message,
                                  icon: 'success',
                                  confirmButtonText: 'Aceptar'  

                            })
                        
                        cargarListadoDeProductos();
                        }
                    ) 
      
                }
         }
   )


        
}




cargarListadoDeProductos();

