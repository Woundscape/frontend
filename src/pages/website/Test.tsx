import { useState, useRef, useEffect } from "react";
// import mockData from "./output.json"
import bitmaskToPath from "@pictogrammers/bitmask-to-svg";
// import mockData from "../../assets/output.json";

const SVGPath = () => {
  const activePointRef: any = useRef(null);
  const [groupedPoints, setGroupedPoints] : any = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // console.log(mockData.data[0][0])
        // const width = mockData.data[0].length;
        // const height = mockData.data.length;
        const path = bitmaskToPath([
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1,
            1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1,
            1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1,
            1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
        ]);
        console.log("path:", path);

        // Example: Convert path to points
        const pathDataSVG =
          "M26,14H27V12H25V13H26ZM27,17V39L26,16H25V14H20V16H21L20,40L17,17V16H18V14H14L8,32L11,15V5H12V4H13V5H26L68,11V38L24,7H13V12H24V8H26V11H28V12H29V13L51,27L28,15H27Z";
        const points : any = pathToPoints(pathDataSVG);

        // Update the state with the processed data
        setGroupedPoints(points);
      } catch (error) {
        console.error("Error reading JSON file:", error);
      }
    }

    // Call the async function
    fetchData();
  }, []);

  const handleMouseDown = (index: any) => (event: any) => {
    activePointRef.current = index;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: any) => {
    if (activePointRef.current !== null) {
      const updatedGroupedPoints: any = [...groupedPoints];
      updatedGroupedPoints[activePointRef.current.group][
        activePointRef.current.point
      ] = {
        x: event.clientX,
        y: event.clientY,
      };
      setGroupedPoints(updatedGroupedPoints);
    }
  };

  function pointsToPath(groups: any) {
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
  }

  const handleMouseUp = () => {
    activePointRef.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  function check() {
    console.log(pointsToPath(groupedPoints));
  }

  function pathToPoints(data: any) {
    const commands = data.split(/(?=[MmHhVvLlZz])/);
    let groups = [];
    let points = [];
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
  }

  return (
    <div style={{ position: "relative", width: "500px", height: "500px" }}>
      <svg
        width="1500"
        height="1500"
        style={{ position: "absolute", top: "0", left: "0" }}
      >
        {groupedPoints.map((group : any, groupIndex : Number) => (
          <>
            <path
              d={
                group
                  .map(
                    (point :any, pointIndex : any) =>
                      `${pointIndex === 0 ? "M" : "L"} ${point.x} ${point.y}`
                  )
                  .join(" ") + " Z"
              }
              stroke="black"
              strokeWidth={0.5}
              fill="transparent"
            />
            {group.map((point: any, pointIndex: any) => (
              <circle
                key={pointIndex}
                cx={point.x}
                cy={point.y}
                r={0.5}
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
