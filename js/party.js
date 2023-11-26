export const party = JSON.parse(localStorage.getItem("party"))
  ? JSON.parse(localStorage.getItem("party"))
  : [];

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
       
      </li>`;

  return card;
}

async function displayParty() {
  const Container = document.getElementById("party_container");
  Container.innerHTML = "";
  party.forEach((pokemon) => {
    const cardElement = document.createElement("div");
    cardElement.innerHTML = createCard(pokemon);
    Container.appendChild(cardElement);
  });
}

export function pushPokemon(pokemon) {
  if (party?.length >= 6) return alert("LIMITE DE POKEMONS ATINGIDO");
  party?.push(pokemon);
  alert(" SEU POKEMON DOI ADICIONADO COM SUCESSO");
  localStorage.setItem("party", JSON.stringify(party));
}
displayParty();
console.log(party);
