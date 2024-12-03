let riversData;

function preload() {
  riversData = loadTable('Rivers in the world - Data.csv', 'csv', 'header');
}

function setup() {
  const container = select('#chart-container');
  const canvas = createCanvas(container.width, riversData.getRowCount() * 30).parent('chart-container'); // Canvas dinamico
  noLoop();
  drawGraph();
}

function drawGraph() {
  background('#ffffff');

  const numRivers = riversData.getRowCount();
  const chartMargin = 50; // Margine superiore
  const barHeight = 15; // Altezza delle barre
  const spacing = 30; // Spaziatura tra righe
  const maxBarWidth = width * 0.5; // Lunghezza massima delle barre
  const marginLeft = width * 0.25; // Maggiore spazio a sinistra per i nomi
  const barStartX = marginLeft + 150; // Posizione dei glifi

  // Palette di colori
  const colors = [
    { color: '#1976D2', range: '0 - 1000 km' },
    { color: '#388E3C', range: '1001 - 3000 km' },
    { color: '#FBC02D', range: '3001 - 5000 km' },
    { color: '#D32F2F', range: '5001+ km' },
  ];

  textFont('Helvetica');
  textSize(12);

  // Legenda
  let legendX = width - 200;
  let legendY = chartMargin;
  textSize(12);
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i].color);
    rect(legendX, legendY + i * 25, 15, 15);
    fill('#000');
    textAlign(LEFT, CENTER);
    text(`${colors[i].range}`, legendX + 25, legendY + i * 25 + 7);
  }

  for (let i = 0; i < numRivers; i++) {
    let river = riversData.rows[i].obj;

    // Posizione verticale della riga
    let y = chartMargin + i * spacing;

    // Disegna il nome del fiume e i chilometri
    fill('#34495e');
    textAlign(RIGHT, CENTER);
    text(`${river.name}`, marginLeft - 20, y); // Spostato ulteriormente a destra
    textAlign(LEFT, CENTER);
    text(`(${river.length} km)`, marginLeft + 20, y); // Spostato ulteriormente a destra

    // Calcolo della lunghezza della barra
    let barWidth = map(river.length, 0, 7000, 10, maxBarWidth);

    // Colore della barra
    let barColor;
    if (river.length <= 1000) {
      barColor = colors[0].color;
    } else if (river.length <= 3000) {
      barColor = colors[1].color;
    } else if (river.length <= 5000) {
      barColor = colors[2].color;
    } else {
      barColor = colors[3].color;
    }

    // Disegna il glifo
    fill(barColor);
    noStroke();
    rect(barStartX, y - barHeight / 2, barWidth, barHeight);
  }
}

function windowResized() {
  const container = select('#chart-container');
  resizeCanvas(container.width, riversData.getRowCount() * 30); // Riadatta il canvas
  drawGraph();
}
