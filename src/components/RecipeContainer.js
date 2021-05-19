import {Fragment, useState} from 'react';
import RecipeDetails from './RecipeDetails.js';



const RecipeContainer = ({recipeData}) => {
    

    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(!show);
        // console.log(show);
    }
    
    return (
        <Fragment>
            <div className="recipeContainer wrapper">

                
                {
                    

                    recipeData.map((currentData)=> {
                        const { foodName, foodImg, calories, ingredientList, recipeSource, key} = currentData;
                        return (
                            <div className="subContainer" key={key}>
                                <i className="far fa-heart"></i>
                                
                                <h2>{foodName}</h2>
                                
                                <img src={foodImg} alt="" />
                                <p>{parseInt(calories)} Cal</p>

                                <button onClick={handleShow}>Ingredient List</button>
                    
                                {show ? <RecipeDetails ingredientData={ingredientList} /> : ""}

                                

                                <a href={recipeSource} target="_blank">Recipe link</a>
                                

                            </div>
                        )
                    })
                }
            </div>
        </Fragment>
    );

};

export default RecipeContainer;
