import './style.css'
import { View, Map, Feature } from 'ol'
// import MapCedric from 'ol/Map'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
// import Vector from 'ol/source/Vector'
// import Feature from 'ol'
// import Geometry from 'ol/geom/Geometry'
// import { Point } from 'ol/geom'

import LayerVector from 'ol/layer/Vector'
import SourceVector from 'ol/source/Vector'

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
})

const layer = new LayerVector({
  source: SourceVector({
    features: [
      new Feature({
        // geometry:
      })
    ]
  })
})
