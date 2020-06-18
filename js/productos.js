const BASE_URL = 'http://localhost:8080/webproj';



function mostrarProducto(event){

   let idProducto = event.currentTarget.getAttribute('data-producto-id'); 
   
  

   getProducto(idProducto).then(
       json =>{
         
         
        let dataProducto = json.data[0];
        
        document.getElementById('modal-id').innerHTML =  ' <input id="dataproducto" type="hidden" value=" ' +(dataProducto.id) +  ' "></a> '
        document.getElementById("descripcion").innerHTML ='<p>' + (dataProducto.descripcion) + '</p>';
        document.getElementById("imagen").innerHTML = '  <img class="figure-img img-fluid rounded"   src="  '+ (dataProducto.imagen) + ' "> ' ;
        document.getElementById("precio").innerHTML =  '<h4 class="text-center">' +  'Precio: $ ' +  (dataProducto.precio) + '</h4> '  ;
            
            $('#titulo-modal-producto').html(dataProducto.nombre);    

            $('#modal-mostrar-producto').modal('show');
    
  

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
    let container = document.getElementById('tarjeta');
    let contenidoHTML= '';

    for(productos of data){
        contenidoHTML += `
            
        <div  class="col-sm-4  mt-4">     
           <div id="card-efecto" class="card" >
               <!-- Card foto -->
                   <img class="img-fluid w-100" src="${productos.imagen}" alt="Sample">
               <!-- Card foto -->
              <!-- Card -->
                <div class="card">
                <h3 class="card-title pl-3 my-3"> ${productos.nombre} </h5>
                <!-- precio -->
                    <h6 class=" pl-3 "><var>Precio: $ ${productos.precio}</<var></h6>
                
                <div>
               <button data-producto-id="${productos.id}"   type="button" class="btn btn-primary btn-mostrar d-flex float-right mb-4 mr-2">Agregar al carrito</button>
                </div>
                  
                <!--Card Botones -->    
                </div>
             
           </div>
       </div>
       
        
                         `
    }


container.innerHTML = contenidoHTML;

    $('.btn-mostrar').click(mostrarProducto);
  

}

/* select de producto y talles de prenda  */

function ShowSelected(){

let productoidModal = document.getElementById('dataproducto').value;
let talle = document.getElementById('producto').value;


let url = BASE_URL + '/stockjson';

let params = `?producto=${productoidModal}&talle=${talle}`;

        fetch (url + params)
        
        .then(
            response => response.json()
           
        ).then(
            json=>{
               
                      getColor(json.data)
                    
                       
                  } 
                //    cargarListadoDeProductos();
          
        )

}

function getColor(data){
    let container = document.getElementById('color');
    
    let contenidoHTML= '';

    for(colores of data){
        

        contenidoHTML += `
        
        <option value="${colores.colorID}">${colores.color}</option>
 
                         `                 
    }

container.innerHTML = ` <option selected>color</option>  ${contenidoHTML}`;

}

/* envío los datos obtenidos en el select a la base de datos
 */



function ShowSelectedColor(){

    let productoidModal = document.getElementById('dataproducto').value;
    let talle = document.getElementById('producto').value;
    let color = document.getElementById('color').value
    
    let url = BASE_URL + '/stockjson';
    
    let params = `?producto=${productoidModal}&talle=${talle}&color=${color}`;
    
            fetch (url + params)
            
            .then(
                response => response.json()
               
            ).then(
                json=>{
                    
                    let cantidad = (json.data[0]);
                    ShowSelectStock(cantidad.cant);

                           
                      } 
 
            )
    
    }



    function ShowSelectStock (a){

        let cantidad = a;
        let number = 1;

        if (cantidad == 0){
           // container.innerHTML =   ` <p>sin stock</p> `        
        document.getElementById('cant-stock').innerHTML =  ` <p>sin stock</p> `;
        }else {
          
           let contenidoHTML= '';

           for (let i = 0; i < cantidad ; i++) {
           
            contenidoHTML += `
        
              <option value="${number}">${number}</option> 
     
                             `         

            number++;         
           }
           document.getElementById('cant-stock').innerHTML = `<select id="cant"> ${contenidoHTML}</select>`;
        }
    
    
   
    }
    
let btnAgregarCarrito = document.getElementById('btnAgregarCarrito');
btnAgregarCarrito.addEventListener('click', agregarAlCarrito);


function agregarAlCarrito (){

    let productoidModal = document.getElementById('dataproducto').value;
    let talle = document.getElementById('producto').value;
    let color = document.getElementById('color').value
    let cantidad = document.getElementById('cant').value
   
    alert('producto='+productoidModal+ ' talle='+talle+ ' color='+color+ ' cantidad='+cantidad);

    $('#modal-mostrar-producto').modal('hide');
}





cargarListadoDeProductos();




