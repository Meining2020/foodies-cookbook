import { useState } from 'react';

const SelectionForm = ({ dietFilterFuntion }) => {
    const [filterDietChoice, setFilterDietChoice] = useState("placeholder");
    //function to get selected value
    const handleDietSelection = (event) => {
        const selectedValue = event.target.value;
        setFilterDietChoice(selectedValue);
    }
    //function to get call filter function
    const handleSubmitClick = (event) => {
        event.preventDefault();
        dietFilterFuntion(filterDietChoice);
    }

    return (
        <form >
            <select name="dietType" id="dietType" onChange={handleDietSelection} value={filterDietChoice}>
                <option value="placeholder" disabled>Select diet type</option>
                <option value="Balanced">Balanced</option>
                <option value="High-Fiber">High-Fiber</option>
                <option value="High-Protein">High-Protein</option>
                <option value="Low-Carb">Low-Carbonate</option>
                <option value="Low-Fat">Low-Fat</option>
                <option value="Low-Sodium">Low-Sodium</option>
                <option value="all">Just show me all!</option>
            </select>
            <button onClick={handleSubmitClick}>
                <i className="fas fa-filter" aria-hidden="true"></i>
                <span className="srOnly">click to filter by diet</span>
            </button>
        </form>
    )
}

export default SelectionForm;