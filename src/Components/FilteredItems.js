import React from 'react'

function FilteredItems({name, age, inputText}) {

    return (
        <div>
            {inputText === '' ? '' : <li>{name} is {age} years old.</li>}   {/* RENDER LIST CONDITIONALLY */}
        </div>
    )
}

export default FilteredItems
