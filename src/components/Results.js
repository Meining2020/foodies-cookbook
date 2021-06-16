import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
//import spinner
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";
//import components
import SelectionForm from './SelectionForm.js';
import RecipeCard from './RecipeCard.js';

// enable to load environment variables from .env file into the process.env object
require('dotenv').config()

const override = css`
    display: block;
    margin: 3rem auto;
`;

const Results = ({ savedRecipes }) => {
    const [allRecipe, setAllRecipe] = useState([]);
    const [filteredDietRecipe, setFilteredDietRecipe] = useState([]);
    const [hasSeached, setHasSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { query } = useParams();
    const resultsRef = useRef();

    //  On component mount call API using query
    useEffect(() => {
        const url = new URL(`https://api.edamam.com/search`);
        const searchParams = new URLSearchParams(
            {
                q: query,
                app_id: process.env.REACT_APP_API_ID,
                app_key: process.env.REACT_APP_API_KEY,
            }
        );
        url.search = searchParams;

        setIsLoading(true);

        fetch(url)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return {
                        hits: []
                    }
                }
            })
            .then((jsonResponse) => {
                const recipeArray = jsonResponse.hits;
                const newRecipes = recipeArray.map((currentRecipe) => {
                    const { recipe } = currentRecipe;
                    return {
                        foodName: recipe.label,
                        foodImg: recipe.image,
                        calories: recipe.calories,
                        recipeSource: recipe.url,
                        dietType: recipe.dietLabels,
                        //extract recipe id from the uri
                        key: recipe.uri.replace('http://www.edamam.com/ontologies/edamam.owl#recipe_', ''),
                        totalWeight: recipe.totalWeight
                    }
                });
                setAllRecipe(newRecipes);
                setFilteredDietRecipe(newRecipes);

                if (query) setHasSearched(true);

                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
                //scroll to the results section
                resultsRef.current.scrollIntoView({ behaviour: 'smooth' })
            })
    }, [query]);

    //function to filter data based on user's diet choice
    const dietFilter = (chosenDiet) => {
        if (chosenDiet === "all") {
            setFilteredDietRecipe(allRecipe);
        } else {
            const filteredRecipeArray = allRecipe.filter((currentRecipe) => {
                //check if array contains user's select choice
                return currentRecipe.dietType.includes(chosenDiet);
            });
            setFilteredDietRecipe(filteredRecipeArray);
        }
    }
    return (
        <div className="resultsContainer" ref={resultsRef}>
            {
                query
                    ? <SelectionForm dietFilterFuntion={dietFilter} />
                    : ""
            }
            {
                hasSeached && (filteredDietRecipe.length > 0
                    ?
                    <div className="recipeContainer wrapper">
                        <ul>
                            {
                                isLoading
                                    ?
                                    <FadeLoader css={override} color={'#E82915'} size={150} />
                                    :
                                    filteredDietRecipe.map((currentData) => {
                                        return (
                                            <RecipeCard
                                                recipeData={currentData}
                                                key={currentData.key}
                                                savedRecipes={savedRecipes}
                                            />
                                        )
                                    })
                            }
                        </ul>
                    </div>
                    :
                    <p>No Matching Result!</p>)
            }
        </div>
    )
}

export default Results;
