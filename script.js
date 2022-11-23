const $books = document.getElementById('books')
const $saved = document.getElementById('saved')

let books = []
let saved = []

function buildBooks (books) {
  const html = []

  for (const book of books) {
    html.push(/*html*/`
      <a id="${book.id}" href="#${book.id}" class="book col-4 mb-3" data-id="${book.id}">
        <img class="img-fluid" src="${book.image}" alt="${book.title}">
      </a>
    `)
  }

  return html
}

// function add (a, b) {
//   return a + b
// }

// console.log(add(4, 6))


// then
// fetch('https://seussology.info/api/books') 
//   .then(function (response) {
//     return response.json()
//   })
//   .then(function (json) {
//     console.log(json)
//   })


// async/await
async function getBooks () {
  const response = await fetch('https://seussology.info/api/books')
  books = await response.json()

  const html = buildBooks(books)
  // console.log(html)
  $books.innerHTML = html.join('')
}

getBooks()
getSaved()

// fetch a single book
async function getBook (id) {
  const response = await fetch('https://seussology.info/api/books/' + id)
  const book = await response.json()

  //console.log(book)  

  $books.innerHTML = `
  <div class="row">
    <div class="col-6">
      <img class="img-fluid" src="${book.image}" alt="${book.title}">
    </div>
    <div class="col-6">
      <h2>${book.title}</h2>
      <p>${book.description}</p>
      <button class="back btn btn-secondary">Back</button>
      <button class="save btn btn-primary"
        data-id="${book.id}"
        data-title="${book.title}"
        data-description="${book.description}"
        data-image="${book.image}">Save</button>
    </div>
  </div>
  `
}

// getBook(3)

// getSaved()
function getSaved () {
  const ls = localStorage.getItem('saved')

  if (ls) {
    saved = JSON.parse(ls)
  }

  const html = buildBooks(saved)
  $saved.innerHTML = html.join('')
}

// Use event delegation
// add event listener to $books to listen for a click on a book
$books.addEventListener('click', function (e) {
  // e.preventDefault()
  // e.target === element that was clicked
  
  console.log(e.target)

  const element = e.target.closest('.book') // to find the nearest parent with the class book 
  console.log(element)
  if (element) { // clicking on a book 
    // call getBook passing the book id
    getBook(element.dataset.id)
  } else if (e.target.classList.contains('back')) { // clicked on the back button 
    getBooks()
  } else if (e.target.classList.contains('save')) { // clicked on the save button 
    if (!saved.find(book => book.id === e.target.dataset.id)) {
        // push book data to saved array
      saved.push({
        id: e.target.dataset.id,
        title: e.target.dataset.title,
        description: e.target.dataset.description,
        image: e.target.dataset.image
      })

      // save the saved array to localStorage 
      localStorage.setItem('saved', JSON.stringify(saved))

      getSaved()
    }
  }
})

$saved.addEventListener('click', function (e) {
  const element = e.target.closest('.book') // to find the nearest parent with the class book 
  console.log(element)
  if (element) { // clicking on a book 
    // call getBook passing the book id
    getBook(element.dataset.id)
  }
})



