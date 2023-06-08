import Main from "./Main";
import Sun from "./Sun";
import Weather from "./Weather";
import Wind from "./Wind";

const iconCDN = 'https://openweathermap.org/img/wn/';

class MainWeather {
    // déclarer mes propriétés
    clouds;
    country;
    dt;
    locationName;
    main;
    rain;
    snow;
    sun;
    visibility;
    weather;
    wind;

    constructor(mainWeatherLitteral) {
        this.clouds = mainWeatherLitteral.clouds.all;
        this.country = mainWeatherLitteral.sys.country;
        this.dt = mainWeatherLitteral.dt;
        this.locationName = mainWeatherLitteral.name;
        this.main = new Main(mainWeatherLitteral.main);

        // si j'ai des données de pluie je les récupère
        if (mainWeatherLitteral.hasOwnProperty('rain')) {
            this.rain = mainWeatherLitteral.rain['1h'];
        }

        // si j'ai des données de neige je les récupère
        if (mainWeatherLitteral.hasOwnProperty('snow')) {
            this.snow = mainWeatherLitteral.snow['1h'];
        }

        // récupérer lever et coucher du soleil
        this.sun = new Sun({
            sunset: mainWeatherLitteral.sys.sunset,
            sunrise: mainWeatherLitteral.sys.sunrise
        });

        this.visibility = mainWeatherLitteral.visibility;

        this.weather = new Weather({
            description: mainWeatherLitteral.weather[0].description,
            icon: mainWeatherLitteral.weather[0].icon
            // ou this.weather = new Weather(mainWeatherLitteral.weather[0];)
        });

        this.wind = new Wind({
            speed: mainWeatherLitteral.wind.speed,
            deg: mainWeatherLitteral.wind.deg,
            gust: mainWeatherLitteral.wind.gust
        });

    }

    getDom() {
        const resultDiv = document.getElementById('result');


        // const elDivMain = document.createElement('div');

        // elDivMain.append(
        //     this.weather.getDom(), 
        //     this.main.getDom(), 
        //     this.sun.getDom(), 
        //     this.wind.getDom());


        // créer les éléments pour les onglets
        const tab1 = document.createElement('div');
        tab1.className = "tab-pane fade show active";
        tab1.id = "tab1";
        tab1.setAttribute('role', 'tabpanel');
        tab1.setAttribute('aria-labelledby', 'tab1-tab');
        tab1.innerHTML = `
            <h5 class="card-title">Informations générales</h5>
        `;
        tab1.append(this.weather.getDom());


        const tab2 = document.createElement('div');
        tab2.className = "tab-pane fade";
        tab2.id = "tab2";
        tab2.setAttribute('role', 'tabpanel');
        tab2.setAttribute('aria-labelledby', 'tab2-tab');
        tab2.innerHTML = `
            <h5 class="card-title">Températures</h5>
        `;
        tab2.append(this.main.getDom());


        const tab3 = document.createElement('div');
        tab3.className = "tab-pane fade";
        tab3.id = "tab3";
        tab3.setAttribute('role', 'tabpanel');
        tab3.setAttribute('aria-labelledby', 'tab3-tab');
        tab3.innerHTML = `
            <h5 class="card-title">Températures</h5>
        `;
        tab3.append(this.wind.getDom());

        const tab4 = document.createElement('div');
        tab4.className = "tab-pane fade";
        tab4.id = "tab4";
        tab4.setAttribute('role', 'tabpanel');
        tab4.setAttribute('aria-labelledby', 'tab4-tab');
        tab4.innerHTML = `
            <h5 class="card-title">Infos solaires</h5>
        `;
        tab4.append(this.sun.getDom());

        // créer l'élément pour la liste des onglets
        const tabList = document.createElement('ul');
        tabList.className = "nav nav-tabs card-header-tabs";
        tabList.id = "myTabs";
        tabList.setAttribute('role', 'tablist');
        tabList.innerHTML = `
            <li class="nav-item" role="presentation">
                <a class="nav-link active" id="tab1-tab" data-bs-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="true">Général</a>
            </li>

            <li class="nav-item" role="presentation">
                <a class="nav-link" id="tab2-tab" data-bs-toggle="tab" href="#tab2" role="tab" aria-controls="tab2" aria-selected="false">Général</a>
            </li>

            <li class="nav-item" role="presentation">
                <a class="nav-link" id="tab3-tab" data-bs-toggle="tab" href="#tab3" role="tab" aria-controls="tab3" aria-selected="false">Vent</a>
            </li>

            <li class="nav-item" role="presentation">
                <a class="nav-link" id="tab4-tab" data-bs-toggle="tab" href="#tab4" role="tab" aria-controls="tab4" aria-selected="false">Soleil</a>
            </li>
        `;

        // créer l'élément pour le contenu de la carte
        const cardBody = document.createElement('div');
        cardBody.className = "card-body";
        cardBody.innerHTML = `
            <div class="tab-content" id="myTabContent">
                ${tab1.outerHTML}
                ${tab2.outerHTML}
                ${tab3.outerHTML}
                ${tab4.outerHTML}
            </div>
        `;

        // créer l'élément pour la carte
        const card = document.createElement('div');
        card.className = "card";
        card.append(tabList, cardBody);

        // créer l'élément pour le conteneur de la card
        const cardContainer = document.createElement('div');
        cardContainer.className = "container mt-4";
        cardContainer.append(card);

        resultDiv.innerHTML = '';
        resultDiv.append(cardContainer);
    }
}

export default MainWeather;
