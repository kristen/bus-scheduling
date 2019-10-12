import React from 'react';
import "./index.css";

interface Props {
    children?: React.ReactNode;
}

const Bus: React.FC<Props> = ({children}) => {
    return (
        <div className="bus">
            {children}
        </div>
    )
};

export default Bus;
