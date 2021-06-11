
import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';


import { Link } from 'react-router-dom';
//import spinner
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";

import SelectionForm from './SelectionForm.js';
import RecipeCard from './RecipeCard.js';

import SavedRecipeContainer from './SavedRecipeContainer.js';

const apiID = `2b60c807`;
const apiKey = `d05cdb8ea868c5078528ac90ad938934`;
const override = css`
    display: block;
    margin: 3rem auto;
`;


const Results = ({savedRecipes}) => {

    const [allRecipe, setAllRecipe] = useState([]);
    const [filteredDietRecipe, setFilteredDietRecipe] = useState([]);
    // const [savedRecipe, setSavedRecipe] = useState([]);
    const [hasSeached, setHasSearched] = useState(false);
    const [isloading, setIsLoading] = useState(false);

    // console.log(props)
    // const query = props.match.params.query;
    const {query} = useParams();

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
                        //extract recipe id from the uri
                        key: recipe.uri.replace('http://www.edamam.com/ontologies/edamam.owl#recipe_', ''),
                        totalNutrients: recipe.totalNutrients,
                        totalDaily: recipe.totalDaily,
                        totalWeight: recipe.totalWeight
                    }
                });

                setAllRecipe(newRecipes);

                console.log(newRecipes)

                setFilteredDietRecipe(newRecipes);

                if (query) setHasSearched(true);

                setTimeout(() => {
                    setIsLoading(false);
                }, 500);

            })
    }, [query]);


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

    

    return (
        <>
            {
                query
                    ? <SelectionForm dietFilterFuntion={dietFilter} />
                    : ""
            }

            { hasSeached && (filteredDietRecipe.length > 0
                ?
                <div className="recipeContainer wrapper">
                    <ul>
                        {
                            isloading
                                ?
                                <FadeLoader css={override} color={'#E82915'} size={150} />
                                :
                                filteredDietRecipe.map((currentData) => {
                                    return (
                                        <RecipeCard 
                                        recipeData={currentData} 
                                        key={currentData.key} 
                                        // addRecipeFunction={handleAddRecipeClick} 
                                        savedRecipes={savedRecipes} 
                                        // removeRecipe={handleRemoveRecipe} 
                                        />

                                    )
                                })
                        }
                    </ul>
                </div>
                :
                <p>No Matching Result!</p>)
            }

            {/* <SavedRecipeContainer recipeListData={savedRecipe} removeRecipeFunction={handleRemoveRecipe} /> */}

        </>
    )
}

export default Results;
