import { compactFormat } from "@/lib/format-number";

import React, { useState } from "react";
import type { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { data } from "framer-motion/client";


interface DataAsesor{

  dataPrecio: number[]; // Números
  dataIndicador: string[]; // Estados textuales


}

const Donut = ({ dataPrecio,dataIndicador }:DataAsesor) => {
  const chartData : ApexOptions = {
  
    labels: dataIndicador, // Etiquetas (nombres de los estados)
      dataLabels: {
        enabled: false,
      },

      legend: {
        show: true,
        position: "bottom",
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
        labels: {
          colors: ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFD700"], // Colores en la leyenda
        },
      },
       plotOptions: {
            pie: {
              donut: {
                size: "80%",
                background: "transparent",
                labels: {
                  show: true,
                  total: {
                    show: true,
                    showAlways: true,
                    label: "Clientes",
                    fontSize: "18px",
                    fontWeight: "400",
                  },
                  value: {
                    show: true,
                    fontSize: "28 px",
                    fontWeight: "bold",
                    
                    formatter: (val) => compactFormat(+val),
                  },
                },
              },
            },
          },
    
   
  };

  return (
    <div className="donut">
      <Chart
        options={chartData}
        series={dataPrecio}
        type="donut"
        width="380"
      />
    </div>
  );
};

export default Donut;
