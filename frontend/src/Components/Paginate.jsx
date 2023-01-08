import React from 'react';

const Paginate = ({
	postsPerPage,
	totalPosts,
	currentPage,
	paginate,
	previousPage,
	nextPage,
}) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<div className="pagination-container flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
			<ul className="pagination ">
				<button onClick={previousPage} className="page-number relative ml-5 inline items-center rounded border border-[#178C8C] bg-white px-4 py-2 text-sm font-medium text-[#178C8C] hover:bg-[#175D8A] hover:text-white">
					Prev
				</button>
				{pageNumbers.map((number) => (
					<button
						key={number}
						onClick={() => paginate(number)}
						className={
							'page-number relative ml-3 inline-flex items-center rounded border border-[#178C8C] bg-white px-4 py-2 text-sm font-medium text-[#178C8C] hover:bg-[#175D8A] hover:text-white' + (number === currentPage ? 'active' : '')
						}
					>
						{number}
					</button>
				))}
				<button onClick={nextPage} className="page-number relative ml-3 inline items-center rounded border border-[#178C8C] bg-white px-4 py-2 text-sm font-medium text-[#178C8C] hover:bg-[#175D8A] hover:text-white ">
					Next
				</button>
			</ul>
		</div>
	);
};

export default Paginate;