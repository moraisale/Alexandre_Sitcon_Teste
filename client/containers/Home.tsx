import React from "react";
import ProjectLayout from "../layouts/ProjectLayout";
import { SearchBar } from "../src/components/SearchBar";
import { IPatient } from "../types/IPatient";
import PatientsTable from "../src/components/PatientsTable";

interface IHomePage {
  setPatientId: React.Dispatch<React.SetStateAction<string>>;
  patientsList: IPatient[];
}

const Home: React.FC<IHomePage> = ({ setPatientId, patientsList }) => {
  return (
    <ProjectLayout>
      <PatientsTable patientsList={patientsList} setPatientId={setPatientId} />
    </ProjectLayout>
  );
};

export default Home;
