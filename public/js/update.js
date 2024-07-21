
function getButtonTd(labelName, eventHandler, buttonStyle = "btn-warning") {
    const tdButton = document.createElement("td")
    const button = document.createElement("button")
    button.appendChild(document.createTextNode(labelName))
    button.classList.add("btn", buttonStyle, "btn-sm")

    button.addEventListener("click", eventHandler)
    tdButton.appendChild(button)
    return tdButton
}


async function initTable() {
    const data = await API.getTourDates(all = true)
    saveDataInStorage(data)

    const tbody = document.getElementById("tbody")
    removeChilds(tbody)

    for (let elem of data) {
        const tr = document.createElement("tr")
        tr.id = elem.show_id
        const showId = document.createElement("th")
        showId.scope = "row"
        const show = document.createElement("td")
        const scenary = document.createElement("td")
        const city = document.createElement("td")
        const state = document.createElement("td")
        const country = document.createElement("td")
        const tourDate = document.createElement("td")

        showId.appendChild(document.createTextNode(elem.show_id))
        show.appendChild(document.createTextNode(elem.tour_show))
        scenary.appendChild(document.createTextNode(elem.scenary))
        city.appendChild(document.createTextNode(elem.city_name))
        state.appendChild(document.createTextNode(elem.state_name))
        country.appendChild(document.createTextNode(elem.country_name))

        tourDate.appendChild(document.createTextNode(
            getDateInLocalLalguage(elem.show_date)
        ))

        const tdBtnModify = getButtonTd("Editar", (event) => {
            showEditElement(event.target.parentNode.parentNode.id)
            document.querySelector("#form_edit_tour").classList.remove("none")
            location.href = "#form_edit_tour"
        })

        const tdBtnRemove = getButtonTd("Eliminar", removeTourDateEvent, "btn-danger")

        tr.appendChild(showId)
        tr.appendChild(tourDate)
        tr.appendChild(show)
        tr.appendChild(scenary)
        tr.appendChild(city)
        tr.appendChild(state)
        tr.appendChild(country)
        tr.appendChild(tdBtnModify)
        tr.appendChild(tdBtnRemove)
        tbody.appendChild(tr)
    }

}

async function removeTourDateEvent(event) {
    event.preventDefault();

    const tr = event.target.parentNode.parentNode.children
    let id = tr[0].textContent
    let showDt = tr[1].textContent
    let showName = tr[2].textContent
    let scenary = tr[3].textContent
    let place = `${tr[4].textContent} city, ${tr[5].textContent}, ${tr[6].textContent}`
    let txt = `ID: ${id}\nName: ${showName}\nScenary: ${scenary}\nPlace: ${place}\nDate: ${showDt}`

    if (confirm(`¿Seguro que desea borrar la siguiente data?\n${txt}`)) {
        const resp = await API.deleteById(id)

        if (resp.error) {
            alert(resp.message)
        } else {
            console.log(resp.message)
            alert("Dato borrado con éxito!")
            // se recarga el table-body:
            initTable()
        }
    }
}

async function updateTourDateEvent(event) {
    event.preventDefault()

    const showId = parseInt(document.getElementById("form_edit_tour").name)
    const showDate = stringToApiDate(document.getElementById("show_date").value)
    const scenary = document.getElementById("input_scenary").value

    try {
        const resp = await API.update(showId, showDate, scenary)
        if (resp.error)
            alert(resp.message)
        else {
            console.log(resp.message)
            alert("Dato modificado con éxito!")
            // se recarga el table-body:
            initTable()
        }
    } catch (error) {
        alert(error)
    }
}


document.getElementById("btn_update_show").addEventListener("click", updateTourDateEvent)


function showEditElement(id) {
    const tour = getDataById(id)
    document.getElementById("form_edit_tour").name = id
    // document.getElementById("input_tour_show").value = tour.tour_show
    document.getElementById("input_scenary").value = tour.scenary
    // document.getElementById("input_city").value = tour.city_name
    // document.getElementById("input_state").value = tour.state_name
    // document.getElementById("input_country").value = tour.country_name
    document.getElementById("show_date").value = dateToString(new Date(tour.show_date))
}


addEventListener("load", initTable)
