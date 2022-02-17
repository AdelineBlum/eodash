// config global variables here for now
// temporary solution
import { Wkt } from 'wicket';
import { latLng, latLngBounds } from 'leaflet';
import { DateTime } from 'luxon';
import { shTimeFunction } from '@/utils';
import { baseLayers, overlayLayers } from '@/config/layers';
import availableDates from '@/config/data_dates.json';
import store from '../store';

export const dataPath = './data/internal/';
export const dataEndpoints = [
  {
    type: 'eox',
    provider: './data/internal/pois_trilateral.json',
  },
  /*
  {
    type: 'nasa',
    provider: 'https://h4ymwpefng.execute-api.us-east-1.amazonaws.com/v1/',
  },
  {
    type: 'nasa',
    provider: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/',
  },
  */
];

export const indicatorsDefinition = Object.freeze({
  E13c: {
    indicator: 'Changes in Ships traffic within the Port',
    class: 'economic',
    story: '/data/trilateral/E13c',
    features: {
      dateFormatFunction: (date) => DateTime.fromISO(date).toFormat("yyyyMMdd'T'HHmmss"),
      url: './eodash-data/features/E200/E200_{aoiID}_{featuresTime}.geojson',
      allowedParameters: ['TYPE_SUMMARY', 'SPEED (KNOTSx10)', 'classification', 'TIMESTAMP UTC', 'TYPE_NAME', 'LENGTH'],
    },
    largeSubAoi: true,
    baseLayers: [{
      ...baseLayers.cloudless,
      visible: true,
    }, baseLayers.terrainLight],
  },
  E1: {
    indicator: 'Status of metallic ores',
    class: 'economic',
    story: '/data/trilateral/E1',
    features: {
      dateFormatFunction: (date) => DateTime.fromISO(date).toFormat("yyyyMMdd'T'HHmmss"),
      url: './eodash-data/features/{indicator}/{indicator}_{aoiID}_{featuresTime}.geojson',
      allowedParameters: ['TYPE_SUMMARY', 'SPEED (KNOTSx10)', 'classification'],
    },
  },
  E1_S2: {
    indicator: 'Status of metallic ores',
    class: 'economic',
    story: '/data/trilateral/E1',
    features: {
      dateFormatFunction: (date) => DateTime.fromISO(date).toFormat("yyyyMMdd'T'HHmmss"),
      url: './eodash-data/features/{indicator}/{indicator}_{aoiID}_{featuresTime}.geojson',
    },
  },
  E1a: {
    indicator: 'Status of non-metallic ores',
    class: 'economic',
    story: '/data/trilateral/E1a',
    features: {
      dateFormatFunction: (date) => DateTime.fromISO(date).toFormat("yyyyMMdd'T'HHmmss"),
      url: './eodash-data/features/{indicator}/{indicator}_{aoiID}_{featuresTime}.geojson',
      allowedParameters: ['TYPE_SUMMARY', 'SPEED (KNOTSx10)', 'classification'],
    },
  },
  E1a_S2: {
    indicator: 'Status of metallic ores',
    class: 'economic',
    story: '/data/trilateral/E1a',
    features: {
      dateFormatFunction: (date) => DateTime.fromISO(date).toFormat("yyyyMMdd'T'HHmmss"),
      url: './eodash-data/features/{indicator}/{indicator}_{aoiID}_{featuresTime}.geojson',
    },
  },
  E2: {
    indicator: 'Volume of oil stockpiled',
    class: 'economic',
  },
  E2a: {
    indicator: 'Level of flaring activity',
    class: 'economic',
  },
  E3: {
    indicator: 'Inventory levels of factory inputs',
    class: 'economic',
  },
  E4: {
    indicator: 'Production activity of intermediate goods',
    class: 'economic',
  },
  E5: {
    indicator: 'Inventory levels of intermediate goods',
    class: 'economic',
  },
  E6: {
    indicator: 'Inventory levels of factory inputs',
    class: 'economic',
  },
  E7: {
    indicator: 'Production activity of finished goods',
    class: 'economic',
  },
  E8: {
    indicator: 'Inventory Levels',
    class: 'economic',
  },
  E9: {
    indicator: 'Construction activity',
    class: 'economic',
    story: '/data/trilateral/E9',
    largeSubAoi: true,
  },
  E10a1: {
    indicator: 'Harvesting activity',
    class: 'agriculture',
    story: '/data/trilateral/E10a1',
    largeSubAoi: true,
    baseLayers: [baseLayers.cloudless, baseLayers.terrainLight, {
      ...baseLayers.S2GLC,
      visible: true,
    }],
    legendUrl: 'eodash-data/data/LegendGLC.png',
  },
  E10a2: {
    indicator: 'Cum. proportion of total area under active mgmt.',
    class: 'agriculture',
    story: '/eodash-data/stories/E10a2',
    largeSubAoi: true,
    baseLayers: [baseLayers.cloudless, baseLayers.terrainLight, {
      ...baseLayers.S2GLC,
      visible: true,
    }],
    legendUrl: 'eodash-data/data/LegendGLC.png',
    maxDecimals: 4,
  },
  E10a3: {
    indicator: 'Evolution of the cultivated areas for production of white asparagus',
    class: 'agriculture',
    story: '/eodash-data/stories/E10a2',
    largeSubAoi: true,
  },
  E10a6: {
    indicator: 'Harvested parcels/area evolution over time',
    class: 'agriculture',
    story: '/eodash-data/stories/E10a6',
    largeSubAoi: true,
    maxDecimals: 4,
  },
  E10a8: {
    indicator: 'Cumulative harvested area',
    class: 'agriculture',
    story: '/eodash-data/stories/E10a8',
    largeSubAoi: true,
  },
  E10b: {
    indicator: 'Field preparation activity',
    class: 'agriculture',
  },
  E10c: {
    indicator: 'Rice Planted Area',
    class: 'agriculture',
    story: '/data/trilateral/US05-E10c',
    largeSubAoi: true,
  },
  E10d: {
    indicator: 'Cropped Area - Regional',
    class: 'agriculture',
    story: '/data/trilateral/E10d',
    largeSubAoi: true,
    disableTimeSelection: true,
  },
  E11: {
    indicator: 'Volume of activity at shopping centers',
    class: 'economic',
  },
  E12a: {
    indicator: 'Volume of activity logistic interchange centers',
    class: 'economic',
  },
  E12b: {
    indicator: 'Throughput at border crossing points',
    class: 'economic',
  },
  E13a: {
    indicator: 'Throughput at principal rail stations',
    class: 'economic',
  },
  E13b: {
    indicator: 'Throughput at principal hub airports',
    class: 'economic',
    features: {
      dateFormatFunction: (date) => DateTime.fromISO(date).toFormat("yyyyMMdd'T'HHmmss"),
      url: './eodash-data/features/{indicator}/{indicator}_{aoiID}_{featuresTime}.geojson',
    },
    story: '/data/trilateral/E13b',
    largeSubAoi: true,
  },
  H1: {
    indicator: 'Number of temp. treatment sites',
    class: 'health',
  },
  N1: {
    indicator: 'Air quality',
    class: 'air',
    story: '/data/trilateral/N1',
    largeTimeDuration: true,
    largeSubAoi: true,
    maxMapZoom: 8,
  },
  NASAPopulation: {
    indicator: 'Population',
    class: 'economic',
    story: '/data/trilateral/NASAPopulation',
  },
  WSF: {
    indicator: 'World Settlement Footprint',
    class: 'economic',
    // story: '/data/trilateral/NASAPopulation',
  },
  N2: {
    indicator: 'Greenhouse Gases',
    class: 'air',
    story: '/data/trilateral/N2',
    largeTimeDuration: true,
    largeSubAoi: true,
  },
  N3: {
    indicator: 'Water Quality',
    class: 'water',
  },
  N3b: {
    indicator: 'Chl-a concentration anomaly',
    class: 'water',
    story: '/data/trilateral/N3b',
    sensorColorMap: {
      'Sentinel-3A OLCI': '#a37',
      'Aqua MODIS': '#47a',
      'MODIS Aqua': '#47a',
      'GCOM-C/SGLI': '#6ce',
    },
  },
  N3a2: {
    indicator: 'CHL concentration',
    class: 'water',
    story: '/eodash-data/stories/N3a2',
    largeSubAoi: true,
  },
  N4a: {
    indicator: 'Changes in land fill sites',
    class: 'land',
  },
  N4b: {
    indicator: 'Illegal waste levels',
    class: 'land',
  },
  N5: {
    indicator: 'Nightlights (Suomi NPP VIIRS)',
    class: 'economic',
    story: '/data/trilateral/N5',
    largeSubAoi: true,
  },
  N6: {
    indicator: 'Cropped Area - Global',
    class: 'agriculture',
    story: '/data/trilateral/N6',
  },
  N7: {
    indicator: 'Slowdown Proxy Maps',
    class: 'economic',
    story: '/data/trilateral/N7',
    largeSubAoi: true,
  },
  N8: {
    indicator: 'Recovery Proxy Maps',
    class: 'economic',
    story: '/data/trilateral/N8',
    largeSubAoi: true,
    disableTimeSelection: true,
  },
  GG: {
    indicator: 'Mobility',
    class: 'economic',
    disableTimeSelection: true,
    countrySelection: true,
    story: '/eodash-data/stories/GG-GG',
  },
  CV: {
    indicator: 'Covid cases',
    class: 'health',
    disableTimeSelection: true,
    countrySelection: true,
    story: '/eodash-data/stories/CV-CV',
  },
  OW: {
    indicator: 'Vaccinations',
    class: 'health',
    disableTimeSelection: true,
    countrySelection: true,
    hideInFilters: true,
    story: '/eodash-data/stories/OW-OW',
  },
  FB: {
    indicator: 'Facebook population density',
    class: 'economic',
    disableTimeSelection: true,
    baseLayers: [{
      ...baseLayers.cloudless,
      visible: true,
    }, baseLayers.terrainLight],
  },
  d: { // dummy for locations without Indicator code
    indicator: 'Upcoming data',
    class: 'economic',
  },
});

export const layerNameMapping = Object.freeze({
  // "inputdata" -> wms layer name and baseurl
  '[NEW] Planetscope COVID-19': {
    layers: 'NEW_PLANETSCOPE_COVID-19',
  },
  'PlanetScope - COVID19': {
    layers: 'NEW_PLANETSCOPE_COVID-19',
  },
  'Planetscope COVID-19': {
    layers: 'NEW_PLANETSCOPE_COVID-19',
  },
  '[NEW] Planet COVID-19': {
    layers: 'NEW_PLANETSCOPE_COVID-19',
  },
  '[NEW] Pleiades': {
    baseUrl: `https://shservices.mundiwebservices.com/ogc/wms/${shConfig.shInstanceId}`,
    layers: 'NEW_PLEIADES',
  },
  'Pleiades - COVID19': {
    layers: 'NEW_PLEIADES_COVID19',
  },
  '[NEW] Pleiades COVID-19': {
    layers: 'NEW_PLEIADES_COVID19',
  },
  '[NEW] Pleiades COVID19': {
    layers: 'NEW_PLEIADES_COVID19',
  },
  '[NEW] Pleiades - 2.8m - COVID19': {
    layers: 'NEW_PLEIADES_28_COVID19',
  },
  '[NEW] Pleiades 16bit': {
    baseUrl: `https://shservices.mundiwebservices.com/ogc/wms/${shConfig.shInstanceId}`,
    layers: 'NEW_PLEIADES_16BIT',
  },
  'Sentinel 2 L2A': {
    layers: 'SENTINEL-2-L2A-TRUE-COLOR',
  },
  S2L2A: {
    layers: 'SENTINEL-2-L2A-TRUE-COLOR',
  },
  S1GRD: {
    layers: 'E8_SENTINEL1',
  },
  'S1A - GRD': {
    layers: 'E8_SENTINEL1',
  },
  'LANDSAT-8-TRUE-COLOUR': {
    layers: 'LANDSAT-8-TRUE-COLOUR',
  },
  'LANDSAT-8-NIR': {
    layers: 'LANDSAT-8-NIR',
  },
  'Sentinel-1': {
    layers: 'E8_SENTINEL1',
  },
  'ALOS-2': {
    baseUrl: `https://shservices.mundiwebservices.com/ogc/wms/${shConfig.shInstanceId}`,
    layers: 'JAXA_CARS_CONTAINERS_ALOS2',
  },
  /*
  'ALOS-2': {
    url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3%3A%2F%2Fcovid-eo-data%2FALOS_SAMPLE%2Falos2-s1-beijing_{time}.tif&resampling_method=nearest&bidx=1&rescale=0%2C65536',
    protocol: 'xyz',
    tileSize: 256,
    dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy_MM_dd'),
  },
  */
  GOSAT_XCO2: {
    url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/xco2/GOSAT_XCO2_{time}_{site}_BG_circle_cog.tif&resampling_method=nearest',
    protocol: 'xyz',
    maxNativeZoom: 12,
    maxMapZoom: 12,
    tileSize: 256,
    dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyyMM'),
    siteMapping: (eoID) => {
      const mapping = {
        CN01: 'be',
        CN02: 'sh',
        BD01: 'dh',
        IN01: 'dl',
        IN02: 'mb',
        US01: 'ny',
        JP01: 'tk',
      };
      return mapping[eoID];
    },
    legendUrl: 'data/trilateral/N2-XCO2-legend.png',
  },
  airport_tk: {
    url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3%3A%2F%2Fcovid-eo-data%2Fairport%2Ftk_{time}.tif&resampling_method=bilinear&bidx=1',
    protocol: 'xyz',
    tileSize: 256,
    dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy_MM_dd'),
    siteMapping: (eoID) => {
      const mapping = {
        JP02: 'tk', // just to fix transition
      };
      return mapping[eoID];
    },
  },
  industry: {
    url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3%3A%2F%2Fcovid-eo-data%2Findustry%2F{site}_{time}.tif&resampling_method=bilinear&bidx=1',
    protocol: 'xyz',
    tileSize: 256,
    dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy_MM_dd'),
    siteMapping: (eoID) => {
      const mapping = {
        SG01: 'sg',
      };
      return mapping[eoID];
    },
  },
  ports: {
    url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3%3A%2F%2Fcovid-eo-data%2Fplanet%2F{site}-{time}.tif&resampling_method=bilinear&bidx=1%2C2%2C3',
    protocol: 'xyz',
    tileSize: 256,
    dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy_MM_dd'),
    siteMapping: (eoID) => {
      const mapping = {
        US01: 'ny',
        US02: 'la',
        US03: 'sf',
      };
      return mapping[eoID];
    },
    features: {
      dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy_MM_dd'),
      url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/detections/ship/{site}/{featuresTime}.geojson',
      allowedParameters: { // can also be a simple list
        verified: {},
      },
    },
  },
  airports: {
    url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/planet/{z}/{x}/{y}?date={time}&site={site}',
    name: 'Throughput at principal hub airports',
    protocol: 'xyz',
    tileSize: 256,
    dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy_MM_dd'),
    siteMapping: (eoID) => {
      const mapping = {
        US021: 'la',
        US022: 'la',
        US031: 'sf',
        US032: 'sf',
        US033: 'sf',
        US034: 'sf',
        US035: 'sf',
        US036: 'sf',
        US037: 'sf',
        US041: 'ny',
        US042: 'ny',
        CN011: 'be',
        CN012: 'be',
        JP02: 'tk',
        JP012: 'tk',
      };
      return mapping[eoID];
    },
    features: {
      dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy_MM_dd'),
      url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/detections/plane/{site}/{featuresTime}.geojson',
      allowedParameters: ['Country', 'label', 'score'],
    },
  },
  'SGLI L2 Reflectance 8-day composited': {
    url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3%3A%2F%2Fcovid-eo-data%2Fagriculture%2Fgcom-c-{time}.tif&resampling_method=bilinear&bidx=1&rescale=-1%2C1&color_map=cfastie',
    protocol: 'xyz',
    tileSize: 256,
    legendUrl: 'data/trilateral/NDVI.png',
    dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy_MM_dd'),
  },
});

export const indicatorClassesIcons = Object.freeze({
  economic: 'mdi-cash',
  agriculture: 'mdi-barley',
  air: 'mdi-weather-windy',
  water: 'mdi-water',
  land: 'mdi-image-filter-hdr',
  health: 'mdi-hospital-box-outline',
});

export const mapDefaults = Object.freeze({
  minMapZoom: 0,
  maxMapZoom: 18,
  bounds: latLngBounds(latLng([-70, -170]), latLng([70, 170])),
});

export const baseLayersLeftMap = [{
  ...baseLayers.terrainLight, visible: true,
}, baseLayers.cloudless];
export const baseLayersRightMap = [{
  ...baseLayers.terrainLight, visible: true,
}, baseLayers.cloudless];

export const overlayLayersLeftMap = [{
  ...overlayLayers.eoxOverlay, visible: true,
}];
export const overlayLayersRightMap = [{
  ...overlayLayers.eoxOverlay, visible: true,
}];

const mapBoxHighResoSubst = [{
  ...baseLayers.mapboxHighReso,
  visible: true,
}, baseLayers.terrainLight, baseLayers.cloudless];

export const defaultLayersDisplay = {
  baseUrl: `https://services.sentinel-hub.com/ogc/wms/${shConfig.shInstanceId}`,
  protocol: 'WMS',
  dateFormatFunction: shTimeFunction,
  format: 'image/png',
  transparent: true,
  tileSize: 512,
  opacity: 1,
  attribution: '{ <a href="https://eodashboard.org/terms_and_conditions" target="_blank">se of this data is subject to Articles 3 and 8 of the Terms and Conditions</a> }',
  minZoom: 7,
  visible: true,
};

const getMonthlyDates = (start, end) => {
  let currentDate = DateTime.fromISO(start);
  const stopDate = DateTime.fromISO(end);
  const dateArray = [];
  while (currentDate <= stopDate) {
    dateArray.push(DateTime.fromISO(currentDate).toFormat('yyyy-MM-dd'));
    currentDate = DateTime.fromISO(currentDate).plus({ months: 1 });
  }
  return dateArray;
};

const getDailyDates = (start, end) => {
  let currentDate = DateTime.fromISO(start);
  const stopDate = DateTime.fromISO(end);
  const dateArray = [];
  while (currentDate <= stopDate) {
    dateArray.push(DateTime.fromISO(currentDate).toFormat('yyyy-MM-dd'));
    currentDate = DateTime.fromISO(currentDate).plus({ days: 1 });
  }
  return dateArray;
};

const getWeeklyDates = (start, end) => {
  let currentDate = DateTime.fromISO(start);
  const stopDate = DateTime.fromISO(end);
  const dateArray = [];
  while (currentDate <= stopDate) {
    dateArray.push(DateTime.fromISO(currentDate).toFormat('yyyy-MM-dd'));
    currentDate = DateTime.fromISO(currentDate).plus({ weeks: 1 });
  }
  return dateArray;
};

const getFortnightIntervalDates = (start, end) => {
  let currentDate = DateTime.fromISO(start);
  const stopDate = end === 'now' ? DateTime.utc().minus({ days: 13 }) : DateTime.fromISO(end).minus({ days: 13 });
  const dateArray = [];
  while (currentDate <= stopDate) {
    dateArray.push([
      DateTime.fromISO(currentDate).toFormat('yyyy-MM-dd'),
      DateTime.fromISO(currentDate).plus({ days: 13 }).toFormat('yyyy-MM-dd'),
    ]);
    currentDate = DateTime.fromISO(currentDate).plus({ weeks: 1 });
  }
  return dateArray;
};

const getDaily2DayIntervalDates = (start, end) => {
  let currentDate = DateTime.fromISO(start);
  const stopDate = DateTime.fromISO(end);
  const dateArray = [];
  while (currentDate <= stopDate) {
    dateArray.push([
      DateTime.fromISO(currentDate).toFormat('yyyy-MM-dd'),
      DateTime.fromISO(currentDate).plus({ days: 2 }).toFormat('yyyy-MM-dd'),
    ]);
    currentDate = DateTime.fromISO(currentDate).plus({ days: 1 });
  }
  return dateArray;
};

const wkt = new Wkt();

export const globalIndicators = [
  {
    properties: {
      indicatorObject: {
        aoiID: 'GG',
        dataLoadFinished: true,
        country: 'all',
        city: 'World',
        siteName: 'global',
        description: 'Mobility Data',
        indicatorName: '(select country to load data)',
        indicator: 'GG',
        lastIndicatorValue: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [],
        },
        lastColorCode: null,
        aoi: null,
        inputData: [''],
        yAxis: 'percent change from baseline',
        time: ['TBD'],
        display: {
        },
      },
    },
  },
  {
    properties: {
      indicatorObject: {
        aoiID: 'CV',
        dataLoadFinished: true,
        country: 'all',
        city: 'World',
        siteName: 'global',
        description: 'Covid19 Data',
        indicatorName: '(select country to load data)',
        indicator: 'CV',
        lastIndicatorValue: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [],
        },
        lastColorCode: null,
        aoi: null,
        inputData: [''],
        yAxis: 'aggregated covid cases',
        time: ['TBD'],
        display: {
        },
      },
    },
  },
  {
    properties: {
      indicatorObject: {
        aoiID: 'OW',
        dataLoadFinished: true,
        country: 'all',
        city: 'World',
        siteName: 'global',
        description: 'Vaccination Data',
        indicatorName: '(select country to load data)',
        indicator: 'OW',
        lastIndicatorValue: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [],
        },
        lastColorCode: null,
        aoi: null,
        inputData: [''],
        yAxis: 'vaccination data',
        time: ['TBD'],
        display: {
        },
      },
    },
  },
  {
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        country: 'all',
        city: 'World',
        siteName: 'global',
        description: 'Air Quality',
        indicator: 'N1',
        lastIndicatorValue: null,
        indicatorName: 'Air Quality - TROPOMI: NO2',
        eoSensor: 'ESA TROPOMI',
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-180 -71, 180 -71, 180 71, -180 71, -180 -71))').toJson(),
          }],
        },
        lastColorCode: null,
        aoi: null,
        aoiID: 'W1',
        time: getFortnightIntervalDates('2019-01-07', 'now'),
        inputData: [''],
        yAxis: 'Tropospheric NO2 (μmol/m2)',
        display: {
          customAreaIndicator: true,
          baseUrl: `https://shservices.mundiwebservices.com/ogc/wms/${shConfig.shInstanceId}`,
          name: 'Air Quality (NO2) - ESA',
          layers: 'NO2-VISUALISATION',
          legendUrl: 'eodash-data/data/no2Legend.png',
          minZoom: 1,
          dateFormatFunction: (date) => DateTime.fromISO(date[0]).toFormat('yyyy-MM-dd'),
          areaIndicator: {
            url: `https://shservices.mundiwebservices.com/ogc/fis/${shConfig.shInstanceId}?LAYER=NO2_RAW_DATA&CRS=CRS:84&TIME=2000-01-01/2050-01-01&RESOLUTION=2500m&GEOMETRY={area}`,
            callbackFunction: (requestJson, indicator) => {
              if (Array.isArray(requestJson.C0)) {
                const data = requestJson.C0;
                const newData = {
                  time: [],
                  measurement: [],
                  referenceValue: [],
                  colorCode: [],
                };
                data.sort((a, b) => ((DateTime.fromISO(a.date) > DateTime.fromISO(b.date))
                  ? 1
                  : -1));
                data.forEach((row) => {
                  if (row.basicStats.max < 5000) {
                    // leaving out falsely set nodata values disrupting the chart
                    newData.time.push(DateTime.fromISO(row.date));
                    newData.colorCode.push('');
                    newData.measurement.push(row.basicStats.mean);
                    newData.referenceValue.push(`[null, ${row.basicStats.stDev}, ${row.basicStats.max}, ${row.basicStats.min}]`);
                  }
                });
                const ind = {
                  ...indicator,
                  ...newData,
                };
                return ind;
              }
              return null;
            },
            areaFormatFunction: (area) => ({ area: wkt.read(JSON.stringify(area)).write() }),
          },
        },
      },
    },
  },
  {
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        country: 'all',
        city: 'World',
        siteName: 'global',
        description: 'Air Quality',
        indicator: 'N1',
        lastIndicatorValue: null,
        indicatorName: 'Air Quality - OMI: NO2',
        eoSensor: 'NASA OMI',
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-180 -71, 180 -71, 180 71, -180 71, -180 -71))').toJson(),
          }],
        },
        lastColorCode: null,
        aoi: null,
        aoiID: 'W2',
        time: getMonthlyDates('2004-10-01', '2022-01-01'),
        inputData: [''],
        yAxis: 'NO2 [µmol/m²]',
        display: {
          customAreaIndicator: true,
          protocol: 'xyz',
          minZoom: 1,
          maxNativeZoom: 6,
          tileSize: 256,
          opacity: 0.95,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x.png?url=s3://covid-eo-data/OMNO2d_HRM/OMI_trno2_0.10x0.10_{time}_Col3_V4.nc.tif&resampling_method=bilinear&bidx=1&rescale=0%2C1.08398547e16&color_map=reds',
          name: 'Air Quality (NASA)',
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyyMM'),
          legendUrl: 'eodash-data/data/no2Legend.png',
          areaIndicator: {
            url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/timelapse',
            requestMethod: 'POST',
            requestHeaders: {
              'Content-Type': 'application/json',
            },
            requestBody: {
              datasetId: 'no2',
              dateRange: ['202001', '202101'],
              geojson: '{geojson}',
            },
            callbackFunction: (responseJson, indicator) => {
              let ind = null;
              if (Array.isArray(responseJson)) {
                const data = responseJson;
                const newData = {
                  time: [],
                  measurement: [],
                  colorCode: [],
                  referenceValue: [],
                };
                data.forEach((row) => {
                  newData.time.push(DateTime.fromFormat(row.date, 'yyyyMM'));
                  newData.colorCode.push('');
                  newData.measurement.push(row.mean / 1e14);
                  newData.referenceValue.push(`[${row.median / 1e14}, null, null, null]`);
                });
                ind = {
                  ...indicator,
                  ...newData,
                };
              } else if (Object.keys(responseJson).indexOf('detail') !== -1) {
                // This will happen if area selection is too large
                if (responseJson.detail[0].msg.startsWith('AOI cannot exceed')) {
                  store.commit('sendAlert', {
                    message: 'AOI cannot exceed 200 000 km²',
                    type: 'error',
                  });
                } else {
                  console.log(responseJson.detail[0].msg);
                }
              }
              return ind;
            },
            areaFormatFunction: (area) => (
              {
                geojson: JSON.stringify({
                  type: 'Feature',
                  properties: {},
                  geometry: area,
                }),
              }
            ),
          },
        },
      },
    },
  },
  {
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        country: 'all',
        city: 'World',
        siteName: 'global',
        description: 'Air Quality',
        indicator: 'N1',
        lastIndicatorValue: 'OMI: Difference Nitrogen dioxide',
        indicatorName: 'Air Quality - OMI: Monthly NO2 Compared to Baseline (2015-2019)',
        eoSensor: 'NASA OMI Difference',
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-180 -71, 180 -71, 180 71, -180 71, -180 -71))').toJson(),
          }],
        },
        lastColorCode: 'primary',
        aoi: null,
        aoiID: 'W3',
        time: getMonthlyDates('2015-01-01', '2022-01-01'),
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 6,
          minZoom: 1,
          opacity: 0.95,
          tileSize: 256,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/OMNO2d_HRMDifference/OMI_trno2_0.10x0.10_{time}_Col3_V4.nc.tif&resampling_method=bilinear&bidx=1&rescale=-3e15%2C3e15&color_map=rdbu_r',
          name: 'Air Quality (NASA)',
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyyMM'),
          legendUrl: 'data/trilateral/N1-NO2DiffLegend.png',
          disableCompare: true,
        },
      },
    },
  },
  {
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        country: 'all',
        city: 'World',
        siteName: 'global',
        description: 'Greenhouse Gases',
        indicator: 'N2',
        lastIndicatorValue: null,
        indicatorName: 'Greenhouse Gases - OCO-2: Mean CO2',
        calcMethod: 'Mean CO2',
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-180 -71, 180 -71, 180 71, -180 71, -180 -71))').toJson(),
          }],
        },
        lastColorCode: null,
        aoi: null,
        aoiID: 'W4',
        time: getDailyDates('2020-01-01', '2021-06-15'),
        inputData: [''],
        display: {
          protocol: 'xyz',
          tileSize: 256,
          minZoom: 1,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/xco2-mean/xco2_16day_mean.{time}.tif&resampling_method=bilinear&bidx=1&rescale=0.000408%2C0.000419&color_map=rdylbu_r',
          name: 'Greenhouse Gases (NASA)',
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy_MM_dd'),
          legendUrl: 'data/trilateral/N2-co2mean-legend.png',
          mapLabel: 'Mean',
        },
        compareDisplay: {
          protocol: 'xyz',
          tileSize: 256,
          minZoom: 1,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/xco2-base/xco2_16day_base.{time}.tif&resampling_method=bilinear&bidx=1&rescale=0.000408%2C0.000419&color_map=rdylbu_r',
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy_MM_dd'),
          mapLabel: 'Baseline',
        },
      },
    },
  },
  {
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        country: 'all',
        city: 'World',
        siteName: 'global',
        description: 'Facebook population density',
        indicator: 'FB',
        lastIndicatorValue: null,
        indicatorName: 'Facebook population density',
        subAoi: {
          type: 'FeatureCollection',
          features: [],
        },
        lastColorCode: null,
        aoi: null,
        aoiID: 'W7',
        time: ['TBD'],
        inputData: [''],
        display: {
          protocol: 'xyz',
          tileSize: 256,
          minZoom: 1,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/dataforgood-fb-population-density/cog.tif&rescale=0,69&resampling_method=nearest&color_map=ylorrd',
          name: 'Facebook population density',
          legendUrl: 'data/trilateral/FbPopulation_legend.png',
          mapLabel: 'Population density',
          presetView: {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              properties: {},
              geometry: wkt.read('POLYGON((2.1 48.6,2.6 48.6,2.6 49.0,2.1 49.0,2.1 48.6))').toJson(),
            }],
          },
        },
        compareDisplay: {
          protocol: 'xyz',
          tileSize: 256,
          minZoom: 1,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/dataforgood-fb-population-density/cog.tif&rescale=0,69&resampling_method=nearest&color_map=ylorrd',
          mapLabel: 'Population density',
        },
      },
    },
  },
  {
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        country: 'all',
        city: 'World',
        siteName: 'global',
        description: 'Greenhouse Gases',
        indicator: 'N2',
        lastIndicatorValue: null,
        indicatorName: 'Greenhouse Gases - OCO-2: Difference CO2',
        calcMethod: 'Difference CO2',
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-180 -71, 180 -71, 180 71, -180 71, -180 -71))').toJson(),
          }],
        },
        lastColorCode: null,
        aoi: null,
        aoiID: 'W5',
        time: getDailyDates('2020-01-01', '2021-06-15'),
        inputData: [''],
        display: {
          protocol: 'xyz',
          tileSize: 256,
          minZoom: 1,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/xco2-diff/xco2_16day_diff.{time}.tif&resampling_method=bilinear&bidx=1&rescale=-0.000001%2C0.000001&color_map=rdbu_r',
          name: 'Greenhouse Gases (NASA)',
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy_MM_dd'),
          legendUrl: 'data/trilateral/N2-co2diff-legend.png',
          disableCompare: true,
        },
      },
    },
  },
  {
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        country: 'all',
        city: 'World',
        siteName: 'global',
        description: 'Population',
        indicator: 'NASAPopulation',
        lastIndicatorValue: null,
        indicatorName: 'Population density 2020',
        subAoi: {
          type: 'FeatureCollection',
          features: [],
        },
        lastColorCode: null,
        aoi: null,
        aoiID: 'W6',
        time: ['2020-05-14T00:00:00Z'],
        inputData: [''],
        display: {
          baseUrl: `https://shservices.mundiwebservices.com/ogc/wms/${shConfig.shInstanceId}`,
          name: 'Population',
          layers: 'POPULATION_DENSITY',
          legendUrl: 'data/trilateral/NASAPopulation_legend.png',
          minZoom: 1,
          maxMapZoom: 7,
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat("yyyy-MM-dd'T'HH:mm:ss'Z'"),
          disableCompare: true,
        },
      },
    },
  },
  {
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        country: 'all',
        city: 'World',
        siteName: 'global',
        description: 'WSF Evolution',
        indicator: 'WSF',
        lastIndicatorValue: null,
        indicatorName: 'World Settlement Footprint (WSF) Evolution',
        subAoi: {
          type: 'FeatureCollection',
          features: [],
        },
        lastColorCode: null,
        aoi: null,
        aoiID: 'WSF',
        time: getYearlyDates('1985', '2015'),
        inputData: [''],
        display: {
          baseUrl: 'https://a.geoservice.dlr.de/eoc/land/wms/',
          name: 'WSF_Evolution',
          layers: 'WSF_Evolution',
          legendUrl: 'eodash-data/data/wsf_legend.png',
          minZoom: 1,
          maxMapZoom: 14,
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy'),
          labelFormatFunction: (date) => date,
          specialEnvTime: true,
        },
      },
    },
  },
  {
    latlng: latLng([35.61, 139.78]),
    id: 9998,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([35.61, 139.78]),
        id: 9998,
        aoiID: 'JP01',
        country: ['JP'],
        city: 'Tokyo',
        siteName: 'Tokyo',
        description: 'Nightlights',
        indicator: 'N5',
        lastIndicatorValue: null,
        indicatorName: 'Night light composite maps (Suomi NPP VIIRS)',
        lastColorCode: null,
        eoSensor: ['Nightlights'],
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((139.34275817871094 35.049654646456474, 140.34809152322123 35.049654646456474, 140.34809152322123 35.93543243408203, 139.34275817871094 35.93543243408203, 139.34275817871094 35.049654646456474))').toJson(),
          }],
        },
        time: getMonthlyDates('2020-01-01', '2021-09-01'),
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 18,
          tileSize: 256,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/bmhd_30m_monthly/BMHD_VNP46A2_tk_{time}_cog.tif&resampling_method=bilinear&rescale=0,255&bidx=1&color_map=inferno',
          name: 'Nightlights',
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyyMM'),
          legendUrl: 'data/trilateral/N5-nighlights-legend.png',
        },
      },
    },
  },
  {
    latlng: latLng([39.9, 116.38]),
    id: 9997,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([39.9, 116.38]),
        id: 9997,
        aoiID: 'CN01',
        country: ['CN'],
        city: 'Beijing',
        siteName: 'Beijing',
        description: 'Nightlights',
        indicator: 'N5',
        lastIndicatorValue: null,
        indicatorName: 'Night light composite maps (Suomi NPP VIIRS)',
        lastColorCode: null,
        eoSensor: ['Nightlights'],
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((115.91229248046875 39.627200509676186, 116.86084804657003 39.627200509676186, 116.86084804657003 40.32575607299805, 115.91229248046875 40.32575607299805, 115.91229248046875 39.627200509676186,))').toJson(),
          }],
        },
        time: getMonthlyDates('2020-01-01', '2021-09-01'),
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 18,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/bmhd_30m_monthly/BMHD_VNP46A2_be_{time}_cog.tif&resampling_method=bilinear&rescale=0,255&bidx=1&color_map=inferno',
          name: 'Nightlights',
          tileSize: 256,
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyyMM'),
          legendUrl: 'data/trilateral/N5-nighlights-legend.png',
        },
      },
    },
  },
  {
    latlng: latLng([51.036138, 2.285374]),
    id: 9996, // for now
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([51.036138, 2.285374]),
        id: 9996,
        aoiID: 'FR03',
        country: ['FR'],
        city: 'Port of Dunkirk',
        siteName: 'Port of Dunkirk',
        description: 'Nightlights',
        indicator: 'N5',
        lastIndicatorValue: null,
        indicatorName: 'Night light composite maps (Suomi NPP VIIRS)',
        lastColorCode: null,
        eoSensor: ['Nightlights'],
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((2.083559989929199 50.965508184133796, 2.416559993631381 50.965508184133796, 2.416559993631381 51.087730407714844, 2.083559989929199 51.087730407714844, 2.083559989929199 50.965508184133796))').toJson(),
          }],
        },
        time: getMonthlyDates('2020-01-01', '2021-09-01'),
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 18,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/bmhd_30m_monthly/BMHD_VNP46A2_du_{time}_cog.tif&resampling_method=bilinear&rescale=0,255&bidx=1&color_map=inferno',
          name: 'Nightlights',
          tileSize: 256,
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyyMM'),
          legendUrl: 'data/trilateral/N5-nighlights-legend.png',
        },
      },
    },
  },
  {
    latlng: latLng([51.091559, 3.740081]),
    id: 9995,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([51.091559, 3.740081]),
        id: 9995,
        aoiID: 'BE03',
        country: ['BE'],
        city: 'Port of Ghent',
        siteName: 'Port of Ghent',
        description: 'Nightlights',
        indicator: 'N5',
        lastIndicatorValue: null,
        indicatorName: 'Night light composite maps (Suomi NPP VIIRS)',
        lastColorCode: null,
        eoSensor: ['Nightlights'],
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((3.6453969478607178 51.06661950775742, 3.85839695022878 51.06661950775742, 3.85839695022878 51.28873062133789, 3.6453969478607178 51.28873062133789, 3.6453969478607178 51.06661950775742))').toJson(),
          }],
        },
        time: getMonthlyDates('2020-01-01', '2021-09-01'),
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 18,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/bmhd_30m_monthly/BMHD_VNP46A2_gh_{time}_cog.tif&resampling_method=bilinear&rescale=0,255&bidx=1&color_map=inferno',
          name: 'Nightlights',
          tileSize: 256,
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyyMM'),
          legendUrl: 'data/trilateral/N5-nighlights-legend.png',
        },
      },
    },
  },
  {
    latlng: latLng([34.05, -118.25]),
    id: 9994,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([34.05, -118.25]),
        id: 9994,
        aoiID: 'US02',
        country: ['US'],
        city: 'Los Angeles',
        siteName: 'Los Angeles',
        description: 'Nightlights',
        indicator: 'N5',
        lastIndicatorValue: null,
        indicatorName: 'Night light composite maps (Suomi NPP VIIRS)',
        lastColorCode: null,
        eoSensor: ['Nightlights'],
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-118.68741607666016 33.42670324365463, -117.0733049476039 33.42670324365463, -117.0733049476039 34.34392547607422, -118.68741607666016 34.34392547607422, -118.68741607666016 33.42670324365463))').toJson(),
          }],
        },
        time: getMonthlyDates('2020-01-01', '2021-09-01'),
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 18,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/bmhd_30m_monthly/BMHD_VNP46A2_la_{time}_cog.tif&resampling_method=bilinear&rescale=0,255&bidx=1&color_map=inferno',
          name: 'Nightlights',
          tileSize: 256,
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyyMM'),
          legendUrl: 'data/trilateral/N5-nighlights-legend.png',
        },
      },
    },
  },
  {
    latlng: latLng([37.7775, -122.416389]),
    id: 9993,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([37.7775, -122.416389]),
        id: 9993,
        aoiID: 'US03',
        country: ['US'],
        city: 'San Francisco',
        siteName: 'San Francisco',
        description: 'Nightlights',
        indicator: 'N5',
        lastIndicatorValue: null,
        indicatorName: 'Night light composite maps (Suomi NPP VIIRS)',
        lastColorCode: null,
        eoSensor: ['Nightlights'],
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-122.63569641113281 37.119795894876006, -121.53514084334165 37.119795894876006, -121.53514084334165 38.35512924194336, -122.63569641113281 38.35512924194336, -122.63569641113281 37.119795894876006))').toJson(),
          }],
        },
        time: getMonthlyDates('2020-01-01', '2021-09-01'),
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 18,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/bmhd_30m_monthly/BMHD_VNP46A2_sf_{time}_cog.tif&resampling_method=bilinear&rescale=0,255&bidx=1&color_map=inferno',
          name: 'Nightlights',
          tileSize: 256,
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyyMM'),
          legendUrl: 'data/trilateral/N5-nighlights-legend.png',
        },
      },
    },
  },
  {
    latlng: latLng([41.0114, -73.09]),
    id: 9992,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([41.0114, -73.09]),
        id: 9992,
        aoiID: 'US04',
        country: ['US'],
        city: 'New York',
        siteName: 'New York',
        description: 'Nightlights',
        indicator: 'N5',
        lastIndicatorValue: null,
        indicatorName: 'Night light composite maps (Suomi NPP VIIRS)',
        lastColorCode: null,
        eoSensor: ['Nightlights'],
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-71.74516 41.54467, -74.43395 41.54943, -74.43219 40.47812, -71.74516 40.48343, -71.74516 41.54467))').toJson(),
          }],
        },
        time: getMonthlyDates('2020-01-01', '2021-09-01'),
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 18,
          tileSize: 256,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/bmhd_30m_monthly/BMHD_VNP46A2_ny_{time}_cog.tif&resampling_method=bilinear&rescale=0,255&bidx=1&color_map=inferno',
          name: 'Nightlights',
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyyMM'),
          legendUrl: 'data/trilateral/N5-nighlights-legend.png',
        },
      },
    },
  },
  {
    id: 19999,
    latlng: latLng([45.197522, 13.029785]),
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        id: 19999,
        aoi: latLng([45.197522, 13.029785]),
        aoiID: 'NorthAdriatic_ESA',
        country: ['HR', 'IT', 'SI'],
        city: 'North Adriatic - Chlorophyll-a concentration',
        siteName: 'North Adriatic',
        description: 'Water Quality Regional Maps',
        indicator: 'N3a2',
        lastIndicatorValue: null,
        indicatorName: 'Water Quality Regional Maps (ESA)',
        lastColorCode: null,
        dataProvider: 'ESA',
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((12.174395 44.778037,12.196361 44.816998,12.085149 45.405263,12.426024 45.583514,13.153667 45.779148,13.603981 45.811687,13.804426 45.675662,13.823647 45.596962,13.626039 45.443008,13.549156 45.433376,13.626039 45.323461,13.713905 45.095238,13.78383 44.980605,13.830519 44.892158,13.839389 44.499195,12.234821 44.481556,12.06659 44.581469,12.174395 44.778037))').toJson(),
          }],
        },
        time: availableDates.N3_CUSTOM_TRILATERAL,
        inputData: [''],
        display: {
          baseUrl: `https://shservices.mundiwebservices.com/ogc/wms/${shConfig.shInstanceIdTrilateral}`,
          name: 'Water Quality Index',
          layers: 'N3_CUSTOM_TRILATERAL',
          legendUrl: './data/trilateral/WaterQuality_legend_trilateral.png',
          maxZoom: 13,
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy-MM-dd'),
        },
      },
    },
  },
  {
    latlng: latLng([45.197522, 13.0297851]),
    id: 19998,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([45.197522, 13.0297851]),
        id: 19998,
        aoiID: 'NorthAdriatic_NASA',
        country: ['HR', 'IT', 'SI'],
        city: 'North Adriatic - Chlorophyll-a concentration',
        siteName: 'North Adriatic',
        description: 'Water Quality Regional Maps',
        indicator: 'N3a2',
        lastIndicatorValue: null,
        indicatorName: 'Water Quality Regional Maps (NASA)',
        lastColorCode: null,
        dataProvider: 'NASA',
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((12.174395 44.778037,12.196361 44.816998,12.085149 45.405263,12.426024 45.583514,13.153667 45.779148,13.603981 45.811687,13.804426 45.675662,13.823647 45.596962,13.626039 45.443008,13.549156 45.433376,13.626039 45.323461,13.713905 45.095238,13.78383 44.980605,13.830519 44.892158,14 44.5,12.234821 44.481556,12.06659 44.581469,12.174395 44.778037))').toJson(),
          }],
        },
        time: [['2020-01-01'], ['2020-01-08'], ['2020-01-15'], ['2020-01-22'], ['2020-01-29'], ['2020-02-05'], ['2020-02-12'], ['2020-02-19'], ['2020-02-26'], ['2020-03-04'], ['2020-03-11'],
          ['2020-03-18'], ['2020-03-25'], ['2020-04-01'], ['2020-04-08'], ['2020-04-15'], ['2020-04-22'], ['2020-04-29'], ['2020-05-06'], ['2020-05-13'], ['2020-05-20'], ['2020-05-27'],
          ['2020-06-03'], ['2020-06-10'], ['2020-06-17'], ['2020-06-24'], ['2020-07-01'], ['2020-07-08'], ['2020-07-15'], ['2020-07-22'], ['2020-07-29'], ['2020-08-05'], ['2020-08-12'],
          ['2020-09-02'], ['2020-09-09'], ['2020-09-16'], ['2020-09-23'], ['2020-09-30'], ['2020-10-14'], ['2020-10-21'], ['2020-10-28'], ['2020-11-11'], ['2020-11-18'], ['2020-11-25'],
          ['2020-12-09'], ['2020-12-16'], ['2020-12-23'], ['2020-12-30'], ['2021-01-06'], ['2021-01-13'], ['2021-01-20'], ['2021-01-27'], ['2021-02-03'], ['2021-02-10'], ['2021-02-17'],
          ['2021-02-24'], ['2021-03-03'], ['2021-03-10'], ['2021-03-17'], ['2021-03-24'], ['2021-03-31'], ['2021-04-07'], ['2021-04-14'], ['2021-04-21'], ['2021-04-21'], ['2021-04-28'],
          ['2021-05-05'], ['2021-05-12'], ['2021-05-19'], ['2021-05-26'], ['2021-06-02'], ['2021-06-09'], ['2021-06-16'], ['2021-06-23'], ['2021-06-30'], ['2021-07-07'], ['2021-07-14'],
          ['2021-07-21'], ['2021-07-28'], ['2021-08-04'], ['2021-08-11'], ['2021-08-18'], ['2021-08-25'], ['2021-09-01'], ['2021-10-06'], ['2021-10-13'], ['2021-10-20']],
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 18,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/oc3_chla_anomaly/anomaly-chl-nas-{time}.tif&resampling_method=bilinear&bidx=1&rescale=-100%2C100&color_map=rdbu_r',
          name: 'Water Quality Index',
          legendUrl: './data/trilateral/WaterQuality_legend_trilateral.png',
          tileSize: 256,
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy_MM_dd'),
        },
      },
    },
  },
  {
    latlng: latLng([45.197522, 13.0297851]),
    id: 19994,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([45.197522, 13.0297851]),
        id: 19994,
        aoiID: 'NorthAdriatic_JAXA',
        country: ['HR', 'IT', 'SI'],
        city: 'North Adriatic - Chlorophyll-a concentration',
        siteName: 'North Adriatic',
        description: 'Water Quality Regional Maps',
        indicator: 'N3a2',
        lastIndicatorValue: null,
        indicatorName: 'Water Quality Regional Maps (JAXA)',
        lastColorCode: null,
        dataProvider: 'JAXA',
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((12.174395 44.778037,12.196361 44.816998,12.085149 45.405263,12.426024 45.583514,13.153667 45.779148,13.603981 45.811687,13.804426 45.675662,13.823647 45.596962,13.626039 45.443008,13.549156 45.433376,13.626039 45.323461,13.713905 45.095238,13.78383 44.980605,13.830519 44.892158,13.8 44.5,12.234821 44.481556,12.06659 44.581469,12.174395 44.778037))').toJson(),
          }],
        },
        time: availableDates.JAXA_CHLA_NorthAdriatic_JAXA,
        inputData: [''],
        display: {
          baseUrl: `https://shservices.mundiwebservices.com/ogc/wms/${shConfig.shInstanceId}`,
          name: 'Water Quality Index',
          layers: 'JAXA_CHLA',
          maxZoom: 13,
          legendUrl: './data/trilateral/WaterQuality_legend_trilateral.png',
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy-MM-dd'),
        },
      },
    },
  },
  {
    latlng: latLng([37.7775, -122.416389]),
    id: 19997,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([37.7775, -122.416389]),
        id: 19997,
        aoiID: 'US03',
        country: ['US'],
        city: 'San Francisco - Chlorophyll-a concentration',
        siteName: 'San Francisco',
        description: 'Water Quality Regional Maps',
        indicator: 'N3a2',
        lastIndicatorValue: null,
        indicatorName: 'Water Quality Regional Maps (NASA)',
        lastColorCode: null,
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-122.603302 37.396346,-122.603302 38.153997,-121.69693 38.153997,-121.69693 37.396346,-122.603302 37.396346))').toJson(),
          }],
        },
        time: [['2020-03-02'], ['2020-04-03'], ['2020-04-19'], ['2020-05-04'], ['2020-05-05'], ['2020-05-19'], ['2020-05-21'], ['2020-05-24'], ['2020-06-01'], ['2020-06-03'], ['2020-06-06'], ['2020-06-13'], ['2020-06-18'], ['2020-06-21'], ['2020-06-22'], ['2020-06-23'], ['2020-06-26'], ['2020-06-28'], ['2020-07-01'], ['2020-07-03'], ['2020-07-06'], ['2020-07-08'], ['2020-07-13'], ['2020-08-09'], ['2020-08-27'], ['2020-09-06'], ['2020-10-03'], ['2020-10-12'], ['2020-10-19'], ['2020-10-21'], ['2020-10-26'], ['2020-10-28'], ['2020-11-29'], ['2020-12-06'], ['2020-12-15'], ['2020-12-22'], ['2020-12-31'], ['2021-01-07'], ['2021-01-09'], ['2021-01-14'], ['2021-01-16'], ['2021-01-19'], ['2021-01-23'], ['2021-01-29'], ['2021-02-01'], ['2021-02-03'], ['2021-02-08'], ['2021-02-17'], ['2021-02-23'], ['2021-02-24'], ['2021-02-28'], ['2021-03-05'], ['2021-03-12'], ['2021-03-21'], ['2021-03-25'], ['2021-04-06'], ['2021-04-09'], ['2021-04-14'], ['2021-04-24']],
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 18,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/oc3_chla_anomaly/anomaly-chl-sf-{time}.tif&resampling_method=bilinear&bidx=1&rescale=-100%2C100&color_map=rdbu_r',
          name: 'Water Quality Regional Maps',
          legendUrl: './data/trilateral/WaterQuality_legend_trilateral.png',
          tileSize: 256,
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy_MM_dd'),
        },
      },
    },
  },
  {
    latlng: latLng([41.0114, -73.09]),
    id: 19996,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([41.0114, -73.09]),
        id: 19996,
        aoiID: 'US04',
        country: ['US'],
        city: 'New York - Chlorophyll-a concentration',
        siteName: 'New York',
        description: 'Water Quality Regional Maps',
        indicator: 'N3a2',
        lastIndicatorValue: null,
        indicatorName: 'Water Quality Regional Maps (NASA)',
        lastColorCode: null,
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-74.167359 40.171796,-74.167359 41.533901,-70.971225 41.533901,-70.971225 40.171796,-74.167359 40.171796))').toJson(),
          }],
        },
        time: getWeeklyDates('2020-01-01', '2022-01-19').filter((item) => !['2020-08-19', '2020-08-26'].includes(item)),
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 18,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/oc3_chla_anomaly/anomaly-chl-ny-{time}.tif&resampling_method=bilinear&bidx=1&rescale=-100%2C100&color_map=rdbu_r',
          name: 'Water Quality Index',
          legendUrl: './data/trilateral/WaterQuality_legend_trilateral.png',
          tileSize: 256,
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy_MM_dd'),
        },
      },
    },
  },
  {
    latlng: latLng([35.61, 139.78]),
    id: 19995,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([35.61, 139.78]),
        id: 19995,
        aoiID: 'JP01',
        country: ['JP'],
        city: 'Tokyo - Chlorophyll-a concentration',
        siteName: 'Tokyo',
        description: 'Water Quality Regional Maps',
        indicator: 'N3a2',
        lastIndicatorValue: null,
        indicatorName: 'Water Quality Regional Maps (JAXA)',
        lastColorCode: null,
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((139.243472 34.838717,139.243472 35.693106,140.265201 35.693106,140.265201 34.838717,139.243472 34.838717))').toJson(),
          }],
        },
        time: availableDates.JAXA_CHLA_JP01,
        inputData: [''],
        display: {
          baseUrl: `https://shservices.mundiwebservices.com/ogc/wms/${shConfig.shInstanceId}`,
          name: 'Water Quality Index',
          layers: 'JAXA_CHLA',
          maxZoom: 13,
          legendUrl: './data/trilateral/WaterQuality_legend_trilateral.png',
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy-MM-dd'),
        },
      },
    },
  },
  {
    id: 19993,
    latlng: latLng([43.4, 4.94]),
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        id: 19993,
        aoi: latLng([43.4, 4.94]),
        aoiID: 'RhoneDelta',
        country: ['FR'],
        city: 'Rhone Delta - Chlorophyll-a concentration',
        siteName: 'Fos-sur-Mer',
        description: 'Water Quality Regional Maps',
        indicator: 'N3a2',
        lastIndicatorValue: null,
        indicatorName: 'Water Quality Regional Maps (ESA)',
        lastColorCode: null,
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((4.19585670915520126 43.49375380380885758, 4.19491064380215573 43.49564593451494687, 4.62253218337875094 43.49564593451494687, 4.69632528091630519 43.49753806522103616, 4.69537921556325966 43.48618528098449332, 4.6736197124432115 43.46442577786444161, 4.64523775185184462 43.45401905898093986, 4.67172758173712044 43.42090677162434531, 4.70389380374066945 43.41428431415302924, 4.71146232656503461 43.43698988262612204, 4.75592739815817644 43.43320562121393635, 4.78525542410258886 43.41806857556520782, 4.81647558075309234 43.38495628820861327, 4.83918114922618603 43.38495628820861327, 4.82877443034268428 43.40671579132866498, 4.81552951540004681 43.424691033036531, 4.81836771145918341 43.43604381727307384, 4.86661704446450738 43.41050005274084356, 4.87040130587668951 43.41523037950607034, 4.84012721457923156 43.44928873221571308, 4.85999458699318865 43.4682100392766273, 4.88459228617237251 43.42942135980175777, 4.89499900505587426 43.43793594797917024, 4.91297424676374028 43.43509775192003275, 4.92621916170637775 43.44172020939134882, 4.94608653412033483 43.49280773845580939, 5.21949942115050369 43.49753806522103616, 5.23558253215227776 43.4899695423966719, 5.24693531638882504 43.4672639739235791, 5.23842072821141436 43.43415168656698455, 5.21476909438527514 43.41428431415302924, 5.16557369602690564 43.39157874567993645, 5.08988846778326032 43.39157874567993645, 5.014203239539615 43.39252481103297754, 5.01893356630484355 43.3792798960903454, 5.03690880801270868 43.3565743276172455, 5.07096716072234965 43.34143728196851697, 5.11070190555026294 43.33859908590937948, 5.15327484643731371 43.34427547802765446, 5.21760729044441174 43.34049121661547588, 5.27247908092105533 43.35373613155811512, 5.30275317221851239 43.37265743861902223, 5.33208119816292569 43.36698104650074725, 5.35194857057688189 43.3565743276172455, 5.36140922410733811 43.34143728196851697, 5.36992381228474791 43.32535417096674735, 5.36992381228474791 43.3130553213771492, 5.36613955087256578 43.29791827572842067, 5.36613955087256578 43.28845762219796711, 5.37654626975606753 43.27521270725532787, 5.38600692328652286 43.26102172695964754, 5.38316872722738626 43.25250713878223507, 5.37276200834388451 43.24210041989873332, 5.35478676663601938 43.23263976636827977, 5.35005643987079083 43.22128698213172981, 5.35857102804820151 43.21088026324823517, 5.37749233510911218 43.21655665536650304, 5.39925183822916033 43.21939485142564052, 5.42195740670225401 43.21561059001346194, 5.45412362870580303 43.21939485142564052, 5.50331902706417253 43.20141960971777451, 5.50615722312331002 42.99990768951906972, 4.19301851309606466 42.99896162416602152, 4.19585670915520126 43.49375380380885758))').toJson(),
          }],
        },
        time: availableDates.N3_CUSTOM_TRILATERAL,
        inputData: [''],
        display: {
          baseUrl: `https://shservices.mundiwebservices.com/ogc/wms/${shConfig.shInstanceIdTrilateral}`,
          name: 'Water Quality Index',
          layers: 'N3_CUSTOM_TRILATERAL',
          legendUrl: './data/trilateral/WaterQuality_legend_trilateral.png',
          maxZoom: 13,
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy-MM-dd'),
        },
      },
    },
  },
  {
    latlng: latLng([34.7, 136.9]),
    id: 19989,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([34.7, 136.9]),
        id: 19989,
        aoiID: 'JP04',
        country: ['JP'],
        city: 'Nagoya - Chlorophyll-a concentration',
        siteName: 'Nagoya',
        description: 'Water Quality Regional Maps',
        indicator: 'N3a2',
        lastIndicatorValue: null,
        indicatorName: 'Water Quality Regional Maps (JAXA)',
        lastColorCode: null,
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((136.4 34.2, 137.4 34.2, 137.4 35.2, 136.4 35.2, 136.4 34.2))').toJson(),
          }],
        },
        time: availableDates.JAXA_CHLA_JP04,
        inputData: [''],
        display: {
          baseUrl: `https://shservices.mundiwebservices.com/ogc/wms/${shConfig.shInstanceId}`,
          name: 'Water Quality Index',
          layers: 'JAXA_CHLA',
          maxZoom: 13,
          legendUrl: './data/trilateral/WaterQuality_legend_trilateral.png',
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy-MM-dd'),
        },
      },
    },
  },
  {
    latlng: latLng([34.35, 135]),
    id: 19988,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([34.35, 135]),
        id: 19988,
        aoiID: 'JP02',
        country: ['JP'],
        city: 'Kobe - Chlorophyll-a concentration',
        siteName: 'Kobe',
        description: 'Water Quality Regional Maps',
        indicator: 'N3a2',
        lastIndicatorValue: null,
        indicatorName: 'Water Quality Regional Maps (JAXA)',
        lastColorCode: null,
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((134.5 33.85, 135.5 33.85, 135.5 34.85, 134.5 34.85, 134.5 33.85))').toJson(),
          }],
        },
        time: availableDates.JAXA_CHLA_JP02,
        inputData: [''],
        display: {
          baseUrl: `https://shservices.mundiwebservices.com/ogc/wms/${shConfig.shInstanceId}`,
          name: 'Water Quality Index',
          layers: 'JAXA_CHLA',
          maxZoom: 13,
          legendUrl: './data/trilateral/WaterQuality_legend_trilateral.png',
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy-MM-dd'),
        },
      },
    },
  },
  {
    id: 19992,
    latlng: latLng([45.197522, 13.0297851]),
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        id: 19992,
        aoi: latLng([45.197522, 13.0297851]),
        aoiID: 'NorthAdriaticTSM_ESA',
        country: ['HR', 'IT', 'SI'],
        city: 'North Adriatic - Total Suspended Matter',
        siteName: 'North Adriatic',
        description: 'Water Quality Regional Maps',
        indicator: 'N3a2',
        lastIndicatorValue: null,
        indicatorName: 'Water Quality Regional Maps (ESA)',
        lastColorCode: null,
        dataProvider: 'ESA',
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((12.174395 44.778037,12.196361 44.816998,12.085149 45.405263,12.426024 45.583514,13.153667 45.779148,13.603981 45.811687,13.804426 45.675662,13.823647 45.596962,13.626039 45.443008,13.549156 45.433376,13.626039 45.323461,13.713905 45.095238,13.78383 44.980605,13.830519 44.892158,13.839389 44.499195,12.234821 44.481556,12.06659 44.581469,12.174395 44.778037))').toJson(),
          }],
        },
        time: availableDates.N3_CUSTOM_TRILATERAL_TSMNN,
        inputData: [''],
        display: {
          baseUrl: `https://shservices.mundiwebservices.com/ogc/wms/${shConfig.shInstanceIdTrilateral}`,
          name: 'Water Quality Index',
          layers: 'N3_CUSTOM_TRILATERAL_TSMNN',
          legendUrl: './data/trilateral/WaterQuality_legend_trilateral_tsm.png',
          maxZoom: 13,
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy-MM-dd'),
        },
      },
    },
  },
  {
    id: 19991,
    latlng: latLng([43.4, 4.9400001]),
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        id: 19991,
        aoi: latLng([43.4, 4.9400001]),
        aoiID: 'RhoneDeltaTSM',
        country: ['FR'],
        city: 'Rhone Delta - Total Suspended Matter',
        siteName: 'Fos-sur-Mer',
        description: 'Water Quality Regional Maps',
        indicator: 'N3a2',
        lastIndicatorValue: null,
        indicatorName: 'Water Quality Regional Maps (ESA)',
        lastColorCode: null,
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((4.19585670915520126 43.49375380380885758, 4.19491064380215573 43.49564593451494687, 4.62253218337875094 43.49564593451494687, 4.69632528091630519 43.49753806522103616, 4.69537921556325966 43.48618528098449332, 4.6736197124432115 43.46442577786444161, 4.64523775185184462 43.45401905898093986, 4.67172758173712044 43.42090677162434531, 4.70389380374066945 43.41428431415302924, 4.71146232656503461 43.43698988262612204, 4.75592739815817644 43.43320562121393635, 4.78525542410258886 43.41806857556520782, 4.81647558075309234 43.38495628820861327, 4.83918114922618603 43.38495628820861327, 4.82877443034268428 43.40671579132866498, 4.81552951540004681 43.424691033036531, 4.81836771145918341 43.43604381727307384, 4.86661704446450738 43.41050005274084356, 4.87040130587668951 43.41523037950607034, 4.84012721457923156 43.44928873221571308, 4.85999458699318865 43.4682100392766273, 4.88459228617237251 43.42942135980175777, 4.89499900505587426 43.43793594797917024, 4.91297424676374028 43.43509775192003275, 4.92621916170637775 43.44172020939134882, 4.94608653412033483 43.49280773845580939, 5.21949942115050369 43.49753806522103616, 5.23558253215227776 43.4899695423966719, 5.24693531638882504 43.4672639739235791, 5.23842072821141436 43.43415168656698455, 5.21476909438527514 43.41428431415302924, 5.16557369602690564 43.39157874567993645, 5.08988846778326032 43.39157874567993645, 5.014203239539615 43.39252481103297754, 5.01893356630484355 43.3792798960903454, 5.03690880801270868 43.3565743276172455, 5.07096716072234965 43.34143728196851697, 5.11070190555026294 43.33859908590937948, 5.15327484643731371 43.34427547802765446, 5.21760729044441174 43.34049121661547588, 5.27247908092105533 43.35373613155811512, 5.30275317221851239 43.37265743861902223, 5.33208119816292569 43.36698104650074725, 5.35194857057688189 43.3565743276172455, 5.36140922410733811 43.34143728196851697, 5.36992381228474791 43.32535417096674735, 5.36992381228474791 43.3130553213771492, 5.36613955087256578 43.29791827572842067, 5.36613955087256578 43.28845762219796711, 5.37654626975606753 43.27521270725532787, 5.38600692328652286 43.26102172695964754, 5.38316872722738626 43.25250713878223507, 5.37276200834388451 43.24210041989873332, 5.35478676663601938 43.23263976636827977, 5.35005643987079083 43.22128698213172981, 5.35857102804820151 43.21088026324823517, 5.37749233510911218 43.21655665536650304, 5.39925183822916033 43.21939485142564052, 5.42195740670225401 43.21561059001346194, 5.45412362870580303 43.21939485142564052, 5.50331902706417253 43.20141960971777451, 5.50615722312331002 42.99990768951906972, 4.19301851309606466 42.99896162416602152, 4.19585670915520126 43.49375380380885758))').toJson(),
          }],
        },
        time: availableDates.N3_CUSTOM_TRILATERAL_TSMNN,
        inputData: [''],
        display: {
          baseUrl: `https://shservices.mundiwebservices.com/ogc/wms/${shConfig.shInstanceIdTrilateral}`,
          name: 'Water Quality Index',
          layers: 'N3_CUSTOM_TRILATERAL_TSMNN',
          legendUrl: './data/trilateral/WaterQuality_legend_trilateral_tsm.png',
          maxZoom: 13,
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy-MM-dd'),
        },
      },
    },
  },
  {
    latlng: latLng([37.7775, -122.4163891]),
    id: 19990,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([37.7775, -122.4163891]),
        id: 19990,
        aoiID: 'US03SPM',
        country: ['US'],
        city: 'San Francisco - Total Suspended Matter',
        siteName: 'San Francisco',
        description: 'Water Quality Regional Maps',
        indicator: 'N3a2',
        lastIndicatorValue: null,
        indicatorName: 'Water Quality Regional Maps (NASA)',
        lastColorCode: null,
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-122.603302 37.396346,-122.603302 38.153997,-121.69693 38.153997,-121.69693 37.396346,-122.603302 37.396346))').toJson(),
          }],
        },
        time: [['2020_03_02'], ['2020_04_03'], ['2020_04_19'], ['2020_05_04'], ['2020_05_05'], ['2020_05_21'], ['2020_05_24'], ['2020_05_28'], ['2020-06-01'], ['2020-06-03'], ['2020-06-06'], ['2020-06-13'], ['2020-06-21'], ['2020-06-22'], ['2020-06-23'], ['2020-06-25'], ['2020-06-28'], ['2020-07-01'], ['2020-07-03'], ['2020-08-09'], ['2020-08-27'], ['2020-09-16'], ['2020-09-17'], ['2020-09-21'], ['2020-09-26'], ['2020-10-01'], ['2020-10-03'], ['2020-10-12'], ['2020-10-19'], ['2020-10-21'], ['2020-10-26'], ['2020-10-28'], ['2020-11-29'], ['2020-12-06'], ['2020-12-22'], ['2020-12-31'], ['2021-01-07'], ['2021-01-09'], ['2021-01-14'], ['2021-01-16'], ['2021-01-19'], ['2021-01-23'], ['2021-01-29'], ['2021-02-01'], ['2021-02-03'], ['2021-02-08'], ['2021-02-17'], ['2021-02-23'], ['2021-02-24'], ['2021-02-28'], ['2021-03-05'], ['2021-03-12'], ['2021-03-21'], ['2021-03-25'], ['2021-04-06'], ['2021-04-09'], ['2021-04-14'], ['2021-04-24']],
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 18,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/spm_anomaly/anomaly-spm-sf-{time}.tif&resampling_method=bilinear&bidx=1&rescale=-100%2C100&color_map=rdbu_r',
          name: 'Water Quality Regional Maps',
          legendUrl: './data/trilateral/WaterQuality_legend_trilateral_tsm.png',
          tileSize: 256,
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy_MM_dd'),
        },
      },
    },
  },
  {
    latlng: latLng([45.197522, 13.0297851]),
    id: 19987,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([45.197522, 13.0297851]),
        id: 19987,
        aoiID: 'NorthAdriaticTSM_JAXA',
        country: ['HR', 'IT', 'SI'],
        city: 'North Adriatic - Total Suspended Matter',
        siteName: 'North Adriatic',
        description: 'Water Quality Regional Maps',
        indicator: 'N3a2',
        lastIndicatorValue: null,
        indicatorName: 'Water Quality Regional Maps (JAXA)',
        lastColorCode: null,
        dataProvider: 'JAXA',
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((12.174395 44.778037,12.196361 44.816998,12.085149 45.405263,12.426024 45.583514,13.153667 45.779148,13.603981 45.811687,13.804426 45.675662,13.823647 45.596962,13.626039 45.443008,13.549156 45.433376,13.626039 45.323461,13.713905 45.095238,13.78383 44.980605,13.830519 44.892158,13.8 44.5,12.234821 44.481556,12.06659 44.581469,12.174395 44.778037))').toJson(),
          }],
        },
        time: availableDates.JAXA_TSM_NorthAdriaticTSM_JAXA,
        inputData: [''],
        display: {
          baseUrl: `https://shservices.mundiwebservices.com/ogc/wms/${shConfig.shInstanceId}`,
          name: 'Water Quality Index',
          layers: 'JAXA_TSM',
          maxZoom: 13,
          legendUrl: './data/trilateral/WaterQuality_legend_trilateral_tsm.png',
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy-MM-dd'),
        },
      },
    },
  },
  {
    latlng: latLng([35.61, 139.78]),
    id: 19986,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([35.61, 139.78]),
        id: 19986,
        aoiID: 'JP01TSM',
        country: ['JP'],
        city: 'Tokyo - Total Suspended Matter',
        siteName: 'Tokyo',
        description: 'Water Quality Regional Maps',
        indicator: 'N3a2',
        lastIndicatorValue: null,
        indicatorName: 'Water Quality Regional Maps (JAXA)',
        lastColorCode: null,
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((139.243472 34.838717,139.243472 35.693106,140.265201 35.693106,140.265201 34.838717,139.243472 34.838717))').toJson(),
          }],
        },
        time: availableDates.JAXA_TSM_JP01TSM,
        inputData: [''],
        display: {
          baseUrl: `https://shservices.mundiwebservices.com/ogc/wms/${shConfig.shInstanceId}`,
          name: 'Water Quality Index',
          layers: 'JAXA_TSM',
          maxZoom: 13,
          legendUrl: './data/trilateral/WaterQuality_legend_trilateral.png',
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy-MM-dd'),
        },
      },
    },
  },
  {
    latlng: latLng([34.7, 136.9]),
    id: 19985,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([34.7, 136.9]),
        id: 19985,
        aoiID: 'JP04TSM',
        country: ['JP'],
        city: 'Nagoya - Total Suspended Matter',
        siteName: 'Nagoya',
        description: 'Water Quality Regional Maps',
        indicator: 'N3a2',
        lastIndicatorValue: null,
        indicatorName: 'Water Quality Regional Maps (JAXA)',
        lastColorCode: null,
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((136.4 34.2, 137.4 34.2, 137.4 35.2, 136.4 35.2, 136.4 34.2))').toJson(),
          }],
        },
        time: availableDates.JAXA_TSM_JP04TSM,
        inputData: [''],
        display: {
          baseUrl: `https://shservices.mundiwebservices.com/ogc/wms/${shConfig.shInstanceId}`,
          name: 'Water Quality Index',
          layers: 'JAXA_TSM',
          maxZoom: 13,
          legendUrl: './data/trilateral/WaterQuality_legend_trilateral.png',
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy-MM-dd'),
        },
      },
    },
  },
  {
    latlng: latLng([34.35, 135]),
    id: 19984,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([34.35, 135]),
        id: 19984,
        aoiID: 'JP02TSM',
        country: ['JP'],
        city: 'Kobe - Total Suspended Matter',
        siteName: 'Kobe',
        description: 'Water Quality Regional Maps',
        indicator: 'N3a2',
        lastIndicatorValue: null,
        indicatorName: 'Water Quality Regional Maps (JAXA)',
        lastColorCode: null,
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((134.5 33.85, 135.5 33.85, 135.5 34.85, 134.5 34.85, 134.5 33.85))').toJson(),
          }],
        },
        time: availableDates.JAXA_TSM_JP02TSM,
        inputData: [''],
        display: {
          baseUrl: `https://shservices.mundiwebservices.com/ogc/wms/${shConfig.shInstanceId}`,
          name: 'Water Quality Index',
          layers: 'JAXA_TSM',
          maxZoom: 13,
          legendUrl: './data/trilateral/WaterQuality_legend_trilateral.png',
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy-MM-dd'),
        },
      },
    },
  },
  {
    latlng: latLng([45.197522, 13.0297851]),
    id: 19983,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([45.197522, 13.0297851]),
        id: 19983,
        aoiID: 'NorthAdriaticTSM_NASA',
        country: ['HR', 'IT', 'SI'],
        city: 'North Adriatic - Total Suspended Matter',
        siteName: 'North Adriatic',
        description: 'Water Quality Regional Maps',
        indicator: 'N3a2',
        lastIndicatorValue: null,
        indicatorName: 'Water Quality Regional Maps (NASA)',
        lastColorCode: null,
        dataProvider: 'NASA',
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((12.174395 44.778037,12.196361 44.816998,12.085149 45.405263,12.426024 45.583514,13.153667 45.779148,13.603981 45.811687,13.804426 45.675662,13.823647 45.596962,13.626039 45.443008,13.549156 45.433376,13.626039 45.323461,13.713905 45.095238,13.78383 44.980605,13.830519 44.892158,14 44.5,12.234821 44.481556,12.06659 44.581469,12.174395 44.778037))').toJson(),
          }],
        },
        time: [['2020-01-01'], ['2020-01-08'], ['2020-01-15'], ['2020-01-22'], ['2020-01-29'], ['2020-02-05'], ['2020-02-12'], ['2020-02-19'], ['2020-02-26'], ['2020-03-04'], ['2020-03-11'], ['2020-03-18'], ['2020-03-25'], ['2020-04-01'],
          ['2020-04-08'], ['2020-04-15'], ['2020-04-22'], ['2020-04-29'], ['2020-05-06'], ['2020-05-13'], ['2020-05-20'], ['2020-05-27'], ['2020-06-03'], ['2020-06-10'], ['2020-06-17'], ['2020-06-24'], ['2020-07-01'], ['2020-07-08'],
          ['2020-07-15'], ['2020-07-22'], ['2020-07-29'], ['2020-08-05'], ['2020-08-12'], ['2020-09-02'], ['2020-09-09'], ['2020-09-16'], ['2020-09-23'], ['2020-09-30'], ['2020-10-14'], ['2020-10-21'], ['2020-10-28'], ['2020-11-11'],
          ['2020-11-18'], ['2020-11-25'], ['2020-12-16'], ['2020-12-23'], ['2020-12-30'], ['2021-01-06'], ['2021-01-13'], ['2021-01-20'], ['2021-01-27'], ['2021-02-03'], ['2021-02-10'], ['2021-02-17'], ['2021-02-24'], ['2021-03-03'],
          ['2021-03-10'], ['2021-03-17'], ['2021-03-24'], ['2021-03-31'], ['2021-04-07'], ['2021-04-14'], ['2021-04-21'], ['2021-04-28'], ['2021-05-05'], ['2021-05-12'], ['2021-05-19'], ['2021-05-26'], ['2021-06-02'], ['2021-06-09'],
          ['2021-06-16'], ['2021-06-23'], ['2021-06-30'], ['2021-07-07'], ['2021-07-14'], ['2021-07-21'], ['2021-07-28'], ['2021-08-04'], ['2021-08-11'], ['2021-08-18'], ['2021-08-25'], ['2021-09-01'], ['2021-10-06'], ['2021-10-13'],
          ['2021-10-20']],
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 18,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/spm_anomaly/anomaly-spm-nas-{time}.tif&resampling_method=bilinear&bidx=1&rescale=-100%2C100&color_map=rdbu_r',
          name: 'Water Quality Index',
          legendUrl: './data/trilateral/WaterQuality_legend_trilateral_tsm.png',
          tileSize: 256,
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy_MM_dd'),
        },
      },
    },
  },
  {
    latlng: latLng([41.0114, -73.09]),
    id: 19982,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([41.0114, -73.09]),
        id: 19982,
        aoiID: 'US04TSM',
        country: ['US'],
        city: 'New York - Total Suspended Matter',
        siteName: 'New York',
        description: 'Water Quality Regional Maps',
        indicator: 'N3a2',
        lastIndicatorValue: null,
        indicatorName: 'Water Quality Regional Maps (NASA)',
        lastColorCode: null,
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-74.167359 40.171796,-74.167359 41.533901,-70.971225 41.533901,-70.971225 40.171796,-74.167359 40.171796))').toJson(),
          }],
        },
        time: getWeeklyDates('2020-01-01', '2022-01-19').filter((item) => !['2020-08-19', '2020-08-26'].includes(item)),
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 18,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/spm_anomaly/anomaly-spm-ny-{time}.tif&resampling_method=bilinear&bidx=1&rescale=-100%2C100&color_map=rdbu_r',
          name: 'Water Quality Index',
          legendUrl: './data/trilateral/WaterQuality_legend_trilateral_tsm.png',
          tileSize: 256,
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy_MM_dd'),
        },
      },
    },
  },
  {
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        country: 'all',
        city: 'World',
        siteName: 'global',
        description: 'Cropped Area - Global',
        indicator: 'N6',
        lastIndicatorValue: null,
        indicatorName: 'Cropped Area',
        subAoi: {
          type: 'FeatureCollection',
          features: [],
        },
        lastColorCode: null,
        aoi: null,
        aoiID: 'W6',
        time: getMonthlyDates('2020-01-28', '2022-01-28'),
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 6,
          minZoom: 1,
          opacity: 0.7,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/agriculture-cropmonitor/CropMonitor_{time}.tif&resampling_method=nearest&bidx=1&color_map=custom_cropmonitor',
          name: 'Agriculture GEOGLAM',
          legendUrl: './data/trilateral/agriculture-GEOGLAM-legend.png',
          tileSize: 256,
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyyMM'),
          featuresStatic: true,
          features: {
            url: './eodash-data/features/{indicator}/{indicator}_{aoiID}.geojson',
            allowedParameters: ['ADM0_NAME', 'Name'],
            style: {
              color: '#696868',
              opacity: 0.5,
            },
          },
        },
      },
    },
  },
  {
    latlng: latLng([6.133333, 1.216667]),
    id: 19799,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([6.133333, 1.216667]),
        id: 19799,
        aoiID: 'TG01',
        country: ['TG'],
        city: 'Togo',
        siteName: 'Togo',
        description: 'Cropped Area - Regional',
        indicator: 'E10d',
        lastIndicatorValue: null,
        indicatorName: 'Cropped Area - Regional',
        lastColorCode: null,
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: { type: 'MultiPolygon', coordinates: [[[[0.0, 11.11002], [0.50285, 11.00908], [0.48997, 10.98623], [0.50584, 10.98011], [0.49468, 10.931], [0.65631, 10.99735], [0.91216, 10.99649], [0.89052, 10.92094], [0.90098, 10.88674], [0.88508, 10.86182], [0.87382, 10.80496], [0.80183, 10.71829], [0.79693, 10.68492], [0.80757, 10.59096], [0.78323, 10.51218], [0.77457, 10.38476], [1.05682, 10.17935], [1.3552, 10.0], [1.3693, 9.6615], [1.36606, 9.61139], [1.34159, 9.54626], [1.36109, 9.48638], [1.39021, 9.4973], [1.40114, 9.43463], [1.40312, 9.35491], [1.42092, 9.30743], [1.44741, 9.28273], [1.47767, 9.23691], [1.52597, 9.1907], [1.55912, 9.17015], [1.6176, 9.07092], [1.62974, 8.99912], [1.62241, 8.95456], [1.63311, 8.79376], [1.63112, 8.51869], [1.65019, 8.47767], [1.6302, 8.44951], [1.61974, 8.3741], [1.63347, 8.31899], [1.63145, 7.66111], [1.65051, 7.61399], [1.65293, 7.53402], [1.67753, 7.49791], [1.65334, 7.4945], [1.64388, 7.48555], [1.63642, 7.41777], [1.64203, 6.99457], [1.55783, 6.99749], [1.55918, 6.97219], [1.57411, 6.94711], [1.5779, 6.923], [1.60622, 6.90186], [1.60669, 6.88347], [1.5945, 6.86898], [1.5996, 6.83013], [1.61479, 6.82508], [1.59662, 6.80644], [1.61274, 6.79243], [1.60838, 6.77127], [1.6261, 6.76024], [1.61691, 6.74], [1.59253, 6.7255], [1.59209, 6.70642], [1.57392, 6.68824], [1.58957, 6.68388], [1.60284, 6.66628], [1.61123, 6.64192], [1.60247, 6.62745], [1.6098, 6.60582], [1.61715, 6.59684], [1.6344, 6.59682], [1.65129, 6.57836], [1.67429, 6.5832], [1.66856, 6.55767], [1.68397, 6.56043], [1.69801, 6.54802], [1.70193, 6.51536], [1.69573, 6.50041], [1.71759, 6.49329], [1.72794, 6.49835], [1.73393, 6.47582], [1.75062, 6.46392], [1.74716, 6.45404], [1.75518, 6.43678], [1.77608, 6.41604], [1.76941, 6.41168], [1.77234, 6.3774], [1.78919, 6.35048], [1.78275, 6.33898], [1.79794, 6.31276], [1.78921, 6.30287], [1.80669, 6.28424], [1.79933, 6.28056], [1.7699, 6.28216], [1.76392, 6.27181], [1.64567, 6.24809], [1.62956, 6.24237], [1.627868, 6.23429], [1.378223, 6.176368], [1.294509400000038, 6.148462800000061], [1.280083400000024, 6.140635], [1.285183600000039, 6.135221800000068], [1.199609310000028, 6.112424249000071], [1.200319576000027, 6.168551584000056], [1.085439200000053, 6.168075692000059], [1.083416658000033, 6.187682450000068], [1.065829462000067, 6.219048046000069], [1.024307868000051, 6.254168889000027], [1.008532041000024, 6.291930935000039], [1.005305710000073, 6.33270589600005], [0.893870291000042, 6.333245563000048], [0.88455816000004, 6.354924520000054], [0.856811139000058, 6.383598316000075], [0.828260112000066, 6.400110484000038], [0.788142401000073, 6.408985873000063], [0.78133714300003, 6.432328385000062], [0.748160287000076, 6.44292206700004], [0.744304701000033, 6.481350683000073], [0.725246078000055, 6.490749233000031], [0.712334997000028, 6.528427931000067], [0.744097455000031, 6.558707612000035], [0.740974315000074, 6.582667810000032], [0.727078264000056, 6.591733556000065], [0.710303064000072, 6.586760482000045], [0.68781715700004, 6.592447394000033], [0.684352776000026, 6.597736366000049], [0.690862868000067, 6.598800555000025], [0.672588607000023, 6.614647765000029], [0.656598630000076, 6.608651523000049], [0.638110217000076, 6.63530148600006], [0.648460874000023, 6.710992139000041], [0.642155302000049, 6.72053377800006], [0.65095930800004, 6.737166210000055], [0.621644349000064, 6.754131766000057], [0.60810521600007, 6.747612043000061], [0.580051371000025, 6.763744789000043], [0.566226703000041, 6.78446989400004], [0.56707141000004, 6.803481787000067], [0.576517871000021, 6.799127373000033], [0.58058674900002, 6.807883790000062], [0.548872427000049, 6.83399915800004], [0.539521145000037, 6.825290331000076], [0.532834860000037, 6.828978495000058], [0.532477940000035, 6.856009172000029], [0.54365180700006, 6.864061279000055], [0.534809813000038, 6.877424320000046], [0.558612242000038, 6.887755340000069], [0.565541803000031, 6.918914608000023], [0.547516134000034, 6.937196380000046], [0.522793535000062, 6.941170080000063], [0.521841749000032, 6.971246466000025], [0.548087205000058, 6.991638447000071], [0.57830635800002, 6.99442241600002], [0.595176736000042, 7.00798534300003], [0.60171981600007, 7.036490767000032], [0.595910650000064, 7.061000278000051], [0.613688944000046, 7.101355391000027], [0.592916249000041, 7.115251444000023], [0.606098462000034, 7.159223882000049], [0.617258135000043, 7.162007851000055], [0.616687064000075, 7.183423], [0.629298207000033, 7.196153116000062], [0.645458820000044, 7.29036459200006], [0.658831391000035, 7.318180491000021], [0.644292885000027, 7.398725244000047], [0.618713679000052, 7.412645091000059], [0.59691781600003, 7.398796628000071], [0.566793841000049, 7.395798507000052], [0.538121337000064, 7.424613780000072], [0.532957906000036, 7.458663866000052], [0.521227163000049, 7.456498556000042], [0.519942254000057, 7.462899306000054], [0.528032421000034, 7.48376717900004], [0.520370558000025, 7.515532983000071], [0.530721213000049, 7.588867970000024], [0.521322342000076, 7.594531087000064], [0.588423141000021, 7.62734385400006], [0.594567736000045, 7.703248314000064], [0.611170788000038, 7.710791549000021], [0.632062418000032, 7.706493200000068], [0.620022382000059, 7.746388285000023], [0.611361145000046, 7.751313770000024], [0.632800088000067, 7.777083332000075], [0.62813634500003, 7.796285582000053], [0.617238413000052, 7.801663164000047], [0.624234029000036, 7.864814057000046], [0.609528960000034, 7.944549794000068], [0.596156390000033, 7.976696312000058], [0.598987947000069, 8.024428299000022], [0.583450068000047, 8.095050700000058], [0.59101546200003, 8.138314618000038], [0.605815709000069, 8.144786752000073], [0.611446364000074, 8.183690806000072], [0.601294733000032, 8.181263889000036], [0.590396802000043, 8.191566955000042], [0.587684216000071, 8.207890057000043], [0.618712388000063, 8.216099197000062], [0.637795664000066, 8.258953289000033], [0.672464411000021, 8.264473639000073], [0.684433100000035, 8.282914461000075], [0.726351884000053, 8.284653219000063], [0.731070534000025, 8.34627950600003], [0.710440608000056, 8.357177438000065], [0.710464402000071, 8.385421639000072], [0.698091206000072, 8.395724705000021], [0.705729274000021, 8.401007109000034], [0.692975364000063, 8.40098331400003], [0.685170733000064, 8.417377800000054], [0.650168862000044, 8.427823634000049], [0.654142562000061, 8.460327070000062], [0.642673560000048, 8.479481731000021], [0.643768111000043, 8.494900638000047], [0.627278447000037, 8.498208089000059], [0.627611571000045, 8.508463566000046], [0.617594041000075, 8.513960120000036], [0.568244020000066, 8.525333944000067], [0.558630998000069, 8.550175516000024], [0.538595937000025, 8.555624482000042], [0.52800733600003, 8.569734685000071], [0.510565886000052, 8.563476703000049], [0.490221496000061, 8.597193665000077], [0.471233397000049, 8.595385274000023], [0.375317326000072, 8.753429072000074], [0.401039299000047, 8.757545539000034], [0.381170800000064, 8.770846726000059], [0.383217136000042, 8.791952544000026], [0.41864730900005, 8.792476026000031], [0.427713056000073, 8.78034077500007], [0.442251562000024, 8.789049602000034], [0.431210864000036, 8.797948786000063], [0.450579676000075, 8.812963185000058], [0.466331708000041, 8.792713972000058], [0.48981698800003, 8.800923112000021], [0.49797853900003, 8.814914343000055], [0.495194569000034, 8.839636942000027], [0.519988553000076, 8.856245580000063], [0.524223993000021, 8.880230546000064], [0.509209593000037, 8.902549890000046], [0.511446287000069, 8.936790333000033], [0.49276751900004, 8.95418419300006], [0.466463477000048, 9.006237658000032], [0.454529581000031, 9.050338210000064], [0.463167025000075, 9.05538266800005], [0.465824442000041, 9.091242430000023], [0.483011729000054, 9.101615594000066], [0.474564643000065, 9.14449348100004], [0.490887745000066, 9.155962482000064], [0.501428756000053, 9.153511638000055], [0.530934073000026, 9.20657361700006], [0.504093752000074, 9.257208546000072], [0.537596564000069, 9.303251116000069], [0.554633503000048, 9.307462762000057], [0.544449411000073, 9.343749541000022], [0.564501525000026, 9.403691692000052], [0.551040518000036, 9.422723851000057], [0.524152608000065, 9.43014776900003], [0.51798980500007, 9.439237310000067], [0.498763761000021, 9.436953027000072], [0.493314794000071, 9.449254840000037], [0.504069958000059, 9.46500687200006], [0.500429383000039, 9.473715699000024], [0.48796100800007, 9.486136485000031], [0.456028642000035, 9.497248568000032], [0.413721825000039, 9.499485261000075], [0.386239051000075, 9.490681256000073], [0.359969802000023, 9.498628655000061], [0.345098171000075, 9.485660593000034], [0.350356781000073, 9.473120834000042], [0.337412512000071, 9.450444571000048], [0.285373701000026, 9.428981833000023], [0.26514828400002, 9.428053843000043], [0.249063128000046, 9.436524724000037], [0.230860251000024, 9.464340623000055], [0.23254173700002, 9.485961992000057], [0.270232398000076, 9.477110397000047], [0.314363467000021, 9.505314941000051], [0.294724982000048, 9.522732595000036], [0.245517731000064, 9.522478786000022], [0.238188991000072, 9.541704830000072], [0.242884461000074, 9.571717765000074], [0.267916390000039, 9.563754502000052], [0.290790940000022, 9.573145441000065], [0.358304179000072, 9.569211399000039], [0.384065811000028, 9.586089709000021], [0.374011013000029, 9.606413167000028], [0.382796765000023, 9.640309693000063], [0.369959590000065, 9.650357295000049], [0.362535671000046, 9.672057979000044], [0.351899482000022, 9.674175699000045], [0.345236991000036, 9.715150017000042], [0.32049059700006, 9.724596477000034], [0.327510006000068, 9.770520074000046], [0.336076066000032, 9.776206985000044], [0.331959599000072, 9.793696024000042], [0.357729160000019, 9.845473094000056], [0.354968986000074, 9.91883187600007], [0.386853762000044, 9.936963368000022], [0.359347193000076, 9.98355321400004], [0.359656524000059, 10.028144312000052], [0.409292079000068, 10.020173118000059], [0.417120505000071, 10.056674049000037], [0.394325270000024, 10.08004035600004], [0.361250763000044, 10.085227581000026], [0.353160596000066, 10.101788629000055], [0.363749196000072, 10.133816173000071], [0.351209437000023, 10.167390368000042], [0.362416698000061, 10.260117961000049], [0.382499350000046, 10.272610131000022], [0.369531287000029, 10.284436052000046], [0.397823078000044, 10.306422272000077], [0.389756705000025, 10.31463141200004], [0.321442380000065, 10.307516824000061], [0.338907625000047, 10.325077245000045], [0.33424388100002, 10.335213749000047], [0.319515017000072, 10.335261338000066], [0.314256409000052, 10.361316436000038], [0.294816213000047, 10.373475481000071], [0.302573256000073, 10.391416617000061], [0.288962739000056, 10.417376536000063], [0.275090481000063, 10.418494883000051], [0.255650286000048, 10.405503026000076], [0.219530067000051, 10.423634518000028], [0.207347227000071, 10.415211227000043], [0.210107403000052, 10.403575663000026], [0.193332203000068, 10.401576915000021], [0.185170652000068, 10.419874970000023], [0.173344731000043, 10.425585676000026], [0.175153121000051, 10.446191808000037], [0.15773546600002, 10.462657678000028], [0.16232782700007, 10.472556236000059], [0.143456740000033, 10.525382781000076], [0.061413705000064, 10.560509783000043], [0.056275252000034, 10.582511127000032], [0.040648923000049, 10.600022267000043], [-0.05955698799994, 10.631052376000071], [-0.090680256999974, 10.707266265000044], [-0.072715326999969, 10.719996381000044], [-0.069741000999954, 10.768703947000063], [-0.021937630999957, 10.819838563000076], [-0.028814271999977, 10.859694534000027], [-0.007256355999971, 10.913898655000025], [-0.005876268999941, 10.959608100000025], [0.032385464000072, 10.977406468000027], [0.02275, 11.08191], [0.00987, 11.10144], [-0.00219, 11.10512], [-0.04895, 11.10285], [-0.093750000999933, 11.088630004000038], [-0.143020000999968, 11.10149], [-0.14732, 11.11248], [-0.14201, 11.13898], [0.0, 11.11002]]]] },
          }],
        },
        time: ['TBD'],
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 18,
          minZoom: 6,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/Togo/togo_cropland_v7-1_cog_v2.tif&resampling_method=bilinear&bidx=1&rescale=0,1&color_map=magma',
          name: 'Togo',
          legendUrl: './data/trilateral/TG01_E19d_legend.png',
          tileSize: 256,
          disableCompare: true,
        },
      },
    },
  },
  {
    latlng: latLng([39.9, 116.38]),
    id: 9799,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([39.9, 116.38]),
        id: 9799,
        aoiID: 'CN01',
        country: ['CN'],
        city: 'Beijing',
        siteName: 'Beijing',
        description: 'Recovery Proxy Maps',
        indicator: 'N8',
        lastIndicatorValue: 'normal',
        indicatorName: 'Recovery Proxy Maps',
        lastColorCode: 'BLUE',
        eoSensor: ['Recovery Proxy Maps'],
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((116.073303 39.766325,116.073303 40.212441,116.729736 40.212441,116.729736 39.766325,116.073303 39.766325))').toJson(),
          }],
        },
        time: ['TBD'],
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 18,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/rpm/rpm-be.cog.tif&resampling_method=bilinear&bidx=1%2C2%2C3%24',
          name: 'Recovery Proxy Maps',
          tileSize: 256,
          legendUrl: 'data/trilateral/N8-legend.png',
          disableCompare: true,
          baseLayers: mapBoxHighResoSubst,
        },
      },
    },
  },
  {
    latlng: latLng([38.904722, -77.016389]),
    id: 9798,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([38.904722, -77.016389]),
        id: 9798,
        aoiID: 'US10',
        country: ['US'],
        city: 'Washington, D.C.',
        siteName: 'Washington, D.C.',
        description: 'Recovery Proxy Maps',
        indicator: 'N8',
        lastIndicatorValue: 'normal',
        indicatorName: 'Recovery Proxy Maps',
        lastColorCode: 'BLUE',
        eoSensor: ['Recovery Proxy Maps'],
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-78.1073 38.432077,-78.1073 39.846504,-75.81665 39.846504,-75.81665 38.432077,-78.1073 38.432077))').toJson(),
          }],
        },
        time: ['TBD'],
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 18,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/rpm/rpm-dc.cog.tif&resampling_method=bilinear&bidx=1%2C2%2C3%24',
          name: 'Recovery Proxy Maps',
          tileSize: 256,
          legendUrl: 'data/trilateral/N8-legend.png',
          disableCompare: true,
          baseLayers: mapBoxHighResoSubst,
        },
      },
    },
  },
  {
    latlng: latLng([51.036138, 2.285374]),
    id: 9797,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([51.036138, 2.285374]),
        id: 9797,
        aoiID: 'FR03',
        country: ['FR'],
        city: 'Port of Dunkirk',
        siteName: 'Port of Dunkirk',
        description: 'Recovery Proxy Maps',
        indicator: 'N8',
        lastIndicatorValue: 'normal',
        indicatorName: 'Recovery Proxy Maps',
        lastColorCode: 'BLUE',
        eoSensor: ['Recovery Proxy Maps'],
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((1.590599 50.733177,1.554903 50.877173,1.737368 50.954146,2.040781 51.014635,2.304379 51.063831,2.503451 51.082805,2.902968 51.242053,3.147346 51.340768,3.605898 51.369056,3.783793 50.857979,2.622312 50.729565,2.570141 50.840647,1.590599 50.733177))').toJson(),
          }],
        },
        time: ['TBD'],
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 18,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/rpm/rpm-du.cog.tif&resampling_method=bilinear&bidx=1%2C2%2C3%24',
          name: 'Recovery Proxy Maps',
          tileSize: 256,
          legendUrl: 'data/trilateral/N8-legend.png',
          disableCompare: true,
          baseLayers: mapBoxHighResoSubst,
        },
      },
    },
  },
  {
    latlng: latLng([51.091559, 3.740081]),
    id: 9796,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([51.091559, 3.740081]),
        id: 9796,
        aoiID: 'BE03',
        country: ['BE'],
        city: 'Port of Ghent',
        siteName: 'Port of Ghent',
        description: 'Recovery Proxy Maps',
        indicator: 'N8',
        lastIndicatorValue: 'normal',
        indicatorName: 'Recovery Proxy Maps',
        lastColorCode: 'BLUE',
        eoSensor: ['Recovery Proxy Maps'],
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((4.196128 51.382924,4.333419 51.41247,4.441879 51.280437,4.637796 50.920723,4.122786 50.848204,3.396523 50.729818,3.228982 51.273398,3.719247 51.354086,3.852456 51.345509,3.908761 51.37295,3.951333 51.414081,4.019997 51.409798,4.058449 51.375522,4.196128 51.382924))').toJson(),
          }],
        },
        time: ['TBD'],
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 18,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/rpm/rpm-gh.cog.tif&resampling_method=bilinear&bidx=1%2C2%2C3%24',
          name: 'Recovery Proxy Maps',
          tileSize: 256,
          legendUrl: 'data/trilateral/N8-legend.png',
          disableCompare: true,
          baseLayers: mapBoxHighResoSubst,
        },
      },
    },
  },
  {
    latlng: latLng([35.61, 139.78]),
    id: 9795,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([35.61, 139.78]),
        id: 9795,
        aoiID: 'JP01',
        country: ['JP'],
        city: 'Tokyo',
        siteName: 'Tokyo',
        description: 'Recovery Proxy Maps',
        indicator: 'N8',
        lastIndicatorValue: 'normal',
        indicatorName: 'Recovery Proxy Maps',
        lastColorCode: 'BLUE',
        eoSensor: ['Recovery Proxy Maps'],
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((138.705139 34.89269,138.705139 36.461054,140.902405 36.461054,140.902405 34.89269,138.705139 34.89269))').toJson(),
          }],
        },
        time: ['TBD'],
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 18,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/rpm/rpm-tk.cog.tif&resampling_method=bilinear&bidx=1%2C2%2C3%24',
          name: 'Recovery Proxy Maps',
          tileSize: 256,
          legendUrl: 'data/trilateral/N8-legend.png',
          disableCompare: true,
          baseLayers: mapBoxHighResoSubst,
        },
      },
    },
  },
  {
    latlng: latLng([6.133333, 1.216667]),
    id: 9794,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([6.133333, 1.216667]),
        id: 9794,
        aoiID: 'TG01',
        country: ['TG'],
        city: 'Togo',
        siteName: 'Togo',
        description: 'Recovery Proxy Maps',
        indicator: 'N8',
        lastIndicatorValue: 'normal',
        indicatorName: 'Recovery Proxy Maps',
        lastColorCode: 'BLUE',
        eoSensor: ['Recovery Proxy Maps'],
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-0.895386 11.342718,-0.719604 10.233843,-0.285645 8.488672,-0.001373 6.311204,0.244446 5.719846,0.884399 5.745808,1.148071 6.019019,1.51062 6.181516,1.972046 6.255237,2.292023 6.283904,2.308502 7.075,2.28241 7.544933,2.15744 8.598674,1.573792 9.62106,1.308746 10.268979,1.595764 11.053082,1.329346 11.474641,0.810242 11.633406,0.236206 11.59036,-0.348816 11.470604,-0.895386 11.342718))').toJson(),
          }],
        },
        time: ['TBD'],
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 18,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/rpm/rpm-togo.cog.tif&resampling_method=bilinear&bidx=1%2C2%2C3%24',
          name: 'Recovery Proxy Maps',
          tileSize: 256,
          legendUrl: 'data/trilateral/N8-legend.png',
          disableCompare: true,
          baseLayers: mapBoxHighResoSubst,
        },
      },
    },
  },
  {
    latlng: latLng([34.05, -118.25]),
    id: 9793,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([34.05, -118.25]),
        id: 9793,
        aoiID: 'US02',
        country: ['US'],
        city: 'Los Angeles',
        siteName: 'Los Angeles',
        description: 'Recovery Proxy Maps',
        indicator: 'N8',
        lastIndicatorValue: 'normal',
        indicatorName: 'Recovery Proxy Maps',
        lastColorCode: 'BLUE',
        eoSensor: ['Recovery Proxy Maps'],
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-118.762208 33.532178,-118.951722 34.379654,-117.954713 34.542704,-117.946473 34.424978,-116.996156 34.567586,-116.83548 34.004829,-116.765442 33.403902,-118.762208 33.532178))').toJson(),
          }],
        },
        time: ['TBD'],
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 18,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/rpm/rpm-la.cog.tif&resampling_method=bilinear&bidx=1%2C2%2C3%24',
          name: 'Recovery Proxy Maps',
          tileSize: 256,
          legendUrl: 'data/trilateral/N8-legend.png',
          disableCompare: true,
          baseLayers: mapBoxHighResoSubst,
        },
      },
    },
  },
  {
    latlng: latLng([-6.8, 39.283333]),
    id: 9792,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([-6.8, 39.283333]),
        id: 9792,
        aoiID: 'TZ01',
        country: ['TZ'],
        city: 'Dar El Salam',
        siteName: 'Dar El Salam',
        description: 'Recovery Proxy Maps',
        indicator: 'N8',
        lastIndicatorValue: 'normal',
        indicatorName: 'Recovery Proxy Maps',
        lastColorCode: 'BLUE',
        eoSensor: ['Recovery Proxy Maps'],
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((38.645611 -6.64517,38.645611 -6.4528,38.876152 -6.402137,39.04747 -6.458599,39.298096 -6.708936,39.502716 -6.879392,39.569492 -7.019461,39.536533 -7.202066,39.435081 -7.223865,39.252262 -7.249409,38.969193 -7.305942,38.787575 -7.334205,38.740883 -7.063415,38.67239 -6.78616,38.645611 -6.64517))').toJson(),
          }],
        },
        time: ['TBD'],
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 18,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/rpm/rpm-dar.cog.tif&resampling_method=bilinear&bidx=1%2C2%2C3%24',
          name: 'Recovery Proxy Maps',
          tileSize: 256,
          legendUrl: 'data/trilateral/N8-legend.png',
          disableCompare: true,
          baseLayers: mapBoxHighResoSubst,
        },
      },
    },
  },
  {
    latlng: latLng([41.0114, -73.09]),
    id: 9791,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([41.0114, -73.09]),
        id: 9791,
        aoiID: 'US04',
        country: ['US'],
        city: 'New York',
        siteName: 'New York',
        description: 'Recovery Proxy Maps',
        indicator: 'N8',
        lastIndicatorValue: 'normal',
        indicatorName: 'Recovery Proxy Maps',
        lastColorCode: 'BLUE',
        eoSensor: ['Recovery Proxy Maps'],
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-75.140991 40.245992,-75.38269 41.137296,-72.894287 41.693424,-71.5979 40.876141,-75.140991 40.245992))').toJson(),
          }],
        },
        time: ['TBD'],
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 18,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/rpm/rpm-ny.cog.tif&resampling_method=bilinear&bidx=1%2C2%2C3%24',
          name: 'Recovery Proxy Maps',
          tileSize: 256,
          legendUrl: 'data/trilateral/N8-legend.png',
          disableCompare: true,
          baseLayers: mapBoxHighResoSubst,
        },
      },
    },
  },
  {
    latlng: latLng([37.7775, -122.416389]),
    id: 9790,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([37.7775, -122.416389]),
        id: 9790,
        aoiID: 'US03',
        country: ['US'],
        city: 'San Francisco',
        siteName: 'San Francisco',
        description: 'Recovery Proxy Maps',
        indicator: 'N8',
        lastIndicatorValue: 'normal',
        indicatorName: 'Recovery Proxy Maps',
        lastColorCode: 'BLUE',
        eoSensor: ['Recovery Proxy Maps'],
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-122.639688 37.099778,-122.639688 38.190951,-120.953755 38.190951,-120.953755 37.099778,-122.639688 37.099778))').toJson(),
          }],
        },
        time: ['TBD'],
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 18,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/rpm/rpm-sf.cog.tif&resampling_method=bilinear&bidx=1%2C2%2C3%24',
          name: 'Recovery Proxy Maps',
          tileSize: 256,
          legendUrl: 'data/trilateral/N8-legend.png',
          disableCompare: true,
          baseLayers: mapBoxHighResoSubst,
        },
      },
    },
  },
  {
    latlng: latLng([38.715, -121.944]),
    id: 9789,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([38.715, -121.944]),
        id: 9789,
        aoiID: 'US06',
        country: ['US'],
        city: 'Sacramento',
        siteName: 'Sacramento',
        description: 'Recovery Proxy Maps',
        indicator: 'N8',
        lastIndicatorValue: 'normal',
        indicatorName: 'Recovery Proxy Maps',
        lastColorCode: 'BLUE',
        eoSensor: ['Recovery Proxy Maps'],
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-120.8 38, -120.8 40, -122.8 40, -122.8 38, -120.8 38))').toJson(),
          }],
        },
        time: ['TBD'],
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 18,
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3://covid-eo-data/rpm/rpm-sacramento.cog.tif&resampling_method=bilinear&bidx=1%2C2%2C3%24',
          name: 'Recovery Proxy Maps',
          tileSize: 256,
          legendUrl: 'data/trilateral/N8-legend.png',
          disableCompare: true,
          baseLayers: mapBoxHighResoSubst,
        },
      },
    },
  },
  {
    latlng: latLng([33.94, -118.41]),
    id: 19699,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([33.94, -118.41]),
        id: 19699,
        aoiID: 'US021',
        country: ['US'],
        city: 'Los Angeles',
        siteName: 'Los Angeles International Airport - LAX',
        description: 'Airports: throughput',
        indicator: 'E13b',
        lastIndicatorValue: 'normal',
        indicatorName: 'Los Angeles International Airport - LAX, Throughput at principal hub airports',
        lastColorCode: 'BLUE',
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-118.44 33.93, -118.38 33.93, -118.38 33.95, -118.44 33.95, -118.44 33.93))').toJson(),
          }],
        },
        time: [['2020-01-10'], ['2020-02-01'], ['2020-04-21'], ['2020-05-05'], ['2020-05-17'], ['2020-05-20'], ['2020-06-08'], ['2020-06-15'], ['2020-07-04'], ['2020-07-10'], ['2020-08-18'], ['2020-08-28'], ['2020-09-22'], ['2020-09-30'], ['2020-10-02'], ['2020-10-15']],
        inputData: ['airports'],
      },
    },
  },
  {
    latlng: latLng([34.057, -117.6]),
    id: 19698,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([34.057, -117.6]),
        id: 19698,
        aoiID: 'US022',
        country: ['US'],
        city: 'Ontario',
        siteName: 'Ontario International Airport - ONT',
        description: 'Airports: throughput',
        indicator: 'E13b',
        lastIndicatorValue: 'normal',
        indicatorName: 'Ontario International Airport - ONT, Throughput at principal hub airports',
        lastColorCode: 'BLUE',
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-117.575 34.048, -117.63 34.048, -117.63 34.065, -117.575 34.065, -117.575 34.048))').toJson(),
          }],
        },
        time: [['2020-01-14'], ['2020-02-03'], ['2020-03-22'], ['2020-04-15'], ['2020-05-04'], ['2020-05-23'], ['2020-05-24'], ['2020-06-11'], ['2020-07-06'], ['2020-07-21'], ['2020-08-01'], ['2020-08-16'], ['2020-09-01'], ['2020-09-19'], ['2020-10-04'], ['2020-10-27']],
        inputData: ['airports'],
      },
    },
  },
  {
    latlng: latLng([37.622, -122.378]),
    id: 19697,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([37.622, -122.378]),
        id: 19697,
        aoiID: 'US031',
        country: ['US'],
        city: 'San Francisco',
        siteName: 'San Francisco International Airport - SFO',
        description: 'Airports: throughput',
        indicator: 'E13b',
        lastIndicatorValue: 'normal',
        indicatorName: 'San Francisco International Airport - SFO, Throughput at principal hub airports',
        lastColorCode: 'BLUE',
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-122.4 37.605, -122.355 37.605, -122.355 37.64, -122.4 37.64, -122.4 37.605))').toJson(),
          }],
        },
        time: [['2020-01-11'], ['2020-02-20'], ['2020-03-09'], ['2020-04-03'], ['2020-05-05'], ['2020-05-19'], ['2020-05-26'], ['2020-06-04'], ['2020-06-23'], ['2020-07-06'], ['2020-07-14'], ['2020-08-07'], ['2020-08-13'], ['2020-09-23'], ['2020-09-30'], ['2020-10-12'], ['2020-10-26']],
        inputData: ['airports'],
      },
    },
  },
  {
    latlng: latLng([37.363, -121.93]),
    id: 19696,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([37.363, -121.93]),
        id: 19696,
        aoiID: 'US032',
        country: ['US'],
        city: 'San Jose',
        siteName: 'Norman Y. Mineta San Jose International Airport - SJC',
        description: 'Airports: throughput',
        indicator: 'E13b',
        lastIndicatorValue: 'normal',
        indicatorName: 'Norman Y. Mineta San Jose International Airport - SJC, Throughput at principal hub airports',
        lastColorCode: 'BLUE',
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-121.945 37.35, -121.912 37.35, -121.912 37.377, -121.945 37.377, -121.945 37.35))').toJson(),
          }],
        },
        time: [['2020-01-12'], ['2020-02-10'], ['2020-03-12'], ['2020-04-07'], ['2020-05-07'], ['2020-05-16'], ['2020-05-29'], ['2020-06-21'], ['2020-06-29'], ['2020-07-22'], ['2020-07-31'], ['2020-08-03'], ['2020-08-08'], ['2020-10-20'], ['2020-10-31']],
        inputData: ['airports'],
      },
    },
  },
  {
    latlng: latLng([37.722, -122.226]),
    id: 19695,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([37.722, -122.226]),
        id: 19695,
        aoiID: 'US033',
        country: ['US'],
        city: 'Oakland',
        siteName: 'Oakland International Airport - OAK',
        description: 'Airports: throughput',
        indicator: 'E13b',
        lastIndicatorValue: 'normal',
        indicatorName: 'Oakland International Airport - OAK, Throughput at principal hub airports',
        lastColorCode: 'BLUE',
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-122.252 37.7, -122.2 37.7, -122.2 37.745, -122.252 37.745, -122.252 37.7))').toJson(),
          }],
        },
        time: [['2020-01-13'], ['2020-02-15'], ['2020-03-19'], ['2020-04-15'], ['2020-05-04'], ['2020-05-27'], ['2020-06-11'], ['2020-06-18'], ['2020-07-07'], ['2020-07-27'], ['2020-08-04'], ['2020-09-22'], ['2020-09-24'], ['2020-10-15']],
        inputData: ['airports'],
      },
    },
  },
  {
    latlng: latLng([37.6585, -122.121]),
    id: 19694,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([37.6585, -122.121]),
        id: 19694,
        aoiID: 'US034',
        country: ['US'],
        city: 'Hayward',
        siteName: 'Hayward Executive Airport - HWD',
        description: 'Airports: throughput',
        indicator: 'E13b',
        lastIndicatorValue: 'normal',
        indicatorName: 'Hayward Executive Airport - HWD, Throughput at principal hub airports',
        lastColorCode: 'BLUE',
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-122.132 37.653, -122.11 37.653, -122.11 37.664, -122.132 37.664, -122.132 37.653))').toJson(),
          }],
        },
        time: [['2020-01-13'], ['2020-02-18'], ['2020-03-12'], ['2020-04-22'], ['2020-05-19']],
        inputData: ['airports'],
      },
    },
  },
  {
    latlng: latLng([38.216, -122.276]),
    id: 19693,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([38.216, -122.276]),
        id: 19693,
        aoiID: 'US035',
        country: ['US'],
        city: 'Napa',
        siteName: 'Napa County Airport - APC',
        description: 'Airports: throughput',
        indicator: 'E13b',
        lastIndicatorValue: 'normal',
        indicatorName: 'Napa County Airport - APC, Throughput at principal hub airports',
        lastColorCode: 'BLUE',
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-122.286 38.206, -122.266 38.206, -122.266 38.226, -122.286 38.226, -122.286 38.206))').toJson(),
          }],
        },
        time: [['2020-01-13'], ['2020-02-06'], ['2020-03-10'], ['2020-04-07'], ['2020-06-28'], ['2020-07-17'], ['2020-07-25'], ['2020-08-09'], ['2020-09-04'], ['2020-10-21'], ['2020-10-28']],
        inputData: ['airports'],
      },
    },
  },
  {
    latlng: latLng([38.144, -122.557]),
    id: 19692,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([38.144, -122.557]),
        id: 19692,
        aoiID: 'US036',
        country: ['US'],
        city: 'Marin',
        siteName: 'Marin County Airport - NOT',
        description: 'Airports: throughput',
        indicator: 'E13b',
        lastIndicatorValue: 'normal',
        indicatorName: 'Marin County Airport - NOT, Throughput at principal hub airports',
        lastColorCode: 'BLUE',
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-122.565 38.137, -122.55 38.137, -122.55 38.150, -122.565 38.150, -122.565 38.137))').toJson(),
          }],
        },
        time: [['2020-02-07'], ['2020-03-12'], ['2020-04-02']],
        inputData: ['airports'],
      },
    },
  },
  {
    latlng: latLng([37.99, -122.057]),
    id: 19691,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([37.99, -122.057]),
        id: 19691,
        aoiID: 'US037',
        country: ['US'],
        city: 'Buchannan',
        siteName: 'Buchannan Field Airport - CCR',
        description: 'Airports: throughput',
        indicator: 'E13b',
        lastIndicatorValue: 'normal',
        indicatorName: 'Buchannan Field Airport - CCR, Throughput at principal hub airports',
        lastColorCode: 'BLUE',
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-122.064 37.98, -122.05 37.98, -122.05 38.0, -122.064 38.0, -122.064 37.98))').toJson(),
          }],
        },
        time: [['2020-03-12']],
        inputData: ['airports'],
      },
    },
  },
  {
    latlng: latLng([40.642, -73.788]),
    id: 19690,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([40.642, -73.788]),
        id: 19690,
        aoiID: 'US041',
        country: ['US'],
        city: 'New York',
        siteName: 'John F. Kennedy International Airport - JFK',
        description: 'Airports: throughput',
        indicator: 'E13b',
        lastIndicatorValue: 'normal',
        indicatorName: 'John F. Kennedy International Airport - JFK, Throughput at principal hub airports',
        lastColorCode: 'BLUE',
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-73.825 40.62, -73.753 40.62, -73.753 40.664, -73.825 40.664, -73.825 40.62))').toJson(),
          }],
        },
        time: [['2020-01-16'], ['2020-02-17'], ['2020-03-15'], ['2020-04-15'], ['2020-05-14'], ['2020-05-27'], ['2020-05-30'], ['2020-06-04'], ['2020-06-10'], ['2020-07-02'], ['2020-07-06'], ['2020-08-10'], ['2020-08-26'], ['2020-09-16'], ['2020-09-25'], ['2020-10-06']],
        inputData: ['airports'],
      },
    },
  },
  {
    latlng: latLng([40.689, -74.172]),
    id: 19689,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([40.689, -74.172]),
        id: 19689,
        aoiID: 'US042',
        country: ['US'],
        city: 'Newark',
        siteName: 'Newark Liberty International Airport - EWR',
        description: 'Airports: throughput',
        indicator: 'E13b',
        lastIndicatorValue: 'normal',
        indicatorName: 'Newark Liberty International Airport - EWR, Throughput at principal hub airports',
        lastColorCode: 'BLUE',
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-74.19 40.67, -74.155 40.67, -74.155 40.708, -74.19 40.708, -74.19 40.67))').toJson(),
          }],
        },
        time: [['2020-01-20'], ['2020-02-19'], ['2020-03-09'], ['2020-04-06'], ['2020-05-05'], ['2020-05-20'], ['2020-05-31'], ['2020-06-01'], ['2020-06-09'], ['2020-07-19'], ['2020-07-21'], ['2020-08-03'], ['2020-08-17'], ['2020-09-13'], ['2020-09-21'], ['2020-10-08'], ['2020-10-15']],
        inputData: ['airports'],
      },
    },
  },
  {
    latlng: latLng([40.072, 116.593]),
    id: 19688,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([40.072, 116.593]),
        id: 19688,
        aoiID: 'CN011',
        country: ['CN'],
        city: 'Beijing',
        siteName: 'Beijing Capital International Airport - PEK',
        description: 'Airports: throughput',
        indicator: 'E13b',
        lastIndicatorValue: 'normal',
        indicatorName: 'Beijing Capital International Airport - PEK, Throughput at principal hub airports',
        lastColorCode: 'BLUE',
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((116.566 40.05, 116.621 40.05, 116.621 40.105, 116.566 40.105, 116.566 40.05))').toJson(),
          }],
        },
        time: [['2020-01-12'], ['2020-02-10'], ['2020-03-12'], ['2020-04-11'], ['2020-05-05']],
        inputData: ['airports'],
      },
    },
  },
  {
    latlng: latLng([39.495, 116.419]),
    id: 19687,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([39.495, 116.419]),
        id: 19687,
        aoiID: 'CN012',
        country: ['CN'],
        city: 'Beijing Daxing',
        siteName: 'Beijing Daxing International Airport - PKX',
        description: 'Airports: throughput',
        indicator: 'E13b',
        lastIndicatorValue: 'normal',
        indicatorName: 'Beijing Daxing International Airport - PKX, Throughput at principal hub airports',
        lastColorCode: 'BLUE',
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((116.362 39.466, 116.476 39.466, 116.476 39.524, 116.362 39.524, 116.362 39.466))').toJson(),
          }],
        },
        time: [['2020-01-09'], ['2020-01-12'], ['2020-01-14'], ['2020-02-18'], ['2020-03-13'], ['2020-03-19'], ['2020-04-11'], ['2020-05-14']],
        inputData: ['airports'],
      },
    },
  },
  {
    latlng: latLng([35.774, 140.385]),
    id: 19685,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([35.774, 140.385]),
        id: 19685,
        aoiID: 'JP012',
        country: ['JP'],
        city: 'Narita',
        siteName: 'Narita International Airport - NRT',
        description: 'Airports: throughput',
        indicator: 'E13b',
        lastIndicatorValue: 'normal',
        indicatorName: 'Narita International Airport - NRT, Throughput at principal hub airports',
        lastColorCode: 'BLUE',
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((140.364 35.742, 140.406 35.742, 140.406 35.806, 140.364 35.806, 140.364 35.742))').toJson(),
          }],
        },
        time: [['2020-01-19'], ['2020-02-05'], ['2020-03-19'], ['2020-04-10'], ['2020-05-16'], ['2020-08-11'], ['2020-08-11'], ['2020-08-14'], ['2020-09-02'], ['2020-09-09'], ['2020-09-10'], ['2020-10-02'], ['2020-10-22'], ['2020-10-25']],
        inputData: ['airports'],
      },
    },
  },
  {
    latlng: latLng([34.05, -118.251]),
    id: 19599,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([34.05, -118.251]),
        id: 19599,
        aoiID: 'US02',
        country: ['US'],
        city: 'Los Angeles',
        siteName: 'Los Angeles',
        description: 'Ports: Ship throughput',
        indicator: 'E13c',
        lastIndicatorValue: 'normal',
        indicatorName: 'Number of Ships in Port',
        lastColorCode: 'BLUE',
        eoSensor: ['Planet Labs/NASA (PlanetScope)'],
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-118.780756 33.420203,-118.780756 33.950165,-117.92406 33.950165,-117.92406 33.420203,-118.780756 33.420203))').toJson(),
          }],
        },
        time: ['2020-01-01', '2020-01-06', '2020-01-07', '2020-01-09', '2020-01-10', '2020-01-12', '2020-01-13', '2020-01-14', '2020-01-17', '2020-01-18', '2020-01-19', '2020-01-22', '2020-01-23', '2020-01-24', '2020-01-27', '2020-01-28', '2020-01-29', '2020-01-30', '2020-01-31', '2020-02-02', '2020-02-03', '2020-02-27', '2020-02-29', '2020-03-03', '2020-03-08', '2020-03-15', '2020-03-21', '2020-03-22', '2020-03-27', '2020-04-23', '2020-04-24', '2020-05-01', '2020-05-02', '2020-05-03', '2020-05-04', '2020-05-05', '2020-05-06', '2020-05-07', '2020-05-08', '2020-05-09', '2020-05-11', '2020-05-12', '2020-05-13', '2020-05-14', '2020-05-15', '2020-05-16', '2020-05-17', '2020-05-19', '2020-05-20', '2020-05-21', '2021-06-23', '2021-08-27', '2021-10-09', '2021-10-15'],
        inputData: ['ports'],
      },
    },
  },
  {
    latlng: latLng([40.6, -74.05]),
    id: 19598,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([40.6, -74.05]),
        id: 19598,
        aoiID: 'US01',
        country: ['US'],
        city: 'New York',
        siteName: 'New York',
        description: 'Ports: Ship throughput',
        indicator: 'E13c',
        lastIndicatorValue: 'normal',
        indicatorName: 'Number of Ships in Port',
        lastColorCode: 'BLUE',
        eoSensor: ['Planet Labs/NASA (PlanetScope)'],
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-73.973021 40.772228,-74.035505 40.762347,-74.11241 40.663458,-74.194807 40.643663,-74.303297 40.504408,-74.226393 40.44643,-73.990873 40.404614,-73.793119 40.395201,-73.646177 40.446953,-73.616652 40.583198,-73.751234 40.595191,-73.791746 40.660333,-73.87895 40.657207,-73.975767 40.611873,-74.001173 40.661895,-73.938688 40.748303,-73.973021 40.772228))').toJson(),
          }],
        },
        time: ['2020-01-02', '2020-01-09', '2020-01-11', '2020-01-16', '2020-01-17', '2020-01-19', '2020-01-20', '2020-01-21', '2020-01-22', '2020-01-23', '2020-01-24', '2020-01-30', '2020-02-02', '2020-02-03', '2020-02-29', '2020-03-08', '2020-03-18', '2020-03-22', '2020-03-27', '2020-05-02', '2020-05-05', '2020-05-09', '2020-05-10', '2020-05-13', '2020-05-14', '2020-05-16', '2020-05-19', '2020-05-20', '2020-05-21'],
        inputData: ['ports'],
      },
    },
  },
  {
    latlng: latLng([37.7775, -122.416389]),
    id: 19597,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([37.7775, -122.416389]),
        id: 19597,
        aoiID: 'US03',
        country: ['US'],
        city: 'San Francisco',
        siteName: 'San Francisco',
        description: 'Ports: Ship throughput',
        indicator: 'E13c',
        lastIndicatorValue: 'normal',
        indicatorName: 'Number of Ships in Port',
        lastColorCode: 'BLUE',
        eoSensor: ['Planet Labs/NASA (PlanetScope)'],
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((-122.6348876953125 37.61314357137536, -122.25654602050781 37.61314357137536, -122.25654602050781 37.88081521949766, -122.6348876953125 37.88081521949766, -122.6348876953125 37.61314357137536))').toJson(),
          }],
        },
        time: ['2020-01-02', '2020-01-03', '2020-01-05', '2020-01-07', '2020-01-10', '2020-01-11', '2020-01-12', '2020-01-13', '2020-01-14', '2020-01-17', '2020-01-18', '2020-01-22', '2020-01-23', '2020-01-27', '2020-01-30', '2020-01-31', '2020-02-03', '2020-02-27', '2020-02-29', '2020-03-03', '2020-03-08', '2020-03-10', '2020-03-11', '2020-04-21', '2020-05-01', '2020-05-03', '2020-05-04', '2020-05-05', '2020-05-06', '2020-05-07', '2020-05-08', '2020-05-09', '2020-05-15', '2020-05-16', '2020-05-17', '2020-05-19', '2020-05-20', '2020-05-21'],
        inputData: ['ports'],
      },
    },
  },
  {
    id: 19681,
    latlng: latLng([40.985, 1.769]),
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        id: 19681,
        aoi: latLng([40.985, 1.769]),
        aoiID: 'BarcelonaTSM_ESA',
        country: ['ES'],
        city: 'Barcelona - Total Suspended Matter',
        siteName: 'Barcelona',
        description: 'Water Quality Regional Maps',
        indicator: 'N3a2',
        lastIndicatorValue: null,
        indicatorName: 'Water Quality Regional Maps (ESA)',
        lastColorCode: null,
        dataProvider: 'ESA',
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((2.516544 40.485512,2.522036 41.562459,2.291387 41.480243,2.211372 41.416219,2.164693 41.3132,2.049368 41.27401,1.917569 41.26782,1.692412 41.212083,1.448034 41.174899,1.266809 41.129423,1.16796 41.077707,0.950799 41.027932,0.726123 40.810478,0.849188 40.722691,0.85468 40.68523,0.659705 40.6644,0.549872 40.576882,0.483966 40.485017,2.516544 40.485512))').toJson(),
          }],
        },
        time: availableDates.N3_CUSTOM_TRILATERAL_TSMNN,
        inputData: [''],
        display: {
          baseUrl: `https://shservices.mundiwebservices.com/ogc/wms/${shConfig.shInstanceIdTrilateral}`,
          name: 'Water Quality Index',
          layers: 'N3_CUSTOM_TRILATERAL_TSMNN',
          legendUrl: './data/trilateral/WaterQuality_legend_trilateral_tsm.png',
          maxZoom: 13,
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy-MM-dd'),
        },
      },
    },
  },
  {
    id: 19680,
    latlng: latLng([40.985, 1.769]),
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        id: 19680,
        aoi: latLng([40.985, 1.769]),
        aoiID: 'Barcelona_ESA',
        country: ['ES'],
        city: 'Barcelona - Chlorophyll-a concentration',
        siteName: 'Barcelona',
        description: 'Water Quality Regional Maps',
        indicator: 'N3a2',
        lastIndicatorValue: null,
        indicatorName: 'Water Quality Regional Maps (ESA)',
        lastColorCode: null,
        eoSensor: null,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((2.516544 40.485512,2.522036 41.562459,2.291387 41.480243,2.211372 41.416219,2.164693 41.3132,2.049368 41.27401,1.917569 41.26782,1.692412 41.212083,1.448034 41.174899,1.266809 41.129423,1.16796 41.077707,0.950799 41.027932,0.726123 40.810478,0.849188 40.722691,0.85468 40.68523,0.659705 40.6644,0.549872 40.576882,0.483966 40.485017,2.516544 40.485512))').toJson(),
          }],
        },
        time: availableDates.N3_CUSTOM_TRILATERAL,
        inputData: [''],
        display: {
          baseUrl: `https://shservices.mundiwebservices.com/ogc/wms/${shConfig.shInstanceIdTrilateral}`,
          name: 'Water Quality Index',
          layers: 'N3_CUSTOM_TRILATERAL',
          legendUrl: './data/trilateral/WaterQuality_legend_trilateral.png',
          maxZoom: 13,
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy-MM-dd'),
        },
      },
    },
  },
  {
    latlng: latLng([30.05, 32.56]),
    id: 19679,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi: latLng([30.05, 32.56]),
        id: 19679,
        aoiID: 'EG01',
        country: ['EG'],
        city: 'Suez',
        siteName: 'Suez Canal',
        description: 'Ports: Ship throughput',
        indicator: 'E13c',
        lastIndicatorValue: 'normal',
        indicatorName: 'Number of Ships in Port',
        lastColorCode: 'BLUE',
        eoSensor: ['Planet Labs/NASA (PlanetScope)'],
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: wkt.read('POLYGON((32.115951 30.282752,31.882492 31.099946,31.951157 31.721123,32.739426 31.67906,32.780624 31.562119,32.59111 30.323064,32.654282 29.990587,32.648788 29.819163,32.445541 29.840608,32.393356 30.152216,32.115951 30.282752))').toJson(),
          }],
        },
        time: ['2020-01-01', '2020-01-02', '2020-01-03', '2020-01-04', '2020-01-05', '2020-01-06', '2020-01-07', '2020-01-08', '2020-01-09', '2020-01-12', '2020-01-13', '2020-01-14', '2020-01-15', '2020-01-17', '2020-01-18', '2020-01-19', '2020-01-21', '2020-01-22', '2020-01-23', '2020-01-24', '2020-01-25', '2020-01-26', '2020-01-27', '2020-01-28', '2020-01-29', '2020-01-30', '2020-01-31', '2020-02-02', '2020-02-03', '2020-02-27', '2020-02-29', '2020-03-03', '2020-03-08', '2020-04-21', '2020-04-23', '2020-04-24', '2020-05-01', '2020-05-02', '2020-05-03', '2020-05-04', '2020-05-05', '2020-05-06', '2020-05-08', '2020-05-09', '2020-05-10', '2020-05-11', '2020-05-12', '2020-05-13', '2020-05-14', '2020-05-15', '2020-05-16', '2020-05-17', '2020-05-19', '2020-05-20', '2020-05-21', '2020-08-06', '2020-08-07', '2020-08-08', '2020-08-09', '2020-08-10'],
        inputData: [''],
        display: {
          url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/planet/{z}/{x}/{y}?date={time}&site=sc',
          protocol: 'xyz',
          tileSize: 256,
          dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy_MM_dd'),
          features: {
            dateFormatFunction: (date) => DateTime.fromISO(date).toFormat('yyyy_MM_dd'),
            url: 'https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/detections/ship/sc/{featuresTime}.geojson',
          },
        },
      },
    },
  },
  {
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        country: 'all',
        city: 'World',
        siteName: 'global',
        description: 'TROPOMI CO',
        indicator: 'N1',
        lastIndicatorValue: null,
        indicatorName: 'TROPOMI CO',
        subAoi: {
          type: 'FeatureCollection',
          features: [],
        },
        lastColorCode: null,
        aoi: null,
        aoiID: 'WorldCO',
        time: getDaily2DayIntervalDates('2018-04-30', DateTime.utc().minus({ days: 3 }).toFormat('yyyy-LL-dd')),
        inputData: [''],
        externalData: {
          label: 'Sentinel-5p Mapping Service',
          url: 'https://maps.s5p-pal.com',
        },
        display: {
          protocol: 'xyz',
          maxNativeZoom: 5,
          minZoom: 0,
          opacity: 0.6,
          tileSize: 256,
          url: '//obs.eu-nl.otc.t-systems.com/s5p-pal-nl-l3-external/maps/s5p-l3-co/3day/{time}/{z}/{x}/{-y}.png',
          name: 'Tropospheric CO',
          legendUrl: 'data/trilateral/s5pCOLegend.png',
          dateFormatFunction: (date) => {
            // example path 2021/06/nrt-20210606-20210608-20210609
            const d1 = DateTime.fromISO(date[0]);
            const d2 = DateTime.fromISO(date[0]).plus({ days: 2 });
            const arr = [DateTime.fromISO(date[0]).plus({ days: 5 }), DateTime.utc()];
            const d3 = arr.reduce((pr, cu) => (pr < cu ? pr : cu)); // lower of "now" and d1+5
            let prefix = '001';
            if (d3.diff(d1, 'days').toObject().days < 5) {
              // two last products - difference from d1 and d3 lower than 5 days
              // the filename starts with 'nrt' otherwise '001'
              prefix = 'nrt';
            }
            // example dates
            // 17,19,22 .5
            // 3,5,8. 6
            // 4,6,9. 6
            // 5,7,9. 6
            // 6,8,9. 6 (today is 9.6.)
            const filePathFormatted = `${d1.toFormat('yyyy')}/${d1.toFormat('LL')}/${prefix}-${d1.toFormat('yyyyLLdd')}-${d2.toFormat('yyyyLLdd')}-${d3.toFormat('yyyyLLdd')}`;
            return filePathFormatted;
          },
        },
      },
    },
  },
];


const createSlowDownIndicator = (id, aoiID, city, country, aoi, geometry, cog, eoSensor, time) => (
  {
    latlng: aoi,
    id,
    properties: {
      indicatorObject: {
        dataLoadFinished: true,
        aoi,
        id,
        aoiID,
        country,
        city,
        siteName: city,
        description: 'Slowdown Proxy Maps',
        indicator: 'N7',
        lastIndicatorValue: null,
        indicatorName: 'Cars and Construction',
        lastColorCode: null,
        eoSensor,
        subAoi: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry,
          }],
        },
        time,
        inputData: [''],
        display: {
          protocol: 'xyz',
          maxNativeZoom: 18,
          url: `https://8ib71h0627.execute-api.us-east-1.amazonaws.com/v1/{z}/{x}/{y}@1x?url=s3%3A%2F%2Fcovid-eo-data%2Fslowdown_proxy_map%2F${cog}.tif&resampling_method=bilinear&bidx=1%2C2%2C3`,
          name: 'Movement slowdown',
          tileSize: 256,
          legendUrl: 'data/trilateral/N7-legend.png',
          disableCompare: true,
          baseLayers: mapBoxHighResoSubst,
        },
      },
    },
  }
);

const slowdownIndicators = [
  {
    aoi: latLng([39.9, 116.38]),
    aoiID: 'CN01',
    country: ['CN'],
    city: 'Beijing',
    eoSensor: ['2020-01-01 compared to 2020-01-29 - 2020-03-01 - Derived from Sentinel-1'],
    geometry: wkt.read('POLYGON((116.073303 39.766325,116.073303 40.212441,116.729736 40.212441,116.729736 39.766325,116.073303 39.766325))').toJson(),
    time: ['2019-11-01'],
    cog: 'Beijing_S1_TA142_SPM_20191101-20200101_20200129-20200301_th-0.cog',
  },
  {
    aoi: latLng([38.904722, -77.016389]),
    aoiID: 'US10',
    country: ['US'],
    city: 'Washington, D.C.',
    eoSensor: ['2020-02-06 compared to 2020-03-28 - 2020-04-24 - Derived from Sentinel-1'],
    geometry: wkt.read('POLYGON((-78.1073 38.432077,-78.1073 39.846504,-75.81665 39.846504,-75.81665 38.432077,-78.1073 38.432077))').toJson(),
    time: ['2020-01-03'],
    cog: 'DC_S1_TA004_SPM_20200103-20200206_20200328-20200424_th-0.3.cog',
  },
  {
    aoi: latLng([51.036138, 2.285374]),
    aoiID: 'FR03',
    country: ['FR'],
    city: 'Port of Dunkirk',
    eoSensor: ['2020-02-15 compared to 2020-04-01 - 2020-04-31 - Derived from Sentinel-1'],
    geometry: wkt.read('POLYGON((1.590599 50.733177,1.554903 50.877173,1.737368 50.954146,2.040781 51.014635,2.304379 51.063831,2.503451 51.082805,2.902968 51.242053,3.147346 51.340768,3.605898 51.369056,3.783793 50.857979,2.622312 50.729565,2.570141 50.840647,1.590599 50.733177))').toJson(),
    time: ['2020-01-01'],
    cog: 'Dunkirk_S1_TA161_SPM_20200101-20200215_20200401-20200431_th-0.cog',
  },
  {
    aoi: latLng([51.091559, 3.740081]),
    aoiID: 'BE03',
    country: ['BE'],
    city: 'Port of Ghent',
    eoSensor: ['2020-02-06 compared to 2020-04-01 - 2020-04-30 - Derived from Sentinel-1'],
    geometry: wkt.read('POLYGON((4.196128 51.382924,4.333419 51.41247,4.441879 51.280437,4.637796 50.920723,4.122786 50.848204,3.396523 50.729818,3.228982 51.273398,3.719247 51.354086,3.852456 51.345509,3.908761 51.37295,3.951333 51.414081,4.019997 51.409798,4.058449 51.375522,4.196128 51.382924))').toJson(),
    time: ['2020-01-03'],
    cog: 'Ghent_S1_TA161_SPM_20200103-20200206_20200401-20200430_th-0.cog',
  },
  {
    aoi: latLng([-12.05, -77.033333]),
    aoiID: 'PE01',
    country: ['PE'],
    city: 'Lima',
    eoSensor: ['2020-03-02 compared to 2020-03-26 - 2020-05-01 - Derived from Sentinel-1'],
    geometry: wkt.read('POLYGON((-77.175522 -11.727546,-77.001114 -11.668376,-76.884041 -11.661315,-76.80027 -11.628362,-76.684227 -11.637777,-76.68148 -11.723512,-76.527672 -11.822325,-76.529388 -11.950326,-76.531448 -12.166883,-76.422958 -12.381922,-76.432228 -12.423166,-76.70517 -12.579026,-76.816406 -12.517028,-76.80748 -12.391647,-76.935196 -12.290359,-77.075958 -12.1991,-77.232513 -12.152787,-77.290878 -12.070881,-77.285385 -11.743008,-77.175522 -11.727546))').toJson(),
    time: ['2020-01-14'],
    cog: 'Lima_S1_TA018_SPM_20200114-20200302_20200326-20200501_th-0.cog',
  },
  {
    aoi: latLng([34.05, -118.25]),
    aoiID: 'US02A2',
    country: ['US'],
    city: 'Los Angeles - A2',
    eoSensor: ['2020-02-28 compared to 2020-04-01 - 2020-04-30 - Derived from Sentinel-1'],
    geometry: wkt.read('POLYGON((-118.762208 33.532178,-118.951722 34.379654,-117.954713 34.542704,-117.946473 34.424978,-116.996156 34.567586,-116.83548 34.004829,-116.765442 33.403902,-118.762208 33.532178))').toJson(),
    time: ['2020-01-01'],
    cog: 'LosAngeles_A2_SPM_10m_20200101-20200228_20200401-20200430_th-0.35.cog',
  },
  {
    aoi: latLng([34.05, -118.25]),
    aoiID: 'US02',
    country: ['US'],
    city: 'Los Angeles',
    eoSensor: ['2020-02-28 compared to 2020-04-01 - 2020-04-30 - Derived from Sentinel-1'],
    geometry: wkt.read('POLYGON((-118.762208 33.532178,-118.951722 34.379654,-117.954713 34.542704,-117.946473 34.424978,-116.996156 34.567586,-116.83548 34.004829,-116.765442 33.403902,-118.762208 33.532178))').toJson(),
    time: ['2020-01-03'],
    cog: 'LosAngeles_S1_TA064_SPM_20200103-20200228_20200401-20200430_th-0.cog',
  },
  {
    aoi: latLng([19.076, 72.8777]),
    aoiID: 'IN02',
    country: ['IN'],
    city: 'Mumbai',
    eoSensor: ['2020-01-22 compared to 2020-03-22 - 2020-04-27 - Derived from Sentinel-1'],
    geometry: wkt.read('POLYGON((72.773438 19.458823,73.168945 19.456234,73.910522 19.292998,73.646851 18.586379,72.789917 18.659257,72.677307 18.940062,72.773438 19.458823))').toJson(),
    time: ['2020-01-10'],
    cog: 'Mumbai_S1_TD034_SPM_20200110-20200122_20200322-20200427_th-0.cog',
  },
  {
    aoi: latLng([41.0114, -73.09]),
    aoiID: 'US04',
    country: ['US'],
    city: 'New York',
    eoSensor: ['2020-02-15 compared to 2020-04-01 - 2020-04-31 - Derived from Sentinel-1'],
    geometry: wkt.read('POLYGON((-75.140991 40.245992,-75.38269 41.137296,-72.894287 41.693424,-71.5979 40.876141,-75.140991 40.245992))').toJson(),
    time: ['2020-01-01'],
    cog: 'Newyork_S1_TA033_SPM_20200101-20200215_20200401-20200431_th-0.cog',
  },
  {
    aoi: latLng([37.7775, -122.416389]),
    aoiID: 'US03',
    country: ['US'],
    city: 'San Francisco',
    eoSensor: ['2020-02-15 compared to 2020-04-03 - 2020-04-27 - Derived from Sentinel-1'],
    geometry: wkt.read('POLYGON((-122.639688 37.099778,-122.639688 38.190951,-120.953755 38.190951,-120.953755 37.099778,-122.639688 37.099778))').toJson(),
    time: ['2020-01-28'],
    cog: 'SanFrancisco_S1_TA035_SPM_20200128-20200215_20200403-20200427_th-0.cog',
  },
  {
    aoi: latLng([-33.45, -70.666667]),
    aoiID: 'CL01',
    country: ['CL'],
    city: 'Santiago',
    eoSensor: ['2020-02-01 compared to 2020-04-01 - 2020-06-12 - Derived from Sentinel-1'],
    geometry: wkt.read('POLYGON((-71.292757 -34.157073,-70.540193 -33.911254,-70.482515 -32.918589,-71.608614 -33.02228,-71.520723 -33.495397,-71.292757 -34.157073))').toJson(),
    time: ['2020-01-08'],
    cog: 'Santiago_S1_TA018_SPM_20200108-20200201_20200401-20200612_th-0.cog',
  },
  {
    aoi: latLng([-23.55, -46.633333]),
    aoiID: 'BR02',
    country: ['BR'],
    city: 'Sao Paulo',
    eoSensor: ['2020-02-04 compared to 2020-03-29 - 2020-04-28 - Derived from Sentinel-1'],
    geometry: wkt.read('POLYGON((-46.55 -23.45, -46.75 -23.45, -46.75 -23.65, -46.55 -23.65, -46.55 -23.45))').toJson(),
    time: ['2020-01-05'],
    cog: 'SaoPaulo_S1_TD053_SPM_20200105-20200204_20200329-20200428_th-0.cog',
  },
  {
    aoi: latLng([1.264856, 103.847663]),
    aoiID: 'SG01',
    country: ['SG'],
    city: 'Singapore',
    eoSensor: ['2020-02-12 compared to 2020-04-24 - 2020-05-30 - Derived from Sentinel-1'],
    geometry: wkt.read('POLYGON((104.37973 0.99284,102.851257 0.882991,102.849197 1.135637,103.430786 1.351193,103.331223 1.542706,103.142395 1.631936,103.145485 1.68959,103.497734 1.72425,103.988342 1.68959,104.195023 1.766459,104.293556 1.609629,104.315186 1.356342,104.385223 1.012406,104.37973 0.99284))').toJson(),
    time: ['2020-01-07'],
    cog: 'Singapore_S1_TA171_SPM_20200107-20200212_20200424-20200530_th-0.cog',
  },
  {
    aoi: latLng([35, 137]),
    aoiID: 'JP01',
    country: ['JP'],
    city: 'Aichi',
    eoSensor: ['2020-01-09 compared to 2020-04-26 - 2020-05-08 - Derived from Sentinel-1'],
    geometry: wkt.read('POLYGON((135.864 34.257,138.0622 34.257,138.0622 35.771,135.864 35.771,135.864 34.257))').toJson(),
    time: ['2020-01-09'],
    cog: 'Aichi_S1_TA112_SPM_20200109-20200214_20200426-20200508_th-0.35.cog',
  },
  {
    aoi: latLng([-22.875, -43.3305]),
    aoiID: 'BR03',
    country: ['BR'],
    city: 'Rio de Janeiro',
    eoSensor: ['2020-01-12 compared to 2020-03-24 - 2020-04-29 - Derived from Sentinel-1'],
    geometry: wkt.read('POLYGON((-44.292 -23.472,-42.369 -23.472,-42.369 -22.278,-44.292 -22.278,-44.292 -23.472))').toJson(),
    time: ['2020-01-12'],
    cog: 'RiodeJaneiro_S1_TD155_SPM_20200112-20200217_20200324-20200429_th-0.3.cog',
  },
];

const idOffset = 30000;
slowdownIndicators.forEach((ind, idx) => (
  globalIndicators.push(createSlowDownIndicator(
    (idOffset + idx), ind.aoiID, ind.city, ind.country, ind.aoi,
    ind.geometry, ind.cog, ind.eoSensor, ind.time,
  ))
));
