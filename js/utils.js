
/**
 * Dada una fecha, obtiene la fecha en forma de oración, y en el idioma del navegador
 */
function getDateInLocalLalguage(date) {
    return new Date(date).toLocaleString(navigator.language, {
        day: "numeric",
        month: "long",
        year: "numeric",
    })
}

/**
 * Borra todos los elementos hijos de un HTMLElement
 */
function removeChilds(htmlElem) {
    while (htmlElem.firstChild) {
        htmlElem.removeChild(htmlElem.firstChild);
    }
}

/**
 * Guarda la info traida del fetch en el local storage
 */
function saveDataInStorage(data) {
    localStorage.setItem("tour_data", JSON.stringify(data))
}

/**
 * Buscamos en el local storage un tourData por el id
 */
function getDataById(id) {
    for (let elem of JSON.parse(localStorage.getItem("tour_data")))
        if (elem.tour_id === parseInt(id)) return elem;
}

/**
 * Obtiene la fecha de un objeto date en formato YYYYMMDD
 * Funcion inversa a la stringToDate()
 */
function dateToString(date) {
    const dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const mm = (date.getUTCMonth() + 1) < 10 ? '0' + (date.getUTCMonth() + 1) : (date.getUTCMonth() + 1);
    return date.getFullYear() + '-' + mm + '-' + dd;
}

/**
 * Recibe un string de la forma YYYYMMDD y retorna un objeto Date valido
 * Funcion inversa a la dateToString()
 */
function stringToDate(dateString) {
    return new Date(dateString + "T03:00:00.000Z")
}

/**
 * Recibe un string de la forma YYYYMMDD y le agrega 00:00:00
 * De esta forma es que la api rest espera las fechas
 */
function stringToApiDate(dateString) {
    return dateString + " 00:00:00"
}
