

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
    const dtStart = document.getElementById('date_start')
    const dtEnd = document.getElementById('date_end')
    const country = document.getElementById('cmbCountry').value
    const dataType = document.getElementById('cmbData')

    const countryFilter = 'https://api.covid19api.com/country/' + country + '?from=2020-04-01T00:00:00Z&to=2020-04-03T00:00:00Z'
    axios.get(countryFilter)
        .then(function (response) {
            // handle success
            console.log(response.data);
            const numbers = calcTotals(response.data)
            renderKpis(numbers)
            console.log(numbers.mediaConfirmed)
            renderChartLine()
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

const btnApply = document.getElementById('filtro')
btnApply.addEventListener('click', applyFilter)


