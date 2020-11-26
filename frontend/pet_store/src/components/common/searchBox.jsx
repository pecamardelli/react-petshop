import React from 'react';

const SearchBox = ({onChange, value}) => {
    return (
        <div className="search-box">
             <input
                onChange={onChange}
                type="text"
                name="search"
                className="search"
                placeholder="Search..."
                value={value || ''}
            />
        </div>
    );
};

export default SearchBox;