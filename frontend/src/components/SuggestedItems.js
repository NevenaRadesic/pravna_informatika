import React from 'react';
import Multiselect from 'multiselect-react-dropdown';

function SuggestedItems({ options, setSelectedValueParent }) {
    const [selectedValue, setSelectedValue] = React.useState([]);

    const onSelect = (selectedList, selectedItem) => {
        setSelectedValue(selectedList);
        setSelectedValueParent(selectedList);
        console.log(selectedList);
    };

    const onRemove = (selectedList, removedItem) => {
        setSelectedValue(selectedList);
        setSelectedValueParent(selectedList);
        console.log(selectedList);
    };


    return (
        <div>
            <Multiselect
                options={options || []}
                selectedValues={selectedValue}
                onSelect={onSelect}
                onRemove={onRemove}
                displayValue="name"
                // add placeholder
                placeholder="Predloženi propisi"
            />
        </div>
    );
}

export default SuggestedItems;
