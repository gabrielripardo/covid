var barras = document.getElementById('barras').getContext('2d');


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

