import { loadFullMaster } from "./network.js";

// Fonction pour filtrer les masters selon la recherche
function filterMasters(query, formationsById) {
if (!query) return Object.values(formationsById); // Si aucune recherche, retourne toutes les formations

query = query.toLowerCase(); // Convertir la recherche en minuscule pour ne pas être sensible à la casse

return Object.values(formationsById).filter(master => {
// Filtrer selon plusieurs critères, avec vérification que les propriétés existent
return (
(master.parcoursFormation && master.parcoursFormation.toLowerCase().includes(query)) ||
(master.villeFormation && master.villeFormation.toLowerCase().includes(query)) ||
(master.etabUaiFormation && master.etabUaiFormation.toLowerCase().includes(query)) ||
(master.deptFormation && master.deptFormation.toLowerCase().includes(query))
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
<h2 class="master-title">${master.parcoursFormation}</h2>
<p><strong>Alternance:</strong> ${master.alternanceFormation ? 'Oui' : 'Non'}</p>
<p><strong>Lieu:</strong> ${master.lieuxFormation}</p>
<p><strong>Ville:</strong> ${master.villeFormation}</p>
<p><strong>Département:</strong> ${master.deptFormation}</p>
<p><strong>Établissement:</strong> ${master.etabUaiFormation}</p>
<a href="presentationMaster.html?id=${master.id}" class="view-details">Voir les détails</a>
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
// Initialiser l'affichage sans filtre (afficher toutes les formations au départ)
updateDisplay();

}).catch((error) => {
console.error("Erreur de chargement des données :", error);
});