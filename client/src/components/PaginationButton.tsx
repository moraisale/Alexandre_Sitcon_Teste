import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { IPatient } from "../../types/IPatient";
import { ISolicitation } from "../../types/ISolicitation";

interface IPaginationButton {
  currentPage: number;
  patientsPerPage: number;
  totalPatients: number;
  setCurrentPage: (value: React.SetStateAction<number>) => void;
  currentPatients: IPatient[] | ISolicitation[];
}

export const PaginationButton: React.FC<IPaginationButton> = ({
  currentPage,
  currentPatients,
  patientsPerPage,
  setCurrentPage,
  totalPatients,
}) => {
  const totalPages = Math.ceil(totalPatients / patientsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const renderPageNumbers = getPageNumbers().map((number) => (
    <button
      key={number}
      onClick={() => setCurrentPage(number)}
      className={`mx-1 py-1 px-3 rounded ${
        currentPage === number
          ? "bg-primaryBlue text-white"
          : "bg-transparent text-textGray"
      }`}
    >
      {number}
    </button>
  ));

  return (
    <div className="flex bg-white justify-center rounded-lg shadow-sm py-3.5 w-max">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="mr-2 bg-transparent text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        <FaAngleLeft color="#C4C4C4" />
      </button>
      {renderPageNumbers}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPatients.length < patientsPerPage}
        className="mr-2 bg-transparent text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        <FaAngleRight color="#C4C4C4" />
      </button>
    </div>
  );
};
