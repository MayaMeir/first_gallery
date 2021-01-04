

var new_pic = document.querySelector("#image_url");
var bigImgFig = document.querySelector("#enlarged_img");
var shownPics = [];
let images = [
    { src: "UFO.jpg", title: 'UFO', numbers: '3', id:'0'},
    { src: "space.jpg", title: 'THE SPACE', numbers: '1', id:'1'},
    { src: "nebula.jpg", title: 'NEBULA', numbers: '2', id:'2'}
];
let index = 0;
let gallery = document.querySelector("#gallery");
let title = document.querySelector("#caption");
let numberInput = document.querySelector("#numbers");
var items = 3;
let id;



function addPic(e) {
    e.preventDefault();
    if (new_pic.value && title.value && numberInput.value) {
        images.push({ src: new_pic.value, title: title.value, numbers: numberInput.value, id:items});
        new_pic.value = '';
        title.value = '';
        numberInput.value = '';
        localStorage.setItem('myGallery', JSON.stringify(images));
        items++;
    }
}

function compareByNum(picA, picB) {
    return picA.numbers - picB.numbers;
}

function reset() {
    bigImgFig.innerHTML = '';

}

function enlargeImg(img) {
    var src = img.src;
    bigImgFig.innerHTML = `<img src="${src}" onclick="reset()">`;
}

function Delete(fig) {
    console.log(fig.id);
    let arrindex = images.findIndex((obj) =>{ return obj.id === fig.parentNode.parentNode.id });
    console.log(arrindex);
    images.splice(arrindex, 1);
    fig.parentNode.parentNode.remove();
    localStorage.setItem('myGallery', JSON.stringify(images));
}

function toImgItem(image) {
    id = image.id;
    return `<figure id=${id}>
    <img src="${image.src}" alt ="${image.src}" onclick="enlargeImg(this)">
    <figcaption>Title: ${image.title} || Distance: ${image.numbers} || <button id="delbtn" onclick="Delete(this)">X</button></figcaption>
    </figure>`;
}

function setDisplayImages() {

    shownPics.length = 0;
    let counter = 0;
    images.sort(compareByNum);
    for (let i = index; i < images.length && counter < 3; i++, counter++) {
        shownPics.push(images[i]);
    }
    return shownPics.map(toImgItem);
}

function render() {
    const mappedImages = setDisplayImages();
    gallery.innerHTML = mappedImages.join('');
}

function showNext3() {
    if (index + 3 < images.length) {
        index = index + 3;
        render();
    }

}

function showPrev3() {
    if (index - 3 >= 0) {
        index = index - 3;
        render();
    }
}

window.onload = function () {
    if (JSON.parse(localStorage.getItem('myGallery'))) {
        images = JSON.parse(localStorage.getItem('myGallery'));
    }
    render();
}

