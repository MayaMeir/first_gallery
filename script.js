

var new_pic = document.querySelector("#image_url");
var bigImgFig = document.querySelector("#enlarged_img");
var shownPics = [];
let images = [
    { src: "UFO.jpg", title: 'UFO', numbers: '3'},
    { src: "space.jpg", title: 'THE SPACE', numbers: '1' },
    { src: "nebula.jpg", title: 'NEBULA', numbers: '2' }
];
let index = 0;
let gallery = document.querySelector("#gallery");
let title = document.querySelector("#caption");
let numberInput = document.querySelector("#numbers");



function addPic(e) {
    e.preventDefault();
    if (new_pic.value) {
        images.push({ src: new_pic.value, title: title.value, numbers: numberInput.value});
        new_pic.value = '';
        title.value = '';
        numberInput.value = '';

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

function Delete(fig){
    fig.parentNode.parentNode.remove();
}

function toImgItem(image) {
    return `<figure>
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
    // shownPics.sort(compareByNum);
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

render();

