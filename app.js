const recipes = [
    {
        id: 1,
        title: "Creamy Garlic Pasta",
        time: 25,
        difficulty: "easy",
        description: "A quick and comforting garlic pasta with a creamy sauce.",
        category: "pasta"
    },
    {
        id: 2,
        title: "Vegetable Stir Fry",
        time: 20,
        difficulty: "easy",
        description: "Colorful vegetables stir-fried with a light soy sauce glaze.",
        category: "salad"
    },
    {
        id: 3,
        title: "Chicken Biryani",
        time: 90,
        difficulty: "hard",
        description: "Aromatic rice cooked with spiced chicken and herbs.",
        category: "curry"
    },
    {
        id: 4,
        title: "Paneer Butter Masala",
        time: 45,
        difficulty: "medium",
        description: "Soft paneer cubes in a rich tomato butter gravy.",
        category: "curry"
    },
    {
        id: 5,
        title: "Grilled Cheese Sandwich",
        time: 15,
        difficulty: "easy",
        description: "Classic crispy sandwich with melted cheese inside.",
        category: "snack"
    },
    {
        id: 6,
        title: "Beef Roast",
        time: 120,
        difficulty: "hard",
        description: "Slow-cooked beef roast with deep, intense flavors.",
        category: "meat"
    },
    {
        id: 7,
        title: "Caesar Salad",
        time: 30,
        difficulty: "medium",
        description: "Fresh lettuce tossed with creamy Caesar dressing.",
        category: "salad"
    },
    {
        id: 8,
        title: "Mushroom Risotto",
        time: 60,
        difficulty: "medium",
        description: "Creamy Italian rice dish cooked slowly with mushrooms.",
        category: "rice"
    }
];

/* ---------- DOM Selection ---------- */
const recipeContainer = document.querySelector("#recipe-container");

/* ---------- Create Recipe Card ---------- */
const createRecipeCard = (recipe) => {
    return `
    <div class="recipe-card" data-id="${recipe.id}">
      <h3>${recipe.title}</h3>
      <div class="recipe-meta">
        <span>⏱️ ${recipe.time} min</span>
        <span class="difficulty ${recipe.difficulty}">
          ${recipe.difficulty}
        </span>
      </div>
      <p>${recipe.description}</p>
    </div>
  `;
};

/* ---------- Render Recipes ---------- */
const renderRecipes = (recipesArray) => {
    const recipesHTML = recipesArray
        .map((recipe) => createRecipeCard(recipe))
        .join("");

    recipeContainer.innerHTML = recipesHTML;
};

/* ---------- Initialize App ---------- */
renderRecipes(recipes);