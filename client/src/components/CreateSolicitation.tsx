import React, { useEffect, useState } from "react";
import ProjectLayout from "../../layouts/ProjectLayout";
import { Link } from "react-router-dom";
import { solicitationType } from "../../utils/selectOptions";
import { IPatient } from "../../types/IPatient";
import axios from "axios";
import { IProcedure } from "../../types/IProcedure";
import { IProfessional } from "../../types/IProfessional";
import { useNavigate } from "react-router-dom";
import { ICreateSolicitationFormData } from "../../types/ICreateSolicitationFormData";

interface IErrors {
  [key: string]: string;
}

export const CreateSolicitation: React.FC<IPatient> = ({
  nome,
  CPF,
  dataNasc,
}) => {
  const initialFormData: ICreateSolicitationFormData = {
    selectedProfessional: "",
    selectedSolicitationType: "",
    selectedProcedure: "",
    date: "",
    time: "",
  };
  const [formData, setFormData] =
    useState<ICreateSolicitationFormData>(initialFormData);
  const [errors, setErrors] = useState<IErrors>({});
  const [procedures, setProcedures] = useState<IProcedure[]>([]);
  const [professionals, setProfessionals] = useState<IProfessional[]>([]);
  const navigate = useNavigate();
  const currentDate = new Date().toISOString().split("T")[0];

  const handleInputChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createSolicitation = () => {
    axios
      .post("http://localhost:8800/create-solicitation", {
        nomePaciente: nome,
        cpf: CPF,
        tipoSolicitacao: formData.selectedSolicitationType,
        procedimentos: formData.selectedProcedure,
        data: formData.date,
        hora: formData.time,
      })
      .then(() => {
        navigate("/solicitacoes");
      });
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fields = [
      "selectedProfessional",
      "selectedSolicitationType",
      "selectedProcedure",
      "date",
      "time",
    ];
    const newErrors: IErrors = {};

    fields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `Por favor, preencha o campo ${field}.`;
      }
    });

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((error) => error !== "");

    if (!hasError) {
      createSolicitation();
    } else {
      setErrors(newErrors);
    }
  };

  const getProcedures = () => {
    axios.get("http://localhost:8800/procedimentos").then((response) => {
      setProcedures(response.data);
    });
  };
  const getProfessionals = () => {
    axios.get("http://localhost:8800/profissionais").then((response) => {
      setProfessionals(response.data);
    });
  };

  useEffect(() => {
    getProcedures();
    getProfessionals();
  }, []);

  return (
    <ProjectLayout>
      <form onSubmit={handleSave}>
        <div className="flex flex-col pt-[30px]">
          <Link to="/">
            <button className="text-lg font-bold text-primaryBlue bg-transparent border border-primaryBlue w-max rounded-xl px-5 py-2 hover:opacity-80">
              Voltar
            </button>
          </Link>
          <div className="flex justify-between py-[30px]">
            <div className="flex flex-col gap-[7px]">
              <label className="text-lg font-bold">Nome do paciente</label>
              <input
                type="text"
                className="text-lg shadow-md bg-secondaryBlue pl-[30px] h-[62px] rounded-xl"
                value={nome}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-bold">Data de nascimento</label>
              <input
                type="text"
                className="text-lg shadow-md bg-secondaryBlue pl-[30px] h-[62px] rounded-xl"
                value={dataNasc}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-bold">CPF</label>
              <input
                type="text"
                className="text-lg shadow-md bg-secondaryBlue pl-[30px] h-[62px] rounded-xl"
                value={CPF}
                readOnly
              />
            </div>
          </div>

          <div className="bg-[#ffd6b0] rounded-xl h-[62px] text-center flex justify-center items-center">
            <p>
              <span className="font-bold text-lg">Atenção!</span> Os Campos com
              * devem ser preenchidos obrigatoriamente.
            </p>
          </div>

          <div className="flex flex-col w-full pt-[30px] gap-[7px]">
            <label htmlFor="professional" className="text-lg font-bold">
              Profissional*
            </label>
            <select
              id="professional"
              name="selectedProfessional"
              className="text-lg shadow-md bg-white pl-[30px] h-[62px] rounded-xl w-full  "
              onChange={handleInputChange}
              value={formData.selectedProfessional}
            >
              <option value="">Selecione...</option>
              {professionals.map((profissional, index) => (
                <option key={index} value={profissional.nome}>
                  {profissional.nome}
                </option>
              ))}
            </select>
            {errors.selectedProfessional && (
              <p className="text-xs text-red-500 mt-1">
                {errors.selectedProfessional}
              </p>
            )}
          </div>

          <div className="flex pt-[30px] w-full gap-[31px]">
            <div className="flex flex-col gap-[7px] w-full">
              <label htmlFor="solicitationType" className="text-lg font-bold">
                Tipo de solicitação*
              </label>
              <select
                id="solicitationType"
                name="selectedSolicitationType"
                className="text-lg shadow-md bg-white pl-[30px] h-[62px] rounded-xl w-full"
                onChange={handleInputChange}
                value={formData.selectedSolicitationType}
              >
                <option value="">Selecione...</option>
                {solicitationType.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.selectedSolicitationType && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.selectedSolicitationType}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-[7px] w-full">
              <label htmlFor="procedure" className="text-lg font-bold">
                Procedimentos*
              </label>
              <select
                id="procedure"
                name="selectedProcedure"
                className="text-lg shadow-md bg-white pl-[30px] h-[62px] rounded-xl w-full"
                onChange={handleInputChange}
                value={formData.selectedProcedure}
              >
                <option value="">Selecione...</option>
                {procedures.map((procedure, index) => (
                  <option key={index} value={procedure.descricao}>
                    {procedure.descricao}
                  </option>
                ))}
              </select>
              {errors.selectedProcedure && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.selectedProcedure}
                </p>
              )}
            </div>
          </div>

          <div className="flex pt-[30px] w-full gap-[31px]">
            <div className="flex flex-col gap-[7px] w-full">
              <label htmlFor="date" className="text-lg font-bold">
                Data*
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="text-lg shadow-md bg-white pl-[30px] h-[62px] rounded-xl"
                onChange={handleInputChange}
                value={formData.date}
                min={currentDate}
              />
              {errors.date && (
                <p className="text-xs text-red-500 mt-1">{errors.date}</p>
              )}
            </div>

            <div className="flex flex-col gap-[7px] w-full">
              <label htmlFor="time" className="text-lg font-bold">
                Hora*
              </label>
              <input
                type="time"
                id="time"
                name="time"
                className="text-lg shadow-md bg-white pl-[30px] h-[62px] rounded-xl"
                onChange={handleInputChange}
                value={formData.time}
              />
              {errors.time && (
                <p className="text-xs text-red-500 mt-1">{errors.time}</p>
              )}
            </div>
          </div>

          <div className="flex w-full justify-end py-[30px]">
            <button
              className="text-white font-lg font-bold bg-primaryBlue rounded-xl px-14 py-2 hover:opacity-80"
              type="submit"
            >
              Salvar
            </button>
          </div>
        </div>
      </form>
    </ProjectLayout>
  );
};

export default CreateSolicitation;
