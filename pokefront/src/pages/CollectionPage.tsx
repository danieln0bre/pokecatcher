import React from 'react';
import './Global.css';
import Navbar from '../components/Navbar';
import Collection from '../components/Collection';
import GlobalFooter from '../components/GlobalFooter';

const CollectionPage: React.FC = () => {
  return (
    <body>
      <div className='front-page'>
          <Navbar/>
          <Collection/>
          <GlobalFooter/>
      </div>
    </body>
  );
}

export default CollectionPage;