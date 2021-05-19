//import styles
import '../styles/App.css';


// importing our firebase configuration
import firebase from "../config/firebase.js";
//import hook
import {useEffect, useState} from 'react'
//import RecipeContainer
import RecipeContainer from './RecipeContainer.js';

import SelectionForm from './SelectionForm.js';
import SavedRecipeContainer from './SavedRecipeContainer.js';

const apiID = `2b60c807`;
const apiKey = `d05cdb8ea868c5078528ac90ad938934`;


function App() {

  const [userInput, setUserInput] = useState("");
  const [query, setQuery] = useState("");
  const [allRecipe, setAllRecipe] = useState([]);
  const [filteredDietRecipe, setFilteredDietRecipe] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [savedRecipe, setSavedRecipe] = useState([]);


  useEffect(() => {
    // console.log("Fetching data side-effect.");
    // console.log(userInput);

    // getRecipe();
    // setUserInput('');

    const url = new URL(`https://api.edamam.com/search`);
    const searchParams = new URLSearchParams(
      {
        q: userInput,
        app_id: apiID,
        app_key: apiKey,
      }
    );

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
        // console.log(recipeArray);

        // if (recipeArray.length > 0) {
        //   console.log(recipeArray[0].allRecipe.mealType[0]);
        // }


        const newRecipes = recipeArray.map((currentRecipe) => {
          return {
            foodName: currentRecipe.recipe.label,
            foodImg: currentRecipe.recipe.image,
            calories: currentRecipe.recipe.calories,
            ingredientList: currentRecipe.recipe.ingredientLines,
            recipeSource: currentRecipe.recipe.url,
            dietType: currentRecipe.recipe.dietLabels,
            mealType: currentRecipe.recipe.mealType,
            key: currentRecipe.recipe.uri
          }
        });
        // console.log("api allRecipe", newRecipes);

        // const filteredRecipes = newRecipes.filter((allRecipe)=> {
        //   return allRecipe.foodImg;
        // })


        //stretch goal to work on later
        // const completedRecipeArray = ()=> {
        //   newRecipes.map((recipe) => {
        //     const recipeKey = recipe.key;
        //     console.log(savedRecipe.indexOf(recipeKey));

        //     return recipeKey;
        //   })
        // }
        // completedRecipeArray();

        setAllRecipe(newRecipes);

        setFilteredDietRecipe(newRecipes);
      })

  }, [query]);

  // Referencing our firebase database
  const dbRef = firebase.database().ref();
  useEffect(() => {
    //redefine to clear warning
    const dbRef = firebase.database().ref();
    dbRef.on('value', (response) => {
      // console.log(response);

      const data = response.val();
      // console.log(data);


      const recipeObjectArray = [];
      for (let key in data) {
        // console.log(key);
        const recipeObject = {
          key: key,
          name: data[key].foodName,
          saveState: true,
          recipeKey: data[key].key
        };
        recipeObjectArray.push(recipeObject);
      }

      setSavedRecipe(recipeObjectArray);
    })

  }, []);

//function to get data from API
  // const getRecipe = () => {

    
      
  // }

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

  //function to filter data based on user's diet choice
  const dietFilter = (chosenDiet) => {

    // console.log("the chosen diet is: ", chosenDiet);

    if (chosenDiet === "all") {
      setFilteredDietRecipe(allRecipe);
    } else {

      const filteredRecipeArray = allRecipe.filter((currentRecipe)=> {
        //check if array contains user's select choice
        return currentRecipe.dietType.includes(chosenDiet);
      });
      // console.log("filtered array based on diet choice: ", filteredRecipeArray);
      setFilteredDietRecipe(filteredRecipeArray);
    }
    
  }

  const handleAddRecipeClick = (recipeKey) => {
    // console.log("clicked");
    // console.log(recipeKey);
    dbRef.push(recipeKey);
  }


  const handleRemoveRecipe = (recipeKey) => {
    // console.log(recipeKey);
    dbRef.child(recipeKey).remove();
  }


  return (
    <div className="App">
      <main>
        <header>
          <div className="wrapper">

            <span><i className="fas fa-heart"></i></span>

            <h1>Foodie's Cookbook!</h1>

            <SavedRecipeContainer recipeListData={savedRecipe} removeRecipeFunction={handleRemoveRecipe}/>

            {/* search area */}
            <form action="submit" className="search">
              {/* label for screen readers only*/}
              <label htmlFor="input" className="srOnly">input keyword to search recipes</label>
              {/* search bar*/}
              <input type="text" id="input" value={userInput} onChange={handleUserInput} placeholder="Search Food" disabled={showInput}/>
              {/* submit button */}
              <button onClick={handleSubmitClick}><i className="fas fa-search"></i></button>
            </form>

            <SelectionForm dietFilterFuntion={dietFilter} />

          </div>

        </header>

        {filteredDietRecipe.length > 0 
          ? <RecipeContainer recipeData={filteredDietRecipe} addRecipeFunction={handleAddRecipeClick}/>
          : <p>No Data</p>
        }

        {/* <RecipeContainer recipeData={filteredDietRecipe} /> */}
        
      </main>

      <footer>
        <p>Created by Meining Cheng @ Juno 2021</p>
      </footer>


    </div>
  );
}

export default App;


// have two function to onclick?

//how to filter img (404 response): try search "pizza"

//TO show button only apply to one

// no result to show after search 



