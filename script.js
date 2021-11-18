// Variables Slider
const pages = document.querySelectorAll('.slide');
const nbPages = pages.length;
const suivant = document.querySelectorAll('.next');
const precedent = document.querySelectorAll('.back');
let count = 0;
// Variables Measure
const measureElt1 = document.querySelector('.measure1');
const measureElt2 = document.querySelector('.measure2');
const lineElt1 = document.querySelector('.line1');
const lineElt2 = document.querySelector('.line2');
const slide2Elt = document.querySelector('.slide2');
const slide4Elt = document.querySelector('.slide4');
const numberElt1 = document.querySelector('.number1');
const numberElt2 = document.querySelector('.number2');
const resultElt = document.querySelector('.result');
let resulats = [];
let calcul;

// Conversion pixel >> cm et affichage au chargement de la page
let wristSizePx;
let wristSizeCm;

// Fonction avec element à mesurer (source) et zone de texte à remplacer (destination)
function measureElt(source, destination) {
    wristSizePx = source.offsetHeight
    wristSizeCm = (wristSizePx * 0.0264583333).toFixed(2);
    destination.innerHTML = wristSizeCm;
    // console.log(wristSizePx);
}
// Formule (rentrer les mesures en px)
function formule(mesure1, mesure2) {
    calcul = (((mesure1 + mesure2) * 1.79) * 0.0264583333).toFixed(2);
    return calcul;
}

// fonction page/slide suivante
function pageSuivante(){

    console.log(count);
    // Pour déclencher le calcul final
    if(count == 1) {
        resulats[0] = measureElt1.offsetHeight;
    }
    if(count == 3) {
        resulats[1] = measureElt2.offsetHeight;
        console.log(resulats);
        formule(resulats[0], resulats[1]);
        console.log(calcul);
        resultElt.innerHTML = calcul;
    }

    pages[count].classList.remove('active');
    if(count < nbPages - 1){
        count++;
    } else {
        count = 0;
    }
    pages[count].classList.add('active');


    measureElt(measureElt1, numberElt1);
    measureElt(measureElt2, numberElt2);
    // Affichage de la mesure au chargement de la page
    // let wristSize1Px = measureElt1.offsetHeight
    // let wristSize1Cm = (wristSize1Px * 0.0264583333).toFixed(2);
    // numberElt1.innerHTML = wristSize1Cm;
    // let wristSize2Px = measureElt2.offsetHeight
    // let wristSize2Cm = (wristSize2Px * 0.0264583333).toFixed(2);
    // numberElt2.innerHTML = wristSize2Cm;
    // ---------------------------------------------------------------

}
// On écoute le click sur "Confirm"
suivant.forEach(element => {
    element.addEventListener('click', pageSuivante);
});

// fonction page/slide précédente
function pagePrecedente(){
    pages[count].classList.remove('active');
    if(count > 0){
        count--;
    } else {
        count = nbPages - 1;
    }
    pages[count].classList.add('active');
    measureElt(measureElt1, numberElt1);
    measureElt(measureElt2, numberElt2);
}

precedent.forEach(element => {
    element.addEventListener('click', pagePrecedente);
});




// Ecouteur de click sur les lignes (slide 2 et 4)
lineElt1.addEventListener('mousedown', mousedown1);
lineElt2.addEventListener('mousedown', mousedown2);


// SLIDE 2
// Fonction déclenchée au click
function mousedown1(e) {
    let prevY1 = e.clientY;
    slide2Elt.addEventListener('mousemove', mousemove1);
    slide2Elt.addEventListener('mouseup', mouseup1);

    function mousemove1(e) {
        const rect1 = measureElt1.getBoundingClientRect();
        measureElt1.style.height = rect1.height - (prevY1 - e.clientY) + "px";
        prevY1 = e.clientY;

        // let wristSize1Px = measureElt1.offsetHeight
        // let wristSize1Cm = (wristSize1Px * 0.0264583333).toFixed(2);
        // resulats[0] = wristSize1Cm;
        // numberElt1.innerHTML = wristSize1Cm;
        measureElt(measureElt1, numberElt1);
    }
    function mouseup1() {
        // let wristSize1Px = measureElt1.offsetHeight
        // let wristSize1Cm = (wristSize1Px * 0.0264583333).toFixed(2);
        // console.log(wristSize1Cm);
        slide2Elt.removeEventListener('mousemove', mousemove1);
        slide2Elt.removeEventListener('mouseup', mouseup1);
    }
}


// SLIDE 4
// Fonction déclenchée au click
function mousedown2(e) {
    let prevY2 = e.clientY;
    slide4Elt.addEventListener('mousemove', mousemove2);
    slide4Elt.addEventListener('mouseup', mouseup2);

    function mousemove2(e) {
        const rect2 = measureElt2.getBoundingClientRect();
        measureElt2.style.height = rect2.height - (prevY2 - e.clientY) + "px";
        prevY2 = e.clientY;
        // let wristSize2Px = measureElt2.offsetHeight
        // let wristSize2Cm = (wristSize2Px * 0.0264583333).toFixed(2);
        // numberElt2.innerHTML = wristSize2Cm;
        measureElt(measureElt2, numberElt2);
    }

    function mouseup2() {
        // let wristSize2Px = measureElt2.offsetHeight
        // var wristSize2Cm = (wristSize2Px * 0.0264583333).toFixed(2);
        // console.log(wristSize2Cm);
        slide4Elt.removeEventListener('mousemove', mousemove2);
        slide4Elt.removeEventListener('mouseup', mouseup2);
    }
    
}




