//import styles
import '../styles/App.css';

// importing our firebase configuration
import firebase from "../config/firebase.js";
//import hook
import {useEffect, useState} from 'react'
//import RecipeContainer
import RecipeContainer from './RecipeContainer.js';

const apiID = `2b60c807`;
const apiKey = `d05cdb8ea868c5078528ac90ad938934`;


function App() {

  const [userInput, setUserInput] = useState("");
  const [recipe, setRecipe] = useState([]);
  const [query, setQuery] = useState("");
  const [filterDiet, setFilterDiet] = useState();
  const [filterMeal, setFilterMeal] = useState();

  useEffect(() => {
    // console.log("Fetching data side-effect.");
    console.log(userInput);

    // getRecipe();
    setUserInput('');

  }, [query])

//function to get data from API
  const getRecipe = () => {
    //GET CORS error

    const url = new URL(`https://api.edamam.com/search`);
    const searchParams = new URLSearchParams(
      {
        q: userInput,
        app_id: apiID,
        app_key: apiKey,
      }
    );

    if (filterDiet) {
      searchParams.append("diet", filterDiet);
    }

    if (filterMeal) {
      searchParams.append("mealType", filterMeal);
    }


    url.search = searchParams;
    console.log(url);
    console.log(userInput);

    fetch(url)
      .then((response) => {
        // console.log(response);

        if (response.status === 200) {
          return response.json();
        } else {
          return {
            hits: []
          }
        }
      })
      .then((jsonResponse) => {
        // console.log(jsonResponse);

        const recipeArray = jsonResponse.hits;
        // console.log(recipeArray);

        const newRecipes = recipeArray.map((currentRecipe, index) => {
          return {
            foodName: currentRecipe.recipe.label,
            foodImg: currentRecipe.recipe.image,
            calories: currentRecipe.recipe.calories,
            ingredientList: currentRecipe.recipe.ingredientLines,
            recipeSource: currentRecipe.recipe.url,
            key: index,
          }
        });
        console.log("api recipe", newRecipes);

        // const filteredRecipes = newRecipes.filter((recipe)=> {
        //   return recipe.foodImg;
        // })

        setRecipe(newRecipes);
      })
      
  }

  //function to get user's input
  const handleUserInput = (event) => {
    let inputValue = event.target.value;
    setUserInput(inputValue);
  }

  //function to trigger API call once click submit
  const handleSubmitClick = (event) => {
    event.preventDefault();
    
    setQuery(userInput); 

    getRecipe();
  }

  const handleDietSelection = (event) => {
    console.log(event.target.value);
    const selectedValue = event.target.value;
    setFilterDiet(selectedValue);

  }

  const handleMealSelection = (event) => {
    console.log(event.target.value);
    const selectedValue = event.target.value;
    setFilterMeal(selectedValue);

  }

  return (
    <div className="App">
      <main>
        <header>
          <div className="wrapper">
            <h1>Foodie's Cookbook!</h1>

            {/* input and selection area */}
            <form action="submit">
              {/* label for screen readers only*/}
              <label htmlFor="input" className="srOnly">input keyword to search recipes</label>
              {/* search bar*/}
              <input type="text" id="input" value={userInput} onChange={handleUserInput} placeholder="Search Food" required/>

              <div className="selectSection">

                <select name="dietType" id="dietType" onChange={handleDietSelection}>
                  <option value=""disabled>Select diet type</option>
                  <option value="balanced">Balanced</option>
                  <option value="high-fiber">High-Fiber</option>
                  <option value="high-protein">High-Protein</option>
                  <option value="low-carb">Low-Carbonate</option>
                  <option value="low-fat">Low-Fat</option>
                  <option value="low-sodium">Low-Sodium</option>
                </select>

                <select name="mealType" id="mealType" onChange={handleMealSelection}>
                  <option value="" disabled>Select meal type</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                  <option value="Teatime">Teatime</option>
                </select>
              </div>

              {/* submit button */}
              <button type="submit" onClick={handleSubmitClick}>Get your recipe!</button>


            </form>
          </div>

        </header>

        <RecipeContainer recipeData={recipe} />
      </main>

      <footer>
        <p>Created by Meining @ Juno 2021</p>
      </footer>


    </div>
  );
}

export default App;


//how to filter img (404 response): try search "pizza"

//TO show button only apply to one

