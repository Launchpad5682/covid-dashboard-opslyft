import { Chart as ChartJS, registerables as Registerables } from "chart.js";
import { Chart } from "react-chartjs-2";

type Props = {
  data: Record<any, any>;
  mode: "cases" | "deaths" | "recovered";
};

const dateFormatter = (dateStr: string) => {
  let sub = new Date(dateStr).toDateString().split(" ").slice(1);
  const formattedDate = sub[1] + " " + sub[0] + " " + sub[2];
  return formattedDate;
};

ChartJS.register(...Registerables);

const chartColorOptions = {
  cases: {
    label: "Cases",
    borderColor: "rgb(248, 113, 113)",
    backgroundColor: "rgba(248, 113, 113, 0.2)",
  },
  deaths: {
    label: "Deceased",
    borderColor: "rgb(88, 89, 90)",
    backgroundColor: "rgba(108, 117, 125, 0.2)",
  },
  recovered: {
    label: "Recovered",
    borderColor: "rgb(31, 182, 43)",
    backgroundColor: "rgba(108, 117, 125, 0.2)",
  },
};

export function LineChart({ data, mode }: Props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
      },
    },
  };

  const chartData = Object.keys(data[mode]).map((item) => {
    return {
      x: dateFormatter(item),
      y: data[mode][item],
    };
  });

  const processedData = {
    datasets: [
      {
        label: chartColorOptions[mode]["label"],
        data: chartData,
        borderColor: chartColorOptions[mode]["borderColor"],
        backgroundColor: chartColorOptions[mode]["backgroundColor"],
        fill: true,
      },
    ],
  };

  return <Chart type="line" data={processedData} options={options} />;
}
