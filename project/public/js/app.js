mapboxgl.accessToken = 'pk.eyJ1IjoibWFnaS1rNHJwIiwiYSI6ImNraW9ydXF6ODBsYXMyeW95aXlneGZwdTUifQ.wVKd428OulgBHJ6YwxTYfA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
});

map.on('load', function () {
    map.resize();
});


//-------------------Menu mobile
let menuDisplay = true;

function menu (){
    if (menuDisplay){
        $("#menu").empty().append(barres);
        $(".sidebar").css({'animation-name':'slideleft', "right":"961px"});
        menuDisplay = false;
    } else {
        $("#menu").empty().append(croix);
        $(".sidebar").css({'animation-name':'slideright', "right":"0px"});
        menuDisplay = true;
    }
}

$("#menu").on('click', () => menu());

//-----------------Get positions of compagnies
let companies = [];

$.ajax({
    type: "GET",
    url: "api/companies",
    data: {
    },
    success: value => {
        for (let index = 0; index < value.length; index++) {
            const element = value[index];
            companies.push(element);
            let marker = new mapboxgl.Marker({
                color: "#E41818",
                draggable: false
                })
                .setLngLat([element['longitude'], element['latitude']])
                .addTo(map);
                marker.getElement().id = element["id"];

                $(marker.getElement()).on('click', () => displayEmployees (element));
        }
    }
})

//-----------------Display list of Employees

$("#cache").on('click', function (){
    $('#form').css('display', 'none');
    $('#form').empty();
    $('#cache').css('display', 'none');
});

function displayEmployees (company){
    
    $(".sidebar").empty().append('<h1>'+ company["name"] + '</h1><p>' + companySVG + ' ' + company["adresse"] + '</p><p>'+ phone + ' ' + company["phone"] + '</p><div class="center"><button id="edit-company-' + company['id'] + '" type="button" class="btn btn-success">Edit company</button><button id="delete-company-' + company['id'] + '" type="button" class="btn btn-danger">Delete company</button></div><br>');
    $.ajax({
        type: "GET",
        url: "api/companies/" + company['id'] + "/employees",
        data: {
        },
        success: value => {
            if (value.length != 0){
                for (let index = 0; index < value.length; index++) {
                    const element = value[index];
                    let ajout = '<div class="center profile" id="employee-' + element["id"] + '"><ul class="list-group"><li class="list-group-item">'+ profile + ' ' + element['name'] + " " + element['first_name'] + '</li><li class="list-group-item">'+ adresse + ' ' + element['adresse'] + '</li><li class="list-group-item">'+ phone2 + ' ' + element['phone'] + '</li></ul><button id="edit-employee-' + element['id'] + '" type="button" class="btn btn-success">Edit profile</button><button id="delete-employee-' + element['id'] + '" type="button" class="btn btn-danger">Delete profile</button></div>'
                    $(".sidebar").append(ajout);
                    $("#edit-employee-" + element["id"]).on('click', () => formEditEmployee(element));
                    $("#delete-employee-" + element["id"]).on('click', () => deleteData("employees", element["id"]))
                }
            } else {
                $(".sidebar").append('<p class="notfound"><strong>Employees not found</strong></p>');
            }
            $("#edit-company-" + company["id"]).on('click', () => formEditCompany(company));
            $("#delete-company-" + company["id"]).on('click', () => deleteData("companies", company["id"]));
        }
    })
    menu();
}

//---------------Edit data + form
function formEditCompany(company){

    $('#form').append('<form><h1>Edit company</h1><label for="name">' + companySVG + ' Name : </label><input type="text" class="form-control" id="name" name="name"><br><label for="address">' + adresse + ' Address : </label><input type="text" class="form-control" id="address" name="address"><br><label for="phone">' + phone2 + ' Phone : </label><input type="text" class="form-control" id="phone" name="phone"><br><label for="latitude">' + localisation + ' Lat. : </label><input type="text" class="form-control" id="latitude" name="latitude"><label for="longitude">' + localisation + 'Long. : </label><input type="text" class="form-control" id="longitude" name="longitude"><button id="submit" class="btn btn-success">Submit</button></form>')
    $('#form').css('display', 'flex');
    $('#cache').css('display', 'flex');
    $('#name').val(company['name']);
    $('#phone').val(company['phone']);
    $('#address').val(company['adresse']);
    $('#latitude').val(company['latitude']);
    $('#longitude').val(company['longitude']);

    $('#submit').on('click', function (){
        let request = {
            'id':company['id'],
            'name':$('#name').val(),
            'phone':$('#phone').val(),
            'adresse':$('#address').val(),
            'latitude':$('#latitude').val(),
            'longitude':$('#longitude').val()
        } 
        editData("companies", request, company['id'])
    })
}
function formEditEmployee(employee){

    $('#form').append('<form><h1>Edit a employe</h1><label for="name">' + profile + ' Name : </label><input type="text" class="form-control" id="name" name="name"><br><label for="first_name">' + profile + ' Lat. : </label><input type="text" class="form-control" id="first_name" name="first_name"><br><label for="address">' + adresse + ' Address : </label><input type="text" class="form-control" id="address" name="address"><br><label for="phone">' + phone2 + ' Phone : </label><input type="text" class="form-control" id="phone" name="phone"><button id="submit" class="btn btn-success">Submit</button></form>')
    $('#form').css('display', 'flex');
    $('#cache').css('display', 'flex');
    $('#name').val(employee['name']);
    $('#first_name').val(employee['first_name']);
    $('#phone').val(employee['phone']);
    $('#address').val(employee['adresse']);

    $('#submit').on('click', function (){
        let request = {
            'id':employee['id'],
            'name':$('#name').val(),
            'first_name':$('#first_name').val(),
            'phone':$('#phone').val(),
            'adresse':$('#address').val(),
        } 
        editData("employees", request, employee['id'])
    })
}

function editData(type, request, id){
    let result = false;
    $.ajax({
        type: "PUT",
        url: "api/" + type + "/" + id,
        data: request,
        success: value => {
        }
    })
}

//-----------------Delete a data
function deleteData(type, id){
    $.ajax({
        type: "DELETE",
        url: "api/" + type + "/" + id,
        data: {
        },
        success: value => {
            if (type == "companies"){
                $(".sidebar").empty();
                $("#" + id).remove();
                $(".sidebar").append('<h3 class="center notfound"><strong>Company remove with succes !</strong></h3>');
            } else {
                $("#employee-" + id).remove();
            }
        }
    })
}

//-------------------SVG
const phone = '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M8.26 1.289l-1.564.772c-5.793 3.02 2.798 20.944 9.31 20.944.46 0 .904-.094 1.317-.284l1.542-.755-2.898-5.594-1.54.754c-.181.087-.384.134-.597.134-2.561 0-6.841-8.204-4.241-9.596l1.546-.763-2.875-5.612zm7.746 22.711c-5.68 0-12.221-11.114-12.221-17.832 0-2.419.833-4.146 2.457-4.992l2.382-1.176 3.857 7.347-2.437 1.201c-1.439.772 2.409 8.424 3.956 7.68l2.399-1.179 3.816 7.36s-2.36 1.162-2.476 1.215c-.547.251-1.129.376-1.733.376"/></svg>'
const phone2 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"/></svg>'
const profile = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.822 18.096c-3.439-.794-6.641-1.49-5.09-4.418 4.719-8.912 1.251-13.678-3.732-13.678-5.081 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-2.979.688-3.178 2.143-3.178 4.663l.005 1.241h10.483l.704-3h1.615l.704 3h10.483l.005-1.241c.001-2.52-.198-3.975-3.177-4.663zm-8.231 1.904h-1.164l-.91-2h2.994l-.92 2z"/></svg>'
const adresse = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z"/></svg>'
const localisation = '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602"/></svg>'
const croix = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z"/></svg>'
const barres = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 17h-12v-2h12v2zm0-4h-12v-2h12v2zm0-4h-12v-2h12v2z"/></svg>'
const companySVG = '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M21 22h2v2h-22v-2h2v-22h18v22zm-10-3h-2v4h2v-4zm4 0h-2v4h2v-4zm4-17h-14v20h2v-5h10v5h2v-20zm-12 11h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-8-3h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-8-3h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-8-3h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"/></svg>'