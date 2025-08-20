import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props: any) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    border: isOver ? '.25rem dashed #808080': '.0625rem solid black', 
    borderRadius: '1rem',
    padding: isOver? '.40625rem': '.5rem', 
    margin: isOver? '.40625rem': '.5rem'
  };
  
  
  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}