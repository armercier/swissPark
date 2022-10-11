import './styles.css';
import 'ol/ol.css';

import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer.js";
import { XYZ } from "ol/source.js";
import { defaults as defaultControls, ScaleLine } from "ol/control.js";

const backgroundLayer = new TileLayer({
  id: "background-layer",
  source: new XYZ({
    url: `https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg`
  })
});

const view = new View({
  projection: "EPSG:3857",
  center: [900000, 5900000],
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
