import { loadFullMaster } from "./network.js";

// 🟢 **Récupération de l'ID du Master depuis l'URL**
const urlParams = new URLSearchParams(window.location.search);
const masterId = urlParams.get('id');

// Afficher l'ID pour vérifier
console.log("ID du master:", masterId);

// Récupérer les départements pour afficher leur nom
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

async function loadMasterDetails(masterId) {
    try {
        // Charger les données complètes
        const fullData = await loadFullMaster();


        // Récupérer les formations à partir des données chargées
        const formationsById = fullData.formationsById;

        // Trouver la formation correspondant à l'ID du master
        const master = formationsById[masterId]; // Assure-toi que l'ID correspond à la structure des données
        
        const masterStats = await fetch("https://la-lab4ce.univ-lemans.fr/masters-stats/api/rest/stats/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                filters:{
                    formationIfcs: master.idFormation,
                    etablissementIds: master.etabUaiFormation,
                    mentionIds: master.mentionIdFormation,
                    annees: 2023,
                },
            }),
        }).then((res) => res.json());

        master.stats = masterStats.candidatures[0].general;

        if (!master) {
            throw new Error("Master non trouvé pour cet ID.");
        }

        // Afficher les détails du master
        displayMasterDetails(master);

        return master;
    } catch (error) {
        console.error("Erreur lors du chargement des détails du master:", error);
    }
}


// Fonction pour afficher les détails du master
function displayMasterDetails(master) {
    // Exemple de mise à jour des éléments de la page avec les détails du master
    document.getElementById("master-title").textContent = master.parcoursFormation;
    document.getElementById("master-ville").textContent = master.villeFormation;
    document.getElementById("master-dept").textContent = `${master.deptFormation} - ${DEPARTEMENTS[master.deptFormation] || master.deptFormation}`;
    document.getElementById("master-alternance").textContent = master.alternanceFormation ? "Oui" : "Non";
    document.getElementById("master-etablissement").textContent = master.etabUaiFormation;
    // Ajouter d'autres informations que tu souhaites afficher ici
}

// Charger les détails du master avec l'ID récupéré dans l'URL
if (masterId) {
    loadMasterDetails(masterId);
}


    const master = await loadMasterDetails(masterId);

    // Initialisation du deuxième graphique : Pie Chart
    const chart2 = echarts.init(document.getElementById('chart2'));
    const option2 = {
        title: {
            text: 'Répartition des Masters',
            left: 'center',
            textStyle: { color: '#ffffff' }
        },
        series: [{
            name: 'Types de Masters',
            type: 'pie',
            radius: '50%',
            data: [
                { value: master.stats.nb, name: 'Homme' },
                { value: master.stats.nbFemmes, name: 'Femme' }
            ],
            label: { color: '#ffffff', show: true, fontSize: 12 },
            itemStyle: {
                color: function(params) {
                    const colors = ['#10B981', '#3B82F6', '#F59E0B'];
                    return colors[params.dataIndex];
                }
            }
        }],
    };
    chart2.setOption(option2);

/**
 * 🟢 **Affiche le taux d'admission**
 * @param {Object} master - Données de la formation
 */
function displayAdmissionRate(master) {
    const tauxAdmission = calculateAdmissionRate(master);
    document.getElementById('admission-rate').innerHTML = `<strong>Taux d'admission:</strong> ${tauxAdmission}%`;
}

/**
 * 🟢 **Calcule le taux d'admission**
 * @param {Object} master - Données de la formation
 * @returns {Number} Le taux d'admission
 */
function calculateAdmissionRate(master) {
    const totalCandidats = master.totalCandidats || 100; 
    const totalAdmis = master.totalAdmis || 50; 
    return Math.round((totalAdmis / totalCandidats) * 100);
}

/**
 * 🟢 **Affiche le graphique avec les vraies statistiques**
 * @param {Object} master - Données de la formation
 */
function displayChart(master) {
    const chartDom = document.getElementById('chartContainer');
    const myChart = echarts.init(chartDom);

    const totalCandidats = master.totalCandidats || 100; 
    const totalAdmis = master.totalAdmis || 50; 
    const totalInscrits = master.totalInscrits || 40;

    const option = {
        title: {
            text: 'Statistiques du Master'
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: ['Candidats', 'Admis', 'Inscrits']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            type: 'bar',
            data: [totalCandidats, totalAdmis, totalInscrits]
        }]
    };

    myChart.setOption(option);
}
