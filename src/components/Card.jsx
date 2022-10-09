import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

const Card = ({ name, extraClass = "", ...props }) => {

    const sortable = useSortable({ id: name });

    const {
        attributes,
        listeners,
        isDragging,
        setNodeRef,
        transform,
        transition,
    } = sortable;

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        fontSize: name.length > 5 ? name.length > 8 ? "9px" : "12px" : "inherit"
    };

    
    return (
        <div
            className={`card${extraClass}`}
            style={style}
            ref={setNodeRef}
            {...props}
            {...listeners}
            {...attributes}
        >
            {name}
        </div>
    )
}

export default Card;