import { loadFullMaster } from "./network.js";

const mastersContainer = document.getElementById("masters-container");
const openModal = document.getElementById("open-advanced-search");
const closeModal = document.getElementById("close-advanced-search");
const modal = document.getElementById("advanced-search-modal");

const formationSelect = document.getElementById("formation");
const regionSelect = document.getElementById("region");
const departementSelect = document.getElementById("departement");

let allMasters = [];
let filtersInitialized = false;

// Ouvrir le pop-up instantanément
openModal.addEventListener("click", () => {
    modal.style.display = "flex";
    if (!filtersInitialized) loadFilters(); // Charger les filtres si non initialisés
});

// Fermer le pop-up
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Charger dynamiquement les filtres
async function loadFilters() {
    try {
        const data = await loadFullMaster();
        allMasters = Object.values(data.formationsById);

        // Remplir les filtres dynamiquement
        populateSelect(formationSelect, [...new Set(allMasters.map(m => m.parcoursFormation))]);
        populateSelect(regionSelect, [...new Set(allMasters.map(m => m.regionFormation))]);
        populateSelect(departementSelect, [...new Set(allMasters.map(m => m.deptFormation))]);

        filtersInitialized = true;
    } catch (error) {
        console.error("Erreur lors du chargement des filtres :", error);
    }
}

// Fonction pour remplir un menu déroulant
function populateSelect(selectElement, items) {
    items.forEach(item => {
        if (item) {
            const option = document.createElement("option");
            option.value = item;
            option.textContent = item;
            selectElement.appendChild(option);
        }
    });
}

// Gestion de la soumission de la recherche avancée
document.getElementById("advanced-search-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const filters = {
        formation: formationSelect.value,
        region: regionSelect.value,
        departement: departementSelect.value,
        alternance: document.getElementById("alternance").checked
    };

    const filteredMasters = filterMasters(filters);
    updateMastersDisplay(filteredMasters);
    modal.style.display = "none"; // Fermer le pop-up
});

// Filtrer les Masters
function filterMasters(filters) {
    return allMasters.filter(master => {
        return (!filters.formation || master.parcoursFormation === filters.formation) &&
               (!filters.region || master.regionFormation === filters.region) &&
               (!filters.departement || master.deptFormation === filters.departement) &&
               (!filters.alternance || master.alternanceFormation === true);
    });
}

// Mettre à jour l'affichage des masters
function updateMastersDisplay(filteredMasters) {
    mastersContainer.innerHTML = "";
    if (filteredMasters.length === 0) {
        mastersContainer.innerHTML = "<p>Aucune formation trouvée.</p>";
        return;
    }
    filteredMasters.forEach(master => {
        mastersContainer.innerHTML += `
            <div class="master-card">
                <h2 class="master-title">${master.parcoursFormation}</h2>
                <p><strong>Région:</strong> ${master.regionFormation}</p>
                <p><strong>Département:</strong> ${master.deptFormation}</p>
                <p><strong>Alternance:</strong> ${master.alternanceFormation ? 'Oui' : 'Non'}</p>
            </div>
        `;
    });
}
