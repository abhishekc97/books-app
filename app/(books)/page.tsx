'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import BookCard from '@/components/BookCard';
import PaginationControls from '@/components/PaginationControls';
import PopupDefault from '@/components/PopupDefault';
import AddBookPopup from '@/components/AddBookPopup';
import { getAllBooksAPI } from '@/utils/booksAPI';

import { Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Book {
	title: string;
	author: string;
	publication: string;
	isbn: string;
	description: string;
}

export default function BooksPage({
	searchParams
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const router = useRouter();

	// state for storing books
	const [books, setBooks] = useState<Book[]>([]);

	// pagination parameters
	const page = searchParams['page'] ?? '1';
	const per_page = searchParams['per_page'] ?? '6';

	const start = (Number(page) - 1) * Number(per_page);
	const end = start + Number(per_page);

	// Popup state
	const [showPopup, setShowPopup] = useState(false);

	// API call to getAllBooksAPI
	async function getAllBooks() {
		const bookData: Book[] = await getAllBooksAPI();
		setBooks(bookData);
	}

	// Navigate to the /search route
	function handleSearchClick() {
		router.push('/search');
	}

	// Open the Popup for creating a new book entry
	const handleCreateBookClick = () => {
		setShowPopup(true);
	};

	// Close the Popup
	const handleClosePopup = () => {
		setShowPopup(false);
	};

	// handler for updating books list
	function handleBookCreateSuccess() {
		getAllBooks();
	}

	useEffect(() => {
		getAllBooks();
	}, []);

	// Slice the books array according to start and end values, before rendering
	const entries = books.slice(start, end);

	return (
		<div className="min-h-screen flex flex-col items-center justify-center">
			{/* Top section */}
			<div className="topSection flex w-full justify-between px-16 sm:my-6 md:my-6 mb-8 h-16 min-h-16 ">
				<Button
					variant="outline-secondary"
					onClick={handleSearchClick}
					className="w-fit border rounded-md px-4"
				>
					Search for a book
				</Button>
				<Button
					variant="primary"
					className="w-fit px-4 font-semibold text-white bg-blue-950 rounded-md"
					onClick={handleCreateBookClick}
				>
					Create Book
				</Button>
			</div>
			{/* Grid layout for showing books */}
			<div className="booksContainer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:h-[632px] mx-auto mb-8">
				{entries.map((book, index) => (
					<div key={index} className="p-4">
						<BookCard
							title={book.title}
							author={book.author}
							publication={book.publication}
							isbn={book.isbn}
							description={book.description}
						/>
					</div>
				))}
			</div>
			<PaginationControls
				hasNextPage={end < books.length}
				hasPrevPage={start > 0}
			/>
			{showPopup && (
				<PopupDefault closePopup={handleClosePopup}>
					<AddBookPopup
						handleBookCreateSuccess={handleBookCreateSuccess}
						closePopup={handleClosePopup}
					/>
				</PopupDefault>
			)}
			<ToastContainer />
		</div>
	);
}
