
async function showData() {
    const tbody = document.getElementById("tbody")
    const data = await API.getTourDates()

    for (let elem of data) {
        const tr = document.createElement("tr")
        tr.id = elem.tour_id
        const tourId = document.createElement("th")
        tourId.scope = "row"
        const show = document.createElement("td")
        const scenary = document.createElement("td")
        const city = document.createElement("td")
        const state = document.createElement("td")
        const country = document.createElement("td")
        const tourDate = document.createElement("td")

        tourId.appendChild(document.createTextNode(elem.tour_id))
        show.appendChild(document.createTextNode(elem.tour_show))
        scenary.appendChild(document.createTextNode(elem.scenary))
        city.appendChild(document.createTextNode(elem.city_name))
        state.appendChild(document.createTextNode(elem.state_name))
        country.appendChild(document.createTextNode(`${elem.country_name} (${elem.country_short_name})`))

        tourDate.appendChild(document.createTextNode(
            getDateInLocalLalguage(elem.show_date)
        ))

        tr.appendChild(tourId)
        tr.appendChild(tourDate)
        tr.appendChild(show)
        tr.appendChild(scenary)
        tr.appendChild(city)
        tr.appendChild(state)
        tr.appendChild(country)

        tbody.appendChild(tr)
    }

}

addEventListener("load", showData)
