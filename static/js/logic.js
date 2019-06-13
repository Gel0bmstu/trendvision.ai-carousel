import NetworkHandler from './network/network.js'

// Импортируем вьюшки
import choseSectionView from './views/choseSectionView.js';
import confirmBarView from './views/confirmBarView.js';
import headerView from './views/headerView.js';
import rejectBarView from './views/rejectBarView.js';
import startLogic from './views/mainView.js';
import settingsView from './views/settingsView.js';
import uploadView from './views/uploadView.js';

// Импортм модуль фетчей
const netHand = new NetworkHandler();

// Задаем пути для общения с бэком
let apply = '/api/apply';   // То, куда отправляются размеченные тэги
let initial = '/api/apply'; // Инициирующий запрос на бэк

const heeaderRoot = document.querySelector('.header');
const choseRoot = document.querySelector('.main__chose-section');
const confirmRoot = document.querySelector('.main__confirm-bar');
const rejectRoot = document.querySelector('.main__reject-bar');
const settingsRoot = document.querySelector('.settings');
const uploadRoot = document.querySelector('.upload');

// console.log(heeaderRoot, choseRoot,confirmRoot,rejectRoot)

const choseView = new choseSectionView(choseRoot);
const headerview = new headerView(heeaderRoot);
const confirmView = new confirmBarView(confirmRoot);
const rejectView = new rejectBarView(rejectRoot);
const settingsview = new settingsView(settingsRoot);
const uploadview = new uploadView(uploadRoot);



headerview.show();

function showAll(res) {
    choseView.show(res);
    confirmView.show();
    rejectView.show();
    uploadview.show();
}

// Инициирующий запрос за первым графиком и тегами
netHand.doGet({
    callback(res) {
        console.log(res);
        // Отрисовываем элементы
        showAll(res)
    
        // запускаем логику
        startLogic(netHand, apply, showAll);
    },
    path: initial,
})



// const successBtn = document.querySelector('success-btn');
// const undoBtn = document.querySelector('undo-btn');
// const rejectBtn = document.querySelector('reject-btn');
// const applyBtn = document.querySelector('apply-btn');


