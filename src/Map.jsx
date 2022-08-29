import React, { useEffect } from "react";
import "./App.css";
import dungeoneer from "dungeoneer";

const generateDungeon = () => {
  const d = dungeoneer.build({
    width: 25,
    height: 25,
  });
  console.log("d is", d);
  return d;
};

const d = generateDungeon();
const dTiles2DArray = d.tiles;
// dTiles2DArray is a 2D array of tiles in X, Y
// iterate through the 2D array and find the first entry where type === 'floor
const entryTile = dTiles2DArray
  .find((row) => row.find((tile) => tile.type === "floor"))
  .find((tile) => tile.type === "floor");

const Map = ({ data, setData }) => {
  console.log("entryTile is", entryTile);
  const [currentPos, setCurrentPos] = React.useState(entryTile);
  const [dungeon, setDungeon] = React.useState(d);

  // listen for W A S D keypresses
  // if keypress is W, console.log('W'), and so on
  useEffect(() => {
    const el = (e) => {
      switch (e.key) {
        case "w":
          if (
            currentPos.neighbours.n &&
            currentPos.neighbours.n.type !== "wall"
          )
            setCurrentPos(currentPos.neighbours.n);
          else {
            console.log("no tile above");
          }
          break;
        case "a":
          if (
            currentPos.neighbours.w &&
            currentPos.neighbours.w.type !== "wall"
          )
            setCurrentPos(currentPos.neighbours.w);
          break;
        case "s":
          if (
            currentPos.neighbours.s &&
            currentPos.neighbours.s.type !== "wall"
          )
            setCurrentPos(currentPos.neighbours.s);
          break;
        case "d":
          if (
            currentPos.neighbours.e &&
            currentPos.neighbours.e.type !== "wall"
          )
            setCurrentPos(currentPos.neighbours.e);
          break;
      }
    };
    window.addEventListener("keydown", el);
    // remove the event listener when this component unmounts
    return () => window.removeEventListener("keydown", el);
  }, [currentPos]);

  // render the map
  return (
    <div className="map">
      {dungeon.tiles.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="row">
            {row.map((tile, tileIndex) => {
              return (
                <div
                  key={tileIndex}
                  className={
                    "tile " + (currentPos === tile ? "current" : tile.type)
                  }
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Map;
