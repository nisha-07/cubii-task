import { Bar, ComposedChart, Legend, Line, XAxis, YAxis } from "recharts";
import {
    CustomizedXAxis,
    CustomizedYLeftAxis,
    CustomizedYRightAxis,
} from "../CustomoziedChart/CustomizedAxis";
import { createRef, useEffect } from "react";

import { CustomDot } from "../CustomoziedChart/CustomizedDot";
import { capitalCase } from "change-case";

const DetailedChart = ({ data, range }) => {
    const svgRef = createRef();
    useEffect(() => {
        const svg = svgRef?.current?.container.getElementsByTagName("svg")[0];
        if (svg) svg.setAttribute("viewBox", `0 10 850 500`);
    });

    return (
        <ComposedChart
            width={850}
            height={500}
            data={data}
            ref={svgRef}
            margin={{
                top: 20,
                right: 30,
                left: 40,
                bottom: 20,
            }}
        >
            <XAxis
                dataKey={
                    range === "daily"
                        ? "start_time"
                        : range === "monthly"
                            ? "start_date"
                            : "date"
                }
                heigth={1}
                angle={15}
                interval={0}
                label={<CustomizedXAxis range={range} />}
            />
            <YAxis yAxisId="left" label={<CustomizedYLeftAxis />} />
            <YAxis
                yAxisId="right"
                orientation="right"
                label={<CustomizedYRightAxis />}
            />
            <Legend
                verticalAlign="top"
                height={40}
                iconSize={12}
                formatter={(value) => capitalCase(value)}
            />
            <Line
                yAxisId="right"
                dataKey="rotations_goal_achieved_count"
                sroke="#ffffff"
                strokeWidth={3}
                dot={<CustomDot />}
            />
            <Bar
                yAxisId="left"
                dataKey="rotations"
                fill="#33ebeb"
                radius={[1, 1, 1, 1]}
            />
        </ComposedChart>
    );
};

export default DetailedChart;
