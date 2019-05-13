export default function startLogic(netHand, apply, showAll) {

    let main = document.querySelector('.main');
    let rejectBar = document.querySelector('.main__reject-bar-answers');
    let confirmBar = document.querySelector('.main__confirm-bar-answers');
    let carousel = document.querySelector('.main__chose-section-carousel');
    let btnSection = document.querySelector('.main__chose-section-buttons-section');
    let graph = document.querySelector('.main__chose-section-graph-image');

    let uploadButton = document.querySelector('.header__container-hrefs-block-upload');
    let upload = document.querySelector('.upload');

    uploadButton.addEventListener('click', () => {
        upload.style.display = 'flex';
    })

    // let settinsBtn = document.querySelector('.');

    // Сюда добавляем раскиданные теги, чтобы потом было удобнее
    // их доставать через undo
    let nodeArr = [];
    
    main.addEventListener('click', (evt) => {
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

    const dargAndDrop = (elem, e) => {
        console.log('Take!')

        let coords = getCoords(elem);
        let shiftX = e.pageX - coords.left;
        let shiftY = e.pageY - coords.top;

        elem.style.position = 'absolute';
        // document.body.appendChild(elem);
        moveAt(e);
        
        elem.style.zIndex = 2; // над другими элементами
        
        function moveAt(e) {
            elem.style.left = e.pageX - coords.left + 'px';
            elem.style.top = e.pageY - coords.top + 'px';
        }
        
        document.onmousemove = function(e) {
            moveAt(e);
        };
        
        elem.onmouseup = function() {
            const cnfrm = confirmBar.getBoundingClientRect();

            console.log(e.pageX + shiftX, cnfrm.left, cnfrm.right)


            if (e.clientX >= cnfrm.left && e.clientX <= cnfrm.right) {
                console.log('IN CONFIRM!')
            }

            elem.onmouseup = null;
            document.onmousemove = null;

        };
        
        
        elem.ondragstart = function() {
            return false;
        };
        
        function getCoords(elem) {   // кроме IE8-
        const box = getPosition(elem);
            return {
                top: e.pageX - box.x,
                left: e.pageY - box.y
            };
        }
    } 

    document.onmousedown = (evt) => {
        console.log(evt.className);
        if (evt.target.className == 'main__chose-section-carousel-item') {
            dargAndDrop(evt.target, evt);
        } else if (evt.target.parentNode.className == 'main__chose-section-carousel-item') {
            dargAndDrop(evt.target.parentNode, evt);
        }
    }

    // Функция удавозвращения в карусель по клику на тэг
    const forceUndo = (bar, evt) => {
        if (evt.target.className == 'main__chose-section-carousel-item') {
            bar.removeChild(evt.target);
            carousel.insertBefore(evt.target, carousel.children[0]); 
            
            for (let i = 0; i < nodeArr.length; i++) {
                if (nodeArr[i].value == evt.target) {
                    nodeArr.splice(i ,1);
                }
            }
        } else if (evt.target.parentNode.className == 'main__chose-section-carousel-item') {
            bar.removeChild(evt.target.parentNode);
            carousel.insertBefore(evt.target.parentNode, carousel.children[0]);   
            
            for (let i = 0; i < nodeArr.length; i++) {
                if (nodeArr[i].value == evt.target.parentNode) {
                    nodeArr.splice(i ,1);
                }
            }
        }
    } 

    confirmBar.addEventListener('click', function callback(evt) {
        forceUndo(this, evt);
    });
    rejectBar.addEventListener('click', function callback(evt) {
        forceUndo(this, evt)
    })
    
    document.addEventListener('keydown', (evt) => {
        console.log(evt.keyCode);
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
            case 68 : {
                console.log("nodes", carousel.childNodes);
                console.log("chill=", carousel.children);            
            }
        }
    })
    
    const confirmHandle = () => {
    
        if (carousel.children.length == 0) {
            console.log("len 0");
            return;
        }
    
        let node = {};
    
        node.value = carousel.children[0];
        node.status = 'confirm';
    
        // if (node.localName != 'div') {
        //     carousel.removeChild(node.value);
        //     node.value = carousel.firstChild;
        // }
    
        carousel.removeChild(node.value);
    
        confirmBar.appendChild(node.value);
        nodeArr.push(node);

        confirmBar.scrollTo(0, confirmBar.scrollHeight)
    
    }
    
    const undoHanddle = () => {
        // console.log(nodeArr);
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
        if (carousel.children.length == 0) {
            return;
        }
    
        let node = {};
    
        node.value = carousel.children[0];
        node.status = 'reject';
    
        // if (node.localName != 'div') {
        //     carousel.removeChild(node.value);
        //     node.value = carousel.firstChild;
        // }
    
        carousel.removeChild(node.value);
    
        rejectBar.appendChild(node.value);
        nodeArr.push(node);
    
        rejectBar.scrollTo(0, rejectBar.scrollHeight)
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
            rejected : rejected,
            confirmed : confirmed,
            imgURL : graphURL,
        });
    
        console.log(answer); 
    
        netHand.doPost({
            callback(data) {
                console.log("to-get: ", data);
                showAll(data);
                nodeArr = [];
                rejectBar = document.querySelector('.main__reject-bar-answers');
                confirmBar = document.querySelector('.main__confirm-bar-answers');
                carousel = document.querySelector('.main__chose-section-carousel');
                btnSection = document.querySelector('.main__chose-section-buttons-section');
                graph = document.querySelector('.main__chose-section-graph-image');

                confirmBar.addEventListener('click', function callback(evt) {
                    forceUndo(this, evt);
                });
                rejectBar.addEventListener('click', function callback(evt) {
                    forceUndo(this, evt)
                })
            },
            path : apply,
            body : answer,
        })
    }
}