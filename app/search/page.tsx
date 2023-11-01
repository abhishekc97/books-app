'use client';

import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import BookCard from '@/components/BookCard';
import { searchBookAPI } from '@/utils/booksAPI';

interface Book {
	_id: any;
	title: string;
	author: string;
	publication: string;
	isbn: string;
	description: string;
}

export default function SearchPage() {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState<Book[]>([]);

	// handler for updating books list
	function handleBookChangeSuccess() {
		console.log('Blank');
	}

	useEffect(() => {
		const fetchBooks = async () => {
			if (query) {
				const response = await searchBookAPI(query);
				if (response?.status === 200) {
					setResults(response.data);
					console.log(response);
				} else {
					console.log('something wrong');
				}
			} else {
				setResults([]);
			}
		};

		// Debounce the fetchBooks function to reduce unnecessary requests
		const debouncedFetchBooks = debounce(fetchBooks, 300);

		// call the debounced fetchBooks function when the query changes
		debouncedFetchBooks();

		return () => {
			// Cleanup the debounced function
			debouncedFetchBooks.cancel();
		};
	}, [query]);

	return (
		<div className="searchContainer min-h-screen flex flex-col items-center justify-center">
			<div className="searchInput mb-12">
				<input
					type="text"
					className="border px-8"
					placeholder="Search for a book"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
			</div>
			<div className="searchResultsContainer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:h-[632px] mx-auto mb-8">
				{results.map((book) => (
					<div key={book._id} className="p-4">
						<BookCard
							key={book._id}
							book={book}
							handleBookChangeSuccess={handleBookChangeSuccess}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
