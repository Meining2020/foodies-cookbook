import { Link } from 'react-router-dom';
import firebase from "../config/firebase.js";
//import photo
import notFoundPhoto from '../assets/notFoundPlaceholder.svg';

const RecipeCard = ({ recipeData, savedRecipes }) => {
    const { foodName, foodImg, calories, recipeSource, key, totalWeight } = recipeData;
    const dbRef = firebase.database().ref();
    //add recipe to firebase 
    const handleAddRecipe = (recipeKey) => {
        dbRef.push(recipeKey);
    }
    //remove recipe to firebase 
    const handleRemoveRecipe = (recipeKey) => {
        dbRef.child(recipeKey).remove();
    }
    //check if specific recipe exsit in the list
    const savedRecipe = savedRecipes.find((recipe) => {
        return (
            recipe.recipeKey === key
        )
    })
    //check the saving status of the recipe 
    const isSaved = savedRecipes.map((recipe) => {
        return (
            recipe.recipeKey
        )
    }).includes(key);

    return (
        <li className="recipeListItem">
            {
                isSaved
                    ?
                    <button className="saveControlButton iconButton" onClick={() => { handleRemoveRecipe(savedRecipe.key) }}>
                        <i className="fas fa-heart" aria-hidden="true"></i>
                        <span className="srOnly">Click to remove recipe remove saved recipe list</span>
                    </button>
                    :
                    <button className="saveControlButton iconButton" onClick={() => { handleAddRecipe(recipeData) }}>
                        <i className="far fa-heart" aria-hidden="true"></i>
                        <span className="srOnly">Click to add recipe to saved recipe list</span>
                    </button>
            }
            <h2 className="recipeHeading">{foodName}</h2>
            <img src={foodImg} alt={`${foodName}`} onError={(event) => { event.target.src = notFoundPhoto; event.target.alt = "photo not found" }} />
            <p>{Math.round(calories)} Cal per {Math.round(totalWeight)} g</p>
            <Link to={`/recipeDetails/${key}`}>
                <button>Nutrition Facts</button>
            </Link>
            <a href={recipeSource} target="_blank" rel="noreferrer">Recipe link</a>
        </li>
    )
}

export default RecipeCard;
