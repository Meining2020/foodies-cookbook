//import styles
import '../styles/App.css';

//import hook
import { useEffect, useState } from 'react'

//import router and route
import { BrowserRouter as Router, Route } from 'react-router-dom';

//import Components


import SavedRecipeContainer from './SavedRecipeContainer.js';



import Header from './Header.js';
import SearchForm from './SearchForm.js';
import Results from './Results.js';
// import SelectionForm from './SelectionForm.js';

import Footer from './Footer.js';
import RecipeDetails from './RecipeDetails';

import firebase from "../config/firebase.js";

function App() {
  //define useStates


  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (response) => {
      // console.log(response);
      const data = response.val();
      // console.log(data);
      const recipeObjectArray = [];
      for (let key in data) {
        // console.log(key);
        // console.log(data);

        const recipeObject = {
          key: key,
          name: data[key].foodName,
          saveState: true,
          recipeKey: data[key].key,
          recipeSource: data[key].recipeSource,
          foodImg: data[key].foodImg
        };

        // console.log(recipeObject)

        recipeObjectArray.push(recipeObject);
      }

      setSavedRecipes(recipeObjectArray);
    })

  }, []);


  return (
    <Router>
      <div className="App">

        
          <Route path='/' render={() => <Header savedRecipes={savedRecipes} />} />
          <SearchForm />
        
        <main>
          <Route exact path='/results/:query' render={() => <Results savedRecipes={savedRecipes} />} />

          <Route exact path='/recipeDetails/:id' component={RecipeDetails} />
          <Route exact path='/savedRecipes' render={() => <SavedRecipeContainer savedRecipes={savedRecipes} />} />
        </main>

        <Footer />


      </div>
    </Router>
  );
}

export default App;




