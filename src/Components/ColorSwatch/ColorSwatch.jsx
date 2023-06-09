import React, { Fragment } from 'react';

const ColorSwatch = ({ imageColors }) => {
    return (
        <Fragment className="flex flex-column">
            <input className="color w-50 center" type="color" name="color2" value={imageColors} />
            <h1 className="f5">Dominant color: {imageColors}</h1>
        </Fragment>
    )
}

export default ColorSwatch;