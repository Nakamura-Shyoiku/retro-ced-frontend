import React from 'react';
import FilterImg from '../../assets/Filter@2x.png';

export default ({ onClick, className }) => {
  return (
    <button className={`drawer-button ${className}`} onClick={onClick}>
      <img src={FilterImg} />
      <style jsx>
        {`
          .drawer-button {
              height: 25px;
              width: 30px;
              padding: 0;
              margin: 0;
              box-sizing: border-box;
              background: none;
              border: none;
              text-decoration: none;
              position: absolute;
              top: 30px;
              right: 35px;
              z-index: 1;
            }
            .drawer-button img{
              height: 25px;
              width: 30px;
            }
            .drawer-button .bottom{
              margin-top: 5px;
          }
        `}
      </style>
    </button>
  );
}