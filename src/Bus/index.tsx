import React, {DragEventHandler} from 'react';
import "./index.css";

interface Props {
    children?: React.ReactNode;
    onDrop: DragEventHandler<HTMLDivElement>;
}

const Bus: React.FC<Props> = ({children, onDrop}) => {
    return (
        <div className="bus"
             onDrop={onDrop}
             onDragOver={event => event.preventDefault()}>
            {children}
        </div>
    )
};

export default Bus;
