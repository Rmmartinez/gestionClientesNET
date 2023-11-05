document.addEventListener("DOMContentLoaded", init);

const URL_API = "https://localhost:7132/api/"

var customers = [];

function init(){
    search()
}

function updatemenu() {
    if (document.getElementById('responsive-menu').checked == true) {
        document.getElementById('menu').style.borderBottomRightRadius = '0';
        document.getElementById('menu').style.borderBottomLeftRadius = '0';
    }else{
        document.getElementById('menu').style.borderRadius = '10px';
    }
}

function agregar(){
    clean()
    abrirFormulario()
}

function abrirFormulario(){
    htmlModal = document.getElementById("modal");
    htmlModal.setAttribute("class", "modale opened")
    
}

function cerrarModal(){
    htmlModal = document.getElementById("modal");
    htmlModal.setAttribute("class", "modale")
    
}

async function search() {
    
    var url = URL_API + 'customer';
    var response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });


    customers = await response.json();

    var html = ``
    for (customer of customers){
        var row =` 
        <tr>
            <td>${customer.firstName}</td>
            <td>${customer.lastName}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>
                <a href="#" onclick="edit(${customer.id})" class="myButton">Editar</a>
                <a href="#" onclick="remove(${customer.id})" class="myButtonDelete">Eliminar</a>
            </td>
        </tr>
        `
        html = html + row;
    }

    document.querySelector('#customers>tbody').outerHTML = html

}

function edit(id){
    abrirFormulario()
    var customer = customers.find(x => x.id == id)
    console.log(customer)
    document.getElementById("txtId").value = customer.id
    document.getElementById("txtFirstName").value = customer.firstName
    document.getElementById("txtLastName").value = customer.lastName
    document.getElementById("txtEmail").value = customer.email
    document.getElementById("txtPhone").value = customer.phone
    document.getElementById("txtAddress").value = customer.address
}

async function remove (id){
    respuesta = confirm('¿Seguro que quieres eliminar?')
    if(respuesta){

        var url = URL_API + 'customer/' + id;
        await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
        });

        window.location.reload();
    }
}

function clean(){
    document.getElementById("txtId").value = ""
    document.getElementById("txtFirstName").value = ""
    document.getElementById("txtLastName").value = ""
    document.getElementById("txtEmail").value = ""
    document.getElementById("txtPhone").value = ""
    document.getElementById("txtAddress").value = ""
}

async function save (){

    var data = {
        "address": document.getElementById("txtAddress").value,
        "email": document.getElementById("txtEmail").value,
        "firstname": document.getElementById("txtFirstName").value,
        "lastname": document.getElementById("txtLastName").value,
        "phone": document.getElementById("txtPhone").value 
    }

    var id = document.getElementById('txtId').value
    if (id != '') {
        data.id = id
    }

        var url = URL_API + 'customer';
        await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
        });

        window.location.reload();
    
}