import React, { useState } from 'react';
import PetsTable from './common/petsTable';
import SearchBox from './common/searchBox';

const SearchContainer = (props) => {
    const [filterKey, setFilterKey] = useState(props.match.params.keyword || '');
    
    const setKeyword = (e) => {
        setFilterKey(e.target.value);
    };

    return (
        <div>
            <SearchBox onChange={setKeyword} value={filterKey}/>
            <PetsTable options={false} filterBy={filterKey}/>
        </div>
    );
};

export default SearchContainer;