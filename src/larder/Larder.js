import React, { useState, useEffect } from 'react';
import { Collapse, Button, Tooltip, Popconfirm, Dropdown, Menu } from 'antd';
import { DeleteOutlined, PlusOutlined, PlusCircleOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import Metadata from './Metadata/Metadata';
import ItemsList from './ItemsList/ItemsList';
import ItemModal from './ItemModal/ItemModal';
import useWindowDimensions from '../hooks/useWindowDimensions';
import {SCREEN_SM} from '../variables';

const { Panel } = Collapse;

//@todo add info in collapse
const Larder = () => {

  const [ productsMock, setProductsMock ] = useState([]);
  const [ itemModalVisible, setItemModalVisible ] = useState(false);

  const { width } = useWindowDimensions();

  useEffect(()=>{ fetchData(); },[]);

  const fetchData= async () => {
    try {
      const fetchResponse = await fetch('data/productsMock.json');

      if (!fetchResponse.ok) {
        throw Error(fetchResponse.status);
      }

      setProductsMock( await fetchResponse.json());
    } catch(err) {
      console.error(err);
    }
  };

  const addItem = (productId, event) => {
    event.stopPropagation();
    setItemModalVisible(prevState => !prevState);
  };

  const editProduct = (productId, event) => {
    event.stopPropagation();
    console.log(`edit product ${productId}`);
  };

  const removeProduct = (productId, event) => {
    event.stopPropagation();
    console.log(`removed product ${productId}`);
  };

  const toggleItemModalVisibility = () => {
    setItemModalVisible(prevState => !prevState);
  };

  const getHeaderText = (product) => {
    return (
      <span>
        <span className='bold'>{product.name}&nbsp;</span>
        <span>{product.type ==='COUNTABLE' ? product.items.length : product.quantity}/{product.desiredQuantity}</span>
      </span>
    );
  };

  return (
    <div>
      <h1>YOUR LARDER</h1>
      <Collapse>
        {
          productsMock.map(product => {
            const extraScreenLarge = (
              <div>
                <Button 
                  size="small" 
                  className="larder-collapse__button" 
                  onClick={(event)=>addItem(product.id, event)}
                >
                    <PlusCircleOutlined />
                </Button>
                <Button 
                  size="small" 
                  className="larder-collapse__button" 
                  onClick={(event)=>editProduct(product.id, event)}
                >
                    <EditOutlined />
                </Button>
                <Popconfirm
                  title="Delete?"
                  onClick={(event)=>{event.stopPropagation();}}
                  onConfirm={(event) =>removeProduct(product.id, event)}
                  onCancel={(event)=>{event.stopPropagation();}}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button 
                    size="small" 
                    className="larder-collapse__button" 
                  >
                    <DeleteOutlined/>
                    </Button>
                </Popconfirm>
              </div>
            );

            const dropdownMenu = (
              <Menu>
                <Menu.Item icon={<PlusCircleOutlined />}>
                  <Button 
                    type="text" 
                    onClick={(event)=>addItem(product.id, event)}
                  >
                    Add
                  </Button>
                </Menu.Item>
                <Menu.Item icon={<EditOutlined />}>
                  <Button 
                    type="text" 
                    onClick={(event)=>editProduct(product.id, event)}
                  >
                    Edit
                  </Button>
                </Menu.Item>
                <Menu.Item icon={<DeleteOutlined/>}>
                  <Button 
                    type="text" 
                    onClick={(event) =>removeProduct(product.id, event)}
                  >
                    Remove
                  </Button>
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
                key={product.id} 
                header={getHeaderText(product)} 
                extra={ width<SCREEN_SM ? extraScreenSmall : extraScreenLarge}
              >
                <Metadata metadata={product.metadata} />
                {product.items && product.items.length ? <ItemsList product={product} /> : null}
              </Panel>
            );
          })
        }
      </Collapse>

      <Link to="/larder/product">
        <Tooltip title="Add product">
          <Button className="add-product-button" type="primary" shape="circle">
            <PlusOutlined height="4rem" className="add-product-button__icon"/>
          </Button>
        </Tooltip>
      </Link>

      <ItemModal visible={itemModalVisible} toggleVisibility={toggleItemModalVisibility}/>
    </div>
  );
};

export default Larder;
