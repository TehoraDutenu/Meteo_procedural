// importer les styles bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// importer les scripts de bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// importer les icones de bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css';
import WeatherService from './Services/WeatherService';
import CurrentWeather from './Class/CurrentWeather';
import MainWeather from './Class/MainWeather';

// import du fichier style.css
import '../assets/style.css';


// on déclare la clé API
const apiKey = '44c80507eddb29a5ed08e2b8f7e33083';

class App {

    // on déclare des propriétés
    // les éléments du DOM
    elInputNewLon;
    elInputNewLat;
    elInputNewCity;

    // pour le rendu de la météo
    elResultDiv;

    // pour les différents services suivant la localisation
    weatherServiceFr;
    weatherServiceUk;
    weatherServiceUs;

    constructor() {
        // service pour Fronçe
        this.weatherServiceFr = new WeatherService(apiKey);
        // service Uk
        this.weatherServiceUk = new WeatherService(apiKey, {
            lang: 'en'
        });
        // service US
        this.weatherServiceUs = new WeatherService(apiKey, {
            lang: 'en',
            units: 'imperial'
        });
    }

    start() {
        console.log('App démarrée...');
        this.loadDom();
    }

    // méthode qui affiche le formulaire de saisie des coordonnées et ville
    loadDom() {
        // <div class="container mt-5">
        //   <h1>Appli météo</h1>

        //   <h5 class="mt-5">
        //     Entrez les coordonnées géographiques (latitude et longitude) :
        //   </h5>

        //   <div class="form-group">
        //     <label for="latitude">Latitude</label>
        //     <input type="text" id="latitude" class="form-control" />
        //   </div>

        //   <div class="form-group mt-5">
        //     <label for="longitude">Longitude</label>
        //     <input type="text" id="longitude" class="form-control" />
        //   </div>

        //   <h5 class="mt-5">Entrez le nom de la ville :</h5>
        //   <div class="form-group">
        //     <label for="city">Ville</label>
        //     <input type="text" id="city" class="form-control" />
        //   </div>

        //   <button class="btn btn-primary my-3 form-control" onclick="getWeather()">
        //     Afficher la météo
        //   </button>

        //   <div id="result" class="mt-3"></div>
        // </div>

        // <script src="script.js"></script>


        // CONTAINER
        const elContainer = document.createElement('div');
        elContainer.className = 'container mt-5';

        //  TITRE PRINCIPAL
        const elH1 = document.createElement('h1');
        elH1.textContent = 'Appli météo';

        // FORMULAIRE
        const elForm = document.createElement('form');

        // Coordonnées
        const elCoordsTitle = document.createElement('h5');
        elCoordsTitle.textContent = 'Entrez les coordonnées géographiques (latitude et longitude) :';
        elCoordsTitle.className = 'mt-5';

        // div latitude
        const elLat = document.createElement('div');
        elLat.className = 'form-group';

        const elLabelLat = document.createElement('label');
        elLabelLat.for = 'latitude';
        elLabelLat.textContent = 'Latitude';

        this.elInputNewLat = document.createElement('input');
        this.elInputNewLat.type = 'text';
        this.elInputNewLat.className = 'form-control';
        this.elInputNewLat.id = 'latitude';

        // div longitude
        const elLon = document.createElement('div');
        elLon.className = 'form-group mt-5';

        const elLabelLon = document.createElement('label');
        elLabelLon.for = 'longitude';
        elLabelLon.textContent = 'Longitude';

        this.elInputNewLon = document.createElement('input');
        this.elInputNewLon.type = 'text';
        this.elInputNewLon.className = 'form-control';
        this.elInputNewLon.id = "longitude";

        // Ville
        const elCityTitle = document.createElement('h5');
        elCityTitle.textContent = 'Entrez le nom de la ville :';
        elCityTitle.className = 'mt-5';

        const elCity = document.createElement('div');
        elCity.className = 'form-group';

        const elLabelCity = document.createElement('label');
        elLabelCity.for = 'city';
        elLabelCity.textContent = 'Ville';

        this.elInputNewCity = document.createElement('input');
        this.elInputNewCity.type = 'text';
        this.elInputNewCity.className = 'form-control';
        this.elInputNewCity.id = 'city';

        // Bouton
        const elButton = document.createElement('button');
        elButton.className = 'btn btn-primary my-3 form-control';
        elButton.textContent = 'Afficher la météo';
        elButton.addEventListener('click', this.getWeather.bind(this));

        // Inclusions
        elLat.append(elLabelLat, this.elInputNewLat);
        elLon.append(elLabelLon, this.elInputNewLon);
        elCity.append(elLabelCity, this.elInputNewCity);

        elContainer.append(elH1, elCoordsTitle, elLat, elLon, elCityTitle, elCity, elButton);

        // on crée la div Result qu'on ajoute au container
        this.elResultDiv = document.createElement('div');
        this.elResultDiv.className = 'mt-3';
        this.elResultDiv.setAttribute('id', 'result');
        elContainer.appendChild(this.elResultDiv);

        // on place le container dans le body
        document.body.appendChild(elContainer);
    }
    // méthode qui affiche la météo
    getWeather() {
        console.log('getWeather');

        // on récupère les valeurs des inputs
        const newLatitude = this.elInputNewLat.value.trim();
        const newLongitude = this.elInputNewLon.value.trim();
        const newCity = this.elInputNewCity.value.trim();

        // faire appel au service pour récupérer la météo
        const newWeatherLitteral = {
            lon: newLongitude,
            lat: newLatitude,
            q: newCity
        }

        // on appelle le service
        this.weatherServiceFr
            .getCurrent(newWeatherLitteral)
            .then(this.handleServiceResponse.bind(this))
    }

    handleServiceResponse(serviceResponse) {
        console.log('service', serviceResponse);

        // si la réponse n'est pas ok, on affiche une erreur
        if (!serviceResponse.ok) {
            console.log(serviceResponse.error);
            this.elResultDiv.append(this.getErrorDom('serviceResponse.error'));
        }

        // si la réponse est 'ok' on afffiche la météo
        // on devra créer une classe pour la météo
        // instancier la class CurrentWeather
        const currentWeather = new MainWeather(serviceResponse.data);
        this.elResultDiv.append(currentWeather.getDom());
    }

    getErrorDom(error) {
        console.log('error', error);
        const elDivError = document.createElement('div');
        elDivError.innerHTML = '';
        elDivError.className = 'weather-item error text-danger display-4';
        elDivError.innerHTML = error.error;
        return elDivError;
    }
}

const app = new App();

export default app;