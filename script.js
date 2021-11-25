// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
// We listen to the resize event
window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});



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
function measureElt(source, destination, ligne) {
    wristSizePx = source.offsetHeight - (ligne.offsetHeight / 2);
    wristSizeCm = (wristSizePx * 0.0264583333).toFixed(2).replace(/\./g, '\,');
    destination.innerHTML = wristSizeCm;
}


// Formule (rentrer les mesures en px) >> calcul final
function formule(mesure1, mesure2) {
    calcul = (((mesure1 + mesure2) * 1.79) * 0.0264583333).toFixed(1).replace(/\./g, '\,');
    return calcul;
}


// fonction page/slide suivante
function pageSuivante(){

    // console.log(count);
    // Pour déclencher le calcul final
    if(count == 1) {
        resulats[0] = measureElt1.offsetHeight;
    }
    if(count == 3) {
        resulats[1] = measureElt2.offsetHeight;
        // console.log(resulats);
        formule(resulats[0], resulats[1]);
        // console.log(calcul);
        resultElt.innerHTML = calcul;
    }

    pages[count].classList.remove('active');
    if(count < nbPages - 1){
        count++;
    } else {
        count = 0;
    }
    pages[count].classList.add('active');


    measureElt(measureElt1, numberElt1, lineElt1);
    measureElt(measureElt2, numberElt2, lineElt2);
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
    measureElt(measureElt1, numberElt1, lineElt1);
    measureElt(measureElt2, numberElt2, lineElt2);
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
    // slide2Elt.addEventListener('mouseleave', mouseleave1);

    function mousemove1(e) {
        const rect1 = measureElt1.getBoundingClientRect();
        measureElt1.style.height = rect1.height - (prevY1 - e.clientY) + "px";

        prevY1 = e.clientY;
        // let wristSize1Px = measureElt1.offsetHeight
        // let wristSize1Cm = (wristSize1Px * 0.0264583333).toFixed(2);
        // resulats[0] = wristSize1Cm;
        // numberElt1.innerHTML = wristSize1Cm;

        measureElt(measureElt1, numberElt1, lineElt1);


    }

    function mouseup1() {
        slide2Elt.removeEventListener('mousemove', mousemove1);
        slide2Elt.removeEventListener('mouseup', mouseup1);
    }
    
    // function mouseleave1() {
    //     slide2Elt.removeEventListener('mousemove', mousemove1);
    //     slide2Elt.removeEventListener('mouseup', mouseup1);
    // }

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
        measureElt(measureElt2, numberElt2, lineElt2);
    }

    function mouseup2() {
        // let wristSize2Px = measureElt2.offsetHeight
        // var wristSize2Cm = (wristSize2Px * 0.0264583333).toFixed(2);
        slide4Elt.removeEventListener('mousemove', mousemove2);
        slide4Elt.removeEventListener('mouseup', mouseup2);
    }

    
}


// POUR MOBILE

// Ecouteur de touch sur les lignes (slide 2 et 4)
lineElt1.addEventListener('touchstart', touchstart1);
lineElt2.addEventListener('touchstart', touchstart2);

// SLIDE 2
// Fonction déclenchée au touch
function touchstart1(e) {
    let prevY3 = e.targetTouches[0].clientY;
    slide2Elt.addEventListener('touchmove', touchmove1);
    slide2Elt.addEventListener('touchend', touchend1);
    function touchmove1(e) {
        const rect3 = measureElt1.getBoundingClientRect();
        measureElt1.style.height = rect3.height - (prevY3 - e.targetTouches[0].clientY) + "px";
        prevY3 = e.targetTouches[0].clientY;
        measureElt(measureElt1, numberElt1, lineElt1);
    }
    function touchend1() {
        slide2Elt.removeEventListener('touchmove', touchmove1);
        slide2Elt.removeEventListener('touchend', touchend1);
    }
}
// SLIDE 4
function touchstart2(e) {
    let prevY4 = e.targetTouches[0].clientY;
    slide4Elt.addEventListener('touchmove', touchmove2);
    slide4Elt.addEventListener('touchend', touchend2);
    function touchmove2(e) {
        const rect4 = measureElt2.getBoundingClientRect();
        measureElt2.style.height = rect4.height - (prevY4 - e.targetTouches[0].clientY) + "px";
        prevY4 = e.targetTouches[0].clientY;
        measureElt(measureElt2, numberElt2, lineElt2);
    }
    function touchend2() {
        slide4Elt.removeEventListener('touchmove', touchmove2);
        slide4Elt.removeEventListener('touchend', touchend2);
    }
}



