import React from "react";
import ProjectLayout from "../layouts/ProjectLayout";
import { IPatient } from "../types/IPatient";
import PatientsList from "../src/components/PatientsList";

interface IHomePage {
  setPatientId: React.Dispatch<React.SetStateAction<string>>;
  patientsList: IPatient[];
}

const Home: React.FC<IHomePage> = ({ setPatientId, patientsList }) => {
  return (
    <ProjectLayout>
      <PatientsList patientsList={patientsList} setPatientId={setPatientId} />
    </ProjectLayout>
  );
};

export default Home;
