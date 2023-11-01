'use client';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getBookByIdAPI, updateBookByIdAPI } from '@/utils/booksAPI';

interface Book {
	title: string;
	author: string;
	publication: string;
	isbn: string;
	description: string;
}

export default function EditBookPopup({
	book,
	handleBookEditSuccess,
	closePopup
}: {
	book: any;
	handleBookEditSuccess: () => void;
	closePopup: () => void;
}) {
	// book states
	const bookId = book._id;
	const [bookData, setBookData] = useState<Book>({
		title: '',
		author: '',
		publication: '',
		isbn: '',
		description: ''
	});
	// error message
	const [errorMessage, setErrorMessage] = useState('');

	// get book details
	async function getBookDetails() {
		const id = book._id;
		if (book._id) {
			const result = await getBookByIdAPI(id);
			if (result) {
				setBookData({ ...result });
			}
		}
	}

	// change handler
	function handleChange(event: any) {
		const { name, value } = event.target as HTMLInputElement;
		setBookData({
			...bookData,
			[name]: value
		});
	}

	// form validation
	function validateForm() {
		if (
			bookData.title === null ||
			bookData.title === undefined ||
			bookData.title === ''
		) {
			setErrorMessage('Name field is required.');
			return false;
		}
		return true;
	}

	// submit handler
	async function handleSubmit(e: any) {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		const result = await updateBookByIdAPI(bookId, bookData);
		if (result?.status === 200) {
			handleBookEditSuccess();
			toast.success('Updated new book!', {
				position: toast.POSITION.TOP_CENTER
			});
			closePopup();
		} else {
			toast.error('Could not update book', {
				position: toast.POSITION.TOP_CENTER
			});
			closePopup();
		}
	}

	// get book details on first loading
	useEffect(() => {
		getBookDetails();
	}, []);

	return (
		<>
			<Form
				onSubmit={handleSubmit}
				className="rounded-xl flex flex-col gap-4 overflow-hidden items-center"
			>
				<span className="font-semibold text-lg text-center w-[50%]">
					Edit Book
				</span>
				<div className="formInnerContainer flex flex-col items-start px-4">
					<div className="inpBox flex gap-8 items-center">
						<span className="w-40">Book Name*</span>
						<Form.Control
							type="text"
							name="title"
							placeholder="Name"
							value={bookData.title}
							onChange={handleChange}
							className="m-4 w-64"
						/>
					</div>
					{errorMessage !== '' && (
						<div className="text-red-500">{errorMessage}</div>
					)}
					{/* author */}
					<div className="inpBox flex gap-8 items-center">
						<span className="w-40">Author</span>
						<Form.Control
							type="text"
							name="author"
							placeholder="Author"
							value={bookData.author}
							onChange={handleChange}
							className="m-4 w-64"
						/>
					</div>
					{/* publication */}
					<div className="inpBox flex gap-8 items-center">
						<span className="w-40">Publication</span>
						<Form.Control
							type="text"
							name="publication"
							placeholder="Publication"
							value={bookData.publication}
							onChange={handleChange}
							className="m-4 w-64"
						/>
					</div>
					{/* isbn */}
					<div className="inpBox flex gap-8 items-center">
						<span className="w-40">ISBN code</span>
						<Form.Control
							type="text"
							name="isbn"
							placeholder="ISBN"
							value={bookData.isbn}
							onChange={handleChange}
							className="m-4 w-64"
						/>
					</div>
					{/* description */}
					<div className="inpBox flex gap-8 items-center">
						<span className="w-40">Description</span>
						<Form.Control
							type="text"
							name="description"
							placeholder="Description"
							value={bookData.description}
							onChange={handleChange}
							className="m-4 w-64"
						/>
					</div>
				</div>
				<div className="flex gap-8 px-8">
					<Button type="submit" variant="primary">
						Save
					</Button>
					<Button variant="outline-info" onClick={closePopup}>
						Cancel
					</Button>
				</div>
			</Form>
		</>
	);
}
