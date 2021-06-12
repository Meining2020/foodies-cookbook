import { Link } from 'react-router-dom';

const Header = ({savedRecipes}) => {
    return (
        <header>
            <div className="wrapper">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">
                                <button className="navButton iconButton" >
                                    <i className="fas fa-home" aria-hidden="true"></i>
                                    <span className="srOnly">Click to go to home page</span>
                                    
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/savedRecipes">
                                <button className="navButton iconButton" >
                                    <i className="fas fa-heart" aria-hidden="true"></i>
                                    <span className="srOnly">Click to open saved recipes</span>
                                    <span className="recipeAmount" aria-label="number of saved recipes in the list">{savedRecipes.length}</span>
                                </button>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <h1 className="headingFade">Foodie's Cookbook!</h1>
                <h2 className="homeHeading headingFade">Start Your Food Journey!</h2>
            </div>
        </header>

    )
}

export default Header;