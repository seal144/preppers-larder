import React, { useState, useEffect } from 'react';
import { Collapse, Button, Tooltip, Popconfirm, Dropdown, Menu } from 'antd';
import { DeleteOutlined, PlusOutlined, PlusCircleOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';

import Metadata from './Metadata/Metadata';
import ItemsList from './ItemsList/ItemsList';
import ItemModal from './ItemModal/ItemModal';
import useWindowDimensions from '../hooks/useWindowDimensions';
import {SCREEN_SM} from '../variables';

const { Panel } = Collapse;

//@todo add info in collapse
const Larder = () => {
  const history = useHistory();

  const [ productsMock, setProductsMock ] = useState([]);
  const [ itemModalForm, setItemModalForm ] = useState({
    visible: false,
    productId: null,
    itemId: null
  });

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
    setItemModalForm({
      visible: true,
      productId,
      itemId: null
    });
  };

  const editItem = (itemId, productId, event) => {
    event.stopPropagation();
    setItemModalForm({
      visible: true,
      productId,
      itemId
    });
  };

  const hideItemModal = () => {
    setItemModalForm({
      visible: false,
      productId: null,
      itemId: null
    });
  };

  const editProduct = (productId, event) => {
    event.stopPropagation();
    history.push(`/larder/product/${productId}`);
  };

  const removeProduct = (productId, event) => {
    event.stopPropagation();
    console.log(`removed product ${productId}`);
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
    <div className="larder-container">
      <h1 className="page-title">YOUR LARDER</h1>
      <Collapse className="larder-collapse">
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
                <Menu.Item >
                  <Button 
                    type="text" 
                    onClick={(event)=>addItem(product.id, event)}
                  >
                    <PlusCircleOutlined />
                  </Button>
                </Menu.Item>
                <Menu.Item>
                  <Button 
                    type="text" 
                    onClick={(event)=>editProduct(product.id, event)}
                  >
                    <EditOutlined />
                  </Button>
                </Menu.Item>
                <Menu.Item>
                  <Popconfirm
                    title="Delete?"
                    onClick={(event)=>{event.stopPropagation();}}
                    onConfirm={(event) =>removeProduct(product.id, event)}
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
                key={product.id} 
                header={getHeaderText(product)} 
                extra={ width<SCREEN_SM ? extraScreenSmall : extraScreenLarge }
              >
                <Metadata metadata={product.metadata} />
                {product.items && product.items.length ? 
                  <ItemsList 
                    product={product} 
                    editItem = {editItem}
                  /> : 
                  null}
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

      <ItemModal 
        visible={itemModalForm.visible}
        productId={itemModalForm.productId}
        itemId={itemModalForm.itemId}
        hideItemModal={hideItemModal}
      />
    </div>
  );
};

export default Larder;


