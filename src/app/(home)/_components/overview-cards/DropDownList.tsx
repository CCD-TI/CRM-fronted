import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
interface PropsDropdownList{
    Data: Array<string>
}
const SearchDropdown = ({Data}:PropsDropdownList) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Opciones del dropdown
  const options = Data;

  // Filtrar opciones basadas en la búsqueda
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div 
      className="relative w-full max-w-[200px]" 
      onMouseEnter={() => setIsOpen(true)} // Se abre al pasar el mouse
      onMouseLeave={() => setIsOpen(false)} // Se cierra al sacar el mouse
    >
      {/* Input de búsqueda */}
      <input
        type="search"
        placeholder="Asesor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`flex w-full items-center gap-3.5  border bg-gray-200 py-3 pl-5 pr-10 outline-none 
            transition-colors focus-visible:border-DashCCd_blue ${isOpen ?"rounded-t-3xl" :"rounded-3xl"}`}
      />
      {/* Icono de dropdown */}
      <IoIosArrowDown className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer" />

      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute left-0  w-full rounded-md border bg-white shadow-md z-10">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => setSearch(option)}
              >
                {option}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No hay resultados</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchDropdown;
