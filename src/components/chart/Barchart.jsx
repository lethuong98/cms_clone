import React, { useState, useEffect } from "react";
import moment from "moment";
import api from "../../api/Request";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Barchart = ({ labels, dataChart }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Doanh số",
        data: dataChart,
        backgroundColor: "#ff6e61",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  return <Bar data={data} options={options} />;
};

export default Barchart;
