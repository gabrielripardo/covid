const dtStart = document.getElementById('date_start').value
const dtEnd = document.getElementById('date_end').value
const country = document.getElementById('cmbCountry')
const dataType = document.getElementById('cmbData').value

let elBefore = null

fetchCountries()
function fetchCountries() {
    const countries = 'https://api.covid19api.com/countries'

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


async function applyFilter() {
    console.log(dtEnd)

    getElementBefore(country, () => {
        const countryFilter = 'https://api.covid19api.com/country/' + country.value + '?from=' + dtStart + '&to=' + dtEnd
        axios.get(countryFilter)
        .then(async function (response) {
            // handle success
            console.log(response.data);
            const numbers = calcTotals(response.data)
            renderKpis(numbers)
     
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
    })

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
    const tConfirmed = _.last(days).Confirmed //; days.filter((index) => index == days.length-1).map(item => item.Confirmed)
    const tDeaths = _.last(days).Deaths
    const tRecovered = _.last(days).Recovered
    return {
        tConfirmed,
        tDeaths,
        tRecovered,
    }
}

function formatDays(days) {
    return days.map((item, index) => moment(item.Date.split("T")[0]).format('DD-MM-YYYY'))
}

function getIndividualNums(nums, type) {    
    let aux = 0
    console.log(elBefore)
    switch (type) {
        case 'Confirmed': return nums.reduceRight((previousValue, currentValue, index, array) => {
            return currentValue.Confirmed - previousValue.Confirmed
        }); // nums.map(item => item.Confirmed)
        case 'Deaths': return nums.map((item, index) => {
            if(index == 0){
                aux = item.Deaths
                return item.Deaths - elBefore.Deaths
            }else{
                let operation = item.Deaths - aux
                aux = item.Deaths
                return operation
            }   
            
        })
        case 'Recovered': return nums.map(item => item.Recovered)
    }
}


function getAverageNums(nums, type) {
    switch (type) {
        case 'Confirmed': return nums.map(() => _.sum(getIndividualNums(nums, type)) / nums.length)
        case 'Deaths': return nums.map(() => _.sum(getIndividualNums(nums, type)) / nums.length)
        case 'Recovered': return nums.map(() => getIndividualNums(nums, type) / nums.length)
    }
}

function getTitleDataSet(type) {
    switch (type) {
        case 'Confirmed': return ['Número de casos confirmados', 'Média de casos confirmados']
        case 'Deaths': return ['Número de mortes', 'Média de mortes']
        case 'Recovered': return ['Número de recuperados', 'Média de recuperados']
    }
}

function getDateBefore(date) {
    console.log(`date: ${date}`)
    var dt = new Date(date);
    dt.setDate(dt.getDate());
    return moment(dt).format('YYYY-MM-DD')
}

async function getElementBefore(country, callback) {
    const countryFilter = 'https://api.covid19api.com/country/' + country.value + '?from=' + getDateBefore(dtStart) + '&to=' + dtStart
    await axios.get(countryFilter)
        .then(function (response) {
            // handle success
            console.log(response.data);
            elBefore = _.first(response.data);
            callback()
            // return response.data
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

const btnApply = document.getElementById('filtro')
btnApply.addEventListener('click', applyFilter)


