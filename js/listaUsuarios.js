/*localStorage.setItem("s21120236",
    "Mariana Rodriguez Gallardo");
localStorage.setItem("s21120236",
    "Juan Pablo Rodriguez Gallardo");

console.log(localStorage.getItem("s21120236"));

console.log(localStorage.getItem("s21120237"));
let objUsuario={contrasenia:"1234",telefono:"1234567890"};
objUsuario.nombre="Mariana";
objUsuario.email="mariana@gmail.com";

objUsuario2={};
objUsuario2["nombre"]="Juan Perez";
objUsuario2.email="jPerez@gmail.com";

console.log(objUsuario);
console.log(objUsuario2);
usuarios[0]=objUsuario;
usuarios[5]=objUsuario2;
usuarios["hola"]="mundo";
let usuarios=[];
usuarios.push({nombre:"a",email:"a@a.aa",contrasenia:"123",telefono:""});
localStorage.setItem("usuarios",JSON.stringify(usuarios));
localStorage.setItem("usuariosobj",usuarios);
console.log(usuarios);

let usuarios2=JSON.parse(localStorage.getItem("usuarios"));

*/


/*window.addEventListener("load",()=>{
    //Se ejecuta cuando se descargan todos los recursos
});*/

document.addEventListener("DOMContentLoaded",()=>{
    cargarTabla();
    //Se ejecuta cuando se analiza y carga el DOM de la página (antes que load de window)
    const myModal = document.getElementById('mdlUsuario');
    const myInput = document.getElementById('txtNombre');
    const btnLimpiar = document.getElementById('btnLimpiar');

    const modalEliminar = document.getElementById('mdlEliminar');
    const btnCancel = document.getElementById('btnCancelar');
    const btnEliminar = document.getElementById('btnEliminar');
    let auxDelete;
    modalEliminar.addEventListener('shown.bs.modal', (e) => {
        let correo=e.relatedTarget.getAttribute("eliminar");
        if(correo){
            let usuarios=JSON.parse(localStorage.getItem("listaUsuarios"));
            let usuario=usuarios.find((element) => element.correo==correo);
            
            let labelH4 = document.createElement('h4');
            let divEliminar = document.getElementById("txtEliminar");
            labelH4.innerHTML = `<h4 id="labH4">Se va a eliminar el usuario <b>${usuario.nombre}</b>. ¿Está seguro de continuar?</h4>`;
            divEliminar.appendChild(labelH4);

            auxDelete = usuarios.findIndex((usuario)=> usuario.correo == correo);
        }

    })
    btnCancel.addEventListener("click", (e)=>{
        let labelh4 = document.getElementById('labH4');
        if(labelh4){
            labelh4.parentNode.removeChild(labelh4);
        }
    })
    
    btnEliminar.addEventListener("click", (e)=>{
        let usuarios = JSON.parse(localStorage.getItem("listaUsuarios")) || [];
        if(auxDelete != -1){
            usuarios.splice(auxDelete, 1);
            localStorage.setItem("listaUsuarios", JSON.stringify(usuarios));
            location.reload();
            
        }
        
    })
    
    
    
   
    let auxUser;
    let operacion;
    myModal.addEventListener('shown.bs.modal', (e) => {
        btnLimpiar.click();
        let correo=e.relatedTarget.getAttribute("editar");
        let esContra=e.relatedTarget.getAttribute("cambiarCont");
        if(correo){
            operacion="Editar";
            document.getElementById("h5Titulo").textContent="Editar usuario";
            let usuarios=JSON.parse(localStorage.getItem("listaUsuarios"));
            let usuario=usuarios.find((element) => element.correo==correo);
            auxUser = usuarios.findIndex((usuario)=> usuario.correo == correo);
            //debugger;
            document.getElementById("txtPassword").value=usuario.contrasenia;
            document.getElementById("txtConfirmarPassword").value=usuario.contrasenia;
            document.getElementById("txtNombre").value=usuario.nombre;
            document.getElementById("txtEmail").value=usuario.correo;
            document.getElementById("txtTelefono").value=usuario.telefono;
            document.getElementById("pass").style.display="none";
            document.getElementById("checkPass").style.display="none";
        }else{
            operacion="Agregar";
        }

        if(esContra){
            operacion="Contrasenia";
            document.getElementById("h5Titulo").textContent="Restablecer contraseña";
            let usuarios=JSON.parse(localStorage.getItem("listaUsuarios"));
            let usuario=usuarios.find((element) => element.correo==esContra);
            auxUser = usuarios.findIndex((usuario)=> usuario.correo == esContra);
            //debugger;
            let labelH4 = document.createElement('h4');
            let divUser = document.getElementById("divUser");
            labelH4.innerHTML = `<h4 id="labH4">Usuario: <b>${usuario.nombre}</b></h4>`;
            divUser.appendChild(labelH4);

            document.getElementById("txtNombre").value=usuario.nombre;
            document.getElementById("txtEmail").value=usuario.correo;
            document.getElementById("txtTelefono").value=usuario.telefono;
            document.getElementById("name").style.display="none";
            document.getElementById("email").style.display="none";
            document.getElementById("tel").style.display="none";
            
        }
        myInput.focus();
    })

    myModal.addEventListener('hidden.bs.modal', (e)=>{
        btnCancel.click();
        document.getElementById("name").style.display="block";
        document.getElementById("email").style.display="block";
        document.getElementById("tel").style.display="block";
        document.getElementById("pass").style.display="block";
        document.getElementById("checkPass").style.display="block";
    })

    btnLimpiar.addEventListener("click", (e)=>{
        document.getElementById("msg").style.display="none";
        e.target.form.classList.remove("validado");
        let controles=e.target.form.querySelectorAll("input, select");
        controles.forEach(control => {
            control.classList.remove("valido");
            control.classList.remove("novalido");
        })
        document.getElementById("msg").innerText="";
    })

    
    document.getElementById("btnAceptar").addEventListener("click",
    e=>{

        console.log("click");
        console.log(e.target.form.checkValidity());
        //document.querySelector("form")
        document.getElementById("msg").innerText="";
        e.target.form.className="validado";
        
        let txtNombre=document.getElementById("txtNombre");
        let txtContrasenia=document.getElementById("txtPassword");
        let txtContrasenia2=document.getElementById("txtConfirmarPassword");
        let txtEmail=document.getElementById("txtEmail");
        let txtTel=document.getElementById("txtTelefono");
        txtNombre.setCustomValidity("");
        txtContrasenia.setCustomValidity("");
        txtContrasenia2.setCustomValidity("");
        txtEmail.setCustomValidity("");
        txtTel.setCustomValidity("");
        

        if(txtNombre.value.trim().length<2 || txtNombre.value.trim().length>60){
            txtNombre.setCustomValidity("El nombre es obligatorio (entre 2 y 60 caracteres)");
        } 
        if(txtContrasenia.value.trim().length<6 || txtContrasenia.value.trim().length>20){
            txtContrasenia.setCustomValidity("La contraseña es obligatoria (entre 2 y 60 caracteres)");
        }
        if(txtContrasenia2.value.trim().length<6 || txtContrasenia2.value.trim().length>20){
            txtContrasenia2.setCustomValidity("Confirma la contraseña");
        }
        if(txtTel.value.trim().length>0 && txtTel.value.trim().length<10){
            txtTel.setCustomValidity("El teléfono debe tener 10 dígitos");
        }

        if (operacion == "editar") {
            let usuarios=JSON.parse(localStorage.getItem("listaUsuarios"));
            let usuario=usuarios.find((element) => element.correo==correo);
            txtContrasenia.value=usuario.contrasenia
            txtContrasenia2.value=usuario.contrasenia

            txtContrasenia.setCustomValidity("");
            txtContrasenia2.setCustomValidity("");
        }
        if (operacion == "contrasenia") {
            txtNombre.setCustomValidity("");
            txtEmail.setCustomValidity("");
            txtTel.setCustomValidity("");
        }

        if(e.target.form.checkValidity()){
           //guarda 
debugger;
            //guarda los valores del localstorage "listaUsuarios" y los guarda en un arreglo
           let usuarios= JSON.parse(localStorage.getItem("listaUsuarios")) || [];
           let editado; 
            if (operacion == "Editar") {
                
                user = usuarios[auxUser];
                let newUser = {
                    contrasenia:user.contrasenia,
                    telefono:txtTel.value,
                    nombre:txtNombre.value, 
                    correo:txtEmail.value
                };
                usuarios[auxUser] = newUser;
                if (newUser.correo==user.correo) {
                    editado=true;
                }
                localStorage.setItem("listaUsuarios", JSON.stringify(usuarios))
                debugger;
            }
            if (operacion == "Contrasenia") {
                user = usuarios[auxUser];
                let newUser = {
                    contrasenia:txtContrasenia2.value,
                    telefono:user.telefono,
                    nombre:user.nombre, 
                    correo:user.correo
                };
                usuarios[auxUser] = newUser;
                if (newUser.correo==user.correo) {
                    editado=true;
                }
                localStorage.setItem("listaUsuarios", JSON.stringify(usuarios))

                debugger;
            }
           //filter devuelve una colección de todos los elementos que coiincidan con una función condicional
           //find devuelve un elemento que coincida con una funcióon condicional
           //indexOf devuelve el índice del primer elemento que coincida con una función condicional
           let encontrado= usuarios.find((usuarios)=>usuarios.correo == txtEmail.value);
           if(encontrado && !editado){
                
               txtEmail.setCustomValidity("");
               let msg = document.getElementById("msg");
               msg.style.display="block";
               msg.innerText="Este correo ya se encuentra en uso";
               e.preventDefault();
               return;
            }else if(!encontrado && operacion=="Agregar"){
               // agrega los nuevos valores de los campos de texto al arreglo
               usuarios.push({
                   contrasenia:txtContrasenia2.value, 
                   telefono:txtTel.value, 
                   nombre:txtNombre.value, 
                   correo:txtEmail.value
                });
                console.log(usuarios);
                localStorage.setItem("listaUsuarios",JSON.stringify(usuarios));
                
                debugger;
                location.reload();
            }

            
            
            location.reload();
            // Guarda los valores del arreglo en el localStorage incluyendo los anteriores y el nuevo 
        }else{
            e.preventDefault();
            debugger;
        }

    });
/*
    document.getElementById("txtNombre").addEventListener("change",e=>{
        revisarNombre();
    });*/
    
    //document.getElementById("txtNombre").addEventListener("keyup",revisar("txtNombre",2,60));

        document.getElementById("txtNombre").addEventListener("keyup",e=>revisar("txtNombre",2,60));
        document.getElementById("txtPassword").addEventListener("keyup", e=>revisar(e.target.id,6,20));
        document.getElementById("txtConfirmarPassword").addEventListener("keyup", e=>revisar(e.target.id,6,20));
        document.getElementById("txtTelefono").addEventListener("keyup", e=>revisar(e.target.id,0,10));
        document.getElementById("txtEmail").addEventListener("keyup", e=>revisar(e.target.id,0,30));

   

});

let pass;
function revisar(id,min,max){
    
    let txt=document.getElementById(id);
    txt.setCustomValidity("");
    txt.classList.remove("valido");
    txt.classList.remove("novalido");
    
    if(txt.value.trim().length<min ||
    txt.value.trim().length>max){
        txt.setCustomValidity("Campo no válido");
        txt.classList.add("novalido");
    }else{
        txt.classList.add("valido");
    }
    

    if(id == "txtPassword"){
        pass = txt.value;
    }
    if(id == "txtConfirmarPassword"){
        if(pass == txt.value){
            txt.classList.add("valido");
        } else{
            txt.classList.add("novalido");
        }
    }
    if(id == "txtTelefono"){
        if(!esNumero(txt.value)){
            txtTelefono.value = txt.value.substring(0, txt.value/length -1);
        }
        function esNumero(cadena){
            return /^\d*$/.test(cadena);
        }
    }
    if(id == "txtEmail"){
        let expEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,7}$/);
        if(expEmail.test(txt.value)){
            txt.classList.add("valido")
        }else{
            txt.classList.add("novalido")
        }
    }
    /*console.log(txtNombre.value);
    console.log(txtNombre.validity);*/

    

}

function inicializarDatos(){
    
    let datos=localStorage.getItem("listaUsuarios");
    if(!datos){
        //Crear un arreglo con datos inciales
        let objUsuario={contrasenia:"lasecre",telefono:"3424567890",nombre:"Kevin", correo:"kiwi@gmail.com"};
        let objUsuario1={contrasenia:"elpepe",telefono:"9486543219",nombre:"Jose", correo:"Peperoots@gmail.com"};
        let objUsuario2={contrasenia:"betito",telefono:"4532189510",nombre:"Roberto", correo:"Betish@gmail.com"};
        let objUsuario3={contrasenia:"elconchi",telefono:"4462135751",nombre:"Gabriel", correo:"Gabo@gmail.com"};
        let objUsuario4={contrasenia:"eljarras",telefono:"7551321841",nombre:"Jairo", correo:"Jairo@gmail.com"};
        let objUsuario5={contrasenia:"elbanquito",telefono:"4421321548",nombre:"Esteban", correo:"Estebanquito@gmail.com"};

        let usuarios=[];
        usuarios[0]=objUsuario;
        usuarios[1]=objUsuario1;
        usuarios[2]=objUsuario2;
        usuarios[3]=objUsuario3;
        usuarios[4]=objUsuario4;
        usuarios[5]=objUsuario5;
        localStorage.setItem("listaUsuarios",JSON.stringify(usuarios));
    }
}

function cargarTabla(){
    inicializarDatos();
    
    let usuarios=JSON.parse(localStorage.getItem("listaUsuarios"));
    /*for (let i = 0; i < usuarios.length; i++) {
        const usuario = usuarios[i];
        
    }*/
    let tbody=document.querySelector("#tblUsuarios tbody");
    usuarios.forEach(usuario => {
        //Crear una fila con todos los datos del usuario
        /*let fila=`<tr><td>${usuario.nombre}</td><td>${usuario.correo}</td><td>${usuario.telefono}</td><td></td></tr>`;
        //Añadir la fila concatenandola con su contenido html
        tbody.innerHTML+=fila;*/
        let fila=document.createElement("tr");
        
        let celda=document.createElement("td");
        celda.innerHTML=`<a href="#" data-bs-toggle="modal" data-bs-target="#mdlUsuario" editar="${usuario.correo}">${usuario.nombre}</a>`;
        fila.appendChild(celda);
        celda=document.createElement("td");
        celda.innerText=usuario.correo;
        fila.appendChild(celda);
        celda=document.createElement("td");
        celda.appendChild(document.createTextNode(usuario.telefono));
        fila.appendChild(celda);
        celda=document.createElement("td");
        celda.innerHTML=`<button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#mdlEliminar" eliminar="${usuario.correo}">Eliminar</button>`;
        fila.appendChild(celda);
        celda=document.createElement("td");
        celda.innerHTML=`<button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#mdlUsuario" cambiarCont="${usuario.correo}">Restablecer Contraseña</button>`;
        fila.appendChild(celda);
        tbody.appendChild(fila);
    });
}