import React from 'react';
import Numbers from './Numbers';

/**
 * React component for the Status Section.
 */
const StatusSection = ({onClickNumber, numberSelected}) => {
    return (
        <section className="status">
            <Numbers
                onClickNumber={(number) => onClickNumber(number)}
                numberSelected={numberSelected}/>
        </section>
    )
}

export default StatusSection
