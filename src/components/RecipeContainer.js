import {Fragment, useState} from 'react';
import RecipeDetails from './RecipeDetails.js';



const RecipeContainer = ({ recipeData, addRecipeFunction }) => {
    

    const [show, setShow] = useState(false);
    const [save, setSave] = useState(false);

    const handleShow = () => {
        setShow(!show);
        // console.log(show);
    }

    // const handleSaveClick = (event) => {
    //     setSave(!save);
    //     console.log(event.target);
    // }
    
    return (
        <Fragment>
            <div className="recipeContainer wrapper">

                
                {
                    
                    recipeData.map((currentData)=> {
                        const { foodName, foodImg, calories, ingredientList, recipeSource, key} = currentData;
                        return (
                            <div className="subContainer" key={key}>

                                <span onClick={() => {addRecipeFunction(foodName)}} >
                                    {
                                        save ? <i className="fas fa-heart" ></i> 
                                            : <i className="far fa-heart"></i>
                                    }
                                </span>

                                {/* {
                                    save ? <span><i className="fas fa-heart" ></i> </span>
                                        : <span><i className="far fa-heart"></i></span>
                                } */}
                               
                                
                                <h2>{foodName}</h2>
                                
                                <img src={foodImg} alt="" />
                                <p>{parseInt(calories)} Cal</p>

                                <button onClick={handleShow}>Ingredient List</button>
                    
                                {show ? <RecipeDetails ingredientData={ingredientList} /> : ""}

                                
                                <a href={recipeSource} target="_blank" rel="noreferrer">Recipe link</a>
                                
                            </div>
                        )
                    })
                }
            </div>
        </Fragment>
    );

};

export default RecipeContainer;
