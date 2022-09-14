import { useEffect, useState } from 'react';

const VoxelLayer = ({
  selectedVariable,
  selectedVisualization,
  exaggeration,
  mapView,
  displayError,
  isosurfaces,
  setIsosurfaces,
  sections,
  setSections
}) => {
  const [layer, setLayer] = useState(null);
  const [loaded, setLoaded] = useState(false);

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
    if (loaded) {
      const isosurfaces = layer.variableStyles
        .filter((style) => style.variableId === selectedVariable.id)
        .getItemAt(0).isosurfaces;
      if (isosurfaces && isosurfaces.length) {
        setIsosurfaces(
          isosurfaces.map((surface) => ({
            color: surface.color,
            enabled: surface.enabled,
            value: surface.value,
            label: surface.label
          }))
        );
      } else {
        setIsosurfaces([]);
      }
    }
  }, [loaded, selectedVariable]);
  useEffect(() => {
    if (loaded) {
      const style = layer.variableStyles.filter((style) => style.variableId === selectedVariable.id).getItemAt(0);
      if (style && style.isosurfaces.length === isosurfaces.length) {
        style.isosurfaces.forEach((surface, index) => {
          surface.enabled = isosurfaces.getItemAt(index).enabled;
        });
      }
    }
  }, [loaded, isosurfaces]);

  useEffect(() => {
    if (loaded) {
      layer.volumeStyles.getItemAt(0).dynamicSections = sections;
    }
  }, [loaded, sections]);

  useEffect(() => {
    if (loaded) {
      const sections = [];
      for (let i = 0; i < 37; i++) {
        sections.push({ enabled: false, label: `we${i}`, normal: [0, -1, 0], point: [0, i + 2, 0] });
      }
      for (let i = 0; i < 37; i++) {
        sections.push({ enabled: false, label: `ns${i}`, normal: [1, 0, 0], point: [i + 2, 0, 0] });
      }
      setSections(sections);
    }
  }, [loaded]);
  useEffect(() => {
    if (mapView) {
      const voxelLayer = mapView.map.layers.getItemAt(1);

      voxelLayer
        .load()
        .then(() => setLoaded(true))
        .catch(() => setLoaded(false));
      window.voxelLayer = voxelLayer;
      setLayer(voxelLayer);
    }
  }, [mapView]);

  return null;
};

export default VoxelLayer;
