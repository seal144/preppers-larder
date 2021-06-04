import React from 'react';
import { Collapse, Button, Popconfirm, Menu, Dropdown } from 'antd';
import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';

import Metadata from '../Metadata/Metadata';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import {SCREEN_SM} from '../../variables';

const { Panel } = Collapse;

const ItemsList = (props) => {
  const {width} = useWindowDimensions();

  function getHeaderText(item) {
    return item.expireAt ? `expire: ${item.expireAt}` : `added: ${item.addedAt}`;
  }
  
  function editItem(itemId, event) {
    event.stopPropagation();
    console.log(`edit product ${itemId}`);
  };
  
  function removeItem(itemId, event) {
    event.stopPropagation();
    console.log(`removed item ${itemId}`);
  }

  const items = props.product.items.map(item =>{
    const extraScreenLarge = (
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
    );

    const dropdownMenu = (
      <Menu>
        <Menu.Item>
          <Button 
            type="text" 
            onClick={(event)=>editItem(item.id, event)}
          >
            <EditOutlined />
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Popconfirm
            title="Delete?"
            onClick={(event)=>{event.stopPropagation();}}
            onConfirm={(event) => removeItem(item.id, event)}
            onCancel={(event)=>{event.stopPropagation();}}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              type="text" 
            >
              <DeleteOutlined/>
            </Button>
          </Popconfirm>
        </Menu.Item>
      </Menu>
    );

    const extraScreenSmall = (
      <Dropdown overlay={dropdownMenu} placement="bottomRight">
        <Button 
          className="larder-collapse__button"
          onClick={(event)=>{event.stopPropagation();}}
        >
          <EllipsisOutlined />
        </Button>
      </Dropdown>
    );
     
    return(
    <Panel 
      key={item.id} 
      header={getHeaderText(item)}
      extra={ width<SCREEN_SM ? extraScreenSmall : extraScreenLarge }
    >
      <Metadata metadata={item.metadata} />
    </Panel>
    );
  });

  return ( 
    <Collapse>
      {items}
    </Collapse>
   );
};
 
export default ItemsList;