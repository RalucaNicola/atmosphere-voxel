import { useEffect, useState } from 'react';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import { Point, Polyline, SpatialReference } from '@arcgis/core/geometry';
import Graphic from '@arcgis/core/Graphic';
import * as projection from '@arcgis/core/geometry/projection';
projection.load();
const projectToMillerCylindrical = (geometry) => {
  const projectedGeometry = projection.project(geometry, new SpatialReference({ wkid: 54003 }));
  // projectedGeometry.spatialReference.wkt = `PROJCS["World_Miller_Cylindrical",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Miller_Cylindrical"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",0.0],UNIT["Meter",1.0]],VERTCS["Unknown VCS from ArcInfo Workstation",VDATUM["Unknown"],PARAMETER["Vertical_Shift",0.0],PARAMETER["Direction",1.0],UNIT["Meter",1.0]]`;
  // projectedGeometry.spatialReference.wkid = 54003;
  return projectedGeometry;
};

const indicatorSymbol = {
  type: 'line-3d',
  symbolLayers: [
    {
      type: 'line',
      material: { color: [255, 255, 255, 1] },
      size: 0.75,
      marker: {
        type: 'style',
        style: 'arrow',
        placement: 'end',
        color: [255, 255, 255, 1]
      }
    }
  ]
};

const getLabelGraphic = (height) => {
  const pointGeometry = new Point({
    x: 0,
    y: -90,
    z: height / 2
  });
  const projectedGeometry = projectToMillerCylindrical(pointGeometry);
  return new Graphic({
    geometry: projectedGeometry,
    symbol: {
      type: 'point-3d',
      symbolLayers: [
        {
          type: 'text',
          text: 'Troposphere (20km)',
          material: { color: 'white' },
          verticalAlignment: 'middle',
          font: {
            size: 9,
            family: `"Avenir Next", Avenir, "Helvetica Neue", sans-serif`,
            weight: 'bold'
          }
        }
      ]
    }
  });
};

const getIndicatorDown = (height, margin) => {
  const lineGeometry = new Polyline({
    paths: [
      [0, -90, height / 2 - margin],
      [0, -90, 0]
    ]
  });
  const projectedGeometry = projectToMillerCylindrical(lineGeometry);
  return new Graphic({
    geometry: projectedGeometry,
    symbol: indicatorSymbol
  });
};

const getIndicatorUp = (height, margin) => {
  const lineGeometry = new Polyline({
    paths: [
      [0, -90, height / 2 + margin],
      [0, -90, height]
    ]
  });
  const projectedGeometry = projectToMillerCylindrical(lineGeometry);
  return new Graphic({
    geometry: projectedGeometry,
    symbol: indicatorSymbol
  });
};

const getBoundingBox = (height) => {
  const lineGeometry = new Polyline({
    paths: [
      [-180, 90, height],
      [180, 90, height],
      [180, -90, height],
      [-180, -90, height],
      [-180, 90, height]
    ]
  });
  const projectedGeometry = projectToMillerCylindrical(lineGeometry);
  return new Graphic({
    geometry: projectedGeometry,
    symbol: {
      type: 'line-3d',
      symbolLayers: [
        {
          type: 'line',
          material: { color: [255, 255, 255, 1] },
          size: 0.75,
          pattern: {
            type: 'style',
            style: 'dash'
          }
        }
      ]
    }
  });
};

const Scale = ({ exaggeration, mapView }) => {
  useEffect(() => {
    if (mapView && exaggeration) {
      mapView.graphics.removeAll();
      const height = 20000 * exaggeration;
      const margin = 2000 * exaggeration;
      const labelGraphic = getLabelGraphic(height);
      const boundingBox = getBoundingBox(height);
      const indicatorDown = getIndicatorDown(height, margin);
      const indicatorUp = getIndicatorUp(height, margin);
      mapView.graphics.addMany([labelGraphic, boundingBox, indicatorDown, indicatorUp]);
    }
  }, [mapView, exaggeration]);

  return null;
};

export default Scale;
