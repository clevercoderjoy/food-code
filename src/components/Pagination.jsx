import React from 'react';

const Pagination = ({ currentPage, setCurrentPage, totalItems, disableButtons }) => {
  const handleClick = (page) => {
    if (!disableButtons) {
      setCurrentPage(page);
    }
  };

  const pages = [...Array(totalItems).keys()].map(num => num + 1);

  const btnClass = "btn hover:uppercase hover:scale-110 text-center cursor-pointer font-bold p-2 rounded-[3px] border-black border-2 my-0 mx-2 tracking-widest transition-all duration-100 ease-in-out";
  const activeButton = "bg-black text-white";
  const disabledButton = "opacity-50 cursor-not-allowed";

  return (
    <div className="pagination text-center mt-8 mx-auto">
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnClass} ${currentPage === 1 ? disabledButton : ''}`}
      >
        Prev
      </button>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => handleClick(page)}
          className={`${btnClass} ${currentPage === page ? activeButton : ''}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalItems}
        className={`${btnClass} ${currentPage === totalItems ? disabledButton : ''}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
