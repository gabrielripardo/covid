// import Utils from './utils.js'
function renderChartPizza(c, r, m){
    var pizza = document.getElementById('pizza').getContext('2d');
    console.log('chartPizza....')
    new Chart(pizza, {
        type: 'pie',
        data: {
            labels: [
                'Confirmados',
                'Recuperados',
                'Mortes'
            ],
            datasets: [{
                label: 'Distribuição de novos casos',
                data: [c, r, m],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
        },
    });    
}

function renderChartBar(totalDeaths, country){    
    var barras = document.getElementById('barras').getContext('2d');
    new Chart(barras, {
        type: 'bar',
        data: {
            labels: country,
            datasets: [{
                label: 'Total de Mortes por país - Top 10',
                data: totalDeaths,
                backgroundColor: 'lightblue',                
                borderColor: 'darkblue',                                        
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });    
}
let chartLine = null
function renderChartLine(days, datas, datasAverage, title){
    var line = document.getElementById('linhas').getContext('2d');
    const DATA_COUNT = 7;
    const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

    const labels = days;
    const data = {
         labels: labels,
        datasets: [
            {
                label: title[1],
                data: datasAverage,
                borderColor: 'red',
                backgroundColor: '#eee',
            },
            {
                label: title[0],
                data: datas,
                borderColor: 'blue',
                backgroundColor: '#eee',
            }
        ]
    };

    if(chartLine!=null){
        chartLine.destroy();
    }

    chartLine = new Chart(line, {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Curva diária de Covid-19'
            }
          }
        },
    })    
}
