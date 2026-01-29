import type { ChangeEvent, KeyboardEvent } from "react";

import { Button, Input } from "@heeler/ui";

interface HeaderProps {
  searchValue: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export const Header = ({
  searchValue,
  onSearchChange,
  onSearchKeyDown,
  onSearch,
  isLoading,
}: HeaderProps) => {
  return (
    <header className="header-gradient px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
        <div className="text-center sm:text-left">
          <h1 className="font-display text-xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-sm">
            Colorcast
          </h1>
          <p className="text-xs sm:text-sm text-white/90 font-medium">
            Weather at a glance
          </p>
        </div>

        <div className="flex gap-3 items-center w-full sm:w-auto" role="search">
          <label htmlFor="zip-search" className="sr-only">
            Enter zip code
          </label>
          <Input
            id="zip-search"
            color="blue"
            placeholder="Enter zip code"
            value={searchValue}
            onChange={onSearchChange}
            onKeyDown={onSearchKeyDown}
            className="flex-1 sm:flex-none sm:w-48"
            aria-label="Zip code"
          />
          <Button
            color="indigo"
            text={isLoading ? "..." : "Search"}
            onClick={onSearch}
            loading={isLoading}
            size="md"
            aria-label="Search weather by zip code"
          />
        </div>
      </div>
    </header>
  );
};
