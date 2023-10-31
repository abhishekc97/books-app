'use client';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { createBookAPI } from '@/utils/booksAPI';
interface Book {
	title: string;
	author: string;
	publication: string;
	isbn: string;
	description: string;
}

export default function AddBookPopup({
	handleBookCreateSuccess,
	closePopup
}: {
	handleBookCreateSuccess: () => void;
	closePopup: () => void;
}) {
	const [book, setBook] = useState<Book>({
		title: '',
		author: '',
		publication: '',
		isbn: '',
		description: ''
	});

	const [errorMessage, setErrorMessage] = useState('');

	function handleChange(event: any) {
		const { name, value } = event.target as HTMLInputElement;
		setBook({
			...book,
			[name]: value
		});
	}

	function validateForm() {
		if (
			book.title === null ||
			book.title === undefined ||
			book.title === ''
		) {
			setErrorMessage('Name field is required.');
			return false;
		}
		return true;
	}

	async function handleSubmit(e: any) {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}
		const result = await createBookAPI(book);
		if (result?.status === 200) {
			handleBookCreateSuccess();
			toast.success('Added new book!', {
				position: toast.POSITION.TOP_CENTER
			});
			closePopup();
		} else {
			toast.error('Could not add book', {
				position: toast.POSITION.TOP_CENTER
			});
			closePopup();
		}
	}

	return (
		<>
			<Form
				onSubmit={handleSubmit}
				className="rounded-xl flex flex-col gap-4 overflow-hidden items-center"
			>
				<span className="font-semibold text-lg text-center w-[50%]">
					Create a Book
				</span>
				<div className="formInnerContainer flex flex-col items-start px-4">
					<div className="inpBox flex gap-8 items-center">
						<span className="w-40">Book Name*</span>
						<Form.Control
							type="text"
							name="title"
							placeholder="Name"
							value={book.title}
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
							value={book.author}
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
							value={book.publication}
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
							value={book.isbn}
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
							value={book.description}
							onChange={handleChange}
							className="m-4 w-64"
						/>
					</div>
				</div>
				<Button
					type="submit"
					variant="primary"
					className="flex my-4 mx-3 px-8 font-bold text-white bg-blue-950"
				>
					Save
				</Button>
			</Form>
		</>
	);
}
