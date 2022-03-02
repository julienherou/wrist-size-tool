/*
Size Tool Tissot
*/

// Disable reload on mobile with scroll
document.documentElement.style.overflow = 'hidden';

// Ajust height on mobile 100vh
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
// Variables Measurement
const measureElt1 = document.querySelector('.measure1');
const measureElt2 = document.querySelector('.measure2');
const lineElt1 = document.querySelector('.line1');
const lineElt2 = document.querySelector('.line2');
const infoElt1 = document.querySelector('.info1');
const infoElt2 = document.querySelector('.info2');
const slide2Elt = document.querySelector('.slide2');
const slide4Elt = document.querySelector('.slide4');
// Select measure 1 & 2
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
let calculNumber;
let calcul;
const dpiElt = document.querySelector('#dpi-div');
const closeElts = document.querySelectorAll('.close');

// pixel >> cm
let wristSizePx;
let wristSizeUnit;

// Détection des dpi
let devicePixelRatio = window.devicePixelRatio || 1;
let dpi_x = dpiElt.offsetWidth * devicePixelRatio;
let dpi_y = dpiElt.offsetHeight * devicePixelRatio;

// Diagonal screen in px
let widthInPx = window.screen.width * window.devicePixelRatio;
let heightInPx = window.screen.height * window.devicePixelRatio;
let diagInPx = Math.sqrt((widthInPx * widthInPx) + (heightInPx * heightInPx));
// Diagonal screen in inch
// Take diagonalScreenSize with Device Atlas
let diagInInch = document.querySelector('#diagonal-inch').value;
let displayPpi = document.querySelector('#display-ppi').value;

// Calcul du ppi
let ppi = diagInPx / diagInInch;

// If diagonalScreenSize not detected we change the ppi value
if (isNaN(ppi) || ppi === undefined){
    ppi = dpi_x;
    // alert(`
    //     Your device screen is not detected\n
    //     The measurement may be wrong\n
    //     Please try reloading this page on another browser
    // `);
}


// Value of conversion with ppi
let convertUnit = (2.54 / ppi) * devicePixelRatio;
let unitInHtml = ' cm';


// Function display measure
function showMeasure(source, destination, ligne, info, unite) {
    wristSizePx = source.offsetHeight - (ligne.offsetHeight / 2) - info.offsetHeight;
    wristSizeUnit = (wristSizePx * convertUnit).toFixed(2).replace(/\./g, '\,');
    destination.innerHTML = wristSizeUnit;
    unite.innerHTML = unitInHtml;
}
// Function final calcul
function showResult(mesure1, mesure2, destination, unite){
    if(unitCm3.classList.contains('select')){
        // 0.5 sup
        calculNumber = Math.ceil((((mesure1 + mesure2) * 1.79) * convertUnit)*2)/2;
        // Replace '.' by ','
        calcul = calculNumber.toString().replace(/\./g, '\,');
    } else if(unitIn3.classList.contains('select')){
        // 0.1 near
        calculNumber = (((mesure1 + mesure2) * 1.79) * convertUnit).toFixed(1);
        calcul = calculNumber.replace(/\./g, '\,');
    }
    destination.innerHTML = calcul;
    unite.innerHTML = unitInHtml;
}


// Function gauge result
function risingResult(){
    let compteur = 0;
    // Time in ms
    let duree = 1500;
    if(unitCm3.classList.contains('select') && Number.isInteger(calculNumber)){
        let calculNumberEnt = parseInt(calculNumber)
        let time = Math.round(duree / calculNumberEnt);
        let downloadTimer = setInterval(function(){
            if(compteur >= calculNumberEnt){
                resultElt.innerHTML = calcul;
                clearInterval(downloadTimer);
            } else {
                resultElt.innerHTML = compteur;
                compteur += 1;
            }
        }, time);
    } else if(unitCm3.classList.contains('select') && !Number.isInteger(calculNumber)){
        let time = Math.round(duree / (calculNumber * 10));
        console.log(time);
        let downloadTimer = setInterval(function(){
            if(compteur >= calculNumber){
                resultElt.innerHTML = calcul;
                clearInterval(downloadTimer);
            } else {
                resultElt.innerHTML = compteur.toFixed(1).replace(/\./g, '\,');
                compteur += 0.1;
            }
        }, time);
    } else if(unitIn3.classList.contains('select')){
        let time = Math.round(duree / (calculNumber * 10));
        console.log(time);
        let downloadTimer = setInterval(function(){
            if(compteur >= calculNumber){
                resultElt.innerHTML = calcul;
                clearInterval(downloadTimer);
            } else {
                resultElt.innerHTML = compteur.toFixed(1).replace(/\./g, '\,');
                compteur += 0.1;
            }
        }, time);
    }
}


// On click in close
closeElts.forEach(element => {
    element.addEventListener("click", animClose);
    element.addEventListener("click", function(){setTimeout(closeWindow, 400)});
});
// Close animation
function animClose(){
    gsap.to(closeElts, {
        keyframes: {
            "0": {scale: 1},
            "50%": {scale: 0.8},
            "100%": {scale: 1}
        },
        duration: 0.4
    });
};
// Close the active window
// Work only with window.open("new-window") before
function closeWindow(){
    window.close();
};


// On click in unit button
unitElts.forEach(element => {
    element.addEventListener('click', changeUnit);
});
// Change the unite
function changeUnit(){
    unitElts.forEach(element => {
        element.classList.remove('select');
    });
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


// Animation GSAP on Slides
// SLIDE 1
gsap.to(".slide1 .inside-slide", {opacity: 1, duration: 1});

function introSL1() {
    let TL1 = gsap.timeline();
    TL1.from('.slide1 .logo-top', {duration: 2, opacity: 0}, 1)
       .from(".slide1-title", {duration: 0.6, x: 200, opacity: 0}, "<0.5")
       .from('.slide1 .picto-meas', {duration: 1, opacity: 0}, "<")
       .from('.slide1 .close', {duration: 2, opacity: 0}, "<0.5");
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
         .add(middleSL1(), ">-1.8")
         .add(conclusionSL1(), "<0.3");
         

// SLIDE 2
function introSL2() {
    let TL1 = gsap.timeline();
    TL1.from('.measure1', {duration: 1, opacity: 0}, 0.3)
       .set('.measure1', {height: '520px'}, "<")
       .from('.line1', {duration: 0.6, opacity: 0}, "<")
       .to('.line1', {
            keyframes: {
                "0": {y: -150},
                "70%": {y: 50},
                "100%": {y: 0}
            },
            duration: 1.4,
            ease: "sine.out"
        }, "<")
        .from('.info1', {duration: 2, opacity: 0}, ">-0.2")
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
    .to('.slide2-picto2, .slide2-picto3', {
        keyframes: {
            "60%": {x: -7},
            "100%": {x: 0}
        },
        duration: 1.3
    }, ">0.6")
    .to('.slide2-picto4', {duration: 0.2, opacity: 0}, ">-0.1")
    .from('.slide2-picto5', {duration: 0.2, opacity: 0}, ">-0.1")
    .to('.slide2-picto3', {duration: 1, opacity: 0}, ">0.2")
    .from('.slide2-picto7, .slide2-picto8, .slide2-picto9', {duration: 0.7, opacity: 0}, "<")
    .to('.slide2-picto2, .slide2-picto7, .slide2-picto8', {duration: 0.5, y: 8, ease: "power1.out"}, ">0.2")
    .to('.slide2-picto8', {
        keyframes: {
            "50%": {y: -20},
            "100%": {y: -11}
        },
        duration: 1
    }, ">0.4")
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
       .set('.measure2', {height: '500px'}, "<")
       .from('.line2', {duration: 1, opacity: 0}, "<")
       .from('.info2', {duration: 2, opacity: 0}, "<+0.5");

	return TL1;
}
function middleSL4() {
    let TL2 = gsap.timeline({repeat: -1, repeatDelay: 0.4});
    TL2.from('.slide4-picto1', {duration: 0.9, opacity: 0, x: -15, y: -25, scale: 0.8, ease: "power1.out"})
       .fromTo('.slide4-picto2, .slide4-picto3, .slide4-picto4',
        {opacity: 0, x: 5, y: -15, scale: 0.9},
        {opacity: 1, x: 0, y: -7, scale: 1, ease: "power2.out", duration: 0.8},
        "<")
       .fromTo('.slide4-picto5',
        {x: 5, y: -15, scale: 0.9},
        {x: 0, y: -7, scale: 1, ease: "power2.out", duration: 0.8},
        "<")
       .to('.slide4-picto2, .slide4-picto3, .slide4-picto4, .slide4-picto5', {
            keyframes: {
                "60%": {y: 10},
                "100%": {y: 7}
            },
            duration: 1
        }, ">0.3")
       .to('.slide4-picto3', {duration: 1, y: -27, ease: "back"}, ">0.4")
       .to('.slide4-picto1', {opacity: 0, duration: 0.3, ease: "power1.inOut"}, ">1")
       .to('.slide4-picto5, .slide4-picto2, .slide4-picto3, .slide4-picto4', {opacity: 0, duration: 0.3, ease: "power1.inOut"}, ">-0.2");
    return TL2;
}
let masterSL4 = gsap.timeline();
masterSL4.add(introSL4())
         .add(middleSL4(), "<+0.7");

// SLIDE 5
const TL5 = gsap.timeline({repeat: 0, repeatDelay: 2, paused: true});
TL5.from('.slide5 .logo-top', {duration: 1, y: -100})
   .from('.slide5-title', {duration: 1, opacity: 0, x: 50}, 0.5)
   .from('.contain-unit2', {duration: 1, opacity: 0}, 1.5)
   .from('.slide5 .contain-cta', {duration: 1, opacity: 0}, 2);


// Animation after touch the ruler
let TLtouch = gsap.timeline({ paused: true });
TLtouch.to('.slide2 .picto-meas, .slide4 .picto-meas', {duration: 0.5, opacity: 0});

// On click in "Confirm"
suivant.forEach(element => {
    element.addEventListener("click", function(){setTimeout(pageSuivante, 400)});
    element.addEventListener("click", ctaSuivant);
});

// CTA Animation
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

// Function page/slide suivante
function pageSuivante(){
    // Slide 2 (measure 1)
    if(count == 0) {
        masterSL2.restart();
        masterSL1.pause();
        showMeasure(measureElt1, numberElt1, lineElt1, infoElt1, symbElt1);
    } else {
        masterSL2.pause();
    }
    // Slide 3 (validation 1st measure)
    if(count == 1) {
        resultats[0] = measureElt1.offsetHeight - (lineElt1.offsetHeight / 2) - infoElt1.offsetHeight;
        masterSL3.restart();
    }  else {
        masterSL3.pause();
    }
    // Slide 4 (measure 2)
    if(count == 2) {
        masterSL4.restart();
        showMeasure(measureElt2, numberElt2, lineElt2, infoElt2, symbElt2);
    } else {
        masterSL4.pause();
    }
    // Slide 5 (validation 2nd measure)
    if(count == 3) {
        resultats[1] = measureElt2.offsetHeight - (lineElt2.offsetHeight / 2) - infoElt2.offsetHeight;
        showResult(resultats[0], resultats[1], resultElt, symbElt3);
        risingResult();
        TL5.restart();
    } else {
        TL5.pause();
    }
    if(count != 1){
        TLtouch.reverse();
    }
    pages[count].classList.remove('active');
    if(count < nbPages - 1){
        count++;
    }
    pages[count].classList.add('active');
    showMeasure(measureElt1, numberElt1, lineElt1, infoElt1, symbElt1);
    showMeasure(measureElt2, numberElt2, lineElt2, infoElt2, symbElt2);
}; // End function pageSuivante


// On click in "Previous"
precedent.forEach(element => {
    element.addEventListener("click", function(){setTimeout(pagePrecedente, 400)});
    element.addEventListener("click", ctaPrecedent);
});

// CTA Animation
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

// Function page/slide précédente
function pagePrecedente(){
    pages[count].classList.remove('active');
    if(count > 0 && count != 4){
        count--;
    } else if(count == 4){
        count = 0;
    }
    pages[count].classList.add('active');
    // Slide 1
    if(count == 0) {
        masterSL1.restart();
    } else {
        masterSL1.pause();
    }
    // Slide 2
    if(count == 1) {
        masterSL2.restart();
        showMeasure(measureElt1, numberElt1, lineElt1, infoElt1, symbElt1);
    } else {
        masterSL2.pause();
    }
    // Slide 3
    if(count == 2) {
        masterSL3.restart();
    } else {
        masterSL3.pause();
    }
    if(count != 1){
        TLtouch.reverse();
    }
}



// DESKTOP
// click on lines (slide 2 & 4)
lineElt1.addEventListener('mousedown', mousedown1);
lineElt2.addEventListener('mousedown', mousedown2);

// SLIDE 2
// Mousedown on ruler1
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
// Mousedown on ruler2
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

// MOBILE
// Touch lines (slide 2 & 4)
lineElt1.addEventListener('touchstart', touchstart1);
lineElt2.addEventListener('touchstart', touchstart2);
// SLIDE 2
// Touch on ruler
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



