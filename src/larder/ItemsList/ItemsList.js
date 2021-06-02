import React from 'react';
import { Collapse, Button, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import Metadata from '../Metadata/Metadata';

const { Panel } = Collapse;

function getHeaderText(item) {
  return item.expireAt ? `expire: ${item.expireAt}` : `added: ${item.addedAt}`;
}

function removeItem(itemId, event) {
  event.stopPropagation();
  message.success('removed item');
  console.log(`removed item ${itemId}`);
}

const ItemsList = (props) => {
  const items = props.product.items.map(item =>(
    <Panel 
      key={item.id} 
      header={getHeaderText(item)}
      extra={
        <Popconfirm
          title="Delete?"
          onClick={(event)=>{event.stopPropagation();}}
          onConfirm={(event) => removeItem(item.id, event)}
          onCancel={(event)=>{event.stopPropagation();}}
          okText="Yes"
          cancelText="No"
        >
          <Button 
            size="small" 
            className="larder-collapse__button" 
          >
            <DeleteOutlined />
          </Button>
        </Popconfirm>
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