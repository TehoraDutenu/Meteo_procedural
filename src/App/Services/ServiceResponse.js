class ServiceResponse {
    ok; // boolean => renvoie true si la réponse est ok
    error; // boolean => si ok = false, renvoie un objet error
    data; // renverra l'objet data si ok est true

    constructor(ok, error, data) {
        this.ok = ok;
        this.error = error;
        this.data = data;
    }
}

export default ServiceResponse;