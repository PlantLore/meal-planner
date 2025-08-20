import { CSSProperties } from 'react';
import { useDraggable } from '@dnd-kit/core';

export function Draggable(props: any) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: props.id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(10deg)`,
    zIndex: isDragging ? 1000 : 'auto',
    position: 'relative'
  } as CSSProperties : undefined;


  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        {props.children}
    </div>
  );
}