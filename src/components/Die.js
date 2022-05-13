import React from 'react';

export default function Die(props) {
    const styles = {
        backgroundColor: (props.isHeld ?
            '#59e391' : 'rgba(232, 224, 255, 1)'),
    }
    return (
        <div
            className='die-card'
            style={styles}
            onClick={props.toggle}
        >
            {props.value}
        </div>
    )
}