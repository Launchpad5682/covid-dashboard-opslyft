import { FormEvent, useEffect, useState } from "react";
import { useDataProvider } from "../context/data-context";
import { useDebounce } from "../hooks/useDebounce";

export function Table() {
  const { countriesData } = useDataProvider();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(countriesData);

  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500);

  // Effect for API call
  useEffect(() => {
    if (debouncedSearchTerm) {
      setResults(
        countriesData.filter(
          ({ country }) =>
            country.toLowerCase().includes(debouncedSearchTerm) ||
            country.includes(debouncedSearchTerm)
        )
      );
    } else {
      setResults(countriesData);
    }
  }, [countriesData, debouncedSearchTerm]);

  const changeHandler = (event: FormEvent<HTMLInputElement>) =>
    setSearchTerm(event.currentTarget.value);

  return (
    <div className="w-full flex flex-col items-center gap-5">
      <input
        className="bg-transparent border-2 border-gray-400 rounded-full w-full max-w-xl h-12 p-5 text-xl text-black focus:outline-none focus:outline-2 focus:outline-green-500"
        placeholder="Search a country"
        value={searchTerm}
        onChange={changeHandler}
      />
      <table className="table-auto w-full border-separate max-w-7xl">
        <thead className="bg-gray-400 sticky top-0">
          <tr>
            <td className="px-2 py-4 text-left">#</td>
            <td className="px-2 py-4 text-left">Name</td>
            <td className="px-2 py-4 text-left">Confirmed</td>
            <td className="px-2 py-4 text-left">Recoverd</td>
            <td className="px-2 py-4 text-left">Deceased</td>
          </tr>
        </thead>
        <tbody>
          {results?.map(
            ({ active, recovered, deceased, country, flag }, index) => (
              <tr
                className="text-black hover:bg-gray-200"
                key={`${country}-${active}`}
              >
                <td className="px-4">{index + 1}</td>
                <td className="flex gap-2 items-center px-4 py-5">
                  <img
                    src={flag}
                    alt={country}
                    className="w-10 h-10 rounded-full"
                  />
                  {country}
                </td>
                <td className="px-4">{active}</td>
                <td className="px-4">{recovered}</td>
                <td className="px-4">{deceased}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
      {results.length === 0 && (
        <div className="w-full max-w-7xl bg-red-700 text-white font-bold p-4">
          No data found
        </div>
      )}
    </div>
  );
}
