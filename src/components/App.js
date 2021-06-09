//import styles
import '../styles/App.css';
// importing our firebase configuration
import firebase from "../config/firebase.js";
//import hook
import { useEffect, useState } from 'react'
//import spinner
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";

//import Components
import RecipeCard from './RecipeCard.js';
import SelectionForm from './SelectionForm.js';
import SavedRecipeContainer from './SavedRecipeContainer.js';

const apiID = `2b60c807`;
const apiKey = `d05cdb8ea868c5078528ac90ad938934`;

const override = css`
  display: block;
  margin: 3rem auto;
`;

function App() {
  //define useStates
  const [userInput, setUserInput] = useState("");
  const [query, setQuery] = useState("");
  const [noInput, setNoInput] = useState(false);
  const [allRecipe, setAllRecipe] = useState([]);
  const [filteredDietRecipe, setFilteredDietRecipe] = useState([]);
  const [savedRecipe, setSavedRecipe] = useState([]);
  const [hasSeached, setHasSearched] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  

  useEffect(() => {
    // setUserInput('');
    const url = new URL(`https://api.edamam.com/search`);
    const searchParams = new URLSearchParams(
      {
        q: query,
        app_id: apiID,
        app_key: apiKey,
      }
    );

    url.search = searchParams;
    // console.log(url);
    // console.log(userInput);

    setIsLoading(true);

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

        const newRecipes = recipeArray.map((currentRecipe) => {
          const { recipe } = currentRecipe;
          return {
            foodName: recipe.label,
            foodImg: recipe.image,
            calories: recipe.calories,
            ingredientList: recipe.ingredientLines,
            recipeSource: recipe.url,
            dietType: recipe.dietLabels,
            key: recipe.uri
          }
        });


        setAllRecipe(newRecipes);

        setFilteredDietRecipe(newRecipes);

        if (query) setHasSearched(true);

        setTimeout(() => {
          setIsLoading(false);       
        }, 500);

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

  //function to get user's input
  const handleUserInput = (event) => {
    let inputValue = event.target.value;
    setUserInput(inputValue);
  }

  //function to trigger API call once click submit
  const handleSubmitClick = (event) => {
    event.preventDefault();
    setQuery(userInput);
    if (userInput) {
      setNoInput(false);
    } else {
      setNoInput(true);
    }
  }

  //function to filter data based on user's diet choice
  const dietFilter = (chosenDiet) => {
    // console.log("the chosen diet is: ", chosenDiet);
    if (chosenDiet === "all") {
      setFilteredDietRecipe(allRecipe);
    } else {

      const filteredRecipeArray = allRecipe.filter((currentRecipe) => {
        //check if array contains user's select choice
        return currentRecipe.dietType.includes(chosenDiet);
      });
      // console.log("filtered array based on diet choice: ", filteredRecipeArray);
      setFilteredDietRecipe(filteredRecipeArray);
    }
  }

  const handleAddRecipeClick = (recipeKey) => {
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
            <h1>Foodie's Cookbook!</h1>
            {/* show list of saved recipe */}
            <SavedRecipeContainer recipeListData={savedRecipe} removeRecipeFunction={handleRemoveRecipe} />
            {/* search area */}
            <form action="submit" className="search">
              {/* label for screen readers only*/}
              <label htmlFor="input" className="srOnly">input keyword to search recipes</label>
              {/* search bar*/}
              <input type="text" id="input" value={userInput} onChange={handleUserInput} placeholder="Search food" />

              {/* submit button */}
              <button onClick={handleSubmitClick}>
                <i className="fas fa-search" aira-hidden="true"></i>
                <span className="srOnly">click to start search</span>
              </button>

            </form>
            {/* error message for no input */}
            {
              noInput
                ? <p>Please enter a food!</p>
                : ""
            }
            {/* filter */}
            {
              hasSeached && !noInput
                ? <SelectionForm dietFilterFuntion={dietFilter} />
                : ""
            }
          </div>
        </header>

        {hasSeached && !noInput && (filteredDietRecipe.length > 0
          ?
          <div className="recipeContainer wrapper">
            {
              isloading
                ?
                <FadeLoader css={override} color={'#E82915'} size={150} />
                :
                filteredDietRecipe.map((currentData) => {
                  return (
                    <RecipeCard recipeData={currentData} key={currentData.key} addRecipeFunction={handleAddRecipeClick} savedRecipes={savedRecipe} removeRecipe={handleRemoveRecipe} />


                  )
                })
            }
          </div>
          :
          <p>No Matching Result!</p>)
        }

      </main>

      <footer>
        <p>Created by Meining Cheng @ Juno 2021</p>
      </footer>

    </div>
  );
}

export default App;




