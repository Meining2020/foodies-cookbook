import { useEffect, useRef } from 'react'
import firebase from "../config/firebase.js";
import notFoundPhoto from '../assets/notFoundPlaceholder.svg';

const SavedRecipeContainer = ({ savedRecipes }) => {
    const dbRef = firebase.database().ref();
    //remove recipe from firebase
    const handleRemoveRecipe = (recipeKey) => {
        dbRef.child(recipeKey).remove();
    }

    const savedRecipesRef = useRef();
    useEffect(() => {
        savedRecipesRef.current.scrollIntoView({ behavior: 'smooth' })
    })

    return (
        <div className="recipeContainer savedRecipeContainer" ref={savedRecipesRef}>
            <div className="wrapper">
                <h3>Your Recipe List</h3>
                <p>{savedRecipes.length} recipe{savedRecipes.length > 1 ? "s" : ""}</p>
                <ul className="savedRecipeList">
                    {
                        savedRecipes.map((recipe) => {
                            return (
                                <li key={recipe.key} className="recipeListItem">
                                    <a href={recipe.recipeSource} target="_blank" rel="noreferrer">{recipe.name}</a>
                                    <img src={recipe.foodImg} alt={`${recipe.foodName}`} onError={(event) => { event.target.src = notFoundPhoto; event.target.alt = "photo not found" }} />
                                    <button onClick={() => { handleRemoveRecipe(recipe.key) }}>
                                        <i className="fas fa-trash-alt" aria-hidden="true"></i>
                                        <span className="srOnly">click to delete the recipe</span>
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default SavedRecipeContainer;