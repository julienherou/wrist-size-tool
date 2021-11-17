/*
SLIDER
*/
// variables pages
const pages = document.querySelectorAll('.slide');
const nbPages = pages.length;
const suivant = document.querySelectorAll('.next');
const precedent = document.querySelectorAll('.back');
let count = 0;

// fonctions changement de page
function pageSuivante(){
    pages[count].classList.remove('active');
    if(count < nbPages - 1){
        count++;
    } else {
        count = 0;
    }
    pages[count].classList.add('active');
}
suivant.forEach(element => {
    element.addEventListener('click', pageSuivante);
});

function pagePrecedente(){
    pages[count].classList.remove('active');
    if(count > 0){
        count--;
    } else {
        count = nbPages - 1;
    }
    pages[count].classList.add('active');
}
precedent.forEach(element => {
    element.addEventListener('click', pagePrecedente);
});

/*
MEASURE
*/
// Variables
const measureElt1 = document.querySelector('.measure1');
const measureElt2 = document.querySelector('.measure2');
const lineElt1 = document.querySelector('.line1');
const lineElt2 = document.querySelector('.line2');
const slide2Elt = document.querySelector('.slide2');
const slide4Elt = document.querySelector('.slide4');
const numberElt1 = document.querySelector('.number1');
const numberElt2 = document.querySelector('.number2');
const resultElt = document.querySelector('.result');


// Ecouteur de click sur les lignes (slide 2 et 4)
lineElt1.addEventListener('mousedown', mousedown1);
lineElt2.addEventListener('mousedown', mousedown2);

// Fonction déclenchée au click
function mousedown1(e) {
    let prevY1 = e.clientY;
    slide2Elt.addEventListener('mousemove', mousemove1);
    slide2Elt.addEventListener('mouseup', mouseup1);

    function mousemove1(e) {
        const rect1 = measureElt1.getBoundingClientRect();
        measureElt1.style.height = rect1.height - (prevY1 - e.clientY) + "px";
        prevY1 = e.clientY;
        let wristSize1Px = measureElt1.offsetHeight
        let wristSize1Cm = (wristSize1Px * 0.0264583333).toFixed(2);
        console.log(wristSize1Px);
        console.log(wristSize1Cm);
        numberElt1.innerHTML = wristSize1Cm;
    }

    function mouseup1() {
        slide2Elt.removeEventListener('mousemove', mousemove1);
        slide2Elt.removeEventListener('mouseup', mouseup1);
    }
    
}

function mousedown2(e) {
    let prevY2 = e.clientY;
    slide4Elt.addEventListener('mousemove', mousemove2);
    slide4Elt.addEventListener('mouseup', mouseup2);

    function mousemove2(e) {
        const rect2 = measureElt2.getBoundingClientRect();
        measureElt2.style.height = rect2.height - (prevY2 - e.clientY) + "px";
        prevY2 = e.clientY;
    }

    function mouseup2() {
        slide4Elt.removeEventListener('mousemove', mousemove2);
        slide4Elt.removeEventListener('mouseup', mouseup2);
    }
    
}




