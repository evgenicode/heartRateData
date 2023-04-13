export interface heartRateDataSamplePoints {
  unit: string;
  startTime: number;
  endTime: number;
  value: string;
  key: string;
}

export interface heartRateDataPoint {
  startTime: number;
  samplePoints: Array<heartRateDataSamplePoints>;
  type: number;
}

export interface sleepDataSamplePoints {
  startTime: number;
  endTime: number;
  key: string;
}

export interface sleepDataPoint {
  startTime: number;
  samplePoints: Array<sleepDataSamplePoints>;
  type: number;
}

export interface hasHealthTypeCode {
  type: number;
}
