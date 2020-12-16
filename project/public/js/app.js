mapboxgl.accessToken = 'pk.eyJ1IjoibWFnaS1rNHJwIiwiYSI6ImNraW9ydXF6ODBsYXMyeW95aXlneGZwdTUifQ.wVKd428OulgBHJ6YwxTYfA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
});

let markers = [];
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

                marker.getElement().addEventListener("click", function() {
                    displayEmployees (element)
                });
        }
    }
})

function displayEmployees (Company){
    $( ".sidebar" ).empty();
    $( ".sidebar" ).append("<h1>"+ Company["name"] + "</h1><p>" + Company["adresse"] + "</p><p> Phone : " + Company["phone"] + "</p>");
    $.ajax({
        type: "GET",
        url: "api/companies/" + Company['id'] + "/employees",
        data: {
        },
        success: value => {
            for (let index = 0; index < value.length; index++) {
                const element = value[index];
                let ajout = '<ul class="list-group"><li class="list-group-item">' + element['name'] + " " + element['first_name'] + '</li><li class="list-group-item">' + element['phone'] + '</li><li class="list-group-item">' + element['adresse'] + '</li></ul><br>'
                $( ".sidebar" ).append( ajout )
            }
        }
    })
    $('.sidebar').dropdown();
}