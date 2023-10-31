import React from 'react';

const PopupDefault = (props: any) => {
	return (
		<div className="back-drop fixed top-0 left-0 w-screen h-screen bg-gray-950/30 z-40 flex flex-col gap-4 justify-center items-center overflow-hidden">
			<div className="w-10/12 flex justify-end">
				<div
					className="w-8 h-8 rounded-full bg-white font-semibold flex justify-center items-center cursor-pointer"
					onClick={props.closePopup}
				>
					&#x2715;
				</div>
			</div>
			<div className="content-holder bg-white p-4 w-10/12 rounded-xl">
				{props.children}
			</div>
		</div>
	);
};

export default PopupDefault;
