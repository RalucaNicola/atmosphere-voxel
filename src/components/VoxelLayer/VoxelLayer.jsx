import { useEffect, useState } from 'react';

const VoxelLayer = ({ selectedVariable, selectedVisualization, exaggeration, mapView, displayError }) => {
  const [layer, setLayer] = useState(null);

  useEffect(() => {
    if (layer && exaggeration && layer.volumeStyles.getItemAt(0)) {
      layer.volumeStyles.getItemAt(0).verticalExaggeration = exaggeration;
    }
  }, [layer, exaggeration]);

  useEffect(() => {
    if (layer) {
      layer.renderMode = selectedVisualization;
    }
  }, [layer, selectedVisualization]);

  useEffect(() => {
    if (layer) {
      layer.currentVariableId = displayError ? selectedVariable.id + 1 : selectedVariable.id;
    }
  }, [layer, selectedVariable, displayError]);
  useEffect(() => {
    if (mapView) {
      const voxelLayer = mapView.map.layers.getItemAt(1);
      setLayer(voxelLayer);
    }
  }, [mapView]);

  return null;
};

export default VoxelLayer;
