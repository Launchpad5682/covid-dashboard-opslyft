import {
  ReactNode,
  createContext,
  useReducer,
  useEffect,
  useContext,
} from "react";
import { reducer } from "../reducers/reducer";
import {
  fetchByCases,
  fetchByCountry,
  fetchByTimeline,
} from "../services/fetchURL";
import { CountryData } from "../types/countryData";
import { DashboardCount } from "../types/dashboardCount";
import { Store } from "../types/store";

interface DataContextInterface extends Store {
  dispatch: Function;
}

const initialState: DataContextInterface = {
  dashboardCount: {
    active: 0,
    deceased: 0,
    recovered: 0,
  },
  countriesData: [],
  timeSeriesData: {},
  lastDays: 30,
  dispatch: () => {},
};

const DataContext = createContext<DataContextInterface>(initialState);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [
    { dashboardCount, countriesData, timeSeriesData, lastDays },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      const dashboardCount = (await fetchByCases()) as DashboardCount;
      dispatch({
        type: "SET_DASHBOARD_COUNTS",
        payload: dashboardCount,
      });

      const countriesData = (await fetchByCountry()) as Array<CountryData>;

      dispatch({ type: "SET_COUNTRYWISE_DATA", payload: { countriesData } });
    })();
    return () => {};
  }, []);

  useEffect(() => {
    (async () => {
      const timeSeriesData = (await fetchByTimeline(lastDays)) as Record<
        any,
        any
      >;

      dispatch({ type: "SET_TIMESERIES_DATA", payload: { timeSeriesData } });
    })();
  }, [lastDays]);

  return (
    <DataContext.Provider
      value={{
        dashboardCount,
        countriesData,
        timeSeriesData,
        lastDays,
        dispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataProvider = () => useContext(DataContext);
