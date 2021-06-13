
import firebase from "../config/firebase.js";

import notFoundPhoto from '../assets/notfound_placeholder.svg';

const SavedRecipeContainer = ({savedRecipes}) => {

    const dbRef = firebase.database().ref();
    
    const handleRemoveRecipe = (recipeKey) => {
        // console.log(recipeKey);
        dbRef.child(recipeKey).remove();
    }

    return (
        <>
            <div className="recipeContainer savedRecipeContainer">
                <div className="wrapper">
                    <h3>Your Recipe List</h3>
                    <p>{savedRecipes.length} recipe{savedRecipes.length > 1 ? "s" : ""}</p>
                    <ul className="savedRecipeList">
                        {
                            savedRecipes.map((recipe) => {
                                // const {key, foodImg} = recipe;
                                console.log(recipe)

                                return (
                                    <li key={recipe.key} className="recipeListItem">
                                        {/* <p>{recipe.name}</p> */}

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
        </>
    )
}

export default SavedRecipeContainer;