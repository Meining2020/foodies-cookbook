//import styles
import '../styles/App.css';
//import hook
import { useEffect, useState, useRef } from 'react'
//import firebase
import firebase from "../config/firebase.js";
//import router and route
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import Components
import Header from './Header.js';
import SearchForm from './SearchForm.js';
import Results from './Results.js';
import SavedRecipeContainer from './SavedRecipeContainer.js';
import RecipeDetails from './RecipeDetails';
import Footer from './Footer.js';

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
    });
  }, []);

  const pageTop = useRef();
  const scrollToTop = () => {
    pageTop.current.scrollIntoView({behavior: "smooth"})
  }

  return (
    <Router>
      <div className="App" ref={pageTop}>
          <Route path='/' render={() => <Header savedRecipes={savedRecipes} />} />
          <SearchForm />
        <main>
          <Route exact path='/results/:query' render={() => <Results savedRecipes={savedRecipes} />} />
          <Route exact path='/recipeDetails/:id' component={RecipeDetails} />
          <Route exact path='/savedRecipes' render={() => <SavedRecipeContainer savedRecipes={savedRecipes}  />} />
          <button className="toTop" onClick={scrollToTop}>
            <i className="fas fa-angle-up" aria-hidden="true"></i>
            <span className="srOnly"></span>
          </button>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;




