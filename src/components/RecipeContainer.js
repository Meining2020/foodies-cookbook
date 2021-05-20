
import RecipeCard from './RecipeCard.js';


const RecipeContainer = ({ recipeData, addRecipeFunction, savedRecipes, removeRecipe }) => {   
    return (
        <>
            <div className="recipeContainer wrapper">               
                {                   
                    recipeData.map((currentData)=> {
                        return (
                            <RecipeCard recipeData={currentData} key={currentData.key} addRecipeFunction={addRecipeFunction} savedRecipes= {savedRecipes} removeRecipe={removeRecipe}/>                          
                        )
                    })
                }
            </div>
        </>
    );

};

export default RecipeContainer;
