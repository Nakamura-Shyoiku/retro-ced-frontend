import React from 'react';

import './spinner.css';

const Spinner = () => {

    return (
        <div className="spinner-container">
            <div class="sk-chase">
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            </div>
        </div>
    )
}

export default Spinner;