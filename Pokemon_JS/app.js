let pokemonRepository = (function () {
  let pokemonList = [];
  let pokeapiURL = "https://pokeapi.co/api/v2/pokemon/?limit=009";
  let modalContainer = $("#modal-container");

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }
  //change on jquery
  function addListItem(pokemon) {
    let list = $(".pokemon-list");
    let listItem = $("<li></li>");
    let button = $("<button>" + pokemon.name + "</button>");
    //button.innerText = pokemon.name;
    button.addClass("btn");
    button.attr("data-toggle", "modal");
    button.attr("data-target", "#modal-container");
    listItem.append(button);
    list.append(listItem);
    button.on("click", function (event) {
      showDetails(pokemon);
    });
  }
  //load pokemon api
  function loadList() {
    return fetch(pokeapiURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //isolate and fetch the item details to display
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        //add details to item
        item.imageUrl = details.sprites.front_default;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  //create showModal function

  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");
    //clear existing content in modal
    modalTitle.empty();
    modalBody.empty();

    //create element for name in modal content
    let nameElement = $("<h1>" + item.name + "</h1>");
    //create img element in content
    let imgElement = $("<img class='modal-img' style='width:50%'>");
    imgElement.attr("src", item.imageUrl);

    //add elements to parent containers
    modalTitle.append(nameElement);
    modalBody.append(imgElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

//print list with item details with forEach function
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
