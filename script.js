Papa.parse('data-clean.csv', {
   download: true,
   header: true,
   skipEmptyLines: true,
   complete: function(results) {
       const rows = results.data;
       console.log("CSV headers:", results.meta.fields);
       console.log("First row:", results.data[0]);
       console.log("Parse errors:", results.errors);
       const tbody = document.querySelector('#dataTable tbody');
       rows.forEach(row => {
           const tr = document.createElement('tr');
           [row.Country, row.CountryCode, row.Year,
               row.InternetUsersPercent].forEach(value => {
               const td = document.createElement('td');
               td.textContent = value;
               tr.appendChild(td);
           });
           tbody.appendChild(tr);
       });
       drawChart(rows);
   },
   error: function(error) {
       console.error('CSV failed to load', error);
   }
});

function drawChart(rows) {
   const labels = rows.map(row => row.Country);
   const values = rows.map(row => Number(row.InternetUsersPercent));
   new Chart(document.getElementById('internetChart'), {
       type: 'bar',
       data: {
           labels: labels,
           datasets: [{
               label: 'Internet users (% of population), 2023',
               data: values,
               backgroundColor: '#176579'
           }]
       },
       options: {
           animation: false,
           scales: {
               y: { beginAtZero: true, max: 100,
                   title: { display: true, text: '% of population' } }
           }
       }
   });
}
