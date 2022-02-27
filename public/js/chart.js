const chartData = (async () => {

    let urlFetch = '';
    if(window.location.href.search('/bai-hat/bang-xep-hang-viet') != -1) {
        urlFetch = '/admin/fetch-musics-rank-vietnam';
    } else if(window.location.href.search('/bai-hat/bang-xep-hang-usa') != -1) {
        urlFetch = '/admin/fetch-musics-rank-usa';
    } else if(window.location.href.search('/bai-hat/bang-xep-hang-korea') != -1) {
        urlFetch = '/admin/fetch-musics-rank-korea';
    }

    const response = await fetch(urlFetch, {
        method: 'GET'
    });
    const data = await response.json();

    const musics = [];

    data.musics.forEach(music => {
        musics.push(music);
    })

    var xValues = ['15:00','17:00','19:00','21:00','23:00','01:00','03:00','05:00','07:00','09:00','11:00', '13:00'];
    new Chart("myChart", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [{ 
            data: [860,1140,1060,1060,1070,1110,1330,2210,7830,8478,8340, 8678],
            borderColor: "red",
            fill: false
          }, { 
            data: [1600,1700,1700,1900,2000,2700,4000,5000,6000,7000,7300,7270],
            borderColor: "green",
            fill: false
          }, { 
            data: [300,700,2000,5000,6000,4000,2000,1000,200,100,1000,1200],
            borderColor: "blue",
            fill: false
          }]
        },
        options: {
          legend:  {
              display: true,
                  position: 'bottom',
                  left: '0px',
                  labels: {
                      fontColor: '#333'
                      
              }
          }
        },
        plugins: [{
          afterLayout: function(chart) {
            let total = chart.data.datasets[0].data.reduce((a, b) => {
              return a + b;
            });
            chart.legend.legendItems.forEach(
              (label, i) => {
                  if(i == 0) {
                      label.text = musics[0].name;
                  } else if(i == 1) {
                    label.text = musics[1].name;
                  } else {
                    label.text = musics[2].name;
                  }
                return label;
              }
            )
          }
        }]
      });
})();

