import { searchFormations } from './network.js';

// Fonction pour récupérer les coordonnées d'une ville
async function getCoordinates(ville) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(ville)}&format=json`);
        const data = await response.json();

        if (data.length > 0) {
            return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
        } else {
            console.warn(`Aucune coordonnées trouvées pour la ville : ${ville}`);
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des coordonnées :", error);
        return null;
    }
}

// Fonction principale pour initialiser la carte
export async function initMap() {
    const map = L.map('map').setView([46.85, 2.35], 6);

    // Style clair pour la carte
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors, © CartoDB',
        maxZoom: 12
    }).addTo(map);

    try {
        const params = { "full-details": 1 };
        const formations = await searchFormations(params);

        const locationDict = {};

        formations.forEach(formation => {
            const lat = parseFloat(formation.latitude);
            const lon = parseFloat(formation.longitude);

            if (!lat || !lon) {
                console.warn(`Coordonnées manquantes pour : ${formation.parcours}`);
                return;
            }

            const key = `${lat}-${lon}`;
            if (!locationDict[key]) {
                locationDict[key] = {
                    lat,
                    lon,
                    etablissement: formation.etablissement,
                    ville: `${formation.ville} (${formation.dept})`,
                    formations: [],
                    etabUai: formation.etabUai
                };
            }

            locationDict[key].formations.push({
                parcours: formation.parcours,
                etablissement: formation.etablissement,
                ville: formation.ville
            });
        });

        Object.values(locationDict).forEach(location => {
            const count = location.formations.length;

            const marker = L.divIcon({
                className: 'custom-marker',
                html: `<div class=\"inner-circle\">${count}</div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });

            const markerLayer = L.marker([location.lat, location.lon], { icon: marker }).addTo(map);

            const formationsText = count === 1 ? '1 formation' : `${count} formations`;

            markerLayer.bindTooltip(`
                <div class=\"tooltip-info\">
                    <div class=\"location-info\">
                        <span>${location.etablissement}</span>
                        <span>${location.ville}</span>
                    </div>
                    <span class=\"formations-count\">${formationsText}</span>
                </div>
            `, {
                offset: [3, -18],
                direction: 'top',
                permanent: false,
                opacity: 1,
                className: 'custom-tooltip'
            });

            markerLayer.on('click', () => {
                const url = `recherche.html?q=${encodeURIComponent(location.etablissement)}&id=${location.etabUai}`;
                window.location.href = url;
            });
        });

    } catch (error) {
        console.error('❌ Erreur lors de la récupération des données :', error);
    }
}

// Initialisation après le chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    initMap();
});
