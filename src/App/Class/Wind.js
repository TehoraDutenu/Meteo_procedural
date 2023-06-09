class Wind {
    // propriétés
    speed;
    deg;
    gust;

    constructor(windLitteral) {
        this.speed = windLitteral.speed;
        this.deg = windLitteral.deg;
        this.gust = windLitteral.gust;
    }

    // méthode pour obtenir la direction cardinale à partir des degrés
    getDirection(degrees) {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
        const index = Math.round(degrees / 45);
        return directions[index];
    }

    getDom() {
        const wind = document.createElement('div');
        wind.innerHTML = `
            <div class="d-flex flex-column">
                <div class="d-flex flex-row align-items-center">
                    <i class="bi bi-speedometer2 mx-2"></i>
                    <span>Vitesse du vent: ${Math.floor(this.speed * 3.6)} km/h</span>
                </div>
                <div class="d-flex flex-row align-items-center">
                    <i class="bi bi-compass mx-2"></i>
                    <span>Direction: ${this.getDirection(this.deg)} </span>
                </div>
            </div>
        `;
        // s'il y a des rafales, on les affiche
        if (this.gust) {
            const gust = document.createElement('div');
            gust.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="bi bi-wind mx-2"></i>
                <span>Rafales: ${Math.floor(this.gust * 3.6)} km/h</span>
            </div>
        `;

            wind.append(gust);
        }
        return wind;
    }

}

export default Wind;

// ${ this.getSpeedInKm(this.speed) } km / h(rafales jusqu'à ${this.getSpeedInKm(this.gust)}) ${this.getDirection}