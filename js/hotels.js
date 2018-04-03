/*ползунки для hotels*/

var sliderElem = document.querySelector(".filters__price-bar");
var thumbMin = document.querySelector(".filters__price-toggle--min");
var thumbMax = document.querySelector(".filters__price-toggle--max");
// var thumbMin = sliderElem.children[0];
var sliderCoords = getCoords(sliderElem);
var rangeEnd = sliderElem.offsetWidth - thumbMin.offsetWidth;
// var rangeEnd = sliderElem.offsetWidth;

var min = parseInt(getComputedStyle(thumbMin).left);
var max = parseInt(getComputedStyle(thumbMax).left);

console.log(parseInt(min), parseInt(max));
//минимум - 0, максимум - 318

thumbMin.onmousedown = function(evt) {
/*    evt.preventDefault();*/

    var thumbCoords = getCoords(thumbMin);
    var shiftX = evt.pageX - thumbCoords.left;

    console.log("нажали мышу на левом бегунке, сдвиг - " + shiftX);

    document.onmousemove = function(evt) {
        var newLeft = evt.pageX - shiftX - sliderCoords.left;

        console.log("двигаем левый бегунок на - " + newLeft);

        //если вне слайдера
        if (newLeft < 0) {
            newLeft = 0;
        }

        if (newLeft > max - thumbMin.offsetWidth / 2) {
            newLeft = max - thumbMin.offsetWidth / 2;
        }

        min = newLeft;
        thumbMin.style.left = newLeft + 'px';
    }

    document.onmouseup = function() {
      console.log("отжали мышу");
        console.log(getCoords(thumbMin));
        console.log(min);
        document.onmousemove = document.onmouseup = null;
    }

    return false;
};

thumbMax.onmousedown = function(evt) {
    var thumbCoords = getCoords(thumbMax);
    var shiftX = evt.pageX - thumbCoords.left;

    document.onmousemove = function(evt) {
        var newLeft = evt.pageX - shiftX - sliderCoords.left;

        //если вне слайдера
        if (newLeft < min + thumbMin.offsetWidth / 2) {
            newLeft = min + thumbMin.offsetWidth / 2;
        }

        if (newLeft > rangeEnd) {
            newLeft = rangeEnd;
        }
        max = newLeft;

        thumbMax.style.left = newLeft + 'px';
    }

    document.onmouseup = function() {
        console.log(getCoords(thumbMax));
        console.log(max);
        document.onmousemove = document.onmouseup = null;
    }

    return false;
};

thumbMin.ondragstart = function() {
    return false;
};

function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}
