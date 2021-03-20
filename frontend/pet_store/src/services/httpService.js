//////////////////////////////////////////////////////
// const apiUrl = "http://localhost:3001/api?act=";
// const options = { mode: "cors" };
// function getAll() {
//   return fetch(`${apiUrl}getall`, options);
// }

// function update(url) {
//   return fetch(`${apiUrl}update&${url}`, options);
// }

// function add(url) {
//   return fetch(`${apiUrl}add&${url}`, options);
// }

// function del(url) {
//   return fetch(`${apiUrl}delete&${url}`, options);
// }
//////////////////////////////////////////////////////

// MOCK BACKEND

const data = [
  {
    id: 1,
    animal: "Dog",
    description: "Wags tail when happy",
    age: 2,
    price: 250,
  },
  {
    id: 2,
    animal: "Cat",
    description: "Black colour, friendly with kids",
    age: 3,
    price: 50,
  },
  {
    id: 3,
    animal: "Love Bird",
    description: "Blue with some yellow",
    age: 2,
    price: 100,
  },
];

const responseOptions = { status: 200, statusText: "Ok" };

function getAll() {
  return new Promise((resolve) =>
    resolve(new Response(JSON.stringify(data), responseOptions))
  );
}

function update(url) {
  const index = data.findIndex((pet) => pet.id === parseInt(url.get("id")));
  if (index) {
    data[index].animal = url.get("animal");
    data[index].description = url.get("description");
    data[index].age = url.get("age");
    data[index].price = url.get("price");
  }
  return new Promise((resolve) =>
    resolve(
      new Response(
        JSON.stringify({ status: "Update animal successful" }),
        responseOptions
      )
    )
  );
}

function add(url) {
  const newPet = {
    id: data.length + 1,
    animal: url.get("animal"),
    description: url.get("description"),
    age: url.get("age"),
    price: url.get("price"),
  };
  data.push(newPet);
  return new Promise((resolve) =>
    resolve(
      new Response(
        JSON.stringify({ status: "Add animal successful" }),
        responseOptions
      )
    )
  );
}

function del(url) {
  const index = data.findIndex((pet) => pet.id === parseInt(url.get("id")));
  if (index) data.splice(index, 1);
  return new Promise((resolve) =>
    resolve(
      new Response(
        JSON.stringify({ status: "Delete animal successful" }),
        responseOptions
      )
    )
  );
}

export const httpService = { getAll, update, add, del };
