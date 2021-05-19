//import styles
import '../styles/App.css';

// importing our firebase configuration
import firebase from "../config/firebase.js";
//import hook
import {useEffect, useState} from 'react'
//import RecipeContainer
import RecipeContainer from './RecipeContainer.js';

import SelectionForm from './SelectionForm.js';

const apiID = `2b60c807`;
const apiKey = `d05cdb8ea868c5078528ac90ad938934`;


function App() {

  const [userInput, setUserInput] = useState("");
  const [query, setQuery] = useState("");
  const [allRecipe, setAllRecipe] = useState([]);
  const [filteredDietRecipe, setFilteredDietRecipe] = useState([]);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    // console.log("Fetching data side-effect.");
    console.log(userInput);

    getRecipe();
    // setUserInput('');

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

    // if (filterDiet) {
    //   searchParams.append("diet", filterDiet);
    // }

    // if (filterMeal) {
    //   searchParams.append("mealType", filterMeal);
    // }


    url.search = searchParams;
    // console.log(url);
    // console.log(userInput);

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
        console.log(recipeArray);

        // if (recipeArray.length > 0) {
        //   console.log(recipeArray[0].allRecipe.mealType[0]);
        // }
        

        const newRecipes = recipeArray.map((currentRecipe, index) => {
          return {
            foodName: currentRecipe.recipe.label,
            foodImg: currentRecipe.recipe.image,
            calories: currentRecipe.recipe.calories,
            ingredientList: currentRecipe.recipe.ingredientLines,
            recipeSource: currentRecipe.recipe.url,
            dietType: currentRecipe.recipe.dietLabels,
            mealType: currentRecipe.recipe.mealType,
            key: index,
          }
        });
        console.log("api allRecipe", newRecipes);

        // if (newRecipes.length > 0) {
        //   console.log(newRecipes[0].dietType);
        //   console.log(newRecipes[0].dietType.includes("Low-Fat"))
        // }

        // const filteredRecipes = newRecipes.filter((allRecipe)=> {
        //   return allRecipe.foodImg;
        // })

        setAllRecipe(newRecipes);

        setFilteredDietRecipe(newRecipes);
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
    setShowInput(!showInput);

  }

  const dietFilter = (chosenDiet) => {

    console.log("the chosen diet is: ", chosenDiet);

    if (chosenDiet === "all") {
      setFilteredDietRecipe(allRecipe);
    } else {

      const filteredRecipeArray = allRecipe.filter((currentRecipe)=> {
        //check if array contains user's select choice
        return currentRecipe.dietType.includes(chosenDiet);
      });
      console.log("filtered array based on diet choice: ", filteredRecipeArray);
      setFilteredDietRecipe(filteredRecipeArray);
    }
    
  }


  return (
    <div className="App">
      <main>
        <header>
          <div className="wrapper">
            <h1>Foodie's Cookbook!</h1>

            {/* search area */}
            <form action="submit" className="search">
              {/* label for screen readers only*/}
              <label htmlFor="input" className="srOnly">input keyword to search recipes</label>
              {/* search bar*/}
              <input type="text" id="input" value={userInput} onChange={handleUserInput} placeholder="Search Food" disabled={showInput}/>
              {/* submit button */}
              <button onClick={handleSubmitClick}><i className="fas fa-search"></i></button>
            </form>

            <SelectionForm dietFilterFuntion={dietFilter}/>

          </div>

        </header>

        {filteredDietRecipe.length > 0 
          ? <RecipeContainer recipeData={filteredDietRecipe} />
          : <p>No Data</p>
        }

        {/* <RecipeContainer recipeData={filteredDietRecipe} /> */}
        
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

// no result to show after search 

