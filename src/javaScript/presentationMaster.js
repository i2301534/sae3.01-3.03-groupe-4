import { loadFullMaster } from "./network.js";

// 🟢 **Récupération de l'ID du Master depuis l'URL**
const urlParams = new URLSearchParams(window.location.search);
const masterId = urlParams.get('id');





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
