class TourVoteAPI {
    static url = "http://127.0.0.1:5002/api/v1/"

    static async getAllSongs() {
        return await (await fetch(`${TourVoteAPI.url}all_songs`)).json()
    }
}
