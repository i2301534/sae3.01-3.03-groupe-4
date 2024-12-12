/**
 * network.js : module chargé de fournir toutes les fonctions de base de récupération des données. 
 * Il n'y a donc qu'ici que nous ferons appel à l'API fetch.
 */

const BASE_API_URL = 'https://la-lab4ce.univ-lemans.fr/masters-stats/api/rest';

function loadAcademies() { 
  return fetch(`${BASE_API_URL}/academies`)
    .then((reponse) => {
      if (!reponse.ok) {
        throw new Error(`Erreur serveur lors du chargement des académies (code ${reponse.status}).`);
      }
      return reponse.json();
    })
    .then((academies) => {
      // Dictionnaire des académies par idAcademie
      const academiesById = Object.fromEntries(academies.map((academie) => [
        academie.id,
        {
          idAcademie: academie.id,
          nomAcademie: academie.nom,
          regionId: academie.regionId,
          regionNomAcademie: academie.regionNom,
        },
      ]));
      return academiesById;
    });
}

function loadEtablissements() {
  return fetch(`${BASE_API_URL}/etablissements`)
    .then((reponse) => {
      if (!reponse.ok) {
        throw new Error(`Erreur serveur lors du chargement des établissements (code ${reponse.status}).`);
      }
      return reponse.json();
    })
    .then((etablissements) => {
      // Dictionnaire des établissements par uaiEtablissement
      const etablissementsByUai = Object.fromEntries(etablissements.map((etablissement) => [
        etablissement.uai,
        {
          uaiEtablissement: etablissement.uai,
          nomEtablissement: etablissement.nom,
          academieIdEtablissement: etablissement.academieId, // Lien avec l'idAcademie
        },
      ]));
      return etablissementsByUai;
    });
}

function loadSecteursDisciplinaires() {
  return fetch(`${BASE_API_URL}/secteurs-disciplinaires`)
    .then((reponse) => {
      if (!reponse.ok) {
        throw new Error(`Erreur serveur lors du chargement des secteurs disciplinaires (code ${reponse.status}).`);
      }
      return reponse.json();
    })
    .then((secteursDisc) => {
      // Dictionnaire des secteurs disciplinaires par idSecteurDisc
      const secteursDiscById = Object.fromEntries(secteursDisc.map((secDisc) => [
        secDisc.id,
        {
          idSecteurDisc: secDisc.id,
          nomSecteurDisc: secDisc.nom,
          disciplineIdSecteurDisc: secDisc.disciplineId,
          disciplineNomSecteurDisc: secDisc.disciplineNom,
          insDiscIdSecteurDisc: secDisc.insDiscId,
        },
      ]));
      return secteursDiscById;
    });
}

function loadMentions() {
  return fetch(`${BASE_API_URL}/mentions`)
    .then((reponse) => {
      if (!reponse.ok) {
        throw new Error(`Erreur serveur lors du chargement des mentions (code ${reponse.status}).`);
      }
      return reponse.json();
    })
    .then((mentions) => {
      // Dictionnaire des mentions par idMention
      const mentionsById = Object.fromEntries(mentions.map((mention) => [
        mention.id,
        {
          idMention: mention.id,
          nomMention: mention.nom,
          secDiscIdMention: mention.secDiscId, // Lien avec l'idSecteurDisc
        },
      ]));
      return mentionsById;
    });
}

function loadFormations() {
  return fetch(`${BASE_API_URL}/formations`)
    .then((reponse) => {
      if (!reponse.ok) {
        throw new Error(`Erreur serveur lors du chargement des formations (code ${reponse.status}).`);
      }
      return reponse.json();
    })
    .then((formations) => {
      // Dictionnaire des formations par idFormation
      const formationsById = Object.fromEntries(formations.map((formation) => [
        formation.ifc,
        {
          idFormation: formation.ifc,
          parcoursFormation: formation.parcours,
          alternanceFormation: formation.alternance,
          lieuxFormation: formation.lieux,
          etabUaiFormation: formation.etabUai, // Lien avec uaiEtablissement
          mentionIdFormation: formation.mentionId, // Lien avec l'idMention
          secDiscIdFormation: formation.secDiscId, // Lien avec l'idSecteurDisc
          villeFormation: formation.ville,
          deptFormation: formation.dept,
        },
      ]));
      return formationsById;
    });
}


/**
 * Récupère toutes les données (académies, établissements, secteurs disciplinaires, mentions, formations) 
 * et les fusionne dans un seul objet.
 * @returns Promesse d'un objet contenant toutes les données fusionnées
 */
function loadFullMaster() {
  // Appeler toutes les fonctions de chargement pour récupérer les différentes données
  return Promise.all([
    loadAcademies(),
    loadEtablissements(),
    loadSecteursDisciplinaires(),
    loadMentions(),
    loadFormations()
  ])
  .then(([academiesById, etablissementsByUai, secteursDiscById, mentionsById, formationsById]) => {
    // Fusionner les données dans un seul objet
    const fullData = {
      academiesById,
      etablissementsByUai,
      secteursDiscById,
      mentionsById,
      formationsById
    };

    // Retourner toutes les données regroupées
    return fullData;
  })
  .catch((error) => {
    console.error("Erreur lors de la récupération des données :", error);
    throw error;
  });
}

function requestStats(filtres = null, collecte = null) {
  // Création de la requête
  const requete = {};
  if (filtres) {
    requete.filters = filtres;
  }
  if (collecte) {
    requete.harvest = collecte;
  }
  // Exécution de la recherche de statistiques
  return fetch(`${BASE_API_URL}/stats/search`, {
    method: 'POST',
    headers: new Headers({ 'content-type': 'application/json' }),
    body: JSON.stringify(requete, null, 0)
  }).then((reponse) => {
    if (!reponse.ok) {
      throw new Error(`Erreur serveur lors du chargement des statistiques (code ${reponse.status}.`, requete);
    }
    return reponse.json();
  });
}

export {
  loadAcademies,
  loadEtablissements,
  loadFormations,
  loadFullMaster,
  loadMentions,
  loadSecteursDisciplinaires,
};

