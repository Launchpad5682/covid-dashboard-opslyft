import { CountryData } from "../types/countryData";
import { DashboardCount } from "../types/dashboardCount";
import { Store } from "../types/store";

type ACTIONTYPE =
  | {
      type: "SET_DASHBOARD_COUNTS";
      payload: DashboardCount;
    }
  | {
      type: "SET_COUNTRYWISE_DATA";
      payload: { countriesData: Array<CountryData> };
    }
  | {
      type: "SET_TIMESERIES_DATA";
      payload: { timeSeriesData: Record<any, any> };
    }
  | {
      type: "SET_LAST_DAYS";
      payload: {
        lastDays: number;
      };
    };

export const reducer = (state: Store, action: ACTIONTYPE) => {
  switch (action.type) {
    case "SET_DASHBOARD_COUNTS":
      return { ...state, dashboardCount: { ...action.payload } };
    case "SET_TIMESERIES_DATA":
      return { ...state, ...action.payload };
    case "SET_COUNTRYWISE_DATA":
      return { ...state, ...action.payload };
    case "SET_LAST_DAYS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
