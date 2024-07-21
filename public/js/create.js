const tourShow = document.getElementById("input_tour_show")
const scenary = document.getElementById("input_scenary")
const place = document.getElementById("input_place")
const showDate = document.getElementById("show_date")


function clearInputs() {
    tourShow.value = ""
    scenary.value = ""
    place.value = ""
}


async function insertEventHandler(event) {
    event.preventDefault()
    const date = stringToApiDate(showDate.value)

    if (tourShow.value && scenary.value && place.value && date) {
        const resp = await API.createShow(date, tourShow.value, scenary.value, place.value)

        if (resp.error) {
            alert(resp.message)
        } else {
            console.info(resp.message)
            alert("Dato creado con éxito!")
        }

        clearInputs()
    } else {
        alert("Error: debe ingresar todos los datos")
    }

}


document.getElementById("btn_new_date").addEventListener("click", insertEventHandler)


addEventListener("load", () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")

    showDate.value = `${year}-${month}-${day}`
})
