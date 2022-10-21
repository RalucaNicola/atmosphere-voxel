import { useEffect, useState } from 'react';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';

const VoxelLayer = ({
  selectedVariable,
  selectedVisualization,
  exaggeration,
  mapView,
  displayError,
  setIsosurfaceInfo,
  sections,
  setSections,
  displayIsosurface,
  isosurfaceValue,
  setIsosurfaceValue,
  displaySections
}) => {
  const [layer, setLayer] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded && exaggeration) {
      layer.volumeStyles.getItemAt(0).verticalExaggeration = exaggeration;
    }
  }, [loaded, exaggeration]);

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
      const style = layer.variableStyles.filter((style) => style.variableId === selectedVariable.id).getItemAt(0);
      if (style && style.transferFunction) {
        const range = style.transferFunction.stretchRange;
        const min = Math.min(Math.round(range[0]), Math.round(range[1]));
        const max = Math.max(Math.round(range[0]), Math.round(range[1]));
        setIsosurfaceInfo({
          min,
          max
        });
        setIsosurfaceValue(Math.floor((min + max) / 2));
      }
    }
  }, [loaded, selectedVariable]);

  useEffect(() => {
    if (loaded && layer && selectedVisualization === 'surfaces' && isosurfaceValue) {
      const style = layer.variableStyles.filter((style) => style.variableId === selectedVariable.id).getItemAt(0);
      const color = layer.getColorForContinuousDataValue(selectedVariable.id, isosurfaceValue, false);
      if (style) {
        style.isosurfaces = [
          {
            value: isosurfaceValue,
            enabled: true,
            color: { ...color, a: 0.8 }
          }
        ];
      }
    }
  }, [loaded, selectedVariable, isosurfaceValue, layer, selectedVisualization]);

  useEffect(() => {
    if (layer) {
      layer.enableIsosurfaces = displayIsosurface;
    }
  }, [layer, displayIsosurface]);

  useEffect(() => {
    if (layer) {
      layer.enableDynamicSections = displaySections;
    }
  }, [layer, displaySections]);

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
      if (!voxelLayer.loaded) {
        reactiveUtils.watch(() => voxelLayer.loaded, setLoaded);
      } else {
        setLoaded(true);
      }

      window.voxelLayer = voxelLayer;
      setLayer(voxelLayer);
    }
  }, [mapView]);

  return null;
};

export default VoxelLayer;
