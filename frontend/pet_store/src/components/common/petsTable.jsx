import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import icons from '../../assets/icons';
import { Link } from 'react-router-dom';
import PetStoreContext from '../../context/petStoreContext';
import httpService from '../../services/httpService';

const PetsTable = (props) => {
    const [sortOrder, setSortOrder] = useState('asc');
    const petStoreContext = useContext(PetStoreContext);
    const [petList, setPetList] = useState([]);
    const { filterBy } = props;

    useEffect(() => {
        let filtered;
        // Check if we have a filter value
        if (filterBy) {
            filtered = petStoreContext.petList.filter(item => (
               item.animal.match(new RegExp(filterBy, 'i')) ||
               item.description.match(new RegExp(filterBy, 'i'))
            ));
        }
        else filtered = petStoreContext.petList;
        setPetList(filtered);
    }, [ setPetList, petStoreContext.petList, filterBy ]);

    const sortList = (path) => {
        if (sortOrder === 'asc') setSortOrder('desc');
        else if (sortOrder === 'desc') setSortOrder('asc');

        const sorted = _.orderBy(petList, [path], [sortOrder]);
        setPetList(sorted);
    }

    const handleDelete = async (id) => {
        var encodedId = new URLSearchParams({ id });
        const response = await httpService.del(encodedId);
        
        if (response.status === 200) {
            // Cloning the entire array safely (not shallow copy).
            const newPetList = JSON.parse(JSON.stringify(petStoreContext.petList))
                .filter(p => p.id !== id);
            
            petStoreContext.setPetList(newPetList);
        }
    };

    return (
        <table className="pets-table">
            <thead>
                <tr>
                    <th
                        className="text-center"
                        onClick={() => sortList('id')}>
                        ID
                    </th>
                    <th
                        className="text-left"
                        onClick={() => sortList('animal')}>
                        ANIMAL
                    </th>
                    <th
                        className="text-left"
                        onClick={() => sortList('description')}>
                        DESCRIPTION
                    </th>
                    <th
                        className="text-center"
                        onClick={() => sortList('age')}>
                        AGE
                    </th>
                    <th
                        className="text-center"
                        onClick={() => sortList('price')}>
                        PRICE
                    </th>
                    { props.options ? (<th
                        className="table-options text-center"
                        colSpan='2' >
                            OPTIONS
                        </th>) : null }
                </tr>
            </thead>
            <tbody>
                {petList.map(item => <tr key={`pet-${item.id}`}>
                        <td className="text-center">{item.id}</td>
                        <td>{item.animal}</td>
                        <td>{item.description}</td>
                        <td className="text-center">{item.age}</td>
                        <td className="text-center">{item.price}</td>
                        { props.options ? (<td
                            key={`edit-${item.id}`}
                            className="table-options text-center">
                                <Link to={`/pets?id=${item.id}`}>
                                    {icons.editIcon()}
                                </Link>
                            </td>) : null }
                        { props.options ? (<td
                            key={`del-${item.id}`}
                            className="table-options text-center">
                                <div onClick={() => handleDelete(item.id)}>
                                    {icons.trashIcon()}
                                </div>
                            </td>) : null }
                    </tr>)}
            </tbody>
        </table>
    );
};

export default PetsTable;