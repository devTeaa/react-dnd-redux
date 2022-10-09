import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import './Draggable.scss'

const Draggable = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: props.id });

  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isDragging ? 'grabbing' : 'grab'
  };

  return (
    <div className="draggable-container" style={itemStyle} ref={setNodeRef} {...attributes} {...listeners}>
      {props.id}
    </div>
  );
};

export default Draggable;
