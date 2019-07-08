import NetworkHandler from './network/network.js'

// Импортируем вьюшки
import choseSectionView from './views/choseSectionView.js';
import confirmBarView from './views/confirmBarView.js';
import headerView from './views/headerView.js';
import rejectBarView from './views/rejectBarView.js';
import startLogic from './views/mainView.js';
import settingsView from './views/settingsView.js';
import uploadView from './views/uploadView.js';
import statisticView from './views/statisticView.js';

// Импортм модуль фетчей
const netHand = new NetworkHandler();

// Задаем пути для общения с бэком
let apply = '/api/apply';   // То, куда отправляются размеченные тэги
let initial = '/api/apply'; // Инициирующий запрос на бэк
let results = '/api/results'; // Скачать CVS с бэка
let settingsPath = '/api/settings'; // Отдать конфигурацию клиента (чекбоксы настроек) на бэк
let statistic = '/api/stats'

const heeaderRoot = document.querySelector('.header');
const choseRoot = document.querySelector('.main__chose-section');
const confirmRoot = document.querySelector('.main__confirm-bar');
const rejectRoot = document.querySelector('.main__reject-bar');
const settingsRoot = document.querySelector('.settings');
const uploadRoot = document.querySelector('.upload');
const statisticRoot = document.querySelector('.statistic');

const choseView = new choseSectionView(choseRoot);
const headerview = new headerView(heeaderRoot);
const confirmView = new confirmBarView(confirmRoot);
const rejectView = new rejectBarView(rejectRoot);
const settingsview = new settingsView(settingsRoot);
const uploadview = new uploadView(uploadRoot);
const statisticview = new statisticView(statisticRoot);

function showAll(res, net, statistic, result, admin, mode) {
    choseView.show(res);
    confirmView.show(res, mode);
    rejectView.show(res, mode);

    headerview.show(net, statistic, result, admin);
}

// Инициирующий запрос за первым графиком и тегами
netHand.doGet({
    callback(res) {
        settingsview.show(res.admin);
        uploadview.show();
        statisticview.show();
        showAll(res, netHand, statistic, results, res.admin, 'markup')
        startLogic(netHand, apply, results, statistic, settingsPath, res.admin, showAll);
    },
    path: initial,
})