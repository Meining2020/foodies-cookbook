import { useEffect, useState } from 'react';
//import spinner
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";

// enable to load environment variables from .env file into the process.env object
require('dotenv').config()

const override = css`
    display: block;
    margin: 3rem auto;
`;

const RecipeDetails = (props) => {
    const id = props.match.params.id;
    const [isLoading, setIsLoading] = useState(true);
    const [foodName, setFoodName] = useState("");
    const [totalWeight, setTotalWeight] = useState("");
    const [totalNutrients, setTotalNutrients] = useState({});
    const [totalDaily, setTotalDaily] = useState({});

    //  On component mount call API using recipe id
    useEffect(() => {
        const url = new URL(`https://api.edamam.com/api/recipes/v2/${id}`);
        const searchParams = new URLSearchParams(
            {
                type: 'public',
                app_id: process.env.REACT_APP_API_ID,
                app_key: process.env.REACT_APP_API_KEY
            }
        );
        url.search = searchParams;

        fetch(url)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return {
                        recipe: {}
                    }
                }
            })
            .then((jsonResponse) => {
                const recipeObj = jsonResponse.recipe;
                const { label, totalNutrients, totalDaily, totalWeight } = recipeObj;
                setFoodName(label);
                setTotalNutrients(totalNutrients);
                setTotalDaily(totalDaily);
                setTotalWeight(totalWeight);
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);

            })
    }, [id]);

    return (
        <div className="tableContainer">
            {
                isLoading
                    ?
                    <FadeLoader css={override} color={'#E82915'} size={150} />
                    :
                    <div className="wrapper">
                        <h3>{foodName}</h3>
                        <table>
                            <caption>Nutrition Facts</caption>
                            <thead>
                                <tr>
                                    <th colSpan="3">per {Math.round(totalWeight)}g</th>
                                </tr>
                            </thead>
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
                                <tr>
                                    <td>Carbohydrate {Math.round(totalNutrients.CHOCDF.quantity)} g</td>
                                    <td>{Math.round(totalDaily.CHOCDF.quantity)} %</td>
                                </tr>
                                <tr>
                                    <td>Fibre {Math.round(totalNutrients.FIBTG.quantity)} g</td>
                                    <td>{Math.round(totalDaily.FIBTG.quantity)} %</td>
                                </tr>
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
            }
        </div>
    )
}

export default RecipeDetails;


