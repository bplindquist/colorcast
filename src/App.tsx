import { Input } from "@heeler/ui";
import "./App.css";
import { useState, type ChangeEvent } from "react";

export const App = () => {
  const [locationSearch, setLocationSearch] = useState("");

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocationSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
      setLocationSearch("");
    }
  };

  const handleSearch = () => {
    console.log("Searching for:", locationSearch);
  };

  return (
    <>
      <header className="flex justify-end px-6 py-4 border-b border-gray-200">
        <div className="flex gap-2 items-center">
          <Input
            color="blue"
            placeholder="Location"
            value={locationSearch}
            onChange={handleLocationChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </header>
    </>
  );
};
