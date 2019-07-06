import getTemplate from '../components/statisticComponent/statistic.js';

export default class statisticView{
    constructor(
        root = document.body,
        net,
    ) {
        this.root = root;
        this.template = getTemplate();
        this.net = net;
        this.graph;
        this.colorsBase = [
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
    }

    show() {
        this.root.innerHTML = this.template;

        this.graph = document.querySelector('.statistic-section-graph').getContext('2d');;
        this.closeBtn = document.querySelector('.statistic-close');

        this.closeBtn.addEventListener('click', () => {
            // this.root.innerHTML = '';
            this.root.style.zIndex = '0';
            this.root.style.display = 'none';
        })
    }

    getStats() {
        this.root.innerHTML = this.template;

        let labels = [];
        let count = [];
        let colors = [];
        let borderColors = [];

        net.doGet({ 
            callback(data) {
                stats.forEach((user, i) => {
                    labels.push(user.username);
                    count.push(user.count);
                    color.push(colorsBase[i]);
                    borderColor.push(colorsBase[i]);
                });
            },
            path: '/api/stats',
        })   

        chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Votes',
                    data: count,
                    backgroundColor: colors,
                    borderColor: borderColors,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
}