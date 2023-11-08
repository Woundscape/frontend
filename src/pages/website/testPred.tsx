import React, { useState, useEffect } from "react";
import dummy from "@libs/images_2.json";
import bitmaskToPath from "@pictogrammers/bitmask-to-svg";

export default function TestPred() {
  const [paths, setPaths] = useState([]);
  console.log(dummy);
  
  useEffect(() => {
    const fetchData = async () => {
      const pathsArray = [];

      for (let i = 0; i < dummy.data.length; i++) {
        const letterP = dummy.data[i];
        const path = bitmaskToPath(letterP);
        pathsArray.push(path);
        console.log(path);
        
      }

      setPaths(pathsArray);
    };

    fetchData();
  }, []);

  function generatePaths() {
    return paths.map((path, index) => (
      <path key={index} d={path} fill="rgba(214, 30, 30, 0.35)" id={`controlPath${index}`} />
    ));
  }

  return (
    <div>
      dsds
      <svg id="figure1" width={1000} height={500}>
        {generatePaths()}
      </svg>
    </div>
  );
}
