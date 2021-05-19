import { useState } from 'react';
// import Select from 'react-select';

const SelectionForm = (props) => {

    const { dietFilterFuntion } = props;

    const [filterDietChoice, setFilterDietChoice] = useState("placeholder");
    // const [filterMeal, setFilterMeal] = useState();


    const handleDietSelection = (event) => {
        // console.log(event.target.value);
        const selectedValue = event.target.value;
        setFilterDietChoice(selectedValue);
    }

    // const handleMealSelection = (event) => {
    //     console.log(event.target.value);
    //     const selectedValue = event.target.value;
    //     setFilterMeal(selectedValue);
    // }


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

                {/* <select name="mealType" id="mealType" onChange={handleMealSelection}>
                    <option value="">Select meal type</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                    <option value="Teatime">Teatime</option>
                </select> */}

                <button onClick={handleSubmitClick}><i className="fas fa-filter"></i></button>

            </form>
        </>
    )
}

export default SelectionForm;