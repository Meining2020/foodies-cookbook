
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchForm = () => {

    const [userInput, setUserInput] = useState("");
    // const [query, setQuery] = useState("");
    const [noInput, setNoInput] = useState(false);

    //function to get user's input
    const handleUserInput = (event) => {
        let inputValue = event.target.value;
        setUserInput(inputValue);
    }
    
    const handleSubmitClick = () => {
        // event.preventDefault();
        // setQuery(userInput);  
        if (userInput) {
            setNoInput(false);
        } else {
            setNoInput(true);
        }
        setUserInput("");

        document.querySelector("main").scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className="formContainer">
            <div className="wrapper">
                {/* search area */}
                <form className="searchForm">
                    {/* label for screen readers only*/}
                    <label htmlFor="input" className="srOnly">input keyword to search recipes</label>
                    {/* search bar*/}
                    <input type="text" id="input" value={userInput} onChange={handleUserInput} placeholder="Search food" />

                    {/* submit button */}
                    <Link to={`/results/${userInput}`}>
                        <button type="submit" onClick={handleSubmitClick}>
                            <i className="fas fa-search" aira-hidden="true"></i>
                            <span className="srOnly">click to start search</span>

                        </button>
                    </Link>

                </form>
                {/* error message for no input */}
                {

                    noInput
                        ? <p>Please enter a food!</p>
                        : ""
                }
            </div>

        </div>
    )
}


export default SearchForm;


