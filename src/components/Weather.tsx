import { useRouter } from "../hooks/useRouter";
import { IRootState } from "../store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ForecastProvider } from "../context/ForecastProvider";
import { createSearchParams } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { WeatherFilters } from "./WeatherFilters";
import { OpenMeteoWrapper } from "./OpenMeteoWrapper";
import { StormGlassWrapper } from "./StormGlassWrapper";
import { VisualCrossingWrapper } from "./VisualCrossingWrapper";
import { LandingWeatherPage } from "./LandingWeatherPage";
import { ElementFocusProvider } from "../context/ElementFocusProvider";

const Weather: React.FC = () => {
  const { query, navigate } = useRouter();

  const {
    data: { address },
  } = useSelector((state: IRootState) => state.location);

  useEffect(() => {
    const addressQuery = query.get("address") || "";
    address !== addressQuery && navigate({ search: `?${createSearchParams({ address })}` });
  }, [address]);

  if (!address) {
    return (
      <ElementFocusProvider>
        <LandingWeatherPage />
      </ElementFocusProvider>
    );
  }

  return (
    <ForecastProvider>
      <div className="flex flex-col sm:w-[95vw] w-4/5 items-center h-full">
        <div className="flex flex-row sm:flex-col w-full items-center relative">
          <SearchBar />
          <WeatherFilters />
        </div>
        <OpenMeteoWrapper />
        {/* 
          <StormGlassWrapper />*/}
        <VisualCrossingWrapper />
      </div>
    </ForecastProvider>
  );
};

export default Weather;
