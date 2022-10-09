import React, { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Droppable from "./components/Droppable";
import Draggable from "./components/Draggable";

import './App.scss'
import useDragContext from "./hooks/useDragContext";

function App() {
  const [items, setItems] = useState({
    "Todo": ["Foo", "Bar", "Baz"],
    "API": []
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const { handleDragOver, handleDragEnd } = useDragContext(setItems)

  return (
    <div className="App">
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        {Object.keys(items).map((group) => (
          <Droppable id={group} items={items[group]} key={group}>
            {
              items[group].map(item => (
                <Draggable key={item} id={item}></Draggable>
              ))
            }
          </Droppable>
        ))}
      </DndContext>
    </div>
  );
}

export default App;
