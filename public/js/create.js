const selectTourName = document.getElementById("select_tour_name")
const scenary = document.getElementById("input_scenary")
const showDate = document.getElementById("show_date")

const selectCountry = document.getElementById("select_country")
const selectState = document.getElementById("select_state")
const selectCity = document.getElementById("select_city")


function clearInputs() {
    scenary.value = ""
}


async function insertEventHandler(event) {
    event.preventDefault()
    const date = stringToApiDate(showDate.value)
    const tourId = selectTourName.value
    const cityId = selectCity.value

    if (!tourId || !scenary.value || !date || !cityId) {
        alert("Error: debe ingresar todos los datos")
        return
    }

    const resp = await API.createShow(tourId, cityId, date, scenary.value)

    if (resp.error) {
        alert(resp.message)
    } else {
        console.info(resp.message)
        alert("Dato creado con éxito!")
    }

    clearInputs()
}


document.getElementById("btn_new_show").addEventListener("click", insertEventHandler)


function loadDataInSelect(data, selectHTMLElement, valueName, textContentName) {
    removeChilds(selectHTMLElement)

    data.forEach(elem => {
        const option = document.createElement("option")
        option.value = elem[valueName]
        option.textContent = elem[textContentName]
        selectHTMLElement.appendChild(option)
    })
    selectHTMLElement.selectedIndex = 0
}


async function loadToursData() {
    const data = await API.cacheToursData()
    loadDataInSelect(data, selectTourName, "tour_id", "tour_name")
}


async function loadCountriesData() {
    const data = await API.cacheCountriesData()
    loadDataInSelect(data, selectCountry, "country_id", "country_name")
}


addEventListener("load", async () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")
    showDate.value = `${year}-${month}-${day}`
    await loadToursData()
    await loadCountriesData()
})


selectCountry.addEventListener("change", async () => {
    const countryId = selectCountry.value
    const statesData = await API.getStatesByCountry(countryId)
    loadDataInSelect(statesData, selectState, "state_id", "state_name")
})


selectState.addEventListener("change", async () => {
    const countryId = selectCountry.value
    const stateId = selectState.value
    const citiesData = await API.getCitiesByCountryState(countryId, stateId)
    loadDataInSelect(citiesData, selectCity, "city_id", "city_name")
})
