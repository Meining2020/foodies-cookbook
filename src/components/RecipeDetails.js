// const RecipeDetails = ({ingredientData}) => {


    
//     return (
//             <ul className="ingredients">
//                 {
//                     //map through ingredient list to show each ingredient 
//                     ingredientData.map((ingredient, index) => {
//                         return (
//                             <li key={index}>{index + 1}. {ingredient}</li>
//                         )
//                     })
//                 }
//                 <p>test</p>
//             </ul>
//     )
// }


const RecipeDetails = (props) => {
    console.log(props)
    console.log(props.match.params)
    console.log(props.location.state)
    
    
    



    return (
        <ul className="ingredients">
            
            <p>test</p>
        </ul>
    )
}


export default RecipeDetails;


