import './styles.css';
import 'ol/ol.css';

import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer.js";
import { XYZ } from "ol/source.js";
import { defaults as defaultControls, ScaleLine } from "ol/control.js";
import SQL from 'sql.js';

const searchButton = document.getElementById("search-button");
const dataButton = document.getElementById("data-button");


searchButton.addEventListener("click", function() {
  console.log("Search button clicked");
});

dataButton.addEventListener("click", function() {
  console.log("data button clicked");
  // const dbFile= 'mydatabase.db';

  // fetch(dbFile)
  //   .then(response => response.arrayBuffer())
  //   .then(buffer => {
  //     const db = new SQL.Database(new Uint8Array(buffer));
  //     const results = db.exec('SELECT * FROM dbFile');
  //     console.log(results);
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });

  fetch('mydatabase.db')
  .then(response => response.arrayBuffer())
  .then(buffer => {
    const db = new SQL.Database(new Uint8Array(buffer));
    const results = db.exec('SELECT * FROM activities');
    console.log(results);
  });

});



const backgroundLayer = new TileLayer({
  id: "background-layer",
  source: new XYZ({
    url: `https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg`
  })
});

const view = new View({
  projection: "EPSG:3857",
  center: [900000, 5900000],
  minZoom:8,
  zoom: 8
});

new Map({
  target: "map",
  controls: defaultControls().extend([
    new ScaleLine({
      units: "metric"
    })
  ]),
  layers: [backgroundLayer],
  view: view
});



