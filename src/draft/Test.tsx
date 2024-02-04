import React, { useState, useRef, useEffect } from "react";
import bitmaskToPath from "@pictogrammers/bitmask-to-svg";

const SVGPath: React.FC = () => {
  const activePointRef = useRef<{ group: number; point: number } | null>(null);
  const [groupedPoints, setGroupedPoints] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const path = bitmaskToPath([
          [
            // Your bitmask data here
          ],
          // Additional bitmask rows here
        ]);
        console.log("path:", path);

        // Example: Convert path to points
        const scaleFactor = 10; // You can adjust the scale factor as needed

        const pathDataSVG = `M${26 * scaleFactor},${14 * scaleFactor}H${27 * scaleFactor}V${12 * scaleFactor}H${25 * scaleFactor}V${13 * scaleFactor}H${26 * scaleFactor}ZM${27 * scaleFactor},${17 * scaleFactor}V${39 * scaleFactor}L${26 * scaleFactor},${16 * scaleFactor}H${25 * scaleFactor}V${14 * scaleFactor}H${20 * scaleFactor}V${16 * scaleFactor}H${21 * scaleFactor}L${20 * scaleFactor},${40 * scaleFactor}L${17 * scaleFactor},${17 * scaleFactor}V${16 * scaleFactor}H${18 * scaleFactor}V${14 * scaleFactor}H${14 * scaleFactor}L${8 * scaleFactor},${32 * scaleFactor}L${11 * scaleFactor},${15 * scaleFactor}V${5 * scaleFactor}H${12 * scaleFactor}V${4 * scaleFactor}H${13 * scaleFactor}V${5 * scaleFactor}H${26 * scaleFactor}L${68 * scaleFactor},${11 * scaleFactor}V${38 * scaleFactor}L${24 * scaleFactor},${7 * scaleFactor}H${13 * scaleFactor}V${12 * scaleFactor}H${24 * scaleFactor}V${8 * scaleFactor}H${26 * scaleFactor}V${11 * scaleFactor}H${28 * scaleFactor}V${12 * scaleFactor}H${29 * scaleFactor}V${13 * scaleFactor}L${51 * scaleFactor},${27 * scaleFactor}L${28 * scaleFactor},${15 * scaleFactor}H${27 * scaleFactor}Z`;
      
        const points: any = pathToPoints(pathDataSVG);

        // Update the state with the processed data
        setGroupedPoints(points);
      } catch (error) {
        console.error("Error reading JSON file:", error);
      }
    }

    // Call the async function
    fetchData();
  }, []);

  const handleMouseDown = (index: { group: number; point: number }) => () => {
    activePointRef.current = index;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (activePointRef.current !== null) {
      const svgRect = document.querySelector('svg')?.getBoundingClientRect(); // Get the SVG's position on the page
      if (svgRect) {
        const updatedGroupedPoints: any = [...groupedPoints];
        const x = event.clientX - svgRect.left; // Adjust for SVG position
        const y = event.clientY - svgRect.top;  // Adjust for SVG position
        updatedGroupedPoints[activePointRef.current.group][
          activePointRef.current.point
        ] = {
          x,
          y,
        };
        setGroupedPoints(updatedGroupedPoints);
      }
    }
  };

  const handleMouseUp = () => {
    activePointRef.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const pointsToPath = (groups: any) => {
    let pathData = "";

    for (let points of groups) {
      if (points.length === 0) continue;

      let firstPoint = points[0];
      pathData += `M${firstPoint.x},${firstPoint.y}`;

      let prevPoint = firstPoint;

      for (let i = 1; i < points.length; i++) {
        const point = points[i];
        if (prevPoint.x !== point.x && prevPoint.y !== point.y) {
          pathData += `L${point.x},${point.y}`;
        } else if (prevPoint.y === point.y) {
          pathData += `H${point.x}`;
        } else if (prevPoint.x === point.x) {
          pathData += `V${point.y}`;
        }
        prevPoint = point;
      }
      pathData += "Z";
    }

    return pathData;
  };

  const check = () => {
    console.log(pointsToPath(groupedPoints));
  };

  const pathToPoints = (data: any) => {
    const commands = data.split(/(?=[MmHhVvLlZz])/);
    let groups: any[] = [];
    let points: any[] = [];
    let currentX = 0;
    let currentY = 0;

    for (let command of commands) {
      let type = command.charAt(0);
      let args = command.slice(1).split(",").map(Number);

      switch (type) {
        case "M":
          if (points.length > 0) {
            groups.push([...points]);
            points = [];
          }
          currentX = args[0];
          currentY = args[1];
          points.push({ x: currentX, y: currentY });
          break;
        case "H":
          currentX = args[0];
          points.push({ x: currentX, y: currentY });
          break;
        case "V":
          currentY = args[0];
          points.push({ x: currentX, y: currentY });
          break;
        case "L":
          currentX = args[0];
          currentY = args[1];
          points.push({ x: currentX, y: currentY });
          break;
        case "Z":
          if (points.length > 0) {
            groups.push([...points]);
            points = [];
          }
          break;
      }
    }

    if (points.length > 0) {
      groups.push([...points]);
    }

    return groups;
  };

  return (
    <div style={{ position: "relative", width: "500px", height: "500px" }}>
      <svg
        width="1500"
        height="1500"
        style={{ position: "absolute", top: "0", left: "0" }}
      >
        {groupedPoints.map((group: any, groupIndex: number) => (
          <>
            <path
              d={
                group
                  .map(
                    (point: any, pointIndex: number) =>
                      `${pointIndex === 0 ? "M" : "L"} ${point.x} ${point.y}`
                  )
                  .join(" ") + " Z"
              }
              stroke="black"
              strokeWidth={1}
              fill="transparent"
            />
            {group.map((point: any, pointIndex: number) => (
              <circle
                key={pointIndex}
                cx={point.x}
                cy={point.y}
                r={10}
                fill="red"
                onMouseDown={handleMouseDown({
                  group: groupIndex,
                  point: pointIndex,
                })}
              />
            ))}
          </>
        ))}
      </svg>
      <button
        style={{ position: "absolute", bottom: 10 }}
        onClick={() => check()}
      >
        check
      </button>
    </div>
  );
};

export default SVGPath;
