
const RecipeDetails = ({ingredientData}) => {

    return (
            <ul className="ingredients">
                {
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


