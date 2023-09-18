
class API {

    static get url() {
        return "http://localhost:5016/api/v2/"
    }

    static async getTourDates(all = false) {
        if (all) {
            return await (await fetch(`${API.url}all_tour_dates`)).json()
        }
        return await (await fetch(`${API.url}tour_dates`)).json()
    }

    static async create(showDate, showName, scenary, place) {

        const resp = await fetch(`${API.url}tour_date`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                showDate: showDate,
                showName: showName,
                scenary: scenary,
                place: place
            })
        })
        return await resp.json()
    }

    static async update(id, showDate, showName, scenary, place) {

        const resp = await fetch(`${API.url}update_tour_date`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                showDate: showDate,
                showName: showName,
                scenary: scenary,
                place: place
            })
        })
        return await resp.json()
    }

    static async deleteById(id) {
        const resp = await fetch(`${API.url}tour_date`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idTourDate: id })
        })
        return await resp.json()
    }

}

