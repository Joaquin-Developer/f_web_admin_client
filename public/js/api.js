
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

    static async createShow(tourId, cityId, showDate, scenary) {

        const resp = await fetch(`${API.url}/show_dates`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tourId,
                cityId,
                showDate,
                scenary
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

    static async deleteById(showId) {
        const resp = await fetch(`${API.url}/show_dates`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ showId })
        })
        return await resp.json()
    }

    static async cacheToursData() {
        let data = sessionStorage.getItem("tours_data")

        if (!data) {
            data = await (await fetch(`${API.url}/tours`)).json()
            sessionStorage.setItem("tours_data", JSON.stringify(data))
        }

        return JSON.parse(data)
    }

    static async cacheCountriesData() {
        let data = sessionStorage.getItem("countries_data")

        if (!data) {
            data = await (await fetch(`${API.url}/all_countries`)).json()
            sessionStorage.setItem("countries_data", JSON.stringify(data))
        }

        return JSON.parse(data)
    }

    static async getStatesByCountry(countryId) {
        const resp = await fetch(`${API.url}/all_states_by_country`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ countryId })
        })
        return await resp.json()
    }

    static async getCitiesByCountryState(countryId, stateId) {
        const resp = await fetch(`${API.url}/all_cities_by_country_state`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ countryId, stateId })
        })
        return await resp.json()
    }

}
