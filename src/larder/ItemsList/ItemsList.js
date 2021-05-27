import React from 'react';
import { Collapse, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import Metadata from '../Metadata/Metadata';

const { Panel } = Collapse;

function getHeaderText(item) {
  return item.expireAt ? `expire: ${item.expireAt}` : `added: ${item.addedAt}`;
}

function removeItem(itemId, event) {
  event.stopPropagation();
  console.log(`removed item ${itemId}`);
}

const ItemsList = (props) => {
  const items = props.product.items.map(item =>(
    <Panel 
      key={item.id} 
      header={getHeaderText(item)}
      extra={
        <Button 
          size="small" 
          className="larder-collapse__button" 
          onClick={(event) => removeItem(item.id, event)}
        >
          <DeleteOutlined />
        </Button>
      }
    >
      <Metadata metadata={item.metadata} />
    </Panel>
  ));

  return ( 
    <Collapse>
      {items}
    </Collapse>
   );
};
 
export default ItemsList;