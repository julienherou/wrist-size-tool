/*
Slider / Outil de mesure
*/

// document.write(window.devicePixelRatio);

// Pour empécher le reload sur la page mobile au scroll
document.documentElement.style.overflow = 'hidden';


// Pour connaitre la taille d'ecran
function getResolution() {
    alert("Your screen resolution is: " + window.screen.width * window.devicePixelRatio + "x" + window.screen.height * window.devicePixelRatio);
}
// getResolution();


// Permet d'ajuster la hauteur sur mobile en 100vh
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
// Selecteurs d'affichage mesure 1 & 2
const numberElt1 = document.querySelector('.number1');
const symbElt1 = document.querySelector('.symb-unit1');
const numberElt2 = document.querySelector('.number2');
const symbElt2 = document.querySelector('.symb-unit2');
const resultElt = document.querySelector('.result');
const symbElt3 = document.querySelector('.symb-unit3');
const unitElt = document.querySelectorAll('.unit');
let resultats = [];
let calcul;

// Conversion pixel >> cm et affichage au chargement de la page
let wristSizePx;
let wristSizeCm;
// Conversion 96dpi px en cm : 0.0264583333
let convertUnit = 0.0264583333;
let unitInHtml = ' cm';
// Conversion 144dpi px en cm : 0.017638889


// Fonction avec element à mesurer (source) et zone de texte à remplacer (destination)
function showMeasureInCm(source, destination, ligne, unite) {
    wristSizePx = source.offsetHeight - (ligne.offsetHeight / 2);
    wristSizeCm = (wristSizePx * convertUnit).toFixed(2).replace(/\./g, '\,');
    destination.innerHTML = wristSizeCm;
    unite.innerHTML = unitInHtml;
}
// Formule (rentrer les mesures en px) >> calcul final
function showResultInCm(mesure1, mesure2, destination, unite){
    calcul = (((mesure1 + mesure2) * 1.79) * convertUnit).toFixed(1).replace(/\./g, '\,');
    destination.innerHTML = calcul;
    unite.innerHTML = unitInHtml;
    console.log('resulat : ' + calcul + 'cm');
}


// On écoute le click sur les boutons unit
unitElt.forEach(element => {
    element.addEventListener('click', changeUnit);
});
// On selectionne l'unite
function changeUnit(){
    unitElt.forEach(element => {
        element.classList.remove('select');
    });
    this.classList.add('select');
    if (this.classList.contains('unit-cm')){
        convertUnit = 0.0264583333;
        unitInHtml = ' cm';
        showResultInCm(resultats[0], resultats[1], resultElt, symbElt3)
    } else if (this.classList.contains('unit-mm')){
        convertUnit = 0.2645833333;
        unitInHtml = ' mm';
        showResultInCm(resultats[0], resultats[1], resultElt, symbElt3)
    } else if (this.classList.contains('unit-in')){
        convertUnit = 0.0104166667;
        unitInHtml = ' in';
        showResultInCm(resultats[0], resultats[1], resultElt, symbElt3)
    }
};




// On écoute sur chaque slide le click sur "Confirmer"
suivant.forEach(element => {
    element.addEventListener('click', pageSuivante);
});
// fonction page/slide suivante
function pageSuivante(){
    // console.log(count);
    // Pour déclencher le calcul final
    // Si on valide la 1ere mesure
    if(count == 1) {
        resultats[0] = measureElt1.offsetHeight - (lineElt1.offsetHeight / 2);
        console.log('mesure 1 : ' + resultats[0] + 'px');
    }
    // Si on valide la 2eme mesure
    if(count == 3) {
        resultats[1] = measureElt2.offsetHeight - (lineElt2.offsetHeight / 2);
        console.log('mesure 2 : ' + resultats[1] + 'px');
        showResultInCm(resultats[0], resultats[1], resultElt, symbElt3)
    }
    pages[count].classList.remove('active');
    if(count < nbPages - 1){
        count++;
    } else {
        count = 0;
    }
    pages[count].classList.add('active');
    showMeasureInCm(measureElt1, numberElt1, lineElt1, symbElt1);
    showMeasureInCm(measureElt2, numberElt2, lineElt2, symbElt2);
} // Fin de fonction pageSuivante



// On écoute sur chaque slide le click sur "Retour"
precedent.forEach(element => {
    element.addEventListener('click', pagePrecedente);
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
    showMeasureInCm(measureElt1, numberElt1, lineElt1, symbElt1);
    showMeasureInCm(measureElt2, numberElt2, lineElt2, symbElt2);
}




// POUR DESKTOP
// Ecouteur de click sur les lignes (slide 2 et 4)
lineElt1.addEventListener('mousedown', mousedown1);
lineElt2.addEventListener('mousedown', mousedown2);

// SLIDE 2
// Fonction déclenchée au click sur la reglette
function mousedown1(e) {
    let prevY1 = e.clientY;
    slide2Elt.addEventListener('mousemove', mousemove1);
    slide2Elt.addEventListener('mouseup', mouseup1);
    function mousemove1(e) {
        const rect1 = measureElt1.getBoundingClientRect();
        measureElt1.style.height = rect1.height - (prevY1 - e.clientY) + "px";
        prevY1 = e.clientY;
        showMeasureInCm(measureElt1, numberElt1, lineElt1, symbElt1);
    }
    function mouseup1() {
        slide2Elt.removeEventListener('mousemove', mousemove1);
        slide2Elt.removeEventListener('mouseup', mouseup1);
    }
}
// SLIDE 4
// Fonction déclenchée au click sur la reglette
function mousedown2(e) {
    let prevY2 = e.clientY;
    slide4Elt.addEventListener('mousemove', mousemove2);
    slide4Elt.addEventListener('mouseup', mouseup2);
    function mousemove2(e) {
        const rect2 = measureElt2.getBoundingClientRect();
        measureElt2.style.height = rect2.height - (prevY2 - e.clientY) + "px";
        prevY2 = e.clientY;
        showMeasureInCm(measureElt2, numberElt2, lineElt2, symbElt2);
    }
    function mouseup2() {
        slide4Elt.removeEventListener('mousemove', mousemove2);
        slide4Elt.removeEventListener('mouseup', mouseup2);
    }
}


// POUR MOBILE
// Ecouteur de touch sur les lignes (slide 2 et 4)
lineElt1.addEventListener('touchstart', touchstart1);
lineElt2.addEventListener('touchstart', touchstart2);
// SLIDE 2
// Fonction déclenchée au touch sur la reglette
function touchstart1(e) {
    let prevY3 = e.targetTouches[0].clientY;
    slide2Elt.addEventListener('touchmove', touchmove1);
    slide2Elt.addEventListener('touchend', touchend1);
    function touchmove1(e) {
        const rect3 = measureElt1.getBoundingClientRect();
        measureElt1.style.height = rect3.height - (prevY3 - e.targetTouches[0].clientY) + "px";
        prevY3 = e.targetTouches[0].clientY;
        showMeasureInCm(measureElt1, numberElt1, lineElt1, symbElt1);
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
        showMeasureInCm(measureElt2, numberElt2, lineElt2, symbElt2);
    }
    function touchend2() {
        slide4Elt.removeEventListener('touchmove', touchmove2);
        slide4Elt.removeEventListener('touchend', touchend2);
    }
}



