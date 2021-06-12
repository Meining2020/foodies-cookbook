
const RecipeDetails = (props) => {
    console.log(props)
    console.log(props.match.params)
    console.log(props.location.state)
    const { totalNutrients, totalWeight, totalDaily } = props.location.state;

    return (
        <div className="tableContainer">
            <div className="wrapper">
                <table>
                    <caption>Nutrition Facts</caption>

                    <thead><th colspan="3">per {Math.round(totalWeight)}g</th></thead>

                    <tbody>
                        <tr>

                            <th>Calories {Math.round(totalNutrients.ENERC_KCAL.quantity)}</th>
                            <th>
                                <a href="https://www.canada.ca/en/health-canada/services/understanding-food-labels/percent-daily-value.html" target="_blank" rel="noreferrer">% Daily Value</a>
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
                            <td>Iron {Math.round(totalNutrients.FE.quantity)} mg</td>
                            <td>{Math.round(totalDaily.FE.quantity)} %</td>
                        </tr>

                    </tbody>

                </table>
            </div>
        </div>
    )
}


export default RecipeDetails;



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

