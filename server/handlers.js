const imgs = [
    'https://cdn.pixabay.com/photo/2018/07/23/19/32/abstract-3557682_960_720.jpg',
    'https://www.1zoom.ru/big2/62/185130-melisenta.jpg',
    'https://fotooboi.org.ua/images/product_images/info_images/fotooboi-abstrakciya-3d-10635.jpg',
    'https://klv-oboi.ru/img/gallery/50/thumbs/thumb_l_20891.jpg'
]

const tags = [
    'gold',
    'silver',
    'oil',
    'euro/usd',
    'shugar',
    'gas',
    'platina',
    'sfjsdfsddfsdsfs',
    'qqqqqqqqqqqqq',
    'aaaaaaaaaaaaaaaaaaaaaaaa',
    'anothertag',
    'and again',
    'some text tag',
    'yeap, atoher test',
    'thi is the test too',
]

exports.applyGet = (res) => {
    const idx = Math.floor(Math.random() * imgs.length);
    const url = imgs[idx];
    json = JSON.stringify({
        'admin': true,
        'imgURL' : url,
        'tags' : tags
    });

    res.send(json);
}

exports.apply = (res, mode) => {
    const idx = Math.floor(Math.random() * imgs.length);
    const url = imgs[idx];
    if (mode == 'markup') {
        json = JSON.stringify({
            'imgURL' : url,
            'tags' : tags
        });
    } else {
        json = JSON.stringify({
            'imgURL' : url,
            'confirmed' : [
                'da',
                'net',
                'davai',
            ],
            'rejected' : [
                'coldplay',
                'russ rap',
                'baby blin!',
            ] 
        })
    }
    
    res.send(json);
}