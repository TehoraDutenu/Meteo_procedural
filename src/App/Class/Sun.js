class Sun {
    // propriétés
    sunset;
    sunrise;

    constructor(sunLitteral) {
        this.sunset = sunLitteral.sunset;
        this.sunrise = sunLitteral.sunrise;
    }

    // créer un méthode pour convertir les timestamp en heures:minutes
    getTimeFromTimestamp(timestamp) {
        const date = new Date(timestamp * 1000);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    getDom() {
        const sun = document.createElement('div');
        sun.innerHTML = `
            <div class="d-flex flex-column">
                <div class="d-flex flex-row align-items-center">
                    <i class="bi bi-sunrise mx-2"></i>
                    <span>Lever du soleil: ${this.getTimeFromTimestamp(this.sunrise)}</span>
                </div>
                <div class="d-flex flex-row align-items-center">
                    <i class="bi bi-sunset mx-2"></i>
                    <span>Coucher du soleil: ${this.getTimeFromTimestamp(this.sunset)}</span>
                </div>
            </div>
        `;
        return sun;
    }
}

export default Sun;