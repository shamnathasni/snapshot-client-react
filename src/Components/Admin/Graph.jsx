import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { MonthlyGraph } from "../../Api/AdminApi";

export default function Graph() {
  const [bookingCount, setBookingCount] = useState([]);
  const [bookingMonths, setBookingMonths] = useState([]);
  const monthName = new Map([
    [1, "January"],
    [2, "February"],
    [3, "March"],
    [4, "April"],
    [5, "May"],
    [6, "June"],
    [7, "July"],
    [8, "August"],
    [9, "September"],
    [10, "October"],
    [11, "November"],
    [12, "December"],
  ]);

  // Use useRef to store the chart instance
  const chartRef = useRef(null);

  const updateChart = (months, count) => {
    const config = {
      type: "line",
      data: {
        labels: months,
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#3182ce",
            borderColor: "#3182ce",
            data: count,
            fill: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        // ... (rest of the options)
      },
    };

    // Destroy previous chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create a new chart instance
    const ctx = document.getElementById("line-chart").getContext("2d");
    chartRef.current = new Chart(ctx, config);
  };

  useEffect(() => {
    MonthlyGraph()
      .then((response) => {
        const result = response.data.result;
        const months = result.map((entry) => monthName.get(entry._id.month));
        const count = result.map((entry) => entry.count);
        setBookingMonths(months);
        setBookingCount(count);
        // Move the updateChart call inside the then block
        updateChart(months, count);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-white text-xl font-semibold">Sales value</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <Line
              data={{
                labels: bookingMonths,
                datasets: [
                  {
                    label: new Date().getFullYear(),
                    backgroundColor: "#3182ce",
                    borderColor: "#3182ce",
                    data: bookingCount,
                    fill: false,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                title: {
                  display: false,
                  text: "Sales Charts",
                  fontColor: "white",
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
