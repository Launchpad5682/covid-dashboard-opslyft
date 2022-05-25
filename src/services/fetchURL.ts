import axios from "axios";
import { CountryData } from "../types/countryData";
import { DashboardCount } from "../types/dashboardCount";

type ServerError = {
  error: string;
};

type CountryDataResponse = {
  active: number;
  recovered: number;
  deaths: number;
  country: string;
  countryInfo: any;
};

export const fetchByCountry = async (): Promise<
  Array<CountryData> | ServerError
> => {
  try {
    const response = await axios("https://disease.sh/v3/covid-19/countries");

    if (response.status) {
      const { data } = response;
      const countriesData: Array<CountryData> = data.map(
        ({
          active,
          recovered,
          deaths,
          country,
          countryInfo,
        }: CountryDataResponse) => ({
          active,
          recovered,
          deceased: deaths,
          country,
          flag: countryInfo.flag,
        })
      );
      return countriesData;
    }
    return [];
  } catch (error) {
    return { error: String(error) };
  }
};

export const fetchByTimeline = async (
  days: number
): Promise<Record<any, any> | ServerError> => {
  try {
    const response = await axios(
      `https://disease.sh/v3/covid-19/historical/all?lastdays=${days}`
    );

    if (response.status) {
      return response.data;
    }

    return {};
  } catch (error) {
    return { error };
  }
};

export const fetchByCases = async (): Promise<DashboardCount | ServerError> => {
  try {
    const response = await axios("https://disease.sh/v3/covid-19/all");

    if (response.status) {
      const { active, recovered, deaths: deceased } = response.data;
      return { active, recovered, deceased };
    }

    return { active: 0, recovered: 0, deceased: 0 };
  } catch (error) {
    return { error: String(error) };
  }
};
