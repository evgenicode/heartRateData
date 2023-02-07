import mongoose from "mongoose";

const healthDetailData = new mongoose.Schema({
  recordId: {
    type: String,
    required: false,
  },
  healthDataSource: {
    type: Number,
    required: false,
  },
  appType: {
    type: Number,
    required: false,
  },
  timeZone: {
    type: String,
    required: false,
  },
  startTime: {
    type: Number,
    required: false,
  },
  deviceCode: {
    type: Number,
    required: false,
  },
  endTime: {
    type: Number,
    required: false,
  },
  type: {
    type: Number,
    required: false,
  },
  samplePoints: {
    type: Array,
    required: false,
  },
  version: {
    type: Number,
    required: false,
  },
});

export default mongoose.model("healthDetailData", healthDetailData);
