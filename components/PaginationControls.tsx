'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationControlsProps {
	hasNextPage: boolean;
	hasPrevPage: boolean;
}

export default function PaginationControls({
	hasNextPage,
	hasPrevPage
}: PaginationControlsProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const page = searchParams.get('page') ?? '1';
	const per_page = searchParams.get('per_page') ?? '6';

	return (
		<div className="paginationControls flex gap-2 items-center">
			<button
				className="bg-blue-500 text-white p-1"
				disabled={!hasPrevPage}
				onClick={() => {
					router.push(
						`/?page=${Number(page) - 1}&per_page=${per_page}`
					);
				}}
			>
				Prev page
			</button>

			<div>
				{page} / {Math.ceil(15 / Number(per_page))}
			</div>

			<button
				className="bg-blue-500 text-white p-1"
				disabled={!hasNextPage}
				onClick={() => {
					router.push(
						`/?page=${Number(page) + 1}&per_page=${per_page}`
					);
				}}
			>
				Next page
			</button>
		</div>
	);
}
