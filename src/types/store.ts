import { CountryData } from "./countryData";
import { DashboardCount } from "./dashboardCount";

export interface Store {
  dashboardCount: DashboardCount;
  countriesData: [] | Array<CountryData>;
  timeSeriesData: Record<any, any>;
  lastDays: number;
}
