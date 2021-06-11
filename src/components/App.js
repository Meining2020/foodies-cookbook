//import styles
import '../styles/App.css';

//import hook


//import router and route
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

//import Components


import SavedRecipeContainer from './SavedRecipeContainer.js';



import Header from './Header.js';
import SearchForm from './SearchForm.js';
import Results from './Results.js';
// import SelectionForm from './SelectionForm.js';

import Footer from './Footer.js';
import RecipeDetails from './RecipeDetails';





function App() {
  //define useStates


  return (
    <Router>
      <div className="App">


        <Header />
        <SearchForm />
        <Route exact path='/results/:query' component={Results} />
        <Route exact path='/recipeDetails/:id' component={RecipeDetails} />



        {/* show list of saved recipe */}
        {/* <SavedRecipeContainer recipeListData={savedRecipe} removeRecipeFunction={handleRemoveRecipe} /> */}



        <Footer />


      </div>
    </Router>
  );
}

export default App;




