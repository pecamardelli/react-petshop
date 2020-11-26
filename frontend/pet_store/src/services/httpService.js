
const apiUrl = 'http://localhost:3001/api?act=';
const options = { mode: 'cors'};

function getAll() {
	return fetch(`${apiUrl}getall`, options);
}

function update(url) {
	return fetch(`${apiUrl}update&${url}`, options);
}

function add(url) {
	return fetch(`${apiUrl}add&${url}`, options);
}

function del(url) {
	return fetch(`${apiUrl}delete&${url}`, options);
}

export default { getAll, update, add, del };