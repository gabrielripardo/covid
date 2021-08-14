const summary = 'https://api.covid19api.com/summary'

getTotals()
async function getTotals() {
    await fetch(summary).then((rs) => {
        rs.json().then((item) => {
            console.log(item.Global)
            document.getElementById("confirmed").textContent = item.Global.TotalConfirmed
            document.getElementById("death").textContent = item.Global.TotalDeaths
            document.getElementById("recovered").textContent = item.Global.TotalRecovered
        })
    })
}

getNewTotals()
async function getNewTotals() {
    await fetch(summary).then((rs) => {
        rs.json().then((item) => {
            console.log(item)
            renderChartPizza(item.Global.NewConfirmed, item.Global.NewRecovered, item.Global.NewDeaths)
        })
    })
}
getTop10()
async function getTop10() {
    //Os países com mais TotalDeaths
    await fetch(summary).then((rs) => {
        rs.json().then((item) => {
            console.log(item.Countries)
            let top10 = item.Countries.sort((e1, e2) => {
                if (e1.TotalDeaths > e2.TotalDeaths) {
                    return -1
                } else if (e1.TotalDeaths < e2.TotalDeaths) {
                    return 1
                } else {
                    return 0
                }
            })
            console.log("top 10 ****")
            console.log(top10)
            let totalDeaths = top10.filter((item, index) => index < 10).map(item => item.TotalDeaths)
            let country = top10.filter((item, index) => index < 10).map(item => item.Country)
            
            renderChartBar(totalDeaths, country)
            // renderChartPizza(item.Global.NewConfirmed, item.Global.NewRecovered, item.Global.NewDeaths)
        })
    })
}