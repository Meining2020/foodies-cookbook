
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchForm = () => {
    const [userInput, setUserInput] = useState("");
    const [noInput, setNoInput] = useState(false);

    //function to get user's input
    const handleUserInput = (event) => {
        let inputValue = event.target.value;
        setUserInput(inputValue);
    }
    //function to update state of noInput 
    const handleSubmitClick = () => {
        if (userInput) {
            setNoInput(false);
        } else {
            setNoInput(true);
        }
        setUserInput("");
    }

    return (
        <div className="formContainer">
            <div className="wrapper">
                <form className="searchForm">
                    <label htmlFor="input" className="srOnly">input keyword to search recipes</label>
                    <input type="text" id="input" value={userInput} onChange={handleUserInput} placeholder="Search food" />
                    <Link to={`/results/${userInput}`}>
                        <button type="submit" onClick={handleSubmitClick}>
                            <i className="fas fa-search" aira-hidden="true"></i>
                            <span className="srOnly">click to start search</span>

                        </button>
                    </Link>
                </form>
                {
                    noInput
                        ? <p className="errorMessage">Please enter a food!</p>
                        : ""
                }
            </div>
        </div>
    )
}

export default SearchForm;


