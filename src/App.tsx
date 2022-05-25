import { ChangeEvent, useState } from "react";
import DashboardCount from "./components/DashboardCount";
import { LineChart } from "./components/LineChart";
import { Table } from "./components/Table";
import { useDataProvider } from "./context/data-context";

function App() {
  const {
    dashboardCount: { active, recovered, deceased },
    timeSeriesData,
    lastDays,
    dispatch,
  } = useDataProvider();

  const [mode, setMode] = useState<"cases" | "recovered" | "deaths">("cases");

  const daysChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.currentTarget.value);

    if (value !== 0) {
      dispatch({ type: "SET_LAST_DAYS", payload: { lastDays: value } });
    }
  };

  return (
    <div className="h-screen w-full overflow-y-auto bg-0000-900 text-xl flex flex-col gap-5 items-center">
      <span className="text-4xl text-black mt-5">COVID DASHBOARD</span>
      <div className="flex justify-center gap-10">
        <DashboardCount count={active} heading="active" color="red" />
        <DashboardCount count={recovered} heading="recovered" color="green" />
        <DashboardCount count={deceased} heading="deceased" color="black" />
      </div>
      <div className="flex flex-row gap-5 w-full max-w-7xl justify-between">
        <span className="text-black">
          Showing Stats of Last {lastDays} days
        </span>
        <select className="" onChange={daysChangeHandler}>
          <option value="30">30 days</option>
          <option value="60">60 days</option>
          <option value="90">90 days</option>
        </select>
      </div>
      <div className="w-full max-w-7xl">
        {Object.keys(timeSeriesData).length > 0 && (
          <LineChart data={timeSeriesData} mode={mode} />
        )}
      </div>
      <div>
        <button
          className={`bg-gray-500 text-white p-4 rounded-sm ${
            mode === "cases" && "bg-gray-600"
          }`}
          onClick={() => setMode("cases")}
        >
          Cases
        </button>
        <button
          className={`bg-gray-500 text-white p-4 rounded-sm ${
            mode === "recovered" && "bg-gray-600"
          }`}
          onClick={() => setMode("recovered")}
        >
          Recoverd
        </button>
        <button
          className={`bg-gray-500 text-white p-4 rounded-sm ${
            mode === "deaths" && "bg-gray-600"
          }`}
          onClick={() => setMode("deaths")}
        >
          Deceased
        </button>
      </div>
      <Table />
    </div>
  );
}

export default App;
