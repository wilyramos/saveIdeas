// var

const listaIdeas = document.querySelector('#lista-ideas');
const form = document.querySelector('#formulario');


// event listeners

eveentListeners();

function eveentListeners() {

    // when the form is submitted

    form.addEventListener('submit', agregarIdea);
}


// functions 

function agregarIdea(e) {
    e.preventDefault();

    const idea = document.querySelector('#idea').value;
    
    if(idea === '') {
        showError('Una idea no puede ir vacía');
        return;
    }
}

function showError (error) {
    
    const messageError = document.createElement('p');
    messageError.textContent = error;
    messageError.classList.add('error');

    const contenido = document.querySelector('#contenido');

    contenido.appendChild(messageError);

}