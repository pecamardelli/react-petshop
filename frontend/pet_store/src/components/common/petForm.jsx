import React, { useEffect, useState, useContext } from "react";
import PetStoreContext from "../../context/petStoreContext";
import { httpService } from "../../services/httpService";

const PetForm = (props) => {
  const [petObj, setPetObj] = useState({});
  const [formTitle, setFormTitle] = useState("ADD NEW PET");
  const petStoreContext = useContext(PetStoreContext);

  useEffect(() => {
    const petId = new URLSearchParams(props.location.search).get("id");

    if (petId) {
      const pet = petStoreContext.petList.filter((p) => p.id === +petId);
      setPetObj(pet[0]);
      setFormTitle("UPDATE PET DATA");
    }
  }, [setPetObj, petStoreContext.petList, props.location.search]);

  const handleSubmit = async () => {
    // Encode the whole object and pass it to the httpService.
    var uriEncoded = new URLSearchParams(petObj);
    // Cloning the entire array safely (not shallow copy).
    const newPetList = JSON.parse(JSON.stringify(petStoreContext.petList));
    let result;

    // If id is not defined, a new pet is being added
    if (!petObj.id) {
      result = await httpService.add(uriEncoded);
      // If operation was successfull get all pets again from database.
      // We do it this way because the backend doesn't return the newly
      // added object or its id.
      if (result.status === 200) {
        const response = await httpService.getAll();
        const data = await response.json();
        petStoreContext.setPetList(data);
        props.history.push("/edit");
      }
    } else {
      result = await httpService.update(uriEncoded);
      // If operation was successfull, update the pet list on the state
      // to avoid calling the backend again.
      if (result.status === 200) {
        const index = newPetList.findIndex((p) => p.id === petObj.id);
        newPetList[index] = petObj;
        petStoreContext.setPetList(newPetList);
        props.history.push("/edit");
      }
    }
    console.log(result);
  };

  const handleChange = (e) => {
    const current = { ...petObj };
    current[e.target.name] = e.target.value;
    setPetObj(current);
  };

  return (
    <div className="pet-form">
      <h4>{formTitle}</h4>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td>
              <label htmlFor="animal">Animal</label>
            </td>
            <td>
              <input
                onChange={handleChange}
                type="text"
                className="form-text"
                name="animal"
                id="animal"
                value={petObj.animal || ""}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="desc">Description</label>
            </td>
            <td>
              <input
                onChange={handleChange}
                value={petObj.description || ""}
                type="text"
                className="form-text"
                name="description"
                id="desc"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="age">Age</label>
            </td>
            <td>
              <input
                type="number"
                className="form-number"
                name="age"
                id="price"
                min="0"
                step="1"
                onChange={handleChange}
                value={petObj.age || 0}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="price">Price</label>
            </td>
            <td>
              <input
                type="number"
                className="form-number"
                name="price"
                id="price"
                min="0"
                step="0.01"
                onChange={handleChange}
                value={petObj.price || 0}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button onClick={handleSubmit}>Submit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PetForm;
