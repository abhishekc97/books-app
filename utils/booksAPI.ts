import axios from 'axios';
const URL = process.env.BACKEND_URL;

// GET all books API Call
export async function getAllBooksAPI() {
	try {
		const reqUrl = `${URL}/api/books/all`;
		const result = await axios.get(reqUrl);
		if (result) {
			return result.data;
		}
	} catch (error) {
		console.log(error);
	}
}

// GET API Call for getting a book by its id
export async function getBookByIdAPI(id: any) {
	try {
		const reqUrl = `${URL}/api/books/${id}`;
		const result = await axios.get(reqUrl);
		if (result) {
			return result.data;
		}
	} catch (error) {
		console.log(error);
	}
}

// POST API call to create a new book
export async function createBookAPI(body: any) {
	try {
		const reqUrl = `${URL}/api/books/create-book`;
		const result = await axios.post(reqUrl, body);
		if (result) {
			return result;
		}
	} catch (error) {
		console.log(error);
	}
}

// PUT API call to create a new book
export async function updateBookByIdAPI(id: any, body: any) {
	try {
		const reqUrl = `${URL}/api/books/update/${id}`;
		const result = await axios.put(reqUrl, body);
		if (result) {
			return result;
		}
	} catch (error) {
		console.log(error);
	}
}

// DELETE API to delete a book
export async function deleteBookByIdAPI(id: any) {
	try {
		const reqUrl = `${URL}/api/books/delete/${id}`;
		const result = await axios.delete(reqUrl);
		if (result) {
			return result;
		}
	} catch (error) {
		console.log(error);
	}
}

// GET API for searching book by title, author and description
export async function searchBookAPI(queryString: any) {
	try {
		console.log(queryString);
		const reqUrl = `${URL}/api/books/search/query?query=${queryString}`;
		const results = await axios.get(reqUrl);
		if (results) {
			return results;
		}
	} catch (error) {
		console.log(error);
	}
}
