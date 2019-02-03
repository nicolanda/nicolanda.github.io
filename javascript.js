var olddata = [0, 10, 5, 2, 20, 30, 45];
var newdata = [0, 10, 20, 30, 40, 50, 60];
var olddata1 = [100, 95, 85, 75, 65, 55, 50];
var newdata1 = [50, 40, 30, 20, 15, 10, 5];


    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {

    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                        label: "My First dataset",
                        //backgroundColor: 'rgb(0, 99, 132)',
                        borderColor: 'rgb(0, 99, 132)',
                        data: olddata,
            },{
                        label: "My Second dataset",
                        //backgroundColor: 'rgb(0, 200, 0)',
                        borderColor: 'rgb(0, 200, 0)',
                        data: olddata1,
                    }
                ]
            },

            // Configuration options go here
            options: {}
        });

        // function update with button

    function updateChart(){
         //chart.data.datasets[0].data = newdata;
         //chart.data.datasets[1].data = newdata1;
         chart.data.labels = ["August", "September", "October", "Nomvember", "December"];
         chart.update();
    };

// pop = remove last value
// shift = remove fisrth value
// unshift = add value at the begining of the array
// shift = add value at the end of the array

    function addValue(){
        chart.data.datasets[0].data.shift();
        chart.data.datasets[0].data.push(999);
        chart.data.labels.push("January");
        chart.update();
        }

// Ajax

  /*  function loadSensor (){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/sensores', true);

        xhr.onload = function(){
            if(this.status == 200){
                var sensor = JSON.parse(this.responseText);

                var output = '';

                output += '<ul>'+
                    '<li>fecha: '+sensor.fecha+' </li>' +
                    '<li>distancia: '+sensor.distancia+' </li>' +
                    '<li>sensorID: '+sensor.sensorID+' </li>' +
                    '</ul>';
                document.getElementById('sensor').innerHTML == output;
                
            }
        }

        xhr.send();
    }*/

    

    function loadSensores (){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://sensoresriostulua.herokuapp.com/sensores', true);
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");

        xhr.onload = function(){
            if(this.status == 200){
                var sensores = JSON.parse(this.responseText);
                //var date = Date(sensores[0].fecha);

               /* var output = '';

                for (var i in sensores){
                output += '<ul>'+
                    '<li>fecha: '+sensores[i].fecha+' </li>' +
                    '<li>distancia: '+sensores[i].distancia+' </li>' +
                    '<li>sensorID: '+sensores[i].sensorID+' </li>' +
                    '</ul>';

                }
                //document.getElementById('sensores').innerHTML == output;*/
                var sensoresLabels = [];
                var sensoresData = [];

                for (var i in sensores){
                    sensoresLabels.push(Date(sensores[i].fecha));
                    sensoresData.push(sensores[i].distancia);
                }

                chart.data.datasets[0].data = sensoresData;
                chart.data.labels = sensoresLabels;
                chart.update();
                
            }
        }

        xhr.send();
    }
