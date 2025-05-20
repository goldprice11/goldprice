const ctx = document.getElementById('goldChart').getContext('2d');
let goldChart;

async function fetchGoldPrice() {
  const res = await fetch('https://api.metals.live/v1/spot/gold');
  const data = await res.json();
  return data; // Returns array of [timestamp, price]
}

async function updateChart() {
  const data = await fetchGoldPrice();
  const timestamps = data.map(d => new Date(d[0] * 1000).toLocaleTimeString());
  const prices = data.map(d => d[1]);

  if (!goldChart) {
    goldChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timestamps,
        datasets: [{
          label: 'Gold Price (USD/oz)',
          data: prices,
          borderColor: 'gold',
          backgroundColor: 'rgba(255, 215, 0, 0.2)',
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { display: true, title: { display: true, text: 'Time' } },
          y: { display: true, title: { display: true, text: 'Price' } }
        }
      }
    });
  } else {
    goldChart.data.labels = timestamps;
    goldChart.data.datasets[0].data = prices;
    goldChart.update();
  }
}

updateChart();
setInterval(updateChart, 60000); // Refresh every 60 seconds
