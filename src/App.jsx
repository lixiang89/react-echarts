import { useState, useEffect, useMemo, useRef } from "react";
import ReactECharts from "echarts-for-react";
import Card from "./Card";
import Chart from './Chart'
import "./App.css";

const sleep = (timeout = 3000) => {
  return new Promise((reslove) => {
    setTimeout(reslove, timeout);
  });
};

const random = (fix = 300) => Math.trunc(Math.random() * fix);

const style = {
  height: "270px",
};

const App = () => {
  const barRef = useRef();
  const [barLoading, setBarLoading] = useState(false);

  const lineRef = useRef();
  const [lineLoading, setLineLoading] = useState(false);

  const [line2Loading, setLine2Loading] = useState(false);
  const [lin2Data, setLine2Data] = useState([]);

  const pieRef = useRef();
  const [pieLoading, setPieLoading] = useState(false);

  // 更新图表数据
  const setChartOption = (ref, data) => {
    console.log("setChartOption ~ data:", data);
    let series = data;
    if (!Array.isArray(data)) {
      series = data.series;
    }
    const chart = ref.current?.getEchartsInstance();
    const { series: originSeries } = chart.getOption();
    console.log("setChartOption ~ originSeries:", originSeries);

    const newSeries = series.map((s) => {
      const match = originSeries.find((os) => os.name === s.name);
      return { ...match, ...s };
    });

    let option = {
      series: newSeries,
    };

    if (!Array.isArray(data)) {
      option = { ...data, ...option };
    }
    console.log("setChartOption ~ option:", option);

    chart?.setOption(option, {
      replaceMerge: ["series"],
    });
    return chart;
  };

  const getBar = async () => {
    setBarLoading(true);
    await sleep();
    const config = { type: "bar", barMaxWidth: 36 };
    const initData = {
      xAxis: {
        data: ["壹", "贰", "叁", "肆", "伍"],
      },
      series: [
        {
          data: [random(), random(), random(), random(), random()],
          ...config,
        },
      ],
    };
    setChartOption(barRef, initData);
    setBarLoading(false);
  };
  const getLine = async () => {
    setLineLoading(true);
    await sleep(2000);
    const config = {
      type: "line",
      symbol: "none",
    };
    const initData = {
      xAxis: {
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      series: [
        {
          data: [
            random(),
            random(),
            random(),
            random(),
            random(),
            random(),
            random(),
          ],
          name: "Email",
          ...config,
        },
        {
          data: [
            random(),
            random(),
            random(),
            random(),
            random(),
            random(),
            random(),
          ],
          name: "Union",
          ...config,
        },
        {
          data: [
            random(),
            random(),
            random(),
            random(),
            random(),
            random(),
            random(),
          ],
          name: "Video",
          ...config,
        },
        {
          data: [
            random(),
            random(),
            random(),
            random(),
            random(),
            random(),
            random(),
          ],
          name: "Direct",
          ...config,
        },
      ],
    };
    setChartOption(lineRef, initData);
    setLineLoading(false);
  };
  const getLine2 = async () => {
    setLine2Loading(true);
    await sleep(2000);
    setLine2Loading(false);
    const data= [
        {
          data: [
            random(),
            random(),
            random(),
            random(),
            random(),
            random(),
            random(),
          ],
          name: "Email",
        },
        {
          data: [
            random(),
            random(),
            random(),
            random(),
            random(),
            random(),
            random(),
          ],
          name: "Union",
        },
        {
          data: [
            random(),
            random(),
            random(),
            random(),
            random(),
            random(),
            random(),
          ],
          name: "Video",
        },
        {
          data: [
            random(),
            random(),
            random(),
            random(),
            random(),
            random(),
            random(),
          ],
          name: "Direct",
        },
      ]
    setLine2Data(data)
  };
  const getPie = async () => {
    setPieLoading(true);
    await sleep();
    let option = {
      title: {
        text: random(1500),
      },
      series: [
        {
          data: [
            { value: random(), name: "壹" },
            { value: random(), name: "贰" },
            { value: random(), name: "叁" },
            { value: random(), name: "肆" },
            { value: random(), name: "伍" },
          ],
        },
      ],
    };
    setChartOption(pieRef, option);
    setPieLoading(false);
  };
  useEffect(() => {
    //mount
    getPie();
    getLine();
    getBar();
    getLine2()
  }, []);

  return (
    <div className="board">
      <Card
        extra={{
          reload: getBar,
        }}
        title={"柱状图"}
        loading={barLoading}
      >
        <ReactECharts
          ref={barRef}
          option={{
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow",
              },
            },
            xAxis: {
              type: "category",
              axisTick: false,
              axisLabel: {
                interval: 0,
              },
            },
            yAxis: {
              type: "value",
            },
            series: [],
          }}
        />
      </Card>
      <Card loading={lineLoading} extra={{ reload: getLine }} title={"折线图"}>
        <ReactECharts
          ref={lineRef}
          option={{
            tooltip: {
              trigger: "axis",
            },
            grid: { top: 50 },
            legend: {
              icon: "circle",
              left: -5,
              top: 10,
            },
            xAxis: {
              type: "category",
              axisTick: false,
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                type: "line",
                symbol: "none",
              },
            ],
          }}
        />
      </Card>
      <Card
        className="pie"
        extra={{
          reload: getPie,
        }}
        title={"饼图"}
        loading={pieLoading}
      >
        <ReactECharts
          ref={pieRef}
          option={{
            title: {
              text: "55",
              subtext: "内标题",
              left: "center",
              top: "30%",
              textStyle: {
                fontSize: 20,
              },
              subtextStyle: {
                fontSize: 14,
                color: "#929AA6",
              },
            },
            tooltip: {
              // trigger: 'item',
            },
            legend: {
              icon: "circle",
              bottom: 20,
            },
            series: [
              {
                // name: 'Access From',
                type: "pie",
                radius: ["50%", "70%"],
                center: ["50%", "40%"],
                avoidLabelOverlap: false,
                label: {
                  show: false,
                  position: "inside",
                },
                emphasis: {
                  // disabled: true,
                  // label: {
                  //   show: true,
                  //   fontSize: 14,
                  //   fontWeight: 'bold',
                  // },
                },
                labelLine: {
                  show: false,
                },
                data: [],
              },
            ],
          }}
        />
      </Card>
      <Card className="bar-col" title="柱状图-横">
        {useMemo(
          () => (
            <ReactECharts
              option={{
                grid: { right: 10 },
                tooltip: {
                  trigger: "axis",
                  axisPointer: {
                    type: "shadow",
                  },
                },
                xAxis: {
                  type: "value",
                  boundaryGap: [0, 0.01],
                },
                yAxis: {
                  type: "category",
                  data: ["壹", "贰", "叁"],
                  axisTick: false,
                },
                series: [
                  {
                    name: "2011",
                    type: "bar",
                    data: [random(), random(), random()],
                  },
                  {
                    name: "2012",
                    type: "bar",
                    data: [random(), random(), random()],
                  },
                ],
              }}
            />
          ),
          []
        )}
      </Card>
      <Card loading={line2Loading} extra={{ reload: getLine2 }} title={"折线图-chart组件"}>
        <Chart
          option={{
            tooltip: {
              trigger: "axis",
            },
            grid: { top: 50 },
            legend: {
              icon: "circle",
              left: -5,
              top: 10,
            },
            xAxis: {
              type: "category",
              axisTick: false,
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                type: "line",
                symbol: "none",
              },
            ],
          }}
          handler={ (data = []) => {
            const config = { type: 'line', symbol: 'none' }
            return {
              xAxis: {
                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              },
              series: data.map((d) => ({ ...d, ...config })),
            }
          }}
          data={lin2Data}
        />
      </Card>
    </div>
  );
};

export default App;
