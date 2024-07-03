import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import earth from "../assets/sprites/earth.jpg";
import water from "../assets/sprites/water.jpg";
import lava from "../assets/sprites/lava.jpg";
import stone from "../assets/sprites/stone.jpg";
import fire from "../assets/sprites/fire.jpg";
import metal from "../assets/sprites/metal.jpg";
import sand from "../assets/sprites/sand.jpg";
import wind from "../assets/sprites/wind.jpg";
import cloud from "../assets/sprites/cloud.jpg";

const imageMappings = {
    "fire": fire,
    "earth": earth,
    "water": water,
    "lava": lava,
    "stone": stone,
    "wind": wind,
    "metal": metal,
    "sand": sand,
    "cloud": cloud
}

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
            {
                imageMappings?.[name] ?
                    <div style={{ position: "relative" }}>
                        <img src={imageMappings[name]} width={64} height={64} />
                        <div 
                            style={{position: "absolute", top: 50, left: 0, fontSize: "10px"}}
                        >
                            {name}
                        </div>
                    </div>
                    :
                    name
            }
        </div>
    )
}

export default Card;