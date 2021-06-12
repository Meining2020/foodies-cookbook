import { useState } from 'react';
import RecipeDetails from './RecipeDetails.js';
import notFoundPhoto from '../assets/notfound_placeholder.svg';

const RecipeCard = ({ recipeData, addRecipeFunction, savedRecipes, removeRecipe }) => {

    const { foodName, foodImg, calories, ingredientList, recipeSource, key } = recipeData;

    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(!show);
    }

    //check if specific recipe exsit in the list
    const savedRecipe = savedRecipes.find((recipe) => {
        return (
            recipe.recipeKey === key
        )
    })

    //check the saving status of the recipe 
    const isSaved = savedRecipe?.recipeKey === key;

    // const isSaved = savedRecipes.map((recipe) => {
    //     return (
    //         recipe.recipeKey
    //     )
    // }).includes(key);

    return (
        <div className="subContainer">

            {
                isSaved
                    ?
                    <button className="heartButton" onClick={() => { removeRecipe(savedRecipe.key) }}>
                        <i className="fas fa-heart" aria-hidden="true"></i>
                        <span className="srOnly">Click to remove recipe remove saved recipe list</span>
                    </button>
                    :
                    <button className="heartButton" onClick={() => { addRecipeFunction(recipeData) }}>
                        <i className="far fa-heart" aria-hidden="true"></i>
                        <span className="srOnly">Click to add recipe to saved recipe list</span>
                    </button>
            }

            <h2>{foodName}</h2>

            <img src={foodImg} alt={`${foodName}`} onError={(event) => { event.target.src = notFoundPhoto; event.target.alt = "photo not found" }} />
            <p>{parseInt(calories)} Cal</p>

            <button onClick={handleShow}>Ingredient List</button>

            {show ? <RecipeDetails ingredientData={ingredientList} /> : ""}

            <a href={recipeSource} target="_blank" rel="noreferrer">Recipe link</a>

            <button>Nutrition Facts</button>

        </div>
    )
}

export default RecipeCard;