import { getWeather } from "../tools/weather";

describe("Weather Tool", () => {
  it("should return weather information for a location", async () => {
    const result = await getWeather.invoke({ location: "Tokyo" });

    expect(result).toContain("Tokyo");
    expect(result).toContain("weather");
    expect(typeof result).toBe("string");
  });

  it("should work with different locations", async () => {
    const locations = ["Beijing", "Shanghai", "London", "New York"];

    for (const location of locations) {
      const result = await getWeather.invoke({ location });
      expect(result).toContain(location);
      expect(result).toContain("weather");
      expect(typeof result).toBe("string");
    }
  });
});