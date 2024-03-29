import { Axis, Orientation } from "@visx/axis";
import { curveNatural } from "@visx/curve";
import { GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { Suspense, useContext } from "react";
import { ILanguageObject, LanguageContext } from "../context/LanguageProvider";
import { IForecast } from "../store";
import { min, max } from "d3-array";
import { dayScale, getDay } from "../utils/dayScale";
import { ForecastContext } from "../context/ForecastProvider";
import { ChartComponentContext } from "../context/ChartComponentProvider";
import { IconCode } from "../svg/IconCode";

const message: ILanguageObject = {
  EN: "Temperature [°C]",
  PL: "Temperatura [°C]",
};
const getMinTemp = (day: IForecast) => day.temp_min;
const getMaxTemp = (day: IForecast) => day.temp_max;

export const ChartTemps: React.FC = () => {
  const { data, width, height, left = 0 } = useContext(ChartComponentContext);
  const { language } = useContext(LanguageContext);
  const { show } = useContext(ForecastContext);

  const xScale = dayScale(data).range([0, width]);

  const domainMin = min(data, getMinTemp) as number;
  const domainMax = max(data, getMaxTemp) as number;

  const tempScale = scaleLinear<number>({
    domain: [domainMin - (domainMax - domainMin) / 2, domainMax + (domainMax - domainMin) / 2],
  }).range([height, height * 0.1]);

  if (!show.includes("temp")) return null;

  return (
    <>
      <Axis
        orientation={Orientation.left}
        scale={tempScale}
        left={left}
        label={message[language]}
        labelOffset={50}
        tickLabelProps={(d) => {
          return { dx: d < 0 ? -30 : -20, dy: 5 };
        }}
      />
      <GridRows
        scale={tempScale}
        width={width}
        height={height}
        strokeDasharray="5 3"
        left={left}
        stroke="#b0b0b050"
      />
      <GridRows
        scale={tempScale}
        width={width}
        height={height}
        left={left}
        stroke="#dd000080"
        tickValues={[0]}
      />
      <Group left={left}>
        <LinePath<IForecast>
          curve={curveNatural}
          data={data}
          x={(day) => xScale(getDay(day))}
          y={(day) => tempScale(getMinTemp(day))}
          stroke="#80a0ff"
          strokeWidth={3}
          shapeRendering="geometricPrecision"
        />
      </Group>
      <Group left={left}>
        <LinePath<IForecast>
          curve={curveNatural}
          data={data}
          x={(day) => xScale(getDay(day))}
          y={(day) => tempScale(getMaxTemp(day))}
          stroke="#ff4040"
          strokeWidth={3}
          shapeRendering="geometricPrecision"
        />
        <Suspense fallback={<></>}>
          {data.map(
            (day) =>
              day.code && (
                <IconCode
                  key={day.time}
                  code={day.code}
                  x={xScale(getDay(day)) - 20}
                  y={tempScale(getMaxTemp(day)) - 50}
                />
              )
          )}
        </Suspense>
      </Group>
    </>
  );
};
