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
renderChartLine()
function renderChartLine(){
    var line = document.getElementById('linhas').getContext('2d');
    new Chart(line, {
        type: 'line',
        data: {
            labes: [7, 6, 5, 4, 3, 2, 1],
            datasets: [{
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }]
        },
    });  
}
