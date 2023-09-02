import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const Piechart = ({ labels, dataChart }) => {
  const data = {
    labels,
    datasets: [
      {
        data:dataChart,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "#54B435",
          "#F0FF42",
        ],
        borderWidth: 0,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "bottom",
      },
    },
  };
  return <Pie data={data} options={options} />;
};

export default Piechart;
