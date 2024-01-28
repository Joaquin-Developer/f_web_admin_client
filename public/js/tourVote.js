const comboBoxTourEvents = document.getElementById("comboBoxTourEvents")


function insertTourEventInComboBox(tourEventName, tourEventId) {
    const optionElem = document.createElement("option")
    optionElem.value = tourEventId.toString()
    optionElem.text = tourEventName
    comboBoxTourEvents.appendChild(optionElem)
}

function event_comboBoxChange(evt) {
    // console.log(evt)
    const idSelected = this.value
}

async function loadComboBox() {
    const data = await API.getTourDates()

    for (const tour of data) {
        const tourDt = dateToString(new Date(tour.show_date))
        let name = `id: ${tour.tour_id} - Event: ${tour.tour_show} - Date: ${tourDt}`
        insertTourEventInComboBox(name, tour.tour_id)
    }
}

comboBoxTourEvents.addEventListener("change", event_comboBoxChange)


function createCheckBox(dataId) {
    const div = document.createElement("div")
    div.classList.add("form-check")
    const input = document.createElement("input")
    input.classList.add("form-check-input")
    input.type = "checkbox"
    input.id = `checkbox_${dataId}`
    div.appendChild(input)
    return div
}

async function loadSongsTable() {
    const allSongs = await TourVoteAPI.getAllSongs()
    const tbody = document.getElementById("tbody")

    for (const data of allSongs) {
        const tr = document.createElement("tr")
        const thId = document.createElement("th")
        thId.textContent = data.song_id

        const thName = document.createElement("th")
        thName.textContent = data.name

        const thAlbum = document.createElement("th")
        thAlbum.textContent = data.album

        const thDescr = document.createElement("th")
        thDescr.textContent = data.description

        const thEnabled = document.createElement("th")
        thEnabled.appendChild(createCheckBox(data.song_id))

        tr.appendChild(thId)
        tr.appendChild(thName)
        tr.appendChild(thAlbum)
        tr.appendChild(thDescr)
        tr.appendChild(thEnabled)
        tbody.appendChild(tr)
    }


}


addEventListener("load", async () => {
    await loadComboBox()
    await loadSongsTable()
})
