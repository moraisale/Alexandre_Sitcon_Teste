import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { ISolicitation } from "../../types/ISolicitation";

interface ISolicitationInfoModal {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  solicitation: ISolicitation;
  deleteSolicitation: (id: number) => Promise<void>;
}

export const SolicitationInfoModal: React.FC<ISolicitationInfoModal> = ({
  isOpen,
  setIsOpen,
  solicitation,
  deleteSolicitation,
}) => (
  <AlertDialog.Root open={isOpen}>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <AlertDialog.Title className="text-mauve12 m-0 text-2xl  font-bold text-center">
          Detalhes da solicitação
        </AlertDialog.Title>
        <div className="flex flex-col gap-2 pt-4">
          <p>
            <span className="font-bold">Nome paciente:</span>{" "}
            {solicitation.nomePaciente}
          </p>
          <p>
            <span className="font-bold">CPF paciente:</span> {solicitation.cpf}
          </p>
          <p>
            <span className="font-bold">Tipo da solicitação</span>{" "}
            {solicitation.tipoSolicitacao}
          </p>
          <p>
            {" "}
            <span className="font-bold">Procedimentos:</span>{" "}
            {solicitation.procedimentos}
          </p>
          <p>
            <span className="font-bold">Data:</span> {solicitation.data}
          </p>
          <p>
            <span className="font-bold">Hora:</span> {solicitation.hora}
          </p>
        </div>
        <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal"></AlertDialog.Description>
        <div className="flex justify-end gap-[25px]">
          <AlertDialog.Cancel asChild>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white bg-green-400 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
            >
              Ligar para o(a) paciente
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button
              onClick={() => deleteSolicitation(solicitation.id)}
              className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
            >
              Deletar
            </button>
          </AlertDialog.Action>
          <AlertDialog.Cancel asChild>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white bg-mauve7 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
            >
              Fechar
            </button>
          </AlertDialog.Cancel>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);
