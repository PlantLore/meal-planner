import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props: any) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    border: isOver ? '.25rem dashed white': '0rem solid black', 
    borderRadius: '1rem',
    padding: isOver? '.25rem': '.375rem', 
    margin: isOver? '0': '.125rem'
  };
  
  
  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}