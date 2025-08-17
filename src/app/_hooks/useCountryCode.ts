import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { country, CountryData } from "../_types/authTypes";

// New component from the provided code
export const useCountryCodes = () => {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2,idd"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch country data.");
        }
        const data = await response.json();
        console.log(data);

        const formattedCountries = data
          .map((country: country) => {
            const callingCode =
              country.idd.root +
              (country.idd.suffixes ? country.idd.suffixes[0] : "");
            return {
              name: country.name.common,
              code: callingCode,
              cca2: country.cca2,
            };
          })
          .filter((country: CountryData) => country.code)
          .sort((a: CountryData, b: CountryData) =>
            a.name.localeCompare(b.name)
          );

        setCountries(formattedCountries);
      } catch (error) {
        console.error("Error fetching country codes:", error);
        toast.error("Could not load country codes. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  return { countries, loading };
};
