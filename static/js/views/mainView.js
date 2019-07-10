export default function startLogic(
    // Нетворк хендлер
    netHand, 

    // Пути
    apply,
    results,
    statistic,
    settingsPath,
    admin, 

    showAll) {

    let main = document.querySelector('.main');
    let rejectBar = document.querySelector('.main__reject-bar-answers');
    let confirmBar = document.querySelector('.main__confirm-bar-answers');
    let carousel = document.querySelector('.main__chose-section-carousel');
    let btnSection = document.querySelector('.main__chose-section-buttons-section');
    let graph = document.querySelector('.main__chose-section-graph-image');

    let uploadSaveButton = document.querySelector('.upload__input-form-save-btn');
    let sendSettingsButton = document.querySelector('.settings-apply-btn');
    let settingsSection = document.querySelector('.settings');

    // Сюда добавляем раскиданные теги, чтобы потом было удобнее
    // их доставать через undo
    let nodeArr = [];
    let toolSettings = {
        "settings" : [],
        "mode": "markup",
    };

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

    uploadSaveButton.addEventListener('click', () => {
        netHand.doGet({
            path : results,
        }) 
    })

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

    const forceConfirm = (bar, evt) => {
        if (evt.target.className == 'main__chose-section-carousel-item') {
            bar.removeChild(evt.target);
            confirmBar.appendChild(evt.target); 
            
            let node = {};

            node.value = evt.target;
            node.status = 'confirm';

            nodeArr.push(node);
        } else if (evt.target.parentNode.className == 'main__chose-section-carousel-item') {
            bar.removeChild(evt.target.parentNode);
            confirmBar.appendChild(evt.target.parentNode); 
            
            let node = {};

            node.value = evt.target.parentNode;
            node.status = 'confirm';

            nodeArr.push(node);
        }
    }

    carousel.addEventListener('click', function callback(evt) {
        forceConfirm(this, evt);
    });
    confirmBar.addEventListener('click', function callback(evt) {
        forceUndo(this, evt);
    });
    rejectBar.addEventListener('click', function callback(evt) {
        forceUndo(this, evt)
    })
    
    document.addEventListener('keydown', (evt) => {
        console.log(evt.keyCode);
        switch (evt.keyCode) {
            case 13 : {
                applyHandle();
                break;
            }
            case 17 : {
                undoHanddle();
                break;
            }
            case 37 : {
                confirmHandle();
                break;
            }
            case 39 : {
                rejectHandle();
                break;
            }
            case 68 : {
                console.log("------------DEBUG MODE-------------");
                console.log("nodes", carousel.childNodes);
                console.log("childs", carousel.children);            
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
    
        carousel.removeChild(node.value);
    
        rejectBar.appendChild(node.value);
        nodeArr.push(node);
    
        rejectBar.scrollTo(0, rejectBar.scrollHeight)
    }
    
    const sendSettings = () => {

        console.log("davai")

        let settingsList = {}

        settingsList["currency"] = document.querySelector('.currency').checked;
        settingsList["gems"] = document.querySelector('.gems').checked;
        settingsList["companies"] = document.querySelector('.companies').checked;
        if (document.querySelector('.validate').checked) {
            toolSettings["mode"] = 'validate';
        } else if (document.querySelector('.markup').checked) {
            toolSettings["mode"] = 'markup';
        } else {
            toolSettings["mode"] = 'markup';
        }

        for (let key in settingsList) {
            if (settingsList[key]) {
                toolSettings["settings"].push(key)
            }
        }  

        settingsSection.style.display = 'none';
    }

    sendSettingsButton.addEventListener('click', () => {    
        sendSettings();
        applyHandle();
    });

    const applyHandle = () => {
        let rejected = [];
        let confirmed = [];
        const graphURL = graph.src;
    
        for (let i = 0; i < rejectBar.children.length; i++) {
            rejected[i] = rejectBar.children[i].textContent;
        }
    
        for (let i = 0; i < confirmBar.children.length; i++) {
            confirmed[i] = confirmBar.children[i].textContent;
        }
    
        let answer = JSON.stringify({
            rejected : rejected,
            confirmed : confirmed,
            imgURL : graphURL,
            settings : toolSettings,
        });
    
        netHand.doPost({
            callback(data) {
                showAll(data, netHand, statistic, results, admin, toolSettings.mode);
                nodeArr = [];
                rejectBar = document.querySelector('.main__reject-bar-answers');
                confirmBar = document.querySelector('.main__confirm-bar-answers');
                carousel = document.querySelector('.main__chose-section-carousel');
                btnSection = document.querySelector('.main__chose-section-buttons-section');
                graph = document.querySelector('.main__chose-section-graph-image');
                
                // uploadSection = document.querySelector('.upload');
                // uploadButton = document.querySelector('.header__container-hrefs-block-upload');

                // settingsButton = document.querySelector('.header__container-hrefs-block-settings');
                // settingsSection = document.querySelector('.settings');

                confirmBar.addEventListener('click', function callback(evt) {
                    forceUndo(this, evt);
                });
                rejectBar.addEventListener('click', function callback(evt) {
                    forceUndo(this, evt);
                })
                carousel.addEventListener('click', function callback(evt) {
                    forceConfirm(this, evt);
                })
                // uploadButton.addEventListener('click', () => {
                //     uploadSection.style.display = 'flex';
                // })
                // sendSettingsButton.addEventListener('click', () => {    
                //     sendSettings();
                // });
            },
            path : apply,
            body : answer,
        })
    }
}