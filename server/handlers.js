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
    'gas'
]

exports.apply = (res) => {
    const idx = Math.floor(Math.random() * imgs.length);
    const url = imgs[idx];
    json = JSON.stringify({
        'imgURL' : url,
        'tags' : tags
    });

    res.send(json);
}