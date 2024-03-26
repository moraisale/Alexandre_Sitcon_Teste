import { useEffect, useState } from "react";
import Home from "../containers/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateSolicitation } from "./components/CreateSolicitation";
import { IPatient } from "../types/IPatient";
import axios from "axios";
import SolicitationsList from "./components/SolicitationsList";
import { ISolicitation } from "../types/ISolicitation";

function App() {
  const [patientId, setPatientId] = useState("");
  const [patientsList, setPatientsList] = useState<IPatient[]>([]);
  const [solicitationsList, setSolicitationsList] = useState<ISolicitation[]>(
    []
  );

  const getPatients = () => {
    axios.get("http://localhost:8800").then((response) => {
      setPatientsList(response.data);
    });
  };

  const getSolicitations = () => {
    axios.get("http://localhost:8800/solicitacoes").then((response) => {
      setSolicitationsList(response.data);
    });
  };

  useEffect(() => {
    getPatients();
    getSolicitations();
  }, []);

  const patientDetails = patientsList.find(
    (patient) => patient.id.toString() === patientId
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home setPatientId={setPatientId} patientsList={patientsList} />
          }
        />
        <Route
          path="/paciente/:id"
          element={<CreateSolicitation {...patientDetails!} />}
        />
        <Route
          path="/solicitacoes"
          element={<SolicitationsList solicitationsList={solicitationsList} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
