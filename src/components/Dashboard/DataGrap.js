// import React from "react";
// import { Pie } from 'react-chartjs-2';

// const DataGrap = ({ income, expenses }) => {
//   const data = {
//     labels: ["Expenses", "Income"],
//     datasets: [
//       {
//         label: "Expense and Income",
//         data: [expenses, income],
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.2)",
//           "rgba(54, 162, 235, 0.2)",
//         ],
//         borderColor: [
//           "rgba(255, 99, 132, 1)",
//           "rgba(54, 162, 235, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         height: "60%",
//         width: "20%",
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: "column",
//         marginTop: "40px",
//       }}
//     >
//       <div>
//         <h3>Transactions</h3>
//       </div>
//       <Pie data={data} />
//     </div>
//   );
// };

// export default DataGrap;


import React from "react";
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const DataGrap = ({ income, expenses }) => {
  const data = {
    labels: ["Expenses", "Income"],
    datasets: [
      {
        data: [expenses, income],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        height: "300px", // Adjust the height to fit your needs
        width: "300px", // Adjust the width to fit your needs
        justifyContent: "center",
        alignItems: "center",
        marginTop: "40px",
      }}
    >
      <div>
        <h3>Transactions</h3>
      </div>
      <Pie data={data} options={options} />
    </div>
  );
};

export default DataGrap;
