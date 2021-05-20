import { useState } from 'react';

const SavedRecipeContainer = ({ recipeListData, removeRecipeFunction }) => {

    const [showList, setShowList] = useState(false);

    return (
        <>
            <span onClick={() => {setShowList(!showList)}}><i className="fas fa-heart"></i></span>
            
            <ul className={showList ? "savedRecipeList toShow" : "savedRecipeList"}>
                <h3>Your Recipe List</h3>
                <p>{recipeListData.length} recipe{recipeListData.length > 1 ? "s" : ""} in list</p>
                {
                    recipeListData.map((recipe) => {
                        return (
                            <li key={recipe.key} className="recipeList">
                                <p>{recipe.name}</p>
                                <span onClick={() => { removeRecipeFunction(recipe.key) }}><i className="fas fa-trash-alt"></i></span>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default SavedRecipeContainer;