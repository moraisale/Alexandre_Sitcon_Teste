import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="flex min-h-[107px] bg-primaryBlue items-center px-[246px] justify-end">
      <div className="flex gap-[30px]">
        <Link to="/solicitacoes">
          <button className="text-white text-lg font-bold py-2 px-[30px] border border-white rounded-md hover:opacity-80">
            Solicitações clínicas
          </button>
        </Link>
        <Link to="/">
          <button className="text-white text-lg font-bold py-2 px-[30px] border border-white rounded-md hover:opacity-80">
            Listagem de pacientes
          </button>
        </Link>
      </div>
    </div>
  );
};
