interface BookCardProps {
	title: String;
	author: String;
	publication: String;
	isbn: String;
	description: String;
}

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

export default function BookCard(props: BookCardProps) {
	// Randomly select a color from the lightShadedColors array
	const randomColor =
		lightShadedColors[Math.floor(Math.random() * lightShadedColors.length)];

	const descriptionStyle = {
		display: '-webkit-box',
		WebkitLineClamp: 3,
		WebkitBoxOrient: 'vertical',
		overflow: 'hidden',
		textOverflow: 'ellipsis'
	} as React.CSSProperties;

	return (
		<div
			className={`bookCard flex flex-col rounded-lg border shadow-md h-64 w-56 p-4 ${randomColor}`}
		>
			<div className="bookTitle text-center text-2xl capitalize">
				{props.title}
			</div>
			<div className="Author text-center mb-8 capitalize">
				{props.author}
			</div>
			<div className="publication text-center capitalize">
				{props.publication}
			</div>
			<div className="isbn text-sm">{props.isbn}</div>
			<div className="description" style={descriptionStyle}>
				{props.description}
			</div>
		</div>
	);
}
