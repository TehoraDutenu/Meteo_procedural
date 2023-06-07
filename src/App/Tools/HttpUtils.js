// cette classe va contenir des méthodes utilitaires pour gérer les requêtes HTTP
class HttpUtils {
    // créer une méthode qui permet de constuire une URL à partir d'une URL de base et de paramètres

    static buildUrl(baseUrl, params = {}) {
        // baseUrl = https://monapi.com
        // params ) {
        //     nom: 'toto', 
        //     age: 25,
        //     ville: 'Paris'
        // }
        // => https:/monapi.com?nom=toto&age=25&ville=Paris

        // on récupère les clés du l'objet params
        let paramsKeys = Object.keys(params);
        // paramsKeys = ['nom', 'age', 'ville']

        // si je n'ai pas de paramètres, je retourne l'url de base
        if (paramsKeys.length <= 0) return baseUrl;

        // je crée un tableau qui va contenir les paramètres
        let paramsArray = [];

        // je parcours les clés de l'objet params dans une boucle
        for (let key in params) {
            // pour trouver la valeur d'une propriété on peut :
            // 1- si on connait le nom de la clé : obj.maClé
            // 2- si le nom de la clé est une chaine : obj['maClé']
            let pairedParam = `${key}=${params[key]}`;
            // pairedParam = 'nom=toto'
            paramsArray.push(pairedParam);
            // paramsArray = ['nom=toto', 'age=25', 'ville=Paris']
        }
        return `${baseUrl}?${paramsArray.join('&')}`;
        // return 'https://monapi.com?nom=toto&age=25&ville=Paris'
    }

}

export default HttpUtils;