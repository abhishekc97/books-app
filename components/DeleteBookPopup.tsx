'use client';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { deleteBookByIdAPI } from '@/utils/booksAPI';

export default function DeleteBookPopup({
	book,
	handleBookDeleteSuccess,
	closePopup
}: {
	book: any;
	handleBookDeleteSuccess: () => void;
	closePopup: () => void;
}) {
	// book id from book prop
	const bookId = book._id;

	// handler when delete is clicked
	async function handleDeleteClick() {
		const result = await deleteBookByIdAPI(bookId);
		if (result?.status === 200) {
			handleBookDeleteSuccess();
			toast.success('Book Deleted.', {
				position: toast.POSITION.TOP_CENTER
			});
			closePopup();
		} else {
			toast.error('Could not delete book', {
				position: toast.POSITION.TOP_CENTER
			});
			closePopup();
		}
	}

	return (
		<>
			<div className="flex flex-col gap-8 items-center justify-center">
				<div>Are you sure you want to delete the book?</div>
				<div className="flex gap-8 px-8">
					<Button variant="danger" onClick={handleDeleteClick}>
						Delete
					</Button>
					<Button variant="outline-info" onClick={closePopup}>
						Cancel
					</Button>
				</div>
			</div>
		</>
	);
}
