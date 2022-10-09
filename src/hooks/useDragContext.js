import { arrayMove, insertAtIndex, removeAtIndex, moveBetweenContainers } from "../utils/array";

function getActiveOverContainerIndex ({ active, over }) {
  const activeContainer = active.data.current.sortable.containerId;
  const overContainer = over.data.current?.sortable.containerId || over.id;
  const activeIndex = active.data.current.sortable.index;
  const overIndex = over.data.current?.sortable.index || 0;

  return {
    activeContainer,
    overContainer,
    activeIndex,
    overIndex,
  }
}

export default function (setItems) {
  const handleDragOver = ({ over, active }) => {
    const overId = over?.id;

    if (!overId || !(over.data.current?.sortable.containerId || over.id)) {
      return;
    }

    const { activeContainer, activeIndex, overContainer, overIndex } = getActiveOverContainerIndex({ active, over })

    if (activeContainer === overContainer) {
      return
    }

    setItems((items) => {
      return moveBetweenContainers(
        items,
        activeContainer,
        activeIndex,
        overContainer,
        overIndex,
        active.id
      );
    });
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      return;
    }

    if (active.id === over.id) {
      return
    }

    const { activeContainer, activeIndex, overContainer, overIndex } = getActiveOverContainerIndex({ active, over })

    setItems((items) => {
      let newItems;
      if (activeContainer === overContainer) {
        newItems = {
          ...items,
          [overContainer]: arrayMove(
            items[overContainer],
            activeIndex,
            overIndex
          )
        };
      } else {
        newItems = moveBetweenContainers(
          items,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          active.id
        );
      }

      return newItems;
    });
  };

  return {
    handleDragOver,
    handleDragEnd
  }
}