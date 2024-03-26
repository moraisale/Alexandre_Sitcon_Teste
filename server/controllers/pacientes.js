import { db } from "../db.js";

export const getPacientes = (_, res) => {
  const query = "SELECT * FROM pacientes";

  db.query(query, (err, data) => {
    if (err) return res.json(err);
    console.log(data);
    return res.status(200).json(data);
  });
};
