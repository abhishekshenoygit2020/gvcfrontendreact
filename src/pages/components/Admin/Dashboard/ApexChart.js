import React, { useRef, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

// Registering Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);



// Function to create gradient for the chart
function createGradient(ctx, color) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 250);
  if (color === "red") {
    gradient.addColorStop(0, 'rgba(255, 0, 0, 0.6)');
    gradient.addColorStop(0.5, 'rgba(255, 128, 128, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
  } else if (color === "green") {
    gradient.addColorStop(0, 'rgba(0, 128, 0, 0.6)');
    gradient.addColorStop(0.5, 'rgba(144, 238, 144, 0.4)');
    gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');
  } else {
    gradient.addColorStop(0, 'rgba(0, 0, 255, 0.6)');
    gradient.addColorStop(0.5, 'rgba(173, 216, 230, 0.4)');
    gradient.addColorStop(1, 'rgba(0, 0, 255, 0)');
  }
  return gradient;
}

// Main App component
function ApexChart({ color, randomNumbers, tablename, gridLabels }) {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    // Data labels for the chart
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','August','November','December'];

    // Chart data
    const data = {
      labels:gridLabels,
      datasets: [
        {
          label: tablename,
          data: randomNumbers,          
        },
        // {
        //   label: tablename,         
        //   data:  ['0', '8', '7', '7', '8', '9', '6','7','7','7','7','7'],
        // },
      ],
    };

    const updatedChartData = {
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        borderColor: color,
        backgroundColor: createGradient(chart.ctx, color),
        fill: true,
      })),
    };

    setChartData(updatedChartData);
  }, [color,randomNumbers]);

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Important for responsive height
    elements: {
      line: {
        tension: 0.3,
        borderWidth: 1.5,
      },
      point: { radius: 0 }, // Hide the points on the line
    },
    scales: {
      x: {
        display: false, // Hide the x-axis
      },
      y: {
        display: false, // Hide the y-axis
      },
    },
    plugins: {
      legend: {
        display: false, // Hides the dataset legend
      },
      tooltip: {
        enabled: true, // Enables tooltips
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ height: '100px', position: 'relative' }}> {/* Adjust height here */}
      <Chart ref={chartRef} type="line" data={chartData} options={options} />
    </div>
  );
}

export default ApexChart;
