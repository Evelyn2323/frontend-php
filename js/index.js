$(document).ready(function () {
    traerdatos();
});

function traerdatos() {
    $.ajax({
        url: "http://localhost/backend/controller/aplic.php",
        type: "GET",
        dataType: "json",
        success: function (result) {
            var detalle = "";
            jQuery.each(result, function (i) {
                detalle += "<tr>";
                detalle += "<th scope='row'>" + result[i].id + "</th>";
                detalle += "<td>" + result[i].nombre_aerolinea + "</td>";
                detalle += "<td>" + result[i].nvuelo + "</td>";
                detalle += "<td>" + result[i].destino + "</td>";
                detalle += "<td><button type='button' class='btn btn-outline-primary' data-bs-toggle='modal' data-bs-target='#exampleModal' onClick='traerInfo(" + result[i].id + ")'>Actualizar</button></td>";
                detalle += "<td><button type='button' class='btn btn-outline-danger' onclick='eliminarRegistro(" + result[i].id + ")'>Eliminar</button></td>";
                detalle += "</tr>";
            });
            $("#tabla_vuelos tbody").html(detalle);
        },
        error: function (result) {
            console.error("Este maneja errores", result);
        }
    });
}

function traerInfo(id) {
    $.ajax({
        url: "http://localhost/backend/controller/aplic.php",
        type: "GET", // Cambiar a GET
        data: {
            id: id
        },
        dataType: "json",
        success: function (result) {
            $('#id').val(result.id);
            $('#nombre_aerolinea').val(result.nombre_aerolinea);
            $('#nvuelo').val(result.nvuelo);
            $('#destino').val(result.destino);
        },
        error: function (result) {
            console.error("Este maneja errores", result);
        }
    });
}

function guardarRegistro(isActualizacion) {
    var id = $('#id').val();
    var nombre_aerolinea = $('#nombre_aerolinea').val();
    var nvuelo = $('#nvuelo').val();
    var destino = $('#destino').val();
    var type = '';
    var postData = {
        id: id,
        nombre_aerolinea: nombre_aerolinea,
        nvuelo: nvuelo,
        destino: destino
    };

    if (!isActualizacion) {
        type = "POST"; // Usar POST para crear un nuevo vuelo
    }
    if (isActualizacion) {
        type = "PUT"; // Usar PUT para actualizar un vuelo existente
    }
    $.ajax({
        url: "http://localhost/backend/controller/aplic.php",
        type: type, // Usar la variable 'type' para determinar el método
        data: JSON.stringify(postData), // Enviar datos como JSON
        contentType: "application/json; charset=utf-8", // Establecer el tipo de contenido
        success: function (result) {
            alert(result);
            traerdatos(); // Vuelve a cargar los datos después de guardar o actualizar
        },
        error: function (result) {
            console.error("Este maneja errores", result);
        }
    });
}

function guardarVuelo() {
    var id = $('#id').val();

    if (id) {
        // Si hay un ID, es una actualización
        guardarRegistro(true);
    } else {
        // Si no hay un ID, es una inserción
        guardarRegistro(false);
    }
}

function eliminarRegistro(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este registro?")) {
        $.ajax({
            url: "http://localhost/backend/controller/aplic.php",
            type: "DELETE", // Usar DELETE para eliminar un vuelo
            data: JSON.stringify({ id: id }), // Enviar el ID como JSON
            contentType: "application/json; charset=utf-8", // Establecer el tipo de contenido
            success: function (result) {
                alert(result);
                traerdatos(); // Vuelve a cargar los datos después de la eliminación
            },
            error: function (result) {
                console.error("Este maneja errores", result);
            }
        });
    }
}
