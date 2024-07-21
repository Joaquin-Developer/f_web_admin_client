
class API {

    static get url() {
        return "http://localhost:5016/api/v3"
    }

    static async getTourDates(all = false) {
        if (all) {
            return await (await fetch(`${API.url}/all_show_dates`)).json()
        }
        return await (await fetch(`${API.url}/show_dates`)).json()
    }

    static async createShow(showDate, showName, scenary, place) {

        const resp = await fetch(`${API.url}/show_dates`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                showDate,
                showName,
                scenary,
                place
            })
        })
        return await resp.json()
    }

    static async createTour(tourName) {
        const resp = await fetch(`${API.url}/tours`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({tourName})
        })
        return await resp.json()
    }

    static async update(showId, showDate, scenary) {

        const resp = await fetch(`${API.url}/show_dates`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                showId,
                showDate,
                scenary
            })
        })
        return await resp.json()
    }

    static async deleteById(id) {
        const resp = await fetch(`${API.url}/show_dates`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ showId: id })
        })
        return await resp.json()
    }

    static async cacheCountriesData() {
        let data = sessionStorage.getItem("countries_data")

        if (!data) {
            data = await (await fetch(`${API.url}/all_countries`)).json()
            sessionStorage.setItem("countries_data", JSON.stringify(data))
        }

        return JSON.parse(data)
    }

    static async getStatesByCountry(country) {
        const resp = await fetch(`${API.url}/all_states_by_country`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ country })
        })
        return await resp.json()
    }

    static async getCitiesByCountryState(country, state) {
        const resp = await fetch(`${API.url}/all_cities_by_country_state`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ country, state })
        })
        return await resp.json()
    }

}
