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

import { Link } from 'react-router-dom';

const RecipeDetails = (props) => {
    console.log(props)
    console.log(props.match.params)
    console.log(props.location.state)
    const {totalNutrients, totalWeight, totalDaily, query} = props.location.state;

    // const {
    //     ENERC_KCAL,
    //     FAT,
    //     FASAT,
    //     FATRN,
    //     CHOLE,
    //     NA,
    //     CHOCDF,
    //     FIBTG,
    //     SUGAR,
    //     PROCNT,
    //     K,
    //     VITA_RAE,
    //     VITC,
    //     CA,
    //     FE
    // } = totalNutrients;
    
    // console.log(totalNutrients.ENERC_KCAL.quantity)
    
    



    return (
        
        <div className="wrapper">

            <table>
                <caption>Nutrition Facts</caption>

                <thead>per {totalWeight}g</thead>
                <tbody>
                    <tr>

                        <th>Calories {totalNutrients.ENERC_KCAL.quantity}</th>
                        <th>
                            <a href="https://www.canada.ca/en/health-canada/services/understanding-food-labels/percent-daily-value.html">% Daily Value</a>
                        </th>
                    </tr>
                    <tr>
                        <td>Fat {Math.round(totalNutrients.FAT.quantity)} g</td>
                        <td>{Math.round(totalDaily.FAT.quantity)} %</td>
                    </tr>
                    <tr>
                        <td>Saturated {Math.round(totalNutrients.FASAT.quantity)} g</td>
                        <td>{Math.round(totalDaily.FASAT.quantity)} %</td>
                    </tr>
                    {/* <tr>
                    <td>+ Trans {totalNutrients.FATRN.quantity} g</td>
                    <td></td>
                </tr> */}
                    <tr>
                        <td>Carbohydrate {Math.round(totalNutrients.CHOCDF.quantity)} g</td>
                        <td>{Math.round(totalDaily.CHOCDF.quantity)} %</td>
                    </tr>
                    <tr>
                        <td>Fibre {Math.round(totalNutrients.FIBTG.quantity)} g</td>
                        <td>{Math.round(totalDaily.FIBTG.quantity)} %</td>
                    </tr>
                    {/* <tr>
                    <td>Sugar {totalNutrients.SUGAR.quantity} g</td>
                    <td>{totalDaily.SUGAR.quantity} %</td>
                </tr> */}
                    <tr>
                        <td>Protein {Math.round(totalNutrients.PROCNT.quantity)} g</td>
                        <td>{Math.round(totalDaily.PROCNT.quantity)} %</td>
                    </tr>
                    <tr>
                        <td>Cholesterol {Math.round(totalNutrients.CHOLE.quantity)} mg</td>
                        <td>{Math.round(totalDaily.CHOLE.quantity)} %</td>
                    </tr>
                    <tr>
                        <td>Sodium {Math.round(totalNutrients.NA.quantity)} mg</td>
                        <td>{Math.round(totalDaily.NA.quantity)} %</td>
                    </tr>
                    <tr>
                        <td>Potassium {Math.round(totalNutrients.K.quantity)} mg</td>
                        <td>{Math.round(totalDaily.K.quantity)} %</td>
                    </tr>
                    <tr>
                        <td>Calcium {Math.round(totalNutrients.CA.quantity)} mg</td>
                        <td>{Math.round(totalDaily.CA.quantity)} %</td>
                    </tr>
                    <tr>
                        <td>Iron{Math.round(totalNutrients.FE.quantity)} mg</td>
                        <td>{Math.round(totalDaily.FE.quantity)} %</td>
                    </tr>

                </tbody>

            </table>
        </div>
    )
}


export default RecipeDetails;


