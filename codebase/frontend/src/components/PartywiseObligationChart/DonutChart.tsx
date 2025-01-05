import React, { useState, useEffect } from "react";
import { ChartColors } from "./utils";
import { createArc } from "./utils";
import { Obligation, ProcessedData } from "./types";
import { WavingHand02Icon } from "hugeicons-react";

export const DonutChart = ({
  data,
  handleSegmentClick,
}: {
  data: Obligation[];
  handleSegmentClick: any;
}) => {
  const [processedData, setProcessedData] = useState<ProcessedData[]>([]);
  const [hoveredSegment, setHoveredSegment] = useState<ProcessedData | null>(
    null
  );

  const size = 150;
  const radius = size / 2;
  const donutWidth = 15;
  const centerX = size / 2;
  const centerY = size / 2;

  useEffect(() => {
    // Process data to count obligations per role and store obligations
    const roleCounts = data.reduce((acc, curr) => {
      const role = curr.responsible_party_role_name;

      if (!acc[role]) {
        acc[role] = { count: 0, obligations: [] };
      }

      acc[role].count += 1;
      acc[role].obligations.push(curr.obligation_statement);

      return acc;
    }, {} as Record<string, { count: number; obligations: string[] }>);

    // Calculate total obligations count
    const total = Object.values(roleCounts).reduce(
      (sum, roleData) => sum + roleData.count,
      0
    );

    // Calculate angles for each segment
    let currentAngle = 0;
    const processed = Object.entries(roleCounts).map(
      ([role, roleData], index) => {
        const percentage = roleData.count / total;
        const startAngle = currentAngle;
        // For single party, make a full circle
        const endAngle =
          Object.keys(roleCounts).length === 1
            ? startAngle + 360
            : startAngle + percentage * 360;
        currentAngle = endAngle;

        return {
          role,
          count: roleData.count,
          obligations: roleData.obligations,
          color: ChartColors[index % ChartColors.length],
          startAngle,
          endAngle,
        };
      }
    );

    setProcessedData(processed);
  }, [data]);

  if (processedData.length === 0) {
    return <div className="text-center text-gray-500">No data available</div>;
  }

  return (
    <div className="flex flex-col items-center animate-in zoom-in">
      <div className="relative">
        <svg width={size} height={size} className="">
          {processedData.map((segment) => (
            <g key={segment.role}>
              <path
                d={`${createArc(
                  segment.startAngle,
                  segment.endAngle,
                  radius,
                  centerX,
                  centerY
                )} L ${centerX},${centerY} Z`}
                fill={segment.color}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredSegment(segment)}
                onMouseLeave={() => setHoveredSegment(null)}
                onClick={() => handleSegmentClick(segment)}
                opacity={
                  hoveredSegment
                    ? hoveredSegment.role === segment.role
                      ? 1
                      : 0.6
                    : 0.9
                }
              >
                <animate
                  attributeName="d"
                  from={`${createArc(
                    segment.startAngle,
                    segment.startAngle,
                    radius,
                    centerX,
                    centerY
                  )} L ${centerX},${centerY} Z`}
                  to={`${createArc(
                    segment.startAngle,
                    segment.endAngle,
                    radius,
                    centerX,
                    centerY
                  )} L ${centerX},${centerY} Z`}
                  dur="0.1s"
                  fill="freeze"
                  key={segment.role}
                />
              </path>
            </g>
          ))}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius - donutWidth}
            fill="white"
          />
        </svg>

        {hoveredSegment ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="font-medium text-[12px] text-black">
              {hoveredSegment.role}
            </p>
            <p className="text-[12px] text-black text-opacity-50">
              {hoveredSegment.count} obligation
              {hoveredSegment.count !== 1 ? "s" : ""}
            </p>
          </div>
        ) : (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center gap-1">
            <WavingHand02Icon size={25} className="text-black animate-pulse" />
            <p className="text-[12px]">Hover and click</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonutChart;
