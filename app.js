(() => {
  const recipeContainer = document.getElementById("recipeContainer");
  const searchInput = document.getElementById("searchInput");
  const favoritesFilter = document.getElementById("favoritesFilter");
  const recipeCounter = document.getElementById("recipeCounter");

  let searchQuery = "";
  let showFavoritesOnly = false;
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  /* ------------------ Debounce ------------------ */
  const debounce = (fn, delay = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  /* ------------------ Search ------------------ */
  const handleSearch = debounce((value) => {
    searchQuery = value.toLowerCase();
    renderRecipes();
  }, 300);

  searchInput.addEventListener("input", (e) => {
    handleSearch(e.target.value);
  });

  /* ------------------ Favorites ------------------ */
  const isFavorite = (id) => favorites.includes(id);

  const toggleFavorite = (id) => {
    favorites = isFavorite(id)
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];

    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderRecipes();
  };

  /* ------------------ Render Card ------------------ */
  const renderRecipeCard = (recipe) => {
    return `
      <div class="recipe-card">
        <h3>${recipe.title}</h3>

        <button class="favorite-btn" data-id="${recipe.id}">
          ${isFavorite(recipe.id) ? "❤️" : "🤍"}
        </button>

        <p>${recipe.description}</p>
      </div>
    `;
  };

  /* ------------------ Favorites Filter ------------------ */
  favoritesFilter.addEventListener("change", (e) => {
    showFavoritesOnly = e.target.checked;
    renderRecipes();
  });

  /* ------------------ Counter ------------------ */
  const updateCounter = (shown, total) => {
    recipeCounter.textContent = `Showing ${shown} of ${total} recipes`;
  };

  /* ------------------ Main Render ------------------ */
  const renderRecipes = () => {
    let filteredRecipes = [...recipes];

    // Search
    if (searchQuery) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery) ||
        recipe.ingredients.some(ing =>
          ing.toLowerCase().includes(searchQuery)
        )
      );
    }

    // Favorites only
    if (showFavoritesOnly) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        isFavorite(recipe.id)
      );
    }

    recipeContainer.innerHTML = filteredRecipes
      .map(renderRecipeCard)
      .join("");

    updateCounter(filteredRecipes.length, recipes.length);
  };

  /* ------------------ Events ------------------ */
  recipeContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("favorite-btn")) {
      toggleFavorite(e.target.dataset.id);
    }
  });

  /* ------------------ Init ------------------ */
  renderRecipes();
})();