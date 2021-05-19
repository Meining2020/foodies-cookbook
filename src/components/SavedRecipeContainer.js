

const SavedRecipeContainer = ({ recipeListData, removeRecipeFunction }) => {

    return (
        <ul className="savedRecipeList">
            <h3>Your Recipe List</h3>
            <p>{recipeListData.length} recipe{recipeListData.length > 1 ? "s" : ""} in list</p>

            {
                recipeListData.map((recipe) => {
                    return (
                        <li key={recipe.key} className="recipeList">

                            {/* {console.log(recipe.name)} */}

                            <p>{recipe.name}</p>
                            <span onClick={() => { removeRecipeFunction(recipe.key)}}><i className="fas fa-trash-alt"></i></span>
                        </li>
                    )
                })
            }

        </ul>
    )
}

export default SavedRecipeContainer;