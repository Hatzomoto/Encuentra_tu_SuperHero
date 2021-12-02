$(document).ready(function () {
    $("form").submit(function (event) {
        event.preventDefault();

        let valueInput = $("#heroInput").val();
        let validacion = /^\d*$/;

        if (validacion.test(valueInput) !== true) {
            alert("Ingresa el número de id del super heroe, de 1 a 731");
            $("#heroInput").val("")
        } else if (valueInput > 731 || valueInput < 1) {
            alert("Ingresa el número de id del super heroe, de 1 a 731")
            $("#heroInput").val("")
        };

        let imagen;
        let nombre;
        let conexiones;
        let publicado;
        let ocupacion;
        let pAparicion;
        let altura; 
        let peso;
        let alianzas; 
        let powerstats;

        $.ajax({
            type: "GET",
            dataType: "json",
            url: "https://superheroapi.com/api.php/10225031513557567/" + valueInput,
            success: function (data) {

                imagen = data.image.url;
                nombre = data.name;
                conexiones = data.connections["group-affiliation"];
                publicado = data.biography.publisher;
                ocupacion = data.work.occupation;
                pAparicion = data.biography["first-appearance"];
                altura = data.appearance.height;
                peso = data.appearance.weight;
                alianzas = data.biography.aliases;
                powerstats = data.powerstats
            },
            error: function (data) {
                console.log(data)
            },
            async: false,
        });

        $("#card").html(`
                    <div class="card mb-3 border-secondary">
                        <div class="row no-gutters">
                            <div class="col-12 col-sm-4">
                                <img src="${imagen}" class="img-fluid">
                            </div>
                            <div class="col-12 col-sm-8">
                                <div class="card-body">
                                    <h6 class="card-title d-inline">Nombre: </h6><h6 class="card-title d-inline">${nombre}</h6>
                                    <div>
                                    <p class="card-text d-inline">Conexiones: </p><p class="d-inline">${conexiones}</p>
                                    </div>
                                    <div class="ml-3 mt-4">
                                        <p class="card-text font-italic d-inline">Publicado por: </p><p class="d-inline">${publicado}</p>
                                        <hr>
                                        <p class="card-text font-italic d-inline">Ocupación: </p><p class="d-inline">${ocupacion}</p>
                                        <hr>
                                        <p class="card-text font-italic d-inline">Primera Aparición: </p>${pAparicion}<p class="d-inline"></p>
                                        <hr>
                                        <p class="card-text font-italic d-inline">Altura: </p><p class="d-inline">${altura}</p>
                                        <hr>
                                        <p class="card-text font-italic d-inline">Peso: </p><p class="d-inline">${peso}</p>
                                        <hr>
                                        <p class="card-text font-italic d-inline">Alianzas: </p><p class="d-inline">${alianzas}</p>
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </div>
                `);

                let estadisticas = [];

                for (var key in powerstats) {
                    estadisticas.push({
                        label: key,
                        y: parseInt(powerstats[key]),
                    });
                }

                var chart = new CanvasJS.Chart("grafico", {
                    theme: "light1",
                    exportEnabled: true,
                    animationEnabled: true,
                    title: {
                        text: `Estadisticas de poder para ${nombre}`
                    },
                    data: [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y}",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 15,
                        indexLabel: "{label} - {y}",
                        dataPoints: estadisticas
                    }]
                });
                chart.render();

    });

});