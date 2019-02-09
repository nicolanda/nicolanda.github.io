Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

var labels = ["January", "February", "March", "April", "May", "June", "July"];
var startData = [0, 10, 5, 2, 20, 30, 45];
var olddata = [100, 95, 85, 75, 65, 55, 50];


function addData(chart, newData) {
    console.log(newData);
    chart.data.datasets[0].data = newData;
    chart.update();
}

function removeData(chart) {
    do{
        chart.data.datasets.forEach((dataset) => {
            dataset.data.pop();         
            countData = dataset.data.length;
        });
    }while(countData > 0);

    chart.update();
}

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {

    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
            labels: [],
            datasets: [{
                        label: "Sensor",
                        //backgroundColor: 'rgb(0, 99, 132)',
                        borderColor: 'rgb(0, 99, 132)',
                        data: [],
            }/*,{
                        label: "My Second dataset",
                        //backgroundColor: 'rgb(0, 200, 0)',
                        borderColor: 'rgb(0, 200, 0)',
                        data: olddata1,
                    }*/
                ]
            },

            // Configuration options go here
            options: {}
        });



        // function update with button

        function updateChart(chart, data){
            removeData(chart);    
            addData(chart, data);
        }
    /*function updateChart(){
         //chart.data.datasets[0].data = newdata;
         //chart.data.datasets[1].data = newdata1;
         chart.data.labels = ["August", "September", "October", "Nomvember", "December"];
         chart.update();
    };*/

// pop = remove last value
// shift = remove fisrth value
// unshift = add value at the begining of the array
// shift = add value at the end of the array

    function addValue(chart, newValue, newLabel){
        chart.data.labels.shift();
        //chart.data.labels.push("01/1, 05:10:00 PM");
        chart.data.labels.push(newLabel);

        chart.data.datasets[0].data.shift();
        chart.data.datasets[0].data.push(newValue);

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

    function dateFormat(date){
        return date.toLocaleTimeString('en-US', {month : '2-digit', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'});
    }

    function loadSensores (){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://sensoresriostulua.herokuapp.com/sensores/', true);
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
                var sensoresOld = chart.data.datasets[0].data; 
                var sensoresService = [];

                /*for (var i in sensores){
                    date = new Date(sensores[i].fecha);
                    /*if (date.getMinutes()<10) {
                        sensoresLabels.push(date.getHours()+":0"+date.getMinutes()+":"+date.getSeconds());
                    }
                    else{
                        sensoresLabels.push(date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
                    }
                    sensoresLabels.push(date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
                    sensoresLabels.push(dateFormated);
                    sensoresData.push(sensores[i].distancia);
                }*/

                sensores.forEach(sensor => {
                    sensoresService.push(sensor.distancia);
                });

                var newSensors = sensoresService.diff(sensoresOld);

                if(newSensors.length > 0 && sensoresOld.length > 0)
                {
                    var newDataChart = sensores.slice(-newSensors.length);
                    newDataChart.forEach(sensor => {
                        addValue(chart, sensor.distancia, dateFormat(new Date(sensor.fecha)));
                    });

                }else if(sensoresOld.length == 0){
                    var sensorDate = [];
                    var sensorDistance = [];
                    sensores.forEach(sensor => {
                        sensorDate.push(dateFormat(new Date(sensor.fecha)));
                        sensorDistance.push(sensor.distancia);
                    });
                    chart.data.datasets[0].data = sensorDistance;
                    chart.data.labels = sensorDate;
                    chart.update();
                }

                /*chart.data.datasets[0].data = sensoresData;
                chart.data.labels = sensoresLabels;
                chart.update();*/
                
            }
        }

        xhr.send();
    }

    loadSensores();

    setInterval(() => {
        
    }, interval);
