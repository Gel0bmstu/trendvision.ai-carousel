import getTemplate from '../components/headerComponent/header.js';

export default class headerView {
    constructor(
        root = document.body,
    ) {
        this.root = root;

        document.addEventListener('keydown', (evt) => {
            if (evt.keyCode == 27) {
                this.closeAllUpWindows(); 
            }
        })
    }

    show(net, stat, result, admin) {
        // Отрисовываем хэдер
        this.template = getTemplate(admin);        
        this.root.innerHTML = this.template;

        const that = this;

        // Вешаем евент лисенеры на открытие всплывающих меню
        let settingsButton = document.querySelector('.header__container-hrefs-block-settings');
        let statisticButton = document.querySelector('.header__container-hrefs-block-statistic');
        let statisticGraph = document.querySelector('.statistic-section-graph').getContext('2d');
        let settingsSection = document.querySelector('.settings');
        let statisticSection = document.querySelector('.statistic');
        let uploadSection = document.querySelector('.upload');

        if (admin) {
            let resultButton = document.querySelector('.header__container-hrefs-block-result');
            let uploadButton = document.querySelector('.header__container-hrefs-block-upload');

            uploadButton.addEventListener('click', () => {
                uploadSection.style.display = 'flex';
            });

            resultButton.addEventListener('click', () => {
                net.doGet({
                    path: result,
                })
            });

        }

        settingsButton.addEventListener('click', () => {
            settingsSection.style.display = 'flex';
        });

        statisticButton.addEventListener('click', () => {
            statisticSection.style.display = 'flex';
            // this.root.innerHTML = this.template;
    
            let labels = [];
            let count = [];
            let colors = [];
            let borderColors = [];
            let colorsBase = [
                'red',
                'blue',
                'green',
                'Yellow',
                'Fuchsia',
                'Aqua',
                'Lime',
                'Maroon',
                'Teal',
                'Navy',
            ]
    
            net.doGet({ 
                callback(data) {
                    if ( typeof(data) !== undefined) {
                        let stats = JSON.parse(`[
                            {
                              "count": 1, 
                              "username": "val"
                            }, 
                            {
                              "count": 189, 
                              "username": ""
                            }, 
                            {
                              "count": 37, 
                              "username": "evv"
                            }, 
                            {
                              "count": 3005, 
                              "username": "share1"
                            }, 
                            {
                              "count": 2489, 
                              "username": "share8"
                            }, 
                            {
                              "total": 5721
                            }
                          ]`);
        
                        for (let i = 0; i < stats.length; i++){
                            labels.push(stats[i].username);
                            count.push(stats[i].count);
                            colors.push(colorsBase[i]);
                            borderColors.push(colorsBase[i]);
                        };
    
                        // let chart = new Chart(statisticGraph, {
                        //     type: 'pie',
                        //     data: {
                        //         labels: labels,
                        //         datasets: [{
                        //             label: '# of Votes',
                        //             data: count,
                        //             backgroundColor: colors,
                        //             borderColor: borderColors,
                        //             borderWidth: 1
                        //         }]
                        //     },
                        //     options: {
                        //         scales: {
                        //             yAxes: [{
                        //                 ticks: {
                        //                     beginAtZero: true
                        //                 }
                        //             }]
                        //         }
                        //     }
                        // });
                    }
    
                },
                path: stat,
            })   
        });

        that.closeAllUpWindows = () => {
            if (admin && uploadSection.style.display == 'flex') {
                uploadSection.style.display = 'none'
            } else if (settingsSection.style.display == 'flex') {
                settingsSection.style.display = 'none';
            } else if (statisticSection.style.display == 'flex') {
                statisticSection.style.display = 'none';
            } 
        }
    }
}