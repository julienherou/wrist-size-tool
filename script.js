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



const measureElt1 = document.querySelector('.measure1');
const measureElt2 = document.querySelector('.measure2');
const lineElt = document.querySelectorAll('.contain-line');
const slide2Elt = document.querySelector('.slide2');
const slide4Elt = document.querySelector('.slide4');

lineElt.forEach(element => {
    element.addEventListener('mousedown', mousedown);
});

function mousedown(e) {
    let prevY = e.clientY;
    slide2Elt.addEventListener('mousemove', mousemove);
    slide2Elt.addEventListener('mouseup', mouseup);
    slide4Elt.addEventListener('mousemove', mousemove);
    slide4Elt.addEventListener('mouseup', mouseup);

    function mousemove(e) {
        const rect1 = measureElt1.getBoundingClientRect();
        measureElt1.style.height = rect1.height - (prevY - e.clientY) + "px";
        const rect2 = measureElt2.getBoundingClientRect();
        measureElt2.style.height = rect2.height - (prevY - e.clientY) + "px";
        prevY = e.clientY;
    }

    function mouseup() {
        slide2Elt.removeEventListener('mousemove', mousemove);
        slide2Elt.removeEventListener('mouseup', mouseup);
        slide4Elt.removeEventListener('mousemove', mousemove);
        slide4Elt.removeEventListener('mouseup', mouseup);
    }

}

