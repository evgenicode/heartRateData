import axios from "axios";
import { getHeartRateData, getSleepData } from "services/healthData";
import { apiUrl } from "services/healthData";
import { HeartRateGraphView } from "components/HeartRateGraphView/HeartRateGraphView";
import { render, screen } from "@testing-library/react";
import { useData } from "components/HeartRateGraphView/useData";

jest.mock("axios");

describe("getHeartRateData", () => {
  it("fetches heart rate data from the API", async () => {
    const responseData = { heartRate: 80 };
    axios.get.mockResolvedValueOnce({ data: responseData });

    const result = await getHeartRateData();

    expect(result).toEqual(responseData);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(apiUrl + "/heartRateData");
  });
});

describe("getSleepData", () => {
  it("fetches heart rate data from the API", async () => {
    const responseData = { data: "mockData" };
    axios.get.mockResolvedValueOnce({ data: responseData });

    const result = await getSleepData();

    expect(result).toEqual(responseData);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(apiUrl + "/getSleepData");
  });
});

jest.mock("components/HeartRateGraphView/useData", () => ({
  __esModule: true,
  useData: jest.fn(),
}));

describe("getHeartRateData empty response", () => {
  it("displays error message when heart rate data is empty", async () => {
    useData.mockImplementationOnce(jest.fn().mockReturnValue([]));

    render(<HeartRateGraphView />);
    const errorMessage = await screen.findByText(/Something went wrong/);
    expect(errorMessage).toBeInTheDocument();
  });
});
