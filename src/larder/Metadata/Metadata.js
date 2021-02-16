import React from 'react';

import './Metadata.scss';

const Metadata = function(props) {

  const details = Object.keys(props.metadata)
    .map((metadataKey, index) => (
      <span className="metadata-item" key={index}>
        <span className="bold">{metadataKey}:&nbsp;</span>
        <span>{props.metadata[metadataKey]}&nbsp;</span>
      </span>
    ));
   
  return(
    <>
      { details.length ? <div className="metadata-container">{details}</div> : null }
    </>
  );
};

export default Metadata;
