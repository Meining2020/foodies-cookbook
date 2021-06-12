import { useState } from 'react';

const SavedRecipeContainer = ({ recipeListData, removeRecipeFunction }) => {

    const [showList, setShowList] = useState(false);

    return (
        <>
            <div className="savedListContainer">
                <button className="heartButton fixedHeart" onClick={() => { setShowList(!showList) }}>
                    <i className="fas fa-heart" aria-hidden="true"></i>
                    <span className="srOnly">Click to open saved recipes</span>
                </button>

                <div className={showList ? "savedRecipeList toShow" : "savedRecipeList"}>
                    <h3>Your Recipe List</h3>
                    <p>{recipeListData.length} recipe{recipeListData.length > 1 ? "s" : ""} in list</p>
                    <ul>
                        {
                            recipeListData.map((recipe) => {
                                return (
                                    <li key={recipe.key} className="recipeList">
                                        <p>{recipe.name}</p>
                                        <button onClick={() => { removeRecipeFunction(recipe.key) }}>
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