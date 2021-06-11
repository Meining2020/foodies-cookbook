
import firebase from "../config/firebase.js";


const SavedRecipeContainer = ({savedRecipes}) => {

    // const [showList, setShowList] = useState(false);

    const dbRef = firebase.database().ref();
    

    const handleRemoveRecipe = (recipeKey) => {
        // console.log(recipeKey);
        dbRef.child(recipeKey).remove();
    }

    return (
        <>
            <div className="savedRecipeContainer wrapper">
                <h3>Your Recipe List</h3>
                <p>{savedRecipes.length} recipe{savedRecipes.length > 1 ? "s" : ""}</p>
                <ul className="savedRecipeList">
                    {
                        savedRecipes.map((recipe) => {
                            console.log(recipe)
                            return (
                                <li key={recipe.key} className="recipeList">
                                    {/* <p>{recipe.name}</p> */}
                                    <a href={recipe.recipeSource} target="_blank" rel="noreferrer">{recipe.name}</a>

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

        </>
    )
}

export default SavedRecipeContainer;