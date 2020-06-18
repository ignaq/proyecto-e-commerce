
// ------------ login----------------------------

let btnIniciarSesion = document.getElementById('btn-iniciar');
btnIniciarSesion.addEventListener ('click', modalSesion);

let btnGuardar = document.getElementById('btn-guardarusuario');
btnGuardar.addEventListener('click', iniciarSesion)


function modalSesion(event){
    


   let inputs = document.querySelectorAll('#modal-nuevo input');

   //Limpiar los imputs acá !
   for(let i=0; i<inputs.length; i++){
       inputs[i].value = '';
   }

   $('#modal-nuevo').modal('show');
}

/*
async function iniciarSesion(){
    let url = BASE_URL + '/clientesLogin';

    let emailUsuario = document.getElementById('useremail').value;
    let passUsuario  = document.getElementById('userpass').value;

    let params = `?useremail=${emailUsuario}&userpass=${passUsuario}`;

    let response = await  fetch (url + params,
        {
            method : 'POST'
        }
    )

    let json = await response.json();

    console.log(json);

    return json;

}*/


 function iniciarSesion(){

  let url = BASE_URL + '/clienteslogin';

  let emailUsuario = document.getElementById('useremail').value;
  let passUsuario  = document.getElementById('userpass').value;

  
  
  let params = `?useremail=${emailUsuario}&userpass=${passUsuario}`;

        fetch (url + params,
            {
                method : 'POST'
            }
        ).then(
            response => response.json()
        ).then(
            data=>{
                    alert('Bienvenido/a: ' + data.data[0].nombre + ' ' +  data.data[0].apellido);
                    console.log(data)
            } 
  
        )
  
}



// ------------ registro-----------------------------
let btnModalRegistro = document.getElementById('btn-crearCuenta');
btnModalRegistro.addEventListener('click', modalRegistro );

let btnRegistro = document.getElementById('btn-registrar');
btnRegistro.addEventListener('click', enviarRegistro);



function modalRegistro(event){
    $('#modal-registro').modal('show');
}


function enviarRegistro(){
let url = BASE_URL + '/clientesjson';


let nombre = document.getElementById('nameNewUser').value;
let apellido = document.getElementById('lastNameNewUser').value;
let email = document.getElementById('emailNewUser').value;
let pass = document.getElementById('pass1').value;
let pass2 = document.getElementById('pass2').value;

let params = `?nameNewUser=${nombre}&lastNameNewUser=${apellido}&emailNewUser=${email}&pass1=${pass}`;

        fetch (url + params,
            {
                method : 'POST'
            }
        ).then(
            response => response.json()
        ).then(
            data=>{
            
                alert('Envio exitoso');  
            } 
                //    cargarListadoDeProductos();
            
            //  $('#modal-editor-producto').modal('hide');
            
        )

}



