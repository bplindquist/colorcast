import { useState, type ChangeEvent } from "react";
import { Input } from "@heeler/ui";
import "./App.css";

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
      <header className="flex justify-between items-center px-6 py-4">
        <div>
          <h2 className="text-2xl font-bold text-blue-700">Colorcast</h2>
          <h3 className="text-lg text-gray-600 text-orange-600">
            Weather at a colorful glance
          </h3>
        </div>
        <div className="flex gap-2 items-center">
          <Input
            color="blue"
            placeholder="City or zip code"
            value={locationSearch}
            onChange={handleLocationChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </header>
    </>
  );
};
