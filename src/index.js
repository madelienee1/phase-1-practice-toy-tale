let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


//Fetch Request
//Get Fetch for toys

function getToys() {
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => {
      toys.forEach(toy => {
        //create div card
        const card = document.createElement('div');
        card.className = 'card';
        //create h2 tag for toy's name
        const h2 = document.createElement('h2');
        h2.textContent = toy.name;
        //create img tag with the src of the toy's image attribtue
        const img = document.createElement('img');
        img.src = toy.image;
        img.className = 'toy-avatar';
        //create p tag with how many likes the toy has
        const p = document.createElement('p');
        p.textContent = `${toy.likes} likes`;
        //create button tag
        const button = document.createElement('button');
        button.className = 'like-btn';
        button.id = toy.id;
        button.textContent = 'Like ❤️';

        //append elements to the card
        card.appendChild(h2);
        card.appendChild(img);
        card.appendChild(p);
        card.appendChild(button);

        card.querySelector('.like-btn').addEventListener('click', () => {
          toy.likes += 1
          card.querySelector('p').textContent = `${toy.likes} likes`
        })

        //append card to toy-collection
        document.getElementById('toy-collection').appendChild(card);
      });
    })
    .catch(error => console.error('Error', error));
}

getToys();




//Function to add a new toy
function newToy(toy) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toy)
  })
    .then(response => response.json())
    .then(toy => {
      addToDom(toy);
    })
    .catch(error => console.log('Error:', error));
}


//Event handler for form submit

function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;

  const toyName = form.name.value;
  const toyImage = form.image.value;

  if (toyName && toyImage) {
    const newToyData = {
      name: toyName,
      image: toyImage,
      likes: 0
    };

    newToy(newToyData);
    form.reset();
  }

}

//Function to add toy to the dom

function addToDom(toy) {
  const card = document.createElement('div');
  card.className = 'card';

  const h2 = document.createElement('h2');
  h2.textContent = toy.name;

  const img = document.createElement('img');
  img.src = toy.image;
  img.className = 'toy-avatar';

  const p = document.createElement('p');
  p.textContent = `${toy.likes} likes`;

  const button = document.createElement('button');
  button.className = 'like-btn';
  button.id = toy.id;
  button.textContent = 'Like ❤️';

  card.appendChild(h2);
  card.appendChild(img);
  card.appendChild(p);
  card.appendChild(button);

  document.getElementById('toy-collection').appendChild(card);
}

//Add event listener to form
document.addEventListener("DOMContentLoaded", () => {
  const formElement = document.querySelector('.add-toy-form');
  if (formElement) {
    formElement.addEventListener('submit', handleSubmit);
  }
});
