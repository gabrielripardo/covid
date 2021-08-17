
fetchCountries()
function fetchCountries() {
    const countries = 'https://api.covid19api.com/countries'
    const country = document.getElementById('cmbCountry')
    console.log(countries)
    // Make a request for a user with a given ID
    axios.get(countries)
        .then(function (response) {
            // handle success
            console.log(response.data);
            const countries = _.sortBy(response.data, 'Country')
            countries.forEach((element, index) => {
                const option = document.createElement('option')
                option.textContent = element.Country
                option.setAttribute('value', element.Country)
                if (element.Country == 'Brazil') {
                    option.setAttribute('selected', 'selected')
                }
                country.appendChild(option)
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}


function applyFilter() {
    const dtStart = document.getElementById('date_start').value
    const dtEnd = document.getElementById('date_end').value
    const country = document.getElementById('cmbCountry').value
    const dataType = document.getElementById('cmbData').value

    const countryFilter = 'https://api.covid19api.com/country/' + country + '?from='+dtStart+'&to='+dtEnd
    axios.get(countryFilter)
        .then(function (response) {
            // handle success
            console.log(response.data);
            const numbers = calcTotals(response.data)
            renderKpis(numbers)            
            console.log(dataType)
            console.log(formatDays(response.data))
            console.log(getIndividualNums(response.data, dataType))

            const daysList = formatDays(response.data)
            const datasType = getIndividualNums(response.data, dataType)
            const numsAverage = getAverageNums(response.data, dataType)           
            const titlesDataSet = getTitleDataSet(dataType) 
            
            renderChartLine(daysList, datasType, numsAverage, titlesDataSet)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

function renderKpis(totals) {
    const kpiConfirmed = document.getElementById('kpiconfirmed')
    const kpiDeaths = document.getElementById('kpideaths')
    const kpiRecovered = document.getElementById('kpirecovered')

    kpiConfirmed.textContent = totals.tConfirmed
    kpiDeaths.textContent = totals.tDeaths
    kpiRecovered.textContent = totals.tRecovered
}

function calcTotals(days) {
    const tConfirmed = _.sum(days.map(item => item.Confirmed))
    const tDeaths = _.sum(days.map(item => item.Deaths))
    const tRecovered = _.sum(days.map(item => item.Recovered))
    console.log(days.length)
    console.log(typeof (tConfirmed))
    return {
        tConfirmed,
        tDeaths,
        tRecovered,
        mediaConfirmed: parseInt(tConfirmed) / days.length,
        mediaDeaths: parseInt(tDeaths) / days.length,
        mediaRecovered: parseInt(tRecovered) / days.length,
    }
}

function formatDays(days) {
    return days.map(item => moment(item.Date.split("T")[0]).format('DD-MM-YYYY'))
}

function getIndividualNums(nums, type) {
    switch (type) {
        case 'Confirmed': return nums.map(item => item.Confirmed)
        case 'Deaths': return nums.map(item => item.Deaths)
        case 'Recovered': return nums.map(item => item.Recovered)
    }
}

function getAverageNums(nums, type){
    switch (type) {
        case 'Confirmed': return nums.map( () => calcTotals(nums).mediaConfirmed)
        case 'Deaths': return nums.map(() => calcTotals(nums).mediaDeaths)
        case 'Recovered': return nums.map(() => calcTotals(nums).mediaRecovered)
    }    
}

function getTitleDataSet(type){
    switch(type){
        case 'Confirmed': return ['Número de casos confirmados', 'Média de casos confirmados']
        case 'Deaths': return ['Número de mortes', 'Média de mortes']
        case 'Recovered': return ['Número de recuperados', 'Média de recuperados']
    }
}

const btnApply = document.getElementById('filtro')
btnApply.addEventListener('click', applyFilter)


