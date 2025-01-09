// Graph Réussite en Master
var chartDom1 = document.getElementById('reussite');
var myChart1 = echarts.init(chartDom1);
var option1 = {
    title: {
        text: 'Évolution de la réussite en Master (2011-2020)',
        left: 'center',
        textStyle: {
            color: 'white'
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        formatter: function (params) {
            let result = params[0].axisValue + '<br/>';
            params.forEach(item => {
                if (item.data === '?') {
                    result += `${item.marker} ${item.seriesName}: Non disponible<br/>`;
                } else {
                    result += `${item.marker} ${item.seriesName}: ${item.data}%<br/>`;
                }
            });
            return result;
        }
    },
    legend: {
        data: ['Réussite en 2 ans', 'Réussite en 3 ans'],
        top: '10%',
        textStyle: {
            color: 'white'
        }
    },
    xAxis: {
        type: 'category',
        data: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
        axisLine: {
            lineStyle: {
                color: 'white'
            }
        },
        axisLabel: {
            color: 'white'
        }
    },
    yAxis: {
        type: 'value',
        min: 40,
        max: 75,
        axisLine: {
            lineStyle: {
                color: 'white'
            }
        },
        axisLabel: {
            formatter: '{value} %',
            color: 'white'
        },
        splitLine: {
            lineStyle: {
                color: '#444'
            }
        }
    },
    series: [
        {
            name: 'Réussite en 2 ans',
            type: 'bar',
            stack: 'total',
            emphasis: {
                focus: 'series'
            },
            data: [53.7, 53.4, 52.2, 52.6, 53.2, 54.5, 58.1, 60.8, 63.6, 64.6]
        },
        {
            name: 'Réussite en 3 ans',
            type: 'bar',
            stack: 'total',
            emphasis: {
                focus: 'series'
            },
            data: [11, 11.5, 11.9, 11.8, 12.1, 11.8, 11.7, 11.5, 10.2, '?']
        }
    ]
};
myChart1.setOption(option1);

// Graph Élèves inscrits en Master
var chartDom2 = document.getElementById('inscrits');
var myChart2 = echarts.init(chartDom2);
var option2 = {
    title: {
        text: 'Évolution des inscriptions en Master (2011-2020)',
        left: 'center',
        textStyle: {
            color: 'white'
        }
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            let result = params[0].axisValue + '<br/>';
            params.forEach(item => {
                result += `${item.marker} ${item.seriesName}: ${item.data.toLocaleString()} étudiants<br/>`;
            });
            return result;
        }
    },
    xAxis: {
        type: 'category',
        data: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
        axisLine: {
            lineStyle: {
                color: 'white'
            }
        },
        axisLabel: {
            color: 'white'
        }
    },
    yAxis: {
        type: 'value',
        min: 450000,
        max: 700000,
        axisLine: {
            lineStyle: {
                color: 'white'
            }
        },
        axisLabel: {
            formatter: function (value) {
                return value.toLocaleString();
            },
            color: 'white'
        },
        splitLine: {
            lineStyle: {
                color: '#444'
            }
        }
    },
    series: [
        {
            name: 'Inscriptions en Master',
            type: 'line',
            data: [500000, 510670, 527090, 520780, 560000, 590675, 580000, 612500, 615000, 625035, 640546, 645765, 650000],
            lineStyle: {
                color: '#15803D',
                width: 5
            },
            itemStyle: {
                color: '#15803D'
            }
        }
    ]
};
myChart2.setOption(option2);

// Graph Taux d'insertion professionnelle
var chartDom3 = document.getElementById('insertion');
var myChart3 = echarts.init(chartDom3);
var option3 = {
    title: {
        text: "Taux d'insertion professionnelle (18 et 30 mois)",
        left: 'center',
        textStyle: {
            color: 'white'
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['18 mois', '30 mois'],
        top: '10%',
        textStyle: {
            color: 'white'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: ['Licence Pro', 'Master', 'BUT'],
        axisLine: {
            lineStyle: {
                color: 'white'
            }
        },
        axisLabel: {
            color: 'white'
        }
    },
    yAxis: {
        type: 'value',
        min: 80,
        max: 100,
        axisLine: {
            lineStyle: {
                color: 'white'
            }
        },
        axisLabel: {
            formatter: '{value} %',
            color: 'white'
        },
        splitLine: {
            lineStyle: {
                color: '#444'
            }
        }
    },
    series: [
        {
            name: '18 mois',
            type: 'bar',
            data: [92, 92, 84],
            itemStyle: {
                color: '#fff55f'
            }
        },
        {
            name: '30 mois',
            type: 'bar',
            data: [95, 93, 92],
            itemStyle: {
                color: '#ff835f'
            }
        }
    ]
};
myChart3.setOption(option3);

// Graph Conseils pour Réussir son Master
var chartDom4 = document.getElementById('conseils-pie');
var myChart4 = echarts.init(chartDom4);
var option4 = {
    title: {
        text: 'Conseils pour Réussir',
        left: 'center',
        textStyle: { color: 'white' }
    },
    tooltip: {
        trigger: 'item',
        textStyle: { color: 'white' }
    },
    series: [
        {
            name: 'Conseils',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 30, name: 'Choix du Parcours' },
                { value: 25, name: 'Organisation' },
                { value: 25, name: 'Stages' },
                { value: 20, name: 'Engagement' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            label: {
                color: 'white'
            }
        }
    ]
};
myChart4.setOption(option4);

// Graph Débouchés Généraux
var chartDom5 = document.getElementById('debouches-pie');
var myChart5 = echarts.init(chartDom5);
var option5 = {
    title: {
        text: 'Débouchés Généraux',
        left: 'center',
        textStyle: { color: 'white' }
    },
    tooltip: {
        trigger: 'item',
        textStyle: { color: 'white' }
    },
    series: [
        {
            name: 'Débouchés',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 35, name: 'Ingénierie et Sciences' },
                { value: 30, name: 'Gestion et Management' },
                { value: 20, name: 'Arts et Culture' },
                { value: 15, name: 'Recherche et Enseignement' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            label: {
                color: 'white'
            }
        }
    ]
};
myChart5.setOption(option5);


