import { Bar, YAxis } from "recharts";
import { ILanguageObject, languages } from "../context/LanguageProvider";

const message: ILanguageObject = {
  EN: "Precipitation [mm]",
  PL: "Opady [mm]",
};

export const ChartPrecip: (language: typeof languages[number], precip: number[], singleBar?: boolean) => JSX.Element = (
  language,
  precip,
  singleBar = true
) => {
  const chartMax = Math.ceil(precip.sort((a, b) => b - a)[0] / 10) * 10 * 2;
  const ticks = [];
  for (let i = 0; i < chartMax + 10; i += 10) {
    ticks.push(i);
  }

  const bars = singleBar ? (
    <Bar
      dataKey="precip_sum"
      fill="#007ea7"
      yAxisId="precip"
      stackId="precip"
    />
  ) : (
    <>
      <Bar
        dataKey="snow"
        fill="#00a8e8"
        yAxisId="precip"
        stackId="precip"
      />
      <Bar
        dataKey="rain"
        fill="#007ea7"
        yAxisId="precip"
        stackId="precip"
      />
      <Bar
        dataKey="showers"
        fill="#003459"
        yAxisId="precip"
        stackId="precip"
      />
    </>
  );

  return (
    <>
      <YAxis
        domain={[0, chartMax]}
        ticks={ticks}
        yAxisId="precip"
        orientation="right"
        label={{ value: message[language], angle: 90, position: "insideRight", offset: 15 }}
      />
      {bars}
    </>
  );
};
