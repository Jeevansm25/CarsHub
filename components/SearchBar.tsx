"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SearchManufacturer from "./SearchManufacturer";

interface SearchBarProps {
  setManufacturer: (manufacturer: string) => void;
  setModel: (model: string) => void;
}

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src={"/search.png"}
      alt={"magnifying glass"}
      width={20}
      height={20}
      className="object-contain m-4 border-solid"
    />
  </button>
);

const SearchBar: React.FC<SearchBarProps> = ({ setManufacturer, setModel }) => {
  const [searchManufacturer, setSearchManufacturer] = useState<string>("");
  const [searchModel, setSearchModel] = useState<string>("");

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchManufacturer.trim() === "" && searchModel.trim() === "") {
      return alert("Please provide some input");
    }

    setManufacturer(searchManufacturer);
    setModel(searchModel);
    // Optionally, you can navigate to another page, if needed
    // router.push(`/cars?manufacturer=${searchManufacturer}&model=${searchModel}`);
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          selected={searchManufacturer}
          setSelected={setSearchManufacturer}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={searchModel}
          onChange={(e) => setSearchModel(e.target.value)}
          placeholder="Tiguan..."
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
        <SearchButton otherClasses="max-sm:hidden" />
      </div>
    </form>
  );
};

export default SearchBar;
