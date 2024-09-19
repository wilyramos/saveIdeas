// var

const listaIdeas = document.querySelector('#lista-ideas');
const form = document.querySelector('#formulario');
let ideas = [];


// event listeners

eveentListeners();

function eveentListeners() {

    // when the form is submitted
    form.addEventListener('submit', agregarIdea);

    // when the document is loaded

    document.addEventListener('DOMContentLoaded', () => {
        ideas = JSON.parse(localStorage.getItem('ideas')) || [];
        createHTML();
    });

    // delete idea

    listaIdeas.addEventListener('click', deleteIdea);
}

// functions 

function agregarIdea(e) {
    e.preventDefault();

    const idea = document.querySelector('#idea').value;
    // console.log(idea);
    
    if(idea === '') {
        showError('Agrega una idea');
        return;
    }

    // create a object with the idea

    const ideaObj = {
        id: Date.now(),
        texto: idea
    }
    // add the idea to the array
    ideas = [...ideas, ideaObj];

    console.log(ideas);

    // rendering the ideas
    createHTML();

    // restart the form

    form.reset();
}

function showError (error) {
    const messageError = document.createElement('p');
    messageError.textContent = error;
    messageError.classList.add('error');
    messageError.classList.add('show');

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(messageError);

    setTimeout(() => {
        messageError.remove();
    }, 3000);

}

function createHTML() {

    clearHTML();

    if(ideas.length > 0) {
        ideas.forEach(idea => {
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-idea');
            btnEliminar.innerText = 'X';

            // function to delete idea
            btnEliminar.onclick = () => {
                deleteIdea(idea.id);
            }

            const li = document.createElement('li');
            li.innerText = idea.texto;

            li.appendChild(btnEliminar);
            listaIdeas.appendChild(li);
        });
    }
    syncStorage();
}

function clearHTML() {
    while(listaIdeas.firstChild) {
        listaIdeas.removeChild(listaIdeas.firstChild);
    }
}

function deleteIdea(id) {
    

    ideas = ideas.filter(idea => idea.id !== id);
    createHTML();
}

function syncStorage() {
    localStorage.setItem('ideas', JSON.stringify(ideas));
}