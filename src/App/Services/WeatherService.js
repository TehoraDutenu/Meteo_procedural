import HttpUtils from "../Tools/HttpUtils";
import ServiceResponse from "./ServiceResponse";

class WeatherService {
    // on va déclarer des propriétés
    apiKey;
    options;

    constructor(apiKey, userOptions = {}) {
        this.apiKey = apiKey;

        // options par défaut à chaque appel de service
        this.options = {
            units: 'metric',
            lang: 'fr'
        }
        // on fusionne les options par défaut avec les options de l'utilisateur
        Object.assign(this.options, { appid: apiKey }, userOptions);
        // this.options = {
        //     units: 'metric',
        //     lang: 'fr',
        //     appid: apiKey
    }

    getCurrent(coords) {
        const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

        // on va fusionner les options avec les coordonnées pour construire l'url
        Object.assign(this.options, coords);

        // on va construire l'url
        const url = HttpUtils.buildUrl(baseUrl, this.options);
        // => this.options = {
        //     appid: '44c80507eddb29a5ed08e2b8f7e33083',
        //     units: 'metric',
        //     lang: 'fr',
        //     lat: 48.8534,
        //     lon: 2.3488,
        //     q: 'Paris'
        //}

        // on va faire un appel à l'API
        return new Promise(resolve => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // on checke le retour de l'API
                    // code 400 = erreur de requête
                    // code 404 = ville non trouvée
                    if (data.cod == 400 || data.cod == 404) {
                        resolve(new ServiceResponse(false, data.message, null))
                    }
                    resolve(new ServiceResponse(true, null, data))
                })
                .catch(error => {
                    resolve(new ServiceResponse(false, error, null))
                })
        })
    }
}

export default WeatherService;