import React from 'react';
import { Collapse, Button, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import Metadata from '../Metadata/Metadata';

const { Panel } = Collapse;

function getHeaderText(item) {
  return item.expireAt ? `expire: ${item.expireAt}` : `added: ${item.addedAt}`;
}

const editItem = (itemId, event) => {
  event.stopPropagation();
  console.log(`edit product ${itemId}`);
};

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
        <div>
          <Button 
            size="small" 
            className="larder-collapse__button" 
            onClick={(event)=>editItem(item.id, event)}
          >
              <EditOutlined />
          </Button>
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
        </div>
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