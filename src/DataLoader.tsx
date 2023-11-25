import App from "./App.tsx";
import { useEffect, useState } from "react";
import { RaceSnapshot } from "./types.ts";
import { convertTimeStringToMillis } from "./utils.ts";

const loadData = async () => {
   const response = await fetch("/data/landskampen.json.gz");
   return await response.json();
};

const DataLoader = () => {
   const [data, setData] = useState<RaceSnapshot[]>([]);

   useEffect(() => {
      let hasUnmounted = false;
      loadData().then((fileContents: RaceSnapshot[]) => {
         const transformedContent = fileContents.map((snapshot) => ({
            ...snapshot,
            timeMillis: convertTimeStringToMillis(snapshot.time)
         }));

         if (!hasUnmounted) {
            console.log("Data loaded:", transformedContent);
            setData(transformedContent);
         }
      });
      return () => {
         hasUnmounted = true;
      };
   }, []);

   if (data.length === 0) {
      return <div>Loading...</div>;
   }

   return <App data={data} />;
};

export default DataLoader;
