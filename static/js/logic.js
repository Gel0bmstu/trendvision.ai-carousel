import NetworkHandler from './network.js'

const netHand = new NetworkHandler();

const rejectBar = document.querySelector('.main__reject-bar-answers');
const confirmBar = document.querySelector('.main__confirm-bar-answers');
const carousel = document.querySelector('.main__chose-section-carousel');
const btnSection = document.querySelector('.main__chose-section-buttons-section');
const graph = document.querySelector('.main__chose-section-graph-image');


// const successBtn = document.querySelector('success-btn');
// const undoBtn = document.querySelector('undo-btn');
// const rejectBtn = document.querySelector('reject-btn');
// const applyBtn = document.querySelector('apply-btn');

// Тэг
let nodeArr = [];

btnSection.addEventListener('click', (evt) => {
    switch (evt.target.dataset.section) {
        case 'confirm' : {
            confirmHandle();
            break;
        }
        case 'undo' : {
            undoHanddle();
            break;
        }
        case 'reject' : {
            rejectHandle();
            break;
        }
        case 'apply' : {
            applyHandle();
            break;
        }
    }
});

document.addEventListener('keydown', (evt) => {
    switch (evt.keyCode) {
        case 37 : {
            confirmHandle();
            break;
        }
        case 17 : {
            undoHanddle();
            break;
        }
        case 39 : {
            rejectHandle();
            break;
        }
        case 13 : {
            applyHandle();
            break;
        }
    }
})

const confirmHandle = () => {

    if (carousel.childNodes.length == 0) {
        console.log("len 0");
        return;
    }

    let node = {};

    node.value = carousel.firstChild;
    node.status = 'confirm';

    if (node.localName != 'div') {
        carousel.removeChild(node.value);
        node.value = carousel.firstChild;
    }

    carousel.removeChild(node.value);

    confirmBar.appendChild(node.value);
    nodeArr.push(node);

    console.log(nodeArr);

}

const undoHanddle = () => {
    console.log(nodeArr);
    if (nodeArr.length == 0) {
        console.log('nothing to undo');
        return;
    }

    let node = nodeArr.pop();

    if (node.status == 'confirm') {
        confirmBar.removeChild(node.value);
        carousel.insertBefore(node.value, carousel.children[0]);
    } else if (node.status == 'reject') {
        rejectBar.removeChild(node.value);
        carousel.insertBefore(node.value, carousel.children[0]);
    }
}

const rejectHandle = () => {
    if (carousel.childNodes.length == 0) {
        return;
    }

    let node = {};

    node.value = carousel.firstChild;
    node.status = 'reject';

    if (node.localName != 'div') {
        carousel.removeChild(node.value);
        node.value = carousel.firstChild;
    }

    carousel.removeChild(node.value);

    rejectBar.appendChild(node.value);
    nodeArr.push(node);

    console.log(nodeArr);
}

const applyHandle = () => {
    let rejected = [];
    let confirmed = [];
    const graphURL = graph.src;

    for (let i = 0; i < rejectBar.childNodes.length; i++) {
        rejected[i] = rejectBar.children[i].textContent;
    }

    for (let i = 0; i < confirmBar.childNodes.length; i++) {
        confirmed[i] = confirmBar.children[i].textContent;
    }

    let answer = JSON.stringify({
        'rejected' : rejected,
        'confirmed' : confirmed,
        'imgURL' : graphURL,
    })

    console.log(answer); 

    netHand.doPost({
        callback(data) {
            console.log(data);
        },
        path : '/api/apply',
        answer
    })
}


