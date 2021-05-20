import { useState } from 'react';

const SelectionForm = (props) => {

    const { dietFilterFuntion } = props;
    const [filterDietChoice, setFilterDietChoice] = useState("placeholder");

    const handleDietSelection = (event) => {
        // console.log(event.target.value);
        const selectedValue = event.target.value;
        setFilterDietChoice(selectedValue);
    }

    const handleSubmitClick = (event) => {
        event.preventDefault();
        dietFilterFuntion(filterDietChoice);
    }

    return (
        <>
            {/* input and selection area */}
            <form action="submit">

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

                <button onClick={handleSubmitClick}><i className="fas fa-filter"></i></button>

            </form>
        </>
    )
}

export default SelectionForm;