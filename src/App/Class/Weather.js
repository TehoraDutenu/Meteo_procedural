const iconCDN = 'https://openweathermap.org/img/wn/';

class Weather {
    // propriétés
    description;
    icon;

    constructor(weatherLitteral) {
        this.description = weatherLitteral.description;
        this.icon = weatherLitteral.icon;
    }

    getDom() {
        const weather = document.createElement('div');

        weather.innerHTML = `
            <div class="d-flex">
                <div class="d-flex align-items-center">
                    <img src="${iconCDN}${this.icon}.png" alt="weather icon"></img>
                    <span>${this.description}</span>
                </div>
            </div>
        `;
        return weather;
    }
}

export default Weather;