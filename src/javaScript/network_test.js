const BASE_API_URL = 'https://la-lab4ce.univ-lemans.fr/masters-stats/api/rest';

// Fonction pour récupérer une formation unique par son IFC
function loadFormationByIFC(ifc, fullDetails = true) {
    const url = `${BASE_API_URL}/formations/${ifc}?full-details=${fullDetails ? 1 : 0}`;
    return fetch(url)
        .then((response) => handleResponse(response))
        .then((formation) => ({
            idFormation: formation.ifc,
            parcoursFormation: formation.parcours,
            alternanceFormation: formation.alternance,
            lieuxFormation: formation.lieux,
            etabUaiFormation: formation.etabUai,
            mention: formation.mention,
            secteurDisciplinaire: formation.secteurDisciplinaire,
            ville: formation.ville,
            dept: formation.dept,
            codePostal: formation.codePostal,
            latitude: formation.latitude,
            longitude: formation.longitude,
        }))
        .catch((error) => {
            console.error(`Erreur lors de la récupération de la formation avec IFC=${ifc} :`, error);
            throw error;
        });
}

// Fonction pour rechercher des formations avec le paramètre q
function searchFormations(params) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_API_URL}/formations?${queryString}`;

    return fetch(url)
        .then((response) => handleResponse(response))
        .catch((error) => {
            console.error('Erreur lors de la recherche des formations :', error);
            throw error;
        });
}

// Requête pour les statistiques
function requestStats(filtres = null, collecte = null) {
    const requete = {};
    if (filtres) requete.filters = filtres;
    if (collecte) requete.harvest = collecte;

    return fetch(`${BASE_API_URL}/stats/search`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(requete),
    })
        .then((response) => handleResponse(response))
        .catch((error) => {
            console.error('Erreur lors de la récupération des statistiques :', error);
            throw error;
        });
}

// Traitement de la réponse
function handleResponse(response) {
    if (!response.ok) {
        throw new Error(`Erreur serveur (code ${response.status}).`);
    }
    return response.json();
}

// Export des fonctions
export {
    loadFormationByIFC,         // Récupération d'une formation unique par IFC
    searchFormations,           // Recherche textuelle avec le paramètre q
    requestStats,               // Requête pour les statistiques
    handleResponse,             // Traitement générique des réponses
};
