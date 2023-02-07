export interface samplePoint {
  unit: string;
  startTime: number;
  endTime: number;
  value: string;
  key: string;
}

export interface hasHealthTypeCode {
  startTime: number;
  samplePoints: Array<samplePoint>;
  type: number;
}
