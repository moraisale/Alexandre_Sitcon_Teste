import React, { useState } from "react";
import { PaginationButton } from "./PaginationButton";
import { Link } from "react-router-dom";
import { IPatient } from "../../types/IPatient";
import { SearchBar } from "./SearchBar";
interface IList {
  setPatientId: React.Dispatch<React.SetStateAction<string>>;
  patientsList: IPatient[];
}

const PatientsTable: React.FC<IList> = ({ patientsList, setPatientId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPatientName, setSearchPatientName] = useState("");
  const patientsPerPage = 10;
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patientsList.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  const filteredPatients = searchPatientName
    ? patientsList.filter((patient) =>
        patient.nome.toLowerCase().includes(searchPatientName.toLowerCase())
      )
    : patientsList;

  return (
    <div className="flex flex-col">
      <SearchBar setSearchValue={setSearchPatientName} />
      <div className="overflow-x-auto py-[30px] flex flex-col items-center">
        <table
          className="table-auto min-w-full shadow-lg"
          style={{ borderRadius: "0.5rem", overflow: "hidden" }}
        >
          <thead>
            <tr className="bg-primaryBlue text-white text-2xl font-bold">
              <th className="px-4 py-2">Paciente</th>
              <th className="px-4 py-2">Nascimento</th>
              <th className="px-4 py-2">CPF</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-secondaryBlue" : "bg-white"}
              >
                <td className=" px-4 py-2 text-center text-lg text-#333333">
                  {patient.nome}
                </td>
                <td className=" px-4 py-2 text-center text-lg text-#333333">
                  {patient.dataNasc}
                </td>
                <td className=" px-4 py-2 text-center text-lg text-#333333">
                  {patient.CPF}
                </td>
                <td className=" px-4 py-2 text-center text-lg text-#333333">
                  <Link to={`/paciente/${patient.id}`}>
                    <button
                      onClick={() => {
                        setPatientId(patient.id.toString());
                      }}
                      className="bg-btnOrange text-white font-bold px-3 py-2 rounded-xl hover:opacity-80"
                    >
                      Prosseguir
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pt-[30px]">
          <PaginationButton
            currentPage={currentPage}
            currentPatients={currentPatients}
            patientsPerPage={patientsPerPage}
            setCurrentPage={setCurrentPage}
            totalPatients={patientsList.length}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientsTable;
