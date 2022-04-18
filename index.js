// FETCH FUNCTIONS

// GET memes
function getAllMemes() {
    fetch('https://api.imgflip.com/get_memes')
        .then(resp => resp.json())
        .then(data => handleMemeData(data))
}

function getQuote() {
   fetch('https://api.quotable.io/random')
    .then(resp => resp.json()) 
    .then(data => handleQuoteData(data))
}

// Global variables
// stores data of meme currently in #editor div
let currentEditMeme;
// const form = document.querySelector('form')
const quoteBtn = document.querySelector('#quote-btn')
const memeBtn = document.querySelector('#random-meme')

let memeArray;


// EVENT LISTENERS
quoteBtn.addEventListener('click', getQuote)
memeBtn.addEventListener('click', pickRandomMeme)
// form.addEventListener('submit', addText)

// Handlers
function pickRandomMeme() {
    function randomNumberGenerator(min, max) { 
        return Math.floor(Math.random() * (max - min) + min);
    } 
    const random = (randomNumberGenerator(1,100)-1)
    const randomMeme = memeArray[random]
    const container = document.querySelector('#random-meme-container')
    const container2 = document.querySelector('#editor-1')
    container2.innerHTML = '<h3 id="meme-name"></h3><img id="edit-meme">'
    container.innerHTML = '<br>'
    const img = document.createElement('img')
    img.src = randomMeme.url
    container.append(img)
}

function handleQuoteData(quoteObj) {
    const container = document.querySelector('#quote-container')
    container.innerHTML = ''
    const p = document.createElement('p')
    p.innerHTML = `${quoteObj.content}      &#8212 ${quoteObj.author}`
    container.append(p)
}

function handleMemeData(dataObj) {
    memeArray = dataObj.data.memes;
    memeArray.forEach(meme => renderMeme(meme))
}

// Renderers
function renderMeme(memeObj) {
    const container = document.querySelector('#images')
    const img = document.createElement('img')
    img.src = memeObj.url
    img.addEventListener('click', (e) => displayMeme(e, memeObj))
    container.append(img)
}

function addText(e) {
    e.preventDefault()
    console.log(e.target.placement.value)
    form.reset()
}

// Meme functions
function displayMeme(e, memeObj) {
    currentEditMeme = {...memeObj}
    const container = document.querySelector('#editor-1')
    const container2 = document.querySelector('#random-meme-container')
    container2.innerHTML = '<br>'
    container.innerHTML = '<h3 id="meme-name"></h3><img id="edit-meme">'
    const img = document.querySelector('#edit-meme')
    const h3 = document.querySelector('#meme-name')
    h3.innerHTML = `<em>${memeObj.name}<em>`
    img.src = e.target.src
}

// Call fetch 
getAllMemes()