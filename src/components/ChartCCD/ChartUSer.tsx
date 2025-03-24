import React, { useState } from "react";
import Chart from "react-apexcharts";

const ChartComponent: React.FC = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-area-chart",
        height: 370,
        type: "area" as "area",
        toolbar: {
          show: false,
        },
        fontFamily: "inherit",
      },
      xaxis: {
        categories: ["Enero", "Febrero", "Marzo" , "Abril", "Mayo", "Junio", "Julio", "Agosto",
                       "Septiembre", "Agosto", "OCtumbre", "Noviembre", "Diciembre"],
      },
    },
    series: [
      {
        name: "Clientes",
        data: [30, 40, 45, 50, 49, 60, 70, 91,  91 , 91, 91, 91, 91],
      },
    ],
  });

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="area"
            width="500"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
