import React, { useState } from "react";
import ProjectLayout from "../../layouts/ProjectLayout";
import { PaginationButton } from "./PaginationButton";
import { SearchBar } from "./SearchBar";
import { ISolicitation } from "../../types/ISolicitation";
import { format } from "date-fns";
import { SolicitationInfoModal } from "./SolicitationInfoModal";
import axios from "axios";

interface ISolicitationList {
  solicitationsList: ISolicitation[];
}

const SolicitationsList: React.FC<ISolicitationList> = ({
  solicitationsList,
}) => {
  const [searchPatientName, setSearchPatientName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // calculo da paginaçao
  const [currentPage, setCurrentPage] = useState(1);
  const solicitationsPerPage = 10;
  const indexOfLastSolicitation = currentPage * solicitationsPerPage;
  const indexOfFirstSolicitation =
    indexOfLastSolicitation - solicitationsPerPage;
  const currentSolicitation = solicitationsList.slice(
    indexOfFirstSolicitation,
    indexOfLastSolicitation
  );

  // filtro para pesquisar o nome do paciente
  const filteredSolicitations = searchPatientName
    ? currentSolicitation.filter((patient) =>
        patient.nomePaciente
          .toLowerCase()
          .includes(searchPatientName.toLowerCase())
      )
    : currentSolicitation;

  const deleteSolicitation = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:8800/solicitacoes/${id}`
      );

      window.location.reload();
    } catch (error) {
      console.error("Erro ao excluir a solicitação:", error);
    }
  };

  return (
    <ProjectLayout>
      <SearchBar setSearchValue={setSearchPatientName} />
      <div className="overflow-x-auto py-[30px] flex flex-col items-center">
        <table
          className="table-auto min-w-full shadow-lg"
          style={{ borderRadius: "0.5rem", overflow: "hidden" }}
        >
          <thead className="rounded-lg">
            <tr className="bg-primaryBlue text-white text-2xl font-bold">
              <th className="px-4 py-2">Paciente</th>
              <th className="px-4 py-2">Procedimento</th>
              <th className="px-4 py-2">Data/hora</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredSolicitations.map((solicitation, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-secondaryBlue" : "bg-white"}
              >
                <SolicitationInfoModal
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  solicitation={solicitation}
                  deleteSolicitation={deleteSolicitation}
                />

                <td className=" px-4 py-2 text-center text-lg text-#333333">
                  {solicitation.nomePaciente}
                </td>
                <td className=" px-4 py-2 text-center text-lg text-#333333">
                  {solicitation.procedimentos}
                </td>
                <td className=" px-4 py-2 text-center text-lg text-#333333">
                  {format(new Date(solicitation.data), "dd/MM/yyyy")}{" "}
                  {solicitation.hora}
                </td>
                <td className=" px-4 py-2 text-center text-lg text-#333333">
                  <button
                    onClick={() => setIsOpen(true)}
                    className="bg-btnOrange text-white font-bold px-3 py-2 rounded-xl hover:opacity-80"
                  >
                    Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pt-[30px]">
          <PaginationButton
            currentPage={currentPage}
            currentPatients={currentSolicitation}
            patientsPerPage={solicitationsPerPage}
            setCurrentPage={setCurrentPage}
            totalPatients={solicitationsList.length}
          />
        </div>
      </div>
    </ProjectLayout>
  );
};

export default SolicitationsList;
