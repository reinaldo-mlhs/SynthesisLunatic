import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

const Inventory = ({ id, items, children }) => {

    const { setNodeRef } = useDroppable({id});

    return (
        <SortableContext items={items} strategy={rectSortingStrategy}>
            <div
                ref={setNodeRef}
                className="inventory"
                id={id}
            >
                {children}
            </div>
        </SortableContext>
    )
}

export default Inventory;