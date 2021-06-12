const RecipeDetails = ({ingredientData}) => {
    return (
            <ul className="ingredients">
                {
                    //map through ingredient list to show each ingredient 
                    ingredientData.map((ingredient, index) => {
                        return (
                            <li key={index}>{index + 1}. {ingredient}</li>
                        )
                    })
                }
            </ul>
    )
}

export default RecipeDetails;


