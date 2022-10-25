import React, { useState, useRef, useEffect, DragEvent } from "react";

import "./App.css";
import Card from "./components/Card";
import { ListConfig } from "./configs";
import { Coordinates, ListItem } from "./types";
import isObjEqual from "./utils/objCompare";

function App() {
  const dragItem: any = useRef();
  const dragOverItem: any = useRef();
  const [isUpdating, setIsUpdating] = useState(false);

  const [list, setList] = useState<Array<ListItem>>(
    JSON.parse(localStorage.getItem("Json")!) || ListConfig
  );

  const dragStart = (e: DragEvent<HTMLDivElement>, position: any) => {
    setIsUpdating(true);
    dragItem.current = position;
  };

  const dragEnter = (e: DragEvent<HTMLDivElement>, position: any) => {
    dragOverItem.current = position;
  };

  const drop = () => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
    setIsUpdating(false);
  };

  const handleChangesize = (newdata: Coordinates, index: number) => {
    const newList = [...list];
    newList[index].x = newdata.w;
    newList[index].y = newdata.h;
    setList(newList);
  };

  useEffect(() => {
    !isUpdating && localStorage.setItem("Json", JSON.stringify(list));
  }, [list, isUpdating]);

  useEffect(() => {
    setList(JSON.parse(localStorage.getItem("Json")!));

    console.log(
      isObjEqual(
        { test: 1, a: { a: 2, b: { h: 4, l: 7 } } },
        { a: { b: { l: 7, h: 4 }, a: 2 }, test: 1 }
      )
    );
  }, []);

  return (
    <div className="App">
      {list &&
        list.map((item, index) => (
          <Card
            key={index}
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={drop}
            item={item}
            setCoordinates={(data) => handleChangesize(data, index)}
            setIsUpdating={setIsUpdating}
          />
        ))}
    </div>
  );
}

export default App;
