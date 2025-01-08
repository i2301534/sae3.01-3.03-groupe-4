const BASE_API_URL = 'https://la-lab4ce.univ-lemans.fr/masters-stats/api/rest';

// 🟢 **Fonction pour récupérer une formation unique par son IFC**
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

// 🟢 **Fonction pour rechercher des formations avec des paramètres**
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

// 🟢 **Fonctions de base existantes dans network.js**
function loadAcademies() { 
    return fetch(`${BASE_API_URL}/academies`)
        .then((response) => handleResponse(response))
        .then((academies) => {
            return Object.fromEntries(academies.map((academie) => [
                academie.id,
                {
                    idAcademie: academie.id,
                    nomAcademie: academie.nom,
                    regionId: academie.regionId,
                    regionNomAcademie: academie.regionNom,
                },
            ]));
        });
}

function loadEtablissements() {
    return fetch(`${BASE_API_URL}/etablissements`)
        .then((response) => handleResponse(response))
        .then((etablissements) => {
            return Object.fromEntries(etablissements.map((etablissement) => [
                etablissement.uai,
                {
                    uaiEtablissement: etablissement.uai,
                    nomEtablissement: etablissement.nom,
                    academieIdEtablissement: etablissement.academieId,
                },
            ]));
        });
}

async function loadSecteursDisciplinaires() {
    return fetch(`${BASE_API_URL}/secteurs-disciplinaires`)
        .then((response) => handleResponse(response))
        .then((secteursDisc) => {
            return Object.fromEntries(secteursDisc.map((secDisc) => [
                secDisc.id,
                {
                    idSecteurDisc: secDisc.id,
                    nomSecteurDisc: secDisc.nom,
                    disciplineIdSecteurDisc: secDisc.disciplineId,
                    disciplineNomSecteurDisc: secDisc.disciplineNom,
                    insDiscIdSecteurDisc: secDisc.insDiscId,
                },
            ]));
        });
}

function loadMentions() {
    return fetch(`${BASE_API_URL}/mentions`)
        .then((response) => handleResponse(response))
        .then((mentions) => {
            return Object.fromEntries(mentions.map((mention) => [
                mention.id,
                {
                    idMention: mention.id,
                    nomMention: mention.nom,
                    secDiscIdMention: mention.secDiscId,
                },
            ]));
        });
}

function loadFormations() {
    return fetch(`${BASE_API_URL}/formations`)
        .then((response) => handleResponse(response))
        .then((formations) => {
            return Object.fromEntries(formations.map((formation) => [
                formation.ifc,
                {
                    idFormation: formation.ifc,
                    parcoursFormation: formation.parcours,
                    alternanceFormation: formation.alternance,
                    lieuxFormation: formation.lieux,
                    etabUaiFormation: formation.etabUai,
                    mentionIdFormation: formation.mentionId,
                    secDiscIdFormation: formation.secDiscId,
                    villeFormation: formation.ville,
                    deptFormation: formation.dept,
                },
            ]));
        });
}

// 🟢 **Fusion des données complètes**
function loadFullMaster() {
    return Promise.all([
        loadAcademies(),
        loadEtablissements(),
        loadSecteursDisciplinaires(),
        loadMentions(),
        loadFormations()
    ])
    .then(([academiesById, etablissementsByUai, secteursDiscById, mentionsById, formationsById]) => {
        return {
            academiesById,
            etablissementsByUai,
            secteursDiscById,
            mentionsById,
            formationsById
        };
    })
    .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
        throw error;
    });
}

// 🟢 **Requête pour les statistiques**
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

// 🟢 **Traitement générique des réponses**
function handleResponse(response) {
    if (!response.ok) {
        throw new Error(`Erreur serveur (code ${response.status}).`);
    }
    return response.json();
}

// 🟢 **Exports**
export {
    loadAcademies,
    loadEtablissements,
    loadSecteursDisciplinaires,
    loadMentions,
    loadFormations,
    loadFullMaster,
    loadFormationByIFC,
    searchFormations,
    requestStats,
    handleResponse
};
