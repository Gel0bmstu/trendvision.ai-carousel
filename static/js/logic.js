import NetworkHandler from './network/network.js'

// Импортируем вьюшки
import choseSectionView from './views/choseSectionView.js';
import confirmBarView from './views/confirmBarView.js';
import headerView from './views/headerView.js';
import rejectBarView from './views/rejectBarView.js';
import startLogic from './views/mainView.js'

// Импортм модуль фетчей
const netHand = new NetworkHandler();

// Задаем пути для общения с бэком
let apply = '/api/apply';
let initial = '/api/apply';

const heeaderRoot = document.querySelector('.header');
const choseRoot = document.querySelector('.main__chose-section');
const confirmRoot = document.querySelector('.main__confirm-bar');
const rejectRoot = document.querySelector('.main__reject-bar');

// console.log(heeaderRoot, choseRoot,confirmRoot,rejectRoot)

const choseView = new choseSectionView(choseRoot);
const headerview = new headerView(heeaderRoot);
const confirmView = new confirmBarView(confirmRoot);
const rejectView = new rejectBarView(rejectRoot);

function showAll(res) {


    headerview.show();
    choseView.show(res);
    confirmView.show();
    rejectView.show();
}

// Инициирующий запрос за первым графиком и тегами
netHand.doGet({
    callback(res) {
        // console.log(res);
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


