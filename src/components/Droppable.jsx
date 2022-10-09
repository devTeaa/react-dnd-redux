import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import React from "react";

import './Droppable.scss'

const Droppable = ({ id, items, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <section ref={setNodeRef} className='droppable-container'>
        {id}
        <div className="droppable-box">
          {children}
        </div>
      </section>
    </SortableContext>
  );
};

export default Droppable;
