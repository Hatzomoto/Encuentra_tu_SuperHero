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

        $.ajax({
            type: "GET",
            dataType: "json",
            url: "https://superheroapi.com/api.php/10225031513557567/" + valueInput,
            success: function (data) {
                let imagen = data.image.url;
                let nombre = data.name;
                let conexiones = data.connections["group-affiliation"];
                let publicado = data.biography.publisher;
                let ocupacion = data.work.occupation;
                let pAparicion = data.biography["first-appearance"];
                let altura = data.appearance.height;
                let peso = data.appearance.weight;
                let alianzas = data.biography.aliases;

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

                for (var key in data.powerstats) {
                    estadisticas.push({
                        label: key,
                        y: parseInt(data.powerstats[key]),
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
            },

            error: function (data) {
                console.log(data)
            },

            async: true,
        });

    });

});