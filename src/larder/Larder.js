import React, { useState, useEffect } from 'react';
import { Collapse, Button, Tooltip, Popconfirm, message } from 'antd';
import { DeleteOutlined, PlusOutlined, PlusCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import Metadata from './Metadata/Metadata';
import ItemsList from './ItemsList/ItemsList';
import ItemModal from './ItemModal/ItemModal';

const { Panel } = Collapse;

//@todo add info in collapse
const Larder = () => {

  const [ productsMock, setProductsMock ] = useState([]);
  const [ itemModalVisible, setItemModalVisible ] = useState(false);

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

  const editItem = (productId, event) => {
    event.stopPropagation();
    console.log(`edit product ${productId}`);
  };

  const removeProduct = (productId, productName, event) => {
    event.stopPropagation();
    message.success(`Removed product: ${productName}`);
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
          productsMock.map(product => (
            <Panel 
              key={product.id} 
              header={getHeaderText(product)} 
              extra={
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
                    onClick={(event)=>editItem(product.id, event)}
                  >
                      <EditOutlined />
                  </Button>
                  <Popconfirm
                    title="Delete?"
                    onClick={(event)=>{event.stopPropagation();}}
                    onConfirm={(event) =>removeProduct(product.id, product.name, event)}
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
              }
            >
              <Metadata metadata={product.metadata} />
              {product.items && product.items.length ? <ItemsList product={product} /> : null}
            </Panel>
          ))
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
