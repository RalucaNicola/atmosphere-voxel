import { useEffect, useState } from 'react';

const VoxelLayer = ({ selectedVariable, selectedVisualization, mapView }) => {
  const [layer, setLayer] = useState(null);

  useEffect(() => {
    if (layer) {
      layer.renderMode = selectedVisualization;
    }
  }, [layer, selectedVisualization]);

  useEffect(() => {
    if (layer) {
      layer.currentVariableId = selectedVariable.id;
    }
  }, [layer, selectedVariable]);
  useEffect(() => {
    if (mapView) {
      const voxelLayer = mapView.map.layers.getItemAt(1);
      setLayer(voxelLayer);
    }
  }, [mapView]);

  return null;
};

export default VoxelLayer;
