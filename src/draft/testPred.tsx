import React, { useEffect, useRef } from "react";
import { Stage, SVGStar, SVGPath } from "foxyjs";
import "foxyjs/style.css";

interface Props {}

const App: React.FC<Props> = () => {
  const boardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const board = boardRef.current;

    if (!board) {
      return;
    }

    const stage = new Stage(board, {
      manualGuides: true,
      smartGuides: true,
      showGrid: true,
      showRulers: true,
    });

    const star = new SVGStar({
      x: 100,
      y: 100,
      rx: 60,
      ry: 60,
      depth: 0.4,
      arms: 5,
      fill: "blue",
    });
    // const pathProperties = new SVGPath({
    //   d: 'M10 10 L20 20 H30 V10 Z',
    //   fill: 'yourFillColor',
    //   stroke: 'yourStrokeColor',
    //   strokeWidth: 'yourStrokeWidth',
    // });
    stage.add(star);
    stage.selectedElements.set(star);
    stage.toggleTool("transform-tool");
    // stage.toggleTool("pen-tool");
    console.log(stage);
    console.log(stage.currentWorkspace)
  }, []);

  return (
    <div className="App">
      <div id="board" className="w-full h-screen" ref={boardRef}></div>
    </div>
  );
};

export default App;

// import React, { useState, useEffect } from "react";
// import dummy from "@libs/images_2.json";
// import bitmaskToPath from "@pictogrammers/bitmask-to-svg";

// export default function TestPred() {
//   const [paths, setPaths] = useState([]);
//   console.log(dummy);

//   useEffect(() => {
//     const fetchData = async () => {
//       const pathsArray = [];

//       for (let i = 0; i < dummy.data.length; i++) {
//         const letterP = dummy.data[i];
//         const path = bitmaskToPath(letterP);
//         pathsArray.push(path);
//         console.log(path);

//       }

//       setPaths(pathsArray);
//     };

//     fetchData();
//   }, []);

//   function generatePaths() {
//     return paths.map((path, index) => (
//       <path key={index} d={path} fill="rgba(214, 30, 30, 0.35)" id={`controlPath${index}`} />
//     ));
//   }

//   return (
//     <div>
//       dsds
//       <svg id="figure1" width={1000} height={500}>
//         {generatePaths()}
//       </svg>
//     </div>
//   );
// }
