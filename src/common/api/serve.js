import axios from 'axios'

const interceptors1 = axios.create({
    baseURL : 'https://51game.info:18092/51game/GetGames'
}) 

const interceptors2 = axios.create({
    baseURL : 'https://api.ibeerpro.com'
}) 

export {
    interceptors1,
    interceptors2
}