import { party, pushPokemon } from "../js/party.js";
localStorage.setItem("party", JSON.stringify(party));

var valor = document.getElementById("pag1");
function createCard(pokemon) {
  const pokemonJSON = JSON.stringify(pokemon);
  const card = `
    <li class="pokemon-card" style="
    background-color:${setBackgroundColor(pokemon.types[0].type.name)}
    ">
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
      <button class="adicionar" data-pokemon=${pokemonJSON} type="button">Adicionar</button>
    </li>`;

  return card;
}

function setBackgroundColor(type) {
  const coresPorTipo = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    grass: "#7AC74C",
    flying: "#A98FF3",
    fighting: "#C22E28",
    poison: "#A33EA1",
    electric: "#F7D02C",
    ground: "#E2BF65",
    rock: "#B6A136",
    psychic: "#F95587",
    ice: "#96D9D6",
    bug: "#A6B91A",
    ghost: "#735797",
    steel: "#B7B7CE",
    dragon: "#6F35FC",
    dark: "#705746",
    fairy: "#D685AD",
  };

  return coresPorTipo[type] ? coresPorTipo[type] : "#CCCCCC";
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
  events();
}

await displayCards(1, 50);

function events() {
  let adicionar = document.querySelectorAll(".adicionar");
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
    displayCards(pokemon.id, pokemon.id);
  });
  adicionar.forEach((add) => {
    add.addEventListener("click", (event) => {
      event.preventDefault();
      const pokemon = JSON.parse(event.currentTarget.dataset.pokemon);
      pushPokemon(pokemon);
    });
  });
}
