import { IoIosSearch } from "react-icons/io";
import { ISearchBar } from "../../types/ISearchBar";

export const SearchBar: React.FC<ISearchBar> = ({ setSearchValue }) => {
  return (
    <div className="pt-[30px]">
      <div className="relative rounded-xl  w-max shadow-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
          <span className="text-gray-500 sm:text-sm">
            <IoIosSearch size={30} />
          </span>
        </div>
        <input
          type="text"
          name="price"
          id="price"
          className="block w-[490px] rounded-xl border-0 py-4 pl-14  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-lg focus:ring-2 focus:ring-inset focus:ring-primaryBlue sm:text-sm sm:leading-6"
          placeholder="Pesquisar"
          onChange={(text) => setSearchValue(text.target.value)}
        />
      </div>
    </div>
  );
};
