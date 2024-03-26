export interface IPatient {
  id: number;
  nome: string;
  dataNasc: string;
  CPF: string;
  status: "ativo" | "inativo";
}
