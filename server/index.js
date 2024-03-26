import express from "express";
import pacientesRoutes from "./routes/pacientes.js";
import cors from "cors";
import { db } from "./db.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", pacientesRoutes);

app.post("/create-solicitation", (req, res) => {
  const nomePaciente = req.body.nomePaciente;
  const cpf = req.body.cpf;
  const tipoSolicitacao = req.body.tipoSolicitacao;
  const procedimentos = req.body.procedimentos;
  const data = req.body.data;
  const hora = req.body.hora;

  db.query(
    "INSERT INTO solicitacoes (nomePaciente, cpf, tipoSolicitacao, procedimentos, data, hora) VALUES (?,?,?,?,?,?)",
    [nomePaciente, cpf, tipoSolicitacao, procedimentos, data, hora],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/tipo-solicitacao", (req, res) => {
  db.query("SELECT * FROM tiposolicitacao", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/procedimentos", (req, res) => {
  db.query("SELECT * FROM procedimentos", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/profissionais", (req, res) => {
  db.query("SELECT * FROM profissional", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/solicitacoes", (req, res) => {
  db.query("SELECT * FROM solicitacoes", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/solicitacoes/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM solicitacoes WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erro ao excluir a solicitação.");
    } else {
      console.log("Solicitação excluída com sucesso.");
      res.status(200).send("Solicitação excluída com sucesso.");
    }
  });
});

app.listen(8800);
