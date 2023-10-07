import React, { useState } from 'react';
import Pokemon from './Pokemon';

const Collection: React.FC = () => {

  return (
    <div className='main-div'>
        <div className='collection-panel'>
          <h3>Your collection!</h3>
          <div className='collection-div'>
            <Pokemon/>
            <Pokemon/>
            <Pokemon/>
            <Pokemon/>
            <Pokemon/>
            <Pokemon/>
            <Pokemon/>
            <Pokemon/>
            <Pokemon/>
            <Pokemon/>
            <Pokemon/>
          </div>
        </div>
    </div>
  );
};

export default Collection;