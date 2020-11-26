import React from 'react';
import { Link } from 'react-router-dom';
import PetsTable from './common/petsTable';

const Edit = () => {
    return (
        <div>
            <Link to="/pets">
                <button className="pets-add-btn">Add new</button>
            </Link>
            <PetsTable options={true} />
        </div>
    );
};

export default Edit;