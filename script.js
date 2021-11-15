// variables
const pages = document.querySelectorAll('.slide');
const nbPages = pages.length;
const suivant = document.querySelectorAll('.next');
const precedent = document.querySelectorAll('.back');
let count = 0;

// fonctions
function pageSuivante(){
    pages[count].classList.remove('active');
    if(count < nbPages - 1){
        count++;
    } else {
        count = 0;
    }
    pages[count].classList.add('active');
    console.log(count);
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
    console.log(count);
}
precedent.forEach(element => {
    element.addEventListener('click', pagePrecedente);
});
