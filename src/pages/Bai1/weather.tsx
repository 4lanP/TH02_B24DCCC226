import axios from "axios";
import { useState } from "react";

interface Weather {
  temp_C: string;
  weatherDesc: { value: string }[];
}

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    const cityName = city.trim();
    if (!cityName) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const { data } = await axios.get(`https://wttr.in/${encodeURIComponent(cityName)}?format=j1`);
      setWeather(data.current_condition[0]);
    } catch {
      setError("Không tìm thấy thành phố!");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container">
      <h1>Thời tiết</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Nhập tên thành phố..."
      />
      <button onClick={fetchWeather} disabled={loading}>
        {loading ? "Đang tải..." : "Xem"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h3>Nhiệt độ: {weather.temp_C}°C</h3>
          <p>{weather.weatherDesc[0].value}</p>
        </div>
      )}
    </div>
  );
}
