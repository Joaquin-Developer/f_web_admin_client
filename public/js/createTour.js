const inputTourName = document.getElementById("input_tour_name")


document.getElementById("btn_new_tour").addEventListener("click", async (event) => {
    event.preventDefault()

    if (!inputTourName.value) {
        alert("Error: debe ingresar todos los datos")
        return
    }

    const resp = await API.createTour(inputTourName.value)

    if (resp.error) {
        alert(resp.message)
    } else {
        console.info(resp.message)
        alert("Tour registrado con éxito!")
    }

    inputTourName.value = ""
    
})
