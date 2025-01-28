import { useState } from "react";
import { IoMdSearch } from "react-icons/io";

interface SearchBarProps {
  onSearch: (name: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [name, setName] = useState("");

  return (
    <div className="centered gap-2">
      <input
        className="border-gray-300 border-solid border rounded-md p-2"
        value={name}
        placeholder="Enter a name..."
        onKeyUp={(e) => {
          if (e.key === "Enter") onSearch(name);
        }}
        onChange={(e) => setName(e.target.value.trim())}
      />

      <button
        className="btn btn-primary"
        disabled={!name}
        onClick={() => onSearch(name)}
      >
        <IoMdSearch className="size-6" />
      </button>
    </div>
  );
};

export default SearchBar;
