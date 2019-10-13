import React, {MouseEventHandler} from 'react';
import "./index.css";

interface Props {
    children?: React.ReactNode;
    onClick: MouseEventHandler<HTMLDivElement>;
}

const Bus: React.FC<Props> = ({children, onClick}) => {
    return (
        <div className="bus"
             onClick={onClick}>
            {children}
        </div>
    )
};

export default Bus;
