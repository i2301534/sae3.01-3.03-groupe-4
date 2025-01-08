import { loadFullMaster, loadSecteursDisciplinaires } from "./network.js";

const mastersContainer = document.getElementById("masters-container");
const openModal = document.getElementById("open-advanced-search");
const closeModal = document.getElementById("close-advanced-search");
const modal = document.getElementById("advanced-search-modal");

const formationSelect = document.getElementById("formation");
const villeSelect = document.getElementById("ville");
const departementSelect = document.getElementById("departement");
const alternanceCheckbox = document.getElementById("alternance");

const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");

const DEPARTEMENTS = {
    "01": "Ain", "02": "Aisne", "03": "Allier", "04": "Alpes-de-Haute-Provence", "05": "Hautes-Alpes", "06": "Alpes-Maritimes", 
    "07": "Ardèche", "08": "Ardennes", "09": "Ariège", "10": "Aube", "11": "Aude", "12": "Aveyron", "13": "Bouches-du-Rhône", 
    "14": "Calvados", "15": "Cantal", "16": "Charente", "17": "Charente-Maritime", "18": "Cher", "19": "Corrèze", 
    "2A": "Corse-du-Sud", "2B": "Haute-Corse", "21": "Côte-d'Or", "22": "Côtes-d'Armor", "23": "Creuse", "24": "Dordogne", 
    "25": "Doubs", "26": "Drôme", "27": "Eure", "28": "Eure-et-Loir", "29": "Finistère", "30": "Gard", 
    "31": "Haute-Garonne", "32": "Gers", "33": "Gironde", "34": "Hérault", "35": "Ille-et-Vilaine", "36": "Indre", 
    "37": "Indre-et-Loire", "38": "Isère", "39": "Jura", "40": "Landes", "41": "Loir-et-Cher", "42": "Loire", 
    "43": "Haute-Loire", "44": "Loire-Atlantique", "45": "Loiret", "46": "Lot", "47": "Lot-et-Garonne", "48": "Lozère", 
    "49": "Maine-et-Loire", "50": "Manche", "51": "Marne", "52": "Haute-Marne", "53": "Mayenne", "54": "Meurthe-et-Moselle", 
    "55": "Meuse", "56": "Morbihan", "57": "Moselle", "58": "Nièvre", "59": "Nord", "60": "Oise", 
    "61": "Orne", "62": "Pas-de-Calais", "63": "Puy-de-Dôme", "64": "Pyrénées-Atlantiques", "65": "Hautes-Pyrénées", "66": "Pyrénées-Orientales", 
    "67": "Bas-Rhin", "68": "Haut-Rhin", "69": "Rhône", "70": "Haute-Saône", "71": "Saône-et-Loire", "72": "Sarthe", 
    "73": "Savoie", "74": "Haute-Savoie", "75": "Paris", "76": "Seine-Maritime", "77": "Seine-et-Marne", "78": "Yvelines", 
    "79": "Deux-Sèvres", "80": "Somme", "81": "Tarn", "82": "Tarn-et-Garonne", "83": "Var", "84": "Vaucluse", 
    "85": "Vendée", "86": "Vienne", "87": "Haute-Vienne", "88": "Vosges", "89": "Yonne", "90": "Territoire de Belfort", 
    "91": "Essonne", "92": "Hauts-de-Seine", "93": "Seine-Saint-Denis", "94": "Val-de-Marne", "95": "Val-d'Oise", 
    "971": "Guadeloupe", "972": "Martinique", "973": "Guyane", "974": "La Réunion", "976": "Mayotte"
};

let allMasters = [];
let filtersInitialized = false;

// Ouvrir le pop-up de recherche avancée
openModal.addEventListener("click", () => {
    modal.style.display = "flex";
    if (!filtersInitialized) loadFilters(); // Charger les filtres dynamiquement
});

// Fermer le pop-up
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Charger les filtres dynamiquement dans les menus déroulants
async function loadFilters() {
    try {
        const data = await loadFullMaster();
        allMasters = Object.values(data.formationsById);

        const allSecteurs = Object.values(await loadSecteursDisciplinaires());

        // Remplir les menus déroulants avec des valeurs uniques
        populateSelect(formationSelect, [...new Set(allSecteurs.map(s => ({id: s.idSecteurDisc, name: s.nomSecteurDisc})))]);
        populateSelect(villeSelect, [...new Set(allMasters.map(m => m.villeFormation))]);

        const departements = Object.entries(DEPARTEMENTS).map(([code, name]) => `${code} - ${name}`);
        populateSelect(departementSelect, departements);

        filtersInitialized = true;
    } catch (error) {
        console.error("Erreur lors du chargement des filtres :", error);
    }
}

function populateSelect(selectElement, items) {
    items.forEach(item => {
        if (item) {
            const option = document.createElement("option");
            option.value = item.id ? item.id : item; 
            option.textContent = item.name ? item.name : item; 
            selectElement.appendChild(option);
        }
    });
}

// Met à jour l'affichage des Masters
function updateMastersDisplay(masters) {
    mastersContainer.innerHTML = ""; 
    if (masters.length === 0) {
        mastersContainer.innerHTML = "<p>Aucune formation trouvée.</p>";
        return;
    }

    masters.forEach(master => {
        const masterDiv = document.createElement("div");
        masterDiv.classList.add("master-card");
        masterDiv.innerHTML = `
            <div class="relative master-card text-white">
                <h2 class="master-title">${master.parcoursFormation}</h2>
                <p><strong>Ville:</strong> ${master.villeFormation}</p>
                <p><strong>Département:</strong> ${master.deptFormation} - ${DEPARTEMENTS[master.deptFormation] || master.deptFormation}</p>
                <p><strong>Alternance:</strong> ${master.alternanceFormation ? "Oui" : "Non"}</p>
                <p><strong>Établissement:</strong> ${master.etabUaiFormation}</p>
                <a href="presentationMaster.html?id=${master.idFormation}" class="view-details pt-4">Voir les détails</a>
            </div>
        `;
        mastersContainer.appendChild(masterDiv);
    });
}

// Filtrer les masters selon la recherche avancée
function filterMastersAdvanced(filters) {
    return allMasters.filter(master => {
        const deptDisplay = `${master.deptFormation} - ${DEPARTEMENTS[master.deptFormation] || ''}`;
        return (!filters.formation || master.secDiscIdFormation == filters.formation) &&
               (!filters.ville || master.villeFormation === filters.ville) &&
               (!filters.departement || deptDisplay === filters.departement) &&
               (!filters.alternance || master.alternanceFormation === true);
    });
}

// **Filtrer les masters avec la recherche manuelle**
function filterMastersManual(query) {
    query = query.toLowerCase();
    return allMasters.filter(master => {
        const parcours = master.parcoursFormation ? master.parcoursFormation.toLowerCase() : "";
        const ville = master.villeFormation ? master.villeFormation.toLowerCase() : "";
        const etab = master.etabUaiFormation ? master.etabUaiFormation.toLowerCase() : "";
        const dept = master.deptFormation ? `${master.deptFormation} - ${DEPARTEMENTS[master.deptFormation] || ''}`.toLowerCase() : "";

        return parcours.includes(query) || ville.includes(query) || etab.includes(query) || dept.includes(query);
    });
}

// **Gestion de la soumission de la recherche avancée**
document.getElementById("advanced-search-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const filters = {
        formation: formationSelect.value,
        ville: villeSelect.value,
        departement: departementSelect.value,
        alternance: alternanceCheckbox.checked
    };

    const filteredMasters = filterMastersAdvanced(filters);
    updateMastersDisplay(filteredMasters);
    modal.style.display = "none"; 
});

// **Gestion de la recherche manuelle**
searchButton.addEventListener("click", () => {
    const query = searchBar.value.trim(); 
    const filteredMasters = filterMastersManual(query);
    updateMastersDisplay(filteredMasters);
});

// Charger toutes les données au démarrage
loadFullMaster().then((data) => {
    allMasters = Object.values(data.formationsById);
    // updateMastersDisplay(allMasters);
}).catch((error) => {
    console.error("Erreur de chargement des données :", error);
});
