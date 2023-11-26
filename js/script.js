var valor = document.getElementById("pag1");

function createCard(pokemon) {
  const card = `
    <li class="pokemon-card">
      <div class="pokemon-picture">
        <img src="${pokemon.sprites.front_default}" alt="Sprite of ${
    pokemon.name
  }">
      </div>
      <div class="pokemon_info">
        <h1 class="name">Name:<br> ${pokemon.name}</h1>
        <h2 class="number">Nº ${pokemon.id}</h2>
        <h3 class="type">Type:<br> ${pokemon.types
          .map((item) => item.type.name)
          .toString()}</h3>
      </div>
      <button type="button">Adicionar</button>
    </li>`;
  return card;
}

function requestPokeInfo(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/`;
  return fetch(url + id)
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

async function createCards(x, y) {
  const cards = [];
  for (let i = x; i <= y; i++) {
    const pokemon = await requestPokeInfo(i);
    const CriarCard = createCard(pokemon);
    cards.push(CriarCard);
  }

  return cards;
}

const inputElement = document.querySelector("input");
const listElement = document.querySelector("ul");
const itemElement = listElement.querySelectorAll(".pokemon-card");
const button_pag1 = document.getElementById("botao_pag1");
const button_pag2 = document.getElementById("botao_pag2");
const button_pag3 = document.getElementById("botao_pag3");
const buttons_pag = document.querySelectorAll(".botao_pag");
const search_button = document.getElementById("search_button");
const searchInput = document.getElementById("searchInput");

async function displayCards(x, y) {
  const cards = await createCards(x, y);

  const Container = document.getElementById("poke_container");
  Container.innerHTML = "";
  for (const CriarCard of cards) {
    const cardElement = document.createElement("div");
    cardElement.innerHTML = CriarCard;
    Container.appendChild(cardElement);
  }
}

displayCards(1, 50);
function startApp(pokeName) {
  requestPokeInfo(pokeName);

  setTimeout(function () {
    container.innerHTML = createCard();
  }, 2000);
}

button_pag1.addEventListener("click", (event) => {
  event.preventDefault();
  displayCards(1, 50);
});
button_pag2.addEventListener("click", (event) => {
  event.preventDefault();
  displayCards(51, 100);
});
button_pag3.addEventListener("click", (event) => {
  event.preventDefault();
  displayCards(101, 151);
});

buttons_pag.forEach((botao) => {
  botao.addEventListener("click", (event) => {
    event.preventDefault();
    buttons_pag.forEach((botao) => {
      botao.classList.remove("d_none");
    });
    event.currentTarget.classList.add("d_none");
  });
});

search_button.addEventListener("click", async (event) => {
  event.preventDefault();
  const pokeName = searchInput.value.toLowerCase();
  const pokemon = await requestPokeInfo(pokeName);
  const Container = document.getElementById("poke_container");
  Container.innerHTML = createCard(pokemon);
});
