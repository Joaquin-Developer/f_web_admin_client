
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
        const place = document.createElement("td")
        const tourDate = document.createElement("td")

        tourId.appendChild(document.createTextNode(elem.tour_id))
        show.appendChild(document.createTextNode(elem.tour_show))
        scenary.appendChild(document.createTextNode(elem.scenary))
        place.appendChild(document.createTextNode(elem.place))
        tourDate.appendChild(document.createTextNode(
            getDateInLocalLalguage(elem.show_date)
        ))

        tr.appendChild(tourId)
        tr.appendChild(show)
        tr.appendChild(scenary)
        tr.appendChild(place)
        tr.appendChild(tourDate)

        tbody.appendChild(tr)
    }

}

addEventListener("load", showData)
