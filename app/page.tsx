"use client"
import { fetchCars } from "@/utils";
import { HomeProps } from "@/types";
import { fuels, yearsOfProduction } from "@/constants";
import { CarCard, ShowMore, SearchBar, CustomFilter, Hero } from "@/components";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  // Define states for cars, loading, filters, and pagination
  const [allCars, setAllCars] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [manufacturer, setManufacturer] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [fuel, setFuel] = useState<string>("");
  const [year, setYear] = useState<number>(202);
  const [limit, setLimit] = useState<number>(10);

  // Fetch car data
  const getCars = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || "",
        year: year || 2022,
        fuel: fuel || "",
        limit: limit || 10,
        model: model || "",
      });
      setAllCars(result); // Update state with fetched cars
    } catch (error) {
      console.log(error); // Handle any errors during the fetch
    } finally {
      setLoading(false); // Set loading to false after the fetch completes
    }
  };

  // Fetch cars when filters or limit change
  useEffect(() => {
    getCars();
  }, [fuel, year, limit, manufacturer, model]);

  // Check if there is data to display
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore our cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel}/>

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel}/>
            <CustomFilter title="year" options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <p>Loading...</p>
          </div>
        )}

        {/* Data Display */}
        {allCars.length>0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car, index) => (
                <CarCard key={index} car={car} />
              ))}
            </div>
            {loading&& (
              <div className="mt-16 w-full flex-center">
                <Image src="/loader.svg" alt="loader" width={50} height={50} className="object-contain"></Image>
              </div>
            )}
            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit = {setLimit}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{allCars?.message || "No cars found matching your criteria."}</p>
          </div>
        )}
      </div>
    </main>
  );
}
