
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

        const tdBtnModify = getButtonTd("Editar", (event) => {
            showEditElement(event.target.parentNode.parentNode.id)
            document.querySelector("#form_edit_tour").classList.remove("none")
            location.href = "#form_edit_tour"
        })

        const tdBtnRemove = getButtonTd("Eliminar", removeTourDateEvent, "btn-danger")

        tr.appendChild(tourId)
        tr.appendChild(show)
        tr.appendChild(scenary)
        tr.appendChild(place)
        tr.appendChild(tourDate)
        tr.appendChild(tdBtnModify)
        tr.appendChild(tdBtnRemove)
        tbody.appendChild(tr)
    }

}

async function removeTourDateEvent(event) {
    event.preventDefault();

    const tr = event.target.parentNode.parentNode.children
    let id = tr[0].textContent
    let name = tr[1].textContent
    let place = tr[3].textContent
    let showDt = tr[4].textContent
    let txt = `ID: ${id}\nName: ${name}\nPlace: ${place}\nDate: ${showDt}`

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
    debugger
    event.preventDefault()

    const resp = await API.update(
        parseInt(document.getElementById("form_edit_tour").name),
        stringToApiDate(document.getElementById("show_date").value),
        document.getElementById("input_tour_show").value,
        document.getElementById("input_scenary").value,
        document.getElementById("input_place").value
    )

    if (resp.error) {
        alert(resp.message)
    } else {
        console.log(resp.message)
        alert("Dato modificado con éxito!")
        // se recarga el table-body:
        initTable()
    }

}

document.getElementById("btn_update_date").addEventListener("click", updateTourDateEvent)


function showEditElement(id) {
    const tour = getDataById(id)
    document.getElementById("form_edit_tour").name = id
    document.getElementById("input_tour_show").value = tour.tour_show
    document.getElementById("input_scenary").value = tour.scenary
    document.getElementById("input_place").value = tour.place
    document.getElementById("show_date").value = dateToString(new Date(tour.show_date))
}


addEventListener("load", initTable)