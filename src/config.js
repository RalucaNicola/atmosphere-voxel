export const mapConfig = {
  'web-scene-id': 'dc381de31be24f9e9de5562b4700ca58'
  // old webscene with basemap 84d018c9bc6344168bddb1aa0e2113e3
};

export const variables = [
  {
    name: 'Pressure',
    id: 0,
    description: `Retrieved air pressure in millibar.`,
    visualization: [
      {
        name: 'Full dataset volume',
        value: 'volume'
      },
      {
        name: 'Vertical sections and 1,000mb isosurface',
        value: 'surfaces'
      }
    ]
  },
  {
    name: 'Dry air pressure',
    id: 4,
    description: `Retrieved dry pressure profile in millibar (retrieved with water vapor pressure set to zero.)`,
    visualization: [
      {
        name: 'Full dataset volume',
        value: 'volume'
      },
      {
        name: 'Vertical sections',
        value: 'surfaces'
      }
    ]
  },
  {
    name: 'Moist air pressure',
    id: 6,
    description: `Retrieved water vapor pressure in millibar.`,
    visualization: [
      {
        name: 'Full dataset volume',
        value: 'volume'
      },
      {
        name: 'Vertical sections',
        value: 'surfaces'
      }
    ]
  },
  {
    name: 'Temperature',
    id: 10,
    description: `Air temperature profile in Kelvin.`,
    visualization: [
      {
        name: 'Full dataset volume',
        value: 'volume'
      },
      {
        name: 'Vertical sections and 190 °K and 275 °K isosurfaces',
        value: 'surfaces'
      }
    ]
  },
  {
    name: 'Dry air temperature',
    id: 14,
    description: `Retrieved dry temperature profile in Kelvin (retrieved with water vapor pressure set to zero).`,
    visualization: [
      {
        name: 'Full dataset volume',
        value: 'volume'
      },
      {
        name: 'Vertical sections',
        value: 'surfaces'
      }
    ]
  }
];

export const timeDates = ['June 1, 2019', 'July 1, 2019', 'August 1, 2019'];
