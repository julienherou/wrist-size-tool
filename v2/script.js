/*
Slider / Outil de mesure
*/



// Pour empécher le reload sur la page mobile au scroll
document.documentElement.style.overflow = 'hidden';

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
// Variables de Mesure
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
const unitElts = document.querySelectorAll('.unit');
const unitIn1 = document.querySelector('.slide1 .unit-in');
const unitCm1 = document.querySelector('.slide1 .unit-cm');
const unitIn2 = document.querySelector('.slide5 .unit-in');
const unitCm2 = document.querySelector('.slide5 .unit-cm');
let resultats = [];
let calcul;
const dpiElt = document.querySelector('#dpi-div');
const closeElts = document.querySelectorAll('.close');



// Conversion pixel >> cm et affichage au chargement de la page
let wristSizePx;
let wristSizeUnit;

// Détection des dpi
let devicePixelRatio = window.devicePixelRatio || 1;
let dpi_x = dpiElt.offsetWidth * devicePixelRatio;
let dpi_y = dpiElt.offsetHeight * devicePixelRatio;

// Calcul diagonale en px
let widthInPx = window.screen.width * window.devicePixelRatio;
let heightInPx = window.screen.height * window.devicePixelRatio;
let diagInPx = Math.sqrt((widthInPx * widthInPx) + (heightInPx * heightInPx));
// Dagonale en inch
// Valeur à récupérer pour faire fonctionner la mesure :
// let diagInInch = 24;

// On récupère la valeur diagonalScreenSize de Device Atlas
let diagInInch = document.querySelector('#diagonal-inch').value;
let displayPpi = document.querySelector('#display-ppi').value;

// Calcul du ppi
let ppi = diagInPx / diagInInch;

// Si la valeur diagonalScreenSize n'est pas détecté on change la valeur du ppi
// Temp en attendant une fenetre d'info
if (isNaN(ppi)){
    ppi = dpi_x;
}


// ----------------------------------------------------------
// TEST ZONE
// ----------------------------------------------------------
// ----------------------------------------------------------

let numTest = 54;
// let arrondi = Math.round(num*2)/2;
let arrondi = Math.ceil(numTest*2)/2;
Math.ceil


// ----------------------------------------------------------
// ----------------------------------------------------------



// Mesure écran 24" : 52.5 x 30 cm
// Détection écran 24" : 50.8 x 28.7 cm
// Pour un laptop hp envy 14 de 1920x1200 / 14" >> ppi = 161
// Pour un tel Redmi note 7 de 1080 x 2340 / 6.3" >> ppi = 409
// Conversion 96dpi px en cm : 0.0264583333 cm
// 1 px = 2.54 cm / 96
// let convertUnit = 0.0264583333;


// Detection auto de la valeur de conversion
// let convertUnit = (2.54 / dpi_x) * devicePixelRatio;

// TEST AVEC PPI (manque la détection de la diagonal en inch)
let convertUnit = (2.54 / ppi) * devicePixelRatio;

let unitInHtml = ' cm';

// Affichage des infos
// alert('DPI : ' + dpi_x + ' x ' + dpi_y + '\n' + 'PPI (calc): ' + ppi + '\n' + "PPI (DeviceAtlas): " + displayPpi + '\n' + 'ZOOM : ' + devicePixelRatio + '\n' + "Résolution écran : " + widthInPx + " x " + heightInPx + '\n' + "Résolution écran sans zoom : " + window.screen.width + " x " + window.screen.height + '\n' + "Diagonale (inch) (DeviceAtlas): " + diagInInch);
// console.log('DPI : ' + dpi_x + ' x ' + dpi_y);
// console.log('PPI (calc): ' + ppi);
// console.log('PPI (Device Atlas): ' + displayPpi);
// console.log('ZOOM : ' + devicePixelRatio);
// console.log("Résolution écran : " + widthInPx + " x " + heightInPx);
// console.log("Résolution écran sans zoom : " + window.screen.width + " x " + window.screen.height);
// console.log("Diagonale (inch) : " + diagInInch);


// Fonction avec element à mesurer (source) et zone de texte à remplacer (destination)
function showMeasure(source, destination, ligne, unite) {
    wristSizePx = source.offsetHeight - (ligne.offsetHeight / 2);
    wristSizeUnit = (wristSizePx * convertUnit).toFixed(2).replace(/\./g, '\,');
    destination.innerHTML = wristSizeUnit;
    unite.innerHTML = unitInHtml;
}
// Formule (rentrer les mesures en px) >> calcul final
function showResult(mesure1, mesure2, destination, unite){
    // Formule arrondi au 0.5 supérieur
    // On remplace le '.' par ','
    calcul = (Math.ceil((((mesure1 + mesure2) * 1.79) * convertUnit)*2)/2).toString().replace(/\./g, '\,');
    destination.innerHTML = calcul;
    unite.innerHTML = unitInHtml;
    console.log('resulat : ' + calcul + unitInHtml);
}



// On écoute le click sur les croix
closeElts.forEach(element => {
    element.addEventListener('click', closeWindow);
});
// On ferme la fenètre active
// Ne fonctionne pas sur la fenètre actuelle
function closeWindow(){
    window.close();
};




// On écoute le click sur les boutons unit
unitElts.forEach(element => {
    element.addEventListener('click', changeUnit);
});
// On selectionne l'unite
function changeUnit(){
    unitElts.forEach(element => {
        element.classList.remove('select');
    });
    // this.classList.add('select');
    if (this.classList.contains('unit-cm')){
        unitCm1.classList.add('select');
        unitCm2.classList.add('select');
        convertUnit = (2.54 / ppi) * devicePixelRatio;
        unitInHtml = ' cm';
        showResult(resultats[0], resultats[1], resultElt, symbElt3)
    } else if (this.classList.contains('unit-in')){
        unitIn1.classList.add('select');
        unitIn2.classList.add('select');
        convertUnit = (1 / ppi) * devicePixelRatio;
        unitInHtml = ' in';
        showResult(resultats[0], resultats[1], resultElt, symbElt3)
    }
};



// Animation GSAP sur les Slides

// INTRO 2 ( NEW 1 )
const FX1 = gsap.timeline();
// FX1.from('.intro2 .logo-top', {duration: 2, y: -100}, 1)
FX1.from('.intro2 .logo-top', {duration: 3, opacity: 0}, 1)
   .from('.intro2 .contain-bot', {duration: 3, opacity: 0}, 1)
   .from('.intro2 .close', {duration: 3, opacity: 0}, 1);

gsap.from(".intro2-title", {x: 200, opacity: 0, duration: 0.6});

const TL1 = gsap.timeline({repeat: -1, repeatDelay: 0.8});
TL1.from('.intro2-picto1', {duration: 0.6, opacity: 0, x: -50, y: 20, ease: "power2.out"}, 0.6)
.fromTo('.intro2-picto2', {
    opacity: 0,
    scale: 1.3,
    x: 50,
    y: 10
},
{
    opacity: 1,
    x: 12,
    y: -30,
    duration: 0.6,
    delay: 0.1,
    ease: "power1.out"
})
.to('.intro2-picto2', {x: 0, y: 0, scale: 1, duration: 1, ease: "power1.inOut"}, 2.1);


// INTRO 3 ( OLD )
// const TL2 = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true});
// TL2.from('.intro3-picto1', {duration: 0.6, opacity: 0, y: -10, scale: 0.9, ease: "power2.out"}, 0.8)
// .fromTo('.intro3-picto2', {
//     opacity: 0,
//     x: 30,
//     y: -10,
// },
// {
//     opacity: 1,
//     x: 22,
//     y: 0,
//     duration: 0.8,
//     delay: -0.6,
//     ease: "power2.out"
// })
// .from('.intro3-picto3', {duration: 0.2, opacity: 0}, 1.4)
// .to('.intro3-picto2', {duration: 0.7, x: 0, ease: "power1.out"}, 2.3)
// .to('.intro3-picto3', {duration: 0.2, opacity: 0}, 2.8)
// .from('.intro3-picto4', {duration: 0.1, opacity: 0}, 3);

// INTRO 4 ( OLD )
// const TL3 = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true});
// TL3.from('.intro4-picto1', {duration: 0.4, opacity: 0, y: -5, scale: 1.1, ease: "power2.out"}, 0.6)
//    .from('.intro4-picto2', {duration: 0.4, opacity: 0, y: 5, scale: 1.1, ease: "power2.out"}, 0.6)
//    .from('.intro4-picto3', {duration: 0.4, opacity: 0, scale: 1.1, ease: "power2.out"}, 0.6)
//    .to('.intro4-picto2', {duration: 0.7, y: 8, ease: "power1.out"}, 1.4)
//    .to('.intro4-picto3', {duration: 0.7, y: 8, ease: "power1.out"}, 1.4)
//    .to('.intro4-picto3', {duration: 0.6, y: -11}, 2.2)
//    .from('.intro4-picto4', {duration: 0.1, opacity: 0}, 2.9);

// SLIDE 3 ( NEW 3 )
const TL4 = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true});
TL4.from('.slide3-picto1', {duration: 0.8, opacity: 0, x: -50, y: 20}, 0.6)
   .to('.slide3-picto1', {duration: 0.4, opacity: 0}, 1.5)
   .from('.slide3-picto2', {duration: 0.5, opacity: 0}, 1.5)
   .from('.slide3-picto3', {duration: 0.5, opacity: 0}, 1.5)
   .to('.slide3-picto2', {duration: 0.2, opacity: 0}, 2.5);

// SLIDE 5 ( NEW 5 )
const TL5 = gsap.timeline({repeat: 0, repeatDelay: 2, paused: true});
TL5.from('.slide5 .logo-top', {duration: 1, y: -100})
   .from('.slide5-title', {duration: 1, opacity: 0, x: 50}, 0.5)
   .from('.contain-unit2', {duration: 1, opacity: 0}, 1.5)
   .from('.slide5 .contain-cta', {duration: 1, opacity: 0}, 2);




// Attention au count !!!

// On écoute sur chaque slide le click sur "Confirmer"
suivant.forEach(element => {
    element.addEventListener('click', pageSuivante);
});
// fonction page/slide suivante
function pageSuivante(){

    // Pour déclencher le calcul final
    // Si on valide la 1ere mesure
    if(count == 2) {
        resultats[0] = measureElt1.offsetHeight - (lineElt1.offsetHeight / 2);
        console.log('mesure 1 : ' + resultats[0] + 'px');
    }
    // Si on valide la 2eme mesure
    if(count == 4) {
        resultats[1] = measureElt2.offsetHeight - (lineElt2.offsetHeight / 2);
        console.log('mesure 2 : ' + resultats[1] + 'px');
        showResult(resultats[0], resultats[1], resultElt, symbElt3)
    }
    pages[count].classList.remove('active');
    if(count < nbPages - 1){
        count++;
    } else {
        count--;
    }
    pages[count].classList.add('active');
    showMeasure(measureElt1, numberElt1, lineElt1, symbElt1);
    showMeasure(measureElt2, numberElt2, lineElt2, symbElt2);
    console.log(count);

    // Animation GSAP sur les Pictos
    if(count != 0) {
        TL1.pause();
    }
    // if(count == 3) {
    //     gsap.from(".intro3-title", {x: 200, opacity: 0, duration: 0.6});
    //     gsap.from(".intro3 .picto-mini1", {opacity: 0, duration: 0.6, delay: 0.4});
    //     TL2.restart();
    // } else {
    //     TL2.pause();
    // }
    // if(count == 4) {
    //     gsap.from(".intro4-title", {x: 200, opacity: 0, duration: 0.6});
    //     gsap.from(".intro4 .picto-mini2", {opacity: 0, duration: 0.6, delay: 0.4});
    //     TL3.restart();
    // } else {
    //     TL3.pause();
    // }
    // if(count == 5) {
    //     gsap.from(".intro5 .picto-mini3", {opacity: 0, duration: 0.6, delay: 0.4});
    //     gsap.from(".intro5 .contain-picto-mini span", {color: '#717171', duration: 0.6, delay: 1});
    //     gsap.from(".intro5 .contain-picto-mini", {marginTop: 0, duration: 0.6, delay: 1.6});
    //     gsap.from(".intro5 .contain-btn", {opacity: 0, duration: 0.6, delay: 2});
    // }
    // if(count == 6) {
    //     gsap.from(".slide1 .main-elt", {x: 200, opacity: 0, duration: 0.6});
    // }
    if(count == 2) {
        gsap.from(".measure1", {opacity: 0, duration: 0.6, delay: 0.3});
        // gsap.from(".slide2 .contain-bot p", {opacity: 0, duration: 0.6, delay: 0.6});
        // gsap.from(".slide2 .contain-bot img", {opacity: 0, duration: 0.6, delay: 0.6});
    }
    if(count == 3) {
        gsap.from(".slide3-title", {x: 200, opacity: 0, duration: 0.6});
        TL4.restart();
    } else {
        TL4.pause();
    }
    if(count == 4) {
        gsap.from(".measure2", {opacity: 0, duration: 0.6, delay: 0.3});
        // gsap.from(".slide4 .contain-bot p", {opacity: 0, duration: 0.6, delay: 0.6});
    }
    if(count == 5) {
        TL5.restart();
    } else {
        TL5.pause();
    }
} // Fin de fonction pageSuivante



// On écoute sur chaque slide le click sur "Retour"
precedent.forEach(element => {
    element.addEventListener('click', pagePrecedente);
});
// fonction page/slide précédente
function pagePrecedente(){
    pages[count].classList.remove('active');
    if(count > 0 && count != 5){
        count--;
    } else if(count > 0 && count == 5){
        count = 0;
    } else {
        count = nbPages - 1;
    }
    pages[count].classList.add('active');
    showMeasure(measureElt1, numberElt1, lineElt1, symbElt1);
    showMeasure(measureElt2, numberElt2, lineElt2, symbElt2);
    // Animation GSAP sur les Pictos
    if(count == 0) {
        TL1.restart();
    } else {
        TL1.pause();
    }
    // if(count == 3) {
    //     TL2.restart();
    // } else {
    //     TL2.pause();
    // }
    // if(count == 4) {
    //     TL3.restart();
    // } else {
    //     TL3.pause();
    // }
    if(count == 3) {
        TL4.restart();
    } else {
        TL4.pause();
    }
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
        showMeasure(measureElt1, numberElt1, lineElt1, symbElt1);
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
        showMeasure(measureElt2, numberElt2, lineElt2, symbElt2);
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
        showMeasure(measureElt1, numberElt1, lineElt1, symbElt1);
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
        showMeasure(measureElt2, numberElt2, lineElt2, symbElt2);
    }
    function touchend2() {
        slide4Elt.removeEventListener('touchmove', touchmove2);
        slide4Elt.removeEventListener('touchend', touchend2);
    }
}



