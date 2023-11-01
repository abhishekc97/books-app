'use client';
import { useState } from 'react';
import PopupDefault from './PopupDefault';
import EditBookPopup from './EditBookPopup';
import DeleteBookPopup from './DeleteBookPopup';

// colors for book background
const lightShadedColors = [
	'bg-blue-100',
	'bg-green-100',
	'bg-yellow-100',
	'bg-pink-100',
	'bg-purple-100',
	'bg-orange-100',
	'bg-teal-100',
	'bg-red-100',
	'bg-indigo-100',
	'bg-gray-100'
];

export default function BookCard({
	book,
	handleBookChangeSuccess
}: {
	book: any;
	handleBookChangeSuccess: () => void;
}) {
	// dropdown and popup states
	const [showDropdown, setShowDropdown] = useState(false);
	const [showEditPopup, setShowEditPopup] = useState(false);
	const [showDeletePopup, setShowDeletePopup] = useState(false);

	// Show the Edit Book popup and dropdown
	const handleEditClick = () => {
		setShowDropdown(false);
		setShowEditPopup(true);
	};

	// Handle book deletion logic and dropdown
	const handleDeleteClick = () => {
		setShowDropdown(false);
		setShowDeletePopup(true);
	};

	// Randomly select a color from the lightShadedColors array
	const randomColor =
		lightShadedColors[Math.floor(Math.random() * lightShadedColors.length)];

	// style descriptor for the book description
	const descriptionStyle = {
		display: '-webkit-box',
		WebkitLineClamp: 3,
		WebkitBoxOrient: 'vertical',
		overflow: 'hidden',
		textOverflow: 'ellipsis'
	} as React.CSSProperties;

	// dropdown toggler
	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
	};

	// Close the Popups
	const handleClosePopup = () => {
		setShowEditPopup(false);
		setShowDeletePopup(false);
	};

	return (
		<div
			className={`bookCard flex flex-col rounded-lg border shadow-md h-64 w-56 p-4 ${randomColor} relative`}
		>
			<span
				className="cursor-pointer absolute top-0 right-0 p-2"
				onClick={toggleDropdown}
			>
				:
			</span>
			{showDropdown && (
				<div className="flex flex-col absolute top-10 right-0 p-2 bg-white border shadow-md">
					<button
						onClick={handleEditClick}
						className="p-2 hover:bg-gray-200"
					>
						Edit
					</button>
					<button
						onClick={handleDeleteClick}
						className="p-2 hover:bg-gray-200"
					>
						Delete
					</button>
				</div>
			)}
			<div className="bookTitle text-center text-2xl capitalize">
				{book.title}
			</div>
			<div className="Author text-center mb-8 capitalize">
				{book.author}
			</div>
			<div className="publication text-center capitalize">
				{book.publication}
			</div>
			<div className="isbn text-sm">{book.isbn}</div>
			<div className="description italic" style={descriptionStyle}>
				{book.description}
			</div>
			{showEditPopup && (
				<PopupDefault closePopup={handleClosePopup}>
					<EditBookPopup
						book={book}
						closePopup={handleClosePopup}
						handleBookEditSuccess={handleBookChangeSuccess}
					/>
				</PopupDefault>
			)}
			{showDeletePopup && (
				<PopupDefault closePopup={handleClosePopup}>
					<DeleteBookPopup
						book={book}
						closePopup={handleClosePopup}
						handleBookDeleteSuccess={handleBookChangeSuccess}
					/>
				</PopupDefault>
			)}
		</div>
	);
}
