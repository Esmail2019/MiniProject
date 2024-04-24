<template>
    <div class="container mx-auto space-y-4">
      <h1 class="text-2xl font-bold mb-4">Live Data Table and Chart</h1>
      <div class="flex justify-center">
        <canvas id="myChart" width="400" height="200"></canvas>
      </div>
      <table class="table-auto w-full border border-collapse shadow rounded">
        <thead>
          <tr class="bg-gray-100 text-gray-600 uppercase text-xs leading-tight">
            <th v-for="(header) in headers" :key="header" class="border px-4 py-2">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in tableData" :key="row.id" class="border hover:bg-gray-100">
            <td v-for="(value, key) in row" :key="key" class="border px-4 py-2">{{ value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Chart from 'chart.js/auto';
  
  export default {
    name: 'Dashboard',
    data() {
      return {
        tableData: [],
        headers: [],
        chartData: [],
        yAxisVisibility: {},
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        try {
          const response = await axios.get('http://localhost:3000/measurements'); // Replace with your API endpoint
          this.tableData = response.data;
          this.headers = Object.keys(this.tableData[0]);
          this.chartData = {
            labels: Array.from({ length: this.tableData.length }, (_, i) => i + 1),
            datasets: [
              {
                label: 'Voltage',
                data: this.tableData.map(item => item.voltage),
                borderColor: 'blue',
                backgroundColor: 'transparent',
                pointStyle: 'circle',
                borderWidth: 1,
                yAxisID: 'voltage',
                pointRadius: 10,
                pointHoverRadius: 40
              },
              {
                label: 'Current',
                data: this.tableData.map(item => item.current),
                borderColor: 'red',
                backgroundColor: 'transparent',
                borderWidth: 1,
                pointStyle: 'circle',
                yAxisID: 'current',
                pointRadius: 10,
                pointHoverRadius: 40
              },
              {
                label: 'Frequency',
                data: this.tableData.map(item => item.frequency),
                borderColor: 'green',
                backgroundColor: 'transparent',
                borderWidth: 1,
                pointStyle: 'circle',
                yAxisID: 'frequency',
                pointRadius: 10,
                pointHoverRadius: 40
              }
            ]
          };
          this.setYAxisVisibility();
          this.renderChart();
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },
      setYAxisVisibility() {
        const yAxisVisibility = {};
        this.chartData.datasets.forEach(dataset => {
          yAxisVisibility[dataset.yAxisID] = true;
        });
        this.yAxisVisibility = yAxisVisibility;
      },
      renderChart() {
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: this.chartData,
          options: {
            elements: {
              line: {
                tension: 0.4, // Adjust tension for the curves, 0 means no curve, 1 means very curved
              }
            },
            scales: {
              y: [
                {
                  id: 'voltage',
                  type: 'bubble',
                  position: 'left',
                  title: {
                    display: this.yAxisVisibility['voltage'],
                    text: 'Voltage (V)',
                  },
                  ticks: {
                    suggestedMax: 250,
                  },
                },
                {
                  id: 'current',
                  type: 'bubble',
                  position: 'right',
                  title: {
                    display: this.yAxisVisibility['current'],
                    text: 'Current (A)',
                  },
                  ticks: {
                    suggestedMax: 5,
                  },
                },
                {
                  id: 'frequency',
                  type: 'bubble',
                  position: 'right',
                  title: {
                    display: this.yAxisVisibility['frequency'],
                    text: 'Frequency (Hz)',
                  },
                  ticks: {
                    suggestedMax: 60,
                  },
                  grid: {
                    drawOnChartArea: false,
                  },
                },
              ],
              x: [
                { type: 'linear', // Assuming x-axis data is numeric
                  title: {
                    display: true,
                    text: 'Time',
                  },
                },
                {
                  type: 'linear',
                  id: 'id',
                  title: {
                    display: true,
                    text: 'Device Id',
                  }
                },
              ]
            },
          },
        });
      }
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional Tailwind CSS styles here */
  h1 {
    text-align: center;
  }
  
  .container demo {
    background-color: blue;
    border: 25px;
  }
  
  .mx-auto {
    color: indigo;
    font-weight: 400;
    text-align: center;
    text-size-adjust: inherit;
  }
  
  tbody {
    line-height: inherit;
  }
  
  .flex {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: flex-end;
  }
  </style>
  