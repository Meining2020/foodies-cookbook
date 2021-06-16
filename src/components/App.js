import '../styles/App.css';
import { useEffect, useState, useRef } from 'react'
import firebase from "../config/firebase.js";
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import Components
import Header from './Header.js';
import SearchForm from './SearchForm.js';
import Results from './Results.js';
import SavedRecipeContainer from './SavedRecipeContainer.js';
import RecipeDetails from './RecipeDetails';
import Footer from './Footer.js';

function App() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  //useEffect for Firebase
  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (response) => {
      const data = response.val();
      const recipeObjectArray = [];
      for (let key in data) {
        const recipeObject = {
          key: key,
          name: data[key].foodName,
          saveState: true,
          recipeKey: data[key].key,
          recipeSource: data[key].recipeSource,
          foodImg: data[key].foodImg
        };
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
          {/* Show results when user does a search */}
          <Route exact path='/results/:query' render={() => <Results savedRecipes={savedRecipes} />} />
          {/* Show nutrition facts when user click nutrition facts button*/}
          <Route exact path='/recipeDetails/:id' component={RecipeDetails} />
          {/* Show saved recipes when user saved recipe icon*/}
          <Route exact path='/savedRecipes' render={() => <SavedRecipeContainer savedRecipes={savedRecipes}  />} />
          {/* button to scroll to top */}
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




