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

// Fonction pour filtrer les masters selon la recherche
function filterMasters(query, formationsById) {
    if (!query) return Object.values(formationsById); // Si aucune recherche, retourne toutes les formations

    query = query.toLowerCase(); // Convertir la recherche en minuscule pour ne pas être sensible à la casse

    return Object.values(formationsById).filter(master => {
        // Assurez-vous que chaque propriété est une chaîne avant d'appeler toLowerCase
        const parcours = master.parcoursFormation ? master.parcoursFormation.toLowerCase() : '';
        const ville = master.villeFormation ? master.villeFormation.toLowerCase() : '';
        const etab = master.etabUaiFormation ? master.etabUaiFormation.toLowerCase() : '';
        const dept = master.deptFormation ? String(master.deptFormation).toLowerCase() : ''; // Convertit les nombres en chaînes

        // Filtrer selon plusieurs critères
        return (
            parcours.includes(query) ||
            ville.includes(query) ||
            etab.includes(query) ||
            dept.includes(query)
        );
    });
}


// Appeler la fonction loadFullMaster pour récupérer les données
loadFullMaster().then((data) => {
const formationsById = data.formationsById;

const mastersContainer = document.getElementById('masters-container');
const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button'); // Récupérer le bouton
// Afficher tous les masters initialement
function updateDisplay(query = '') {
mastersContainer.innerHTML = ''; // Effacer le contenu précédent
const filteredMasters = filterMasters(query, formationsById);
// Si aucune formation ne correspond, afficher un message
if (filteredMasters.length === 0) {
mastersContainer.innerHTML = '<p>Aucune formation trouvée.</p>';
return;
}
// Parcourir les masters filtrés et afficher leurs informations
filteredMasters.forEach(master => {
// Créer une div pour chaque master
const masterDiv = document.createElement('div');
masterDiv.classList.add('master-card');
// Ajouter les informations du master dans la div
masterDiv.innerHTML = `
<div class="relative master-card text-white">
<h2 class="master-title">${master.parcoursFormation}</h2>
<p><strong>Alternance:</strong> ${master.alternanceFormation ? 'Oui' : 'Non'}</p>
<p><strong>Lieu:</strong> ${master.lieuxFormation}</p>
<p><strong>Ville:</strong> ${master.villeFormation}</p>
<p><strong>Département:</strong> ${master.deptFormation}</p>
<p><strong>Établissement:</strong> ${master.etabUaiFormation}</p>
<a href="presentationMaster.html?id=${master.id}" class="view-details pt-4">Voir les détails</a>
<!-- Bouton Favoris -->
    <button 
        class="absolute right-8 text-gray-400 hover:text-green-500 transition-all heart-btn" 
        data-id="${master.idFormation}"
        title="Ajouter aux favoris">
        <img src="./Images/icon/bookmark.png" alt="Favoris Icon" class="h-8 w-8" />
    </button>
</div>
`;
// Ajouter la div à la container
mastersContainer.appendChild(masterDiv);
});
}

// Mettre à jour l'affichage lorsque l'on clique sur le bouton de recherche
searchButton.addEventListener('click', () => {
const query = searchBar.value.trim(); // Récupérer la valeur de la recherche
updateDisplay(query); // Mettre à jour les masters affichés
});

function updateDisplayAdvanced(filters) {
    mastersContainer.innerHTML = ''; // Efface le contenu précédent
    const filteredMasters = Object.values(formationsById).filter(master => {
        return (!filters.formation || master.parcoursFormation.toLowerCase().includes(filters.formation.toLowerCase())) &&
               (!filters.region || master.regionFormation.toLowerCase().includes(filters.region.toLowerCase())) &&
               (!filters.departement || master.deptFormation.includes(filters.departement)) &&
               (!filters.ville || master.villeFormation.toLowerCase().includes(filters.ville.toLowerCase())) &&
               (!filters.alternance || master.alternanceFormation === true);
    });

    filteredMasters.forEach(master => { 
        // Ton code d'affichage existant ici
    });
}


}).catch((error) => {
console.error("Erreur de chargement des données :", error);
});