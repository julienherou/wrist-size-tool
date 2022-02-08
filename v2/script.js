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
const infoElt1 = document.querySelector('.info1');
const infoElt2 = document.querySelector('.info2');
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
const unitIn1 = document.querySelector('.slide2 .unit-in');
const unitCm1 = document.querySelector('.slide2 .unit-cm');
const unitIn2 = document.querySelector('.slide4 .unit-in');
const unitCm2 = document.querySelector('.slide4 .unit-cm');
const unitIn3 = document.querySelector('.slide5 .unit-in');
const unitCm3 = document.querySelector('.slide5 .unit-cm');
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
function showMeasure(source, destination, ligne, info, unite) {
    wristSizePx = source.offsetHeight - (ligne.offsetHeight / 2) - info.offsetHeight;
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
    // console.log('resultat : ' + calcul + unitInHtml);
}


// Resultat affiché avec jauge
function gaugeResult(){

    // resultElt.innerHTML = calcul;
    // for (let i = 0; i <= calcul; i+=0.1){
    //     console.log(i)
    // }



    // var n = 15; // Nombre final du compteur
    // var cpt = 0; // Initialisation du compteur
    // var duree = 5; // Durée en seconde pendant laquel le compteur ira de 0 à 15
    // var delta = Math.ceil((duree * 1000) / n); // On calcule l'intervalle de temps entre chaque rafraîchissement du compteur (durée mise en milliseconde)
    // var node =  document.getElementById("compteur"); // On récupère notre noeud où sera rafraîchi la valeur du compteur
    // function countdown() {
    //   node.innerHTML = ++cpt;
    //   if( cpt < n ) { // Si on est pas arrivé à la valeur finale, on relance notre compteur une nouvelle fois
    //      setTimeout(countdown, delta);
    //   }
    // }
     
    // setTimeout(countdown, delta);


    // let cpt = 0; // Initialisation du compteur
    // let duree = 2; // Durée en seconde pendant laquel le compteur ira de 0 à 15
    // let delta = Math.ceil((duree * 1000) / calcul); // On calcule l'intervalle de temps entre chaque rafraîchissement du compteur (durée mise en milliseconde)

    // function countdown() {
    // resultElt.innerHTML = ++cpt;
    //   if( cpt < calcul ) { // Si on est pas arrivé à la valeur finale, on relance notre compteur une nouvelle fois
    //      setTimeout(countdown, delta);
    //      console.log(cpt);
    //   }
    // }
     
    // setTimeout(countdown, delta);


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
        unitCm3.classList.add('select');
        convertUnit = (2.54 / ppi) * devicePixelRatio;
        unitInHtml = ' cm';
        showMeasure(measureElt1, numberElt1, lineElt1, infoElt1, symbElt1);
        showMeasure(measureElt2, numberElt2, lineElt2, infoElt2, symbElt2);
        showResult(resultats[0], resultats[1], resultElt, symbElt3);
    } else if (this.classList.contains('unit-in')){
        unitIn1.classList.add('select');
        unitIn2.classList.add('select');
        unitIn3.classList.add('select');
        convertUnit = (1 / ppi) * devicePixelRatio;
        unitInHtml = ' in';
        showMeasure(measureElt1, numberElt1, lineElt1, infoElt1, symbElt1);
        showMeasure(measureElt2, numberElt2, lineElt2, infoElt2, symbElt2);
        showResult(resultats[0], resultats[1], resultElt, symbElt3);
    }
};



// Animation GSAP sur les Slides

// SLIDE 1
function introSL1() {
    let TL1 = gsap.timeline();
    TL1.from('.slide1 .logo-top', {duration: 1, opacity: 0}, 0.5)
       .from('.slide1 .close', {duration: 1, opacity: 0}, "-=0.5")
       .from(".slide1-title", {duration: 0.6, x: 200, opacity: 0}, "-=0.8")
       .from('.slide1 .picto-meas', {duration: 1, opacity: 0}, "<");
	return TL1;
}
function middleSL1() {
    let TL2 = gsap.timeline({repeat: -1, repeatDelay: 0.4});
    TL2.from('.slide1-picto1', {duration: 0.6, opacity: 0, x: -50, y: 20, ease: "power2.out"})
    .fromTo('.slide1-picto2', {
        opacity: 0,
        scale: 1.2,
        x: 50,
        y: 10
    },
    {   
        duration: 0.6,
        opacity: 1,
        x: 12,
        y: -30,
        ease: "power1.out"
    })
    .to('.slide1-picto2', {x: 0, y: 0, scale: 1, duration: 0.9, ease: "power1.inOut"}, "+=0.1")
    // .to('.slide1 .wrist-measure', {opacity: 0, duration: 0.3, ease: "power1.inOut"}, "+=1");
    // .to('.slide1 .wrist-measure', {opacity: 0, stagger: 0.3, ease: "power1.inOut"}, "+=1");
    .to('.slide1-picto1', {opacity: 0, duration: 0.3, ease: "power1.inOut"}, ">1")
    .to('.slide1-picto2', {opacity: 0, duration: 0.3, ease: "power1.inOut"}, ">-0.2");
	return TL2;
}
function conclusionSL1() {
    let TL3 = gsap.timeline();
    TL3.from('.slide1 .contain-bot', {duration: 2, opacity: 0}, "+=2");
    return TL3;
}

let masterSL1 = gsap.timeline();
masterSL1.add(introSL1())
         .add(middleSL1())
         .add(conclusionSL1(), "<0.5");


// SLIDE 2
function introSL2() {
    let TL1 = gsap.timeline();
    TL1.from('.measure1', {duration: 1, opacity: 0}, 0.3)

       .from('.line1', {duration: 2, opacity: 0}, "<")
       .to('.measure1', {
            keyframes: {
                "0": {height: '460px'},
                "50%": {height: '580px'},
                "100%": {height: '530px'}
            },
            duration: 1.4,
            ease: "none"
        }, "<")
        .from('.info1', {duration: 2, opacity: 0}, ">")
        .from('.slide2 .contain-bot', {duration: 3, opacity: 0}, "<1");
	return TL1;
}
function middleSL2() {
    let TL2 = gsap.timeline({repeat: -1, repeatDelay: 0.4});
    TL2.from('.slide2-picto1', {duration: 1, opacity: 0, y: -15, scale: 0.9, ease: "power1.out"})
    .fromTo('.slide2-picto2, .slide2-picto3', {
        opacity: 0,
        x: 35,
        y: -10,
    },
    {
        duration: 1.1,
        opacity: 1,
        x: 26,
        y: 0,
        ease: "power2.out"
    }, "<")
    .from('.slide2-picto4', {duration: 0.2, opacity: 0}, "<0.4")
    .to('.slide2-picto2, .slide2-picto3', {duration: 0.9, x: 0, ease: "power1.out"}, ">0.6")
    .to('.slide2-picto4', {duration: 0.2, opacity: 0}, ">-0.1")
    .from('.slide2-picto5', {duration: 0.2, opacity: 0}, ">-0.1")
    .to('.slide2-picto3', {duration: 1, opacity: 0}, ">0.2")
    .from('.slide2-picto7, .slide2-picto8, .slide2-picto9', {duration: 0.8, opacity: 0}, "<")
    .to('.slide2-picto2, .slide2-picto7, .slide2-picto8', {duration: 0.5, y: 8, ease: "power1.out"}, ">0.2")
    .to('.slide2-picto8', {duration: 0.8, y: -11, ease: "back.out"}, ">0.5")
    .to('.slide2-picto1, .slide2-picto5', {opacity: 0, duration: 0.3, ease: "power1.inOut"}, ">1")
    .to('.slide2-picto2, .slide2-picto9, .slide2-picto7, .slide2-picto8', {opacity: 0, duration: 0.3, ease: "power1.inOut"}, ">-0.2");


    return TL2;
}
let masterSL2 = gsap.timeline();
masterSL2.add(introSL2())
         .add(middleSL2(), ">-4");


// SLIDE 3
function introSL3() {
    let TL1 = gsap.timeline();
    TL1.from(".slide3-title", {x: 200, opacity: 0, duration: 0.6});
	return TL1;
}
function middleSL3() {
    let TL2 = gsap.timeline({repeat: -1, repeatDelay: 0.4});
    TL2.from('.slide3-picto1', {duration: 0.6, opacity: 0, x: -50, y: 20, scale: 0.9, ease: "power2.out"}, ">")
       .to('.slide3-picto1', {duration: 0.4, opacity: 0}, ">0.4")
       .from('.slide3-picto2', {duration: 0.4, opacity: 0}, "<")
       .to('.slide3 .wrist-rotate', {opacity: 0, duration: 0.3, ease: "power1.inOut"}, "+=0.9");
    return TL2;
}
let masterSL3 = gsap.timeline();
masterSL3.add(introSL3())
         .add(middleSL3(), ">0.2");


// SLIDE 4
function introSL4() {
    let TL1 = gsap.timeline();
    TL1.from('.measure2', {duration: 1, opacity: 0}, 0.3)

    .from('.line2', {duration: 2, opacity: 0}, "<")
    .to('.measure2', {
         keyframes: {
             "0": {height: '400px'},
             "50%": {height: '550px'},
             "100%": {height: '500px'}
         },
         duration: 1.4,
         ease: "none"
     }, "<")
     .from('.info2', {duration: 2, opacity: 0}, ">");

	return TL1;
}
function middleSL4() {
    let TL2 = gsap.timeline({repeat: -1, repeatDelay: 0.4});
    TL2.from('.slide4-picto1', {duration: 0.5, opacity: 0, x: -15, y: -15, scale: 0.8, ease: "power1.out"})
        .fromTo('.slide4-picto2, .slide4-picto3, .slide4-picto4',
        {opacity: 0, x: 5, y: -15, scale: 0.9},
        {opacity: 1, x: 0, y: -7, scale: 1, ease: "power2.out", duration: 0.5},
        "<")
        .fromTo('.slide4-picto5',
        {x: 5, y: -15, scale: 0.9},
        {x: 0, y: -7, scale: 1, ease: "power2.out", duration: 0.5},
        "<")
       .to('.slide4-picto2, .slide4-picto3, .slide4-picto4, .slide4-picto5', {
            keyframes: {
                "60%": {y: 10},
                "100%": {y: 7}
            },
            duration: 1
        }, ">0.5")
       .to('.slide4-picto3', {duration: 1, y: -27, ease: "back"}, ">0.5")
       .to('.slide4-picto1', {opacity: 0, duration: 0.3, ease: "power1.inOut"}, ">1")
       .to('.slide4-picto5, .slide4-picto2, .slide4-picto3, .slide4-picto4', {opacity: 0, duration: 0.3, ease: "power1.inOut"}, ">-0.2");
    return TL2;
}
let masterSL4 = gsap.timeline();
masterSL4.add(introSL4())
         .add(middleSL4(), "<2");

// SLIDE 5
const TL5 = gsap.timeline({repeat: 0, repeatDelay: 2, paused: true});
TL5.from('.slide5 .logo-top', {duration: 1, y: -100})
   .from('.slide5-title', {duration: 1, opacity: 0, x: 50}, 0.5)
   .from('.contain-unit2', {duration: 1, opacity: 0}, 1.5)
   .from('.slide5 .contain-cta', {duration: 1, opacity: 0}, 2);


// Animation après touch regle
let TLtouch = gsap.timeline({ paused: true });
TLtouch.to('.slide2 .picto-meas, .slide4 .picto-meas', {duration: 0.5, opacity: 0});

// On écoute sur chaque slide le click sur "Confirmer"
suivant.forEach(element => {
    element.addEventListener("click", function(){setTimeout(pageSuivante, 400)});
    element.addEventListener("click", ctaSuivant);
});

// Fonction pour animer les CTA
function ctaSuivant(){
    gsap.to(suivant, {
        keyframes: {
            "0": {scale: 1},
            "50%": {scale: 0.95},
            "100%": {scale: 1}
        },
        duration: 0.4
    });
}

// fonction page/slide suivante
function pageSuivante(){
    console.log('count 1 : ' + count);
    // Slide 2
    if(count == 0) {
        console.log('slide 2 - calcul : ' + calcul);
        masterSL2.restart();
        masterSL1.pause();
    } else {
        masterSL2.pause();
    }
    // Slide 3 - On valide la 1ere mesure
    if(count == 1) {
        console.log('slide 3 - calcul : ' + calcul);
        resultats[0] = measureElt1.offsetHeight - (lineElt1.offsetHeight / 2) - infoElt1.offsetHeight;
        masterSL3.restart();
    }  else {
        masterSL3.pause();
    }
    // Slide 4
    if(count == 2) {
        console.log('slide 4 - calcul : ' + calcul);
        masterSL4.restart();
    } else {
        masterSL4.pause();
    }
    // Slide 5 - On valide la 2eme mesure
    if(count == 3) {
        console.log('slide 5 - calcul : ' + calcul);
        resultats[1] = measureElt2.offsetHeight - (lineElt2.offsetHeight / 2) - infoElt2.offsetHeight;
        showResult(resultats[0], resultats[1], resultElt, symbElt3);
        TL5.restart();
        gaugeResult();
    } else {
        TL5.pause();
    }

    pages[count].classList.remove('active');
    if(count < nbPages - 1){
        count++;
    }
    pages[count].classList.add('active');
    showMeasure(measureElt1, numberElt1, lineElt1, infoElt1, symbElt1);
    showMeasure(measureElt2, numberElt2, lineElt2, infoElt2, symbElt2);

    // Animation GSAP sur les Pictos
    // Slide 2
    // if(count == 1) {
    //     masterSL2.restart();
    //     masterSL1.pause();
    //     console.log('slide2 calcul : ' + calcul);
    // } else {
    //     masterSL2.pause();
    // }
    // Slide 3
    // if(count == 2) {
    //     masterSL3.restart();
    //     console.log('slide3 calcul : ' + calcul);
    // } else {
    //     masterSL3.pause();
    // }
    // Slide 4
    // if(count == 3) {
    //     masterSL4.restart();
    //     console.log('slide4 calcul : ' + calcul);
    // } else {
    //     masterSL4.pause();
    // }

    // Slide 5
    // if(count == 4) {
    //     TL5.restart();
    //     console.log('slide5 calcul : ' + calcul);
    // } else {
    //     TL5.pause();
    // }

    // Pour réinitiailiser la timeline au touch sur la reglette
    if(count != 1){
        TLtouch.reverse();
    }

    console.log('-------------------------------------------------')
}; // Fin de fonction pageSuivante



// On écoute sur chaque slide le click sur "Retour"
precedent.forEach(element => {
    element.addEventListener("click", function(){setTimeout(pagePrecedente, 400)});
    element.addEventListener("click", ctaPrecedent);
});


// Fonction pour animer les CTA
function ctaPrecedent(){
    gsap.to(precedent, {
        keyframes: {
            "0": {scale: 1},
            "50%": {scale: 0.95},
            "100%": {scale: 1}
        },
        duration: 0.4
    });
}

// fonction page/slide précédente
function pagePrecedente(){
    pages[count].classList.remove('active');
    if(count > 0 && count != 4){
        count--;
    } else if(count > 0 && count == 4){
        count = 0;
    } else {
        count = nbPages - 1;
    }
    pages[count].classList.add('active');
    showMeasure(measureElt1, numberElt1, lineElt1, infoElt1, symbElt1);
    showMeasure(measureElt2, numberElt2, lineElt2, infoElt2, symbElt2);
    // Animation GSAP sur les Pictos
    if(count == 0) {
        masterSL1.restart();
    } else {
        masterSL1.pause();
    }
    if(count == 1) {
        masterSL2.restart();
    } else {
        masterSL2.pause();
    }
    if(count == 2) {
        masterSL3.restart();
    } else {
        masterSL3.pause();
    }
    // Pour réinitiailiser la timeline au touch sur la reglette
    if(count != 1){
        TLtouch.reverse();
    }
}





// POUR DESKTOP
// Ecouteur de click sur les lignes (slide 2 et 4)
lineElt1.addEventListener('mousedown', mousedown1);
lineElt2.addEventListener('mousedown', mousedown2);

// SLIDE 2
// Fonction déclenchée au click sur la reglette
function mousedown1(e) {
    TLtouch.play();
    let prevY1 = e.clientY;
    slide2Elt.addEventListener('mousemove', mousemove1);
    slide2Elt.addEventListener('mouseup', mouseup1);
    function mousemove1(e) {
        const rect1 = measureElt1.getBoundingClientRect();
        measureElt1.style.height = rect1.height - (prevY1 - e.clientY) + "px";
        prevY1 = e.clientY;
        showMeasure(measureElt1, numberElt1, lineElt1, infoElt1, symbElt1);
    }
    function mouseup1() {
        slide2Elt.removeEventListener('mousemove', mousemove1);
        slide2Elt.removeEventListener('mouseup', mouseup1);
    }
}
// SLIDE 4
// Fonction déclenchée au click sur la reglette
function mousedown2(e) {
    TLtouch.play();
    let prevY2 = e.clientY;
    slide4Elt.addEventListener('mousemove', mousemove2);
    slide4Elt.addEventListener('mouseup', mouseup2);
    function mousemove2(e) {
        const rect2 = measureElt2.getBoundingClientRect();
        measureElt2.style.height = rect2.height - (prevY2 - e.clientY) + "px";
        prevY2 = e.clientY;
        showMeasure(measureElt2, numberElt2, lineElt2, infoElt2, symbElt2);
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
    TLtouch.play();
    let prevY3 = e.targetTouches[0].clientY;
    slide2Elt.addEventListener('touchmove', touchmove1);
    slide2Elt.addEventListener('touchend', touchend1);
    function touchmove1(e) {
        const rect3 = measureElt1.getBoundingClientRect();
        measureElt1.style.height = rect3.height - (prevY3 - e.targetTouches[0].clientY) + "px";
        prevY3 = e.targetTouches[0].clientY;
        showMeasure(measureElt1, numberElt1, lineElt1, infoElt1, symbElt1);
    }
    function touchend1() {
        slide2Elt.removeEventListener('touchmove', touchmove1);
        slide2Elt.removeEventListener('touchend', touchend1);
    }
}
// SLIDE 4
function touchstart2(e) {
    TLtouch.play();
    let prevY4 = e.targetTouches[0].clientY;
    slide4Elt.addEventListener('touchmove', touchmove2);
    slide4Elt.addEventListener('touchend', touchend2);
    function touchmove2(e) {
        const rect4 = measureElt2.getBoundingClientRect();
        measureElt2.style.height = rect4.height - (prevY4 - e.targetTouches[0].clientY) + "px";
        prevY4 = e.targetTouches[0].clientY;
        showMeasure(measureElt2, numberElt2, lineElt2, infoElt2, symbElt2);
    }
    function touchend2() {
        slide4Elt.removeEventListener('touchmove', touchmove2);
        slide4Elt.removeEventListener('touchend', touchend2);
    }
}



