const pokedex = document.getElementById("pokedex");

console.log(pokedex);


// Making a function with the fetch API to get Pokemon data
function fetchPokemon() {
    const promise = [];
    // Using a for loop to get data for the 151 original Pokemons
    for (let i = 1; i <= 151; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        // Returning a promise that is being added to an array of promises
        promise.push(
            fetch(url).then(function(response) {
                return response.json();
            })
        );
    }

    // Letting all individual asynchronous calls run in parallel for an array of all results
    Promise.all(promise).then((result)=> {
        const pokemon = result.map((data) => ({
                name: data.name,
                id: data.id,
                height: data.height,
                weight: data.weight,
                base_experience: data.base_experience,
                picture: data.sprites['front_default'],
                // Extracting type from dataset and converting to string afterwards
                type: data.types.map(type => type.type.name)
                .join(", ")
        }));
        displayPokemon(pokemon);
    });
        
};

// Displaying my Pokemon and its information on the website
const displayPokemon = (pokemon) => {
    console.log(pokemon);
    // Making an array for all of the pokemons with their information 
    const pokemonHTML = pokemon.map (item => 
        `
        <li class= "card">
            <image class="card-picture" src="${item.picture}" />
            <h2 class = "card-title">${item.id}. ${item.name}</h2>
            <p1 class = "card-subtitle1">Height: ${item.height}<p1/>
            <p2 class = "card-subtitle2">Weight: ${item.weight}<p2/>
            <p3 class = "card-subtitle3">Base Experience: ${item.base_experience}<p3/>
            <p4 class = "card-subtitle4">Type: ${item.type}<p4/>
        </li>
        `
    )
    // Converting an array to a string
    .join('');
    pokedex.innerHTML = pokemonHTML;
};
     
// Calling the function for getting Pokemon data
fetchPokemon();
