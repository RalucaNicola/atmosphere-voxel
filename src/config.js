export const mapConfig = {
  'web-scene-id': '84d018c9bc6344168bddb1aa0e2113e3'
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
    id: 2,
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
    id: 3,
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
    id: 5,
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
    id: 7,
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

export const timeDates = ['June 1, 2019', 'July 31, 2019'];
