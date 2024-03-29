import React, { useState, useEffect } from 'react';
import { Collapse, Button } from 'antd';
import { DeleteOutlined, PlusOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import './Larder.scss';
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

  const removeProduct = (productId, event) => {
    event.stopPropagation();
    console.log(`removed product ${productId}`);
  };

  const addItem = (productId, event) => {
    event.stopPropagation();
    setItemModalVisible(prevState => !prevState);
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
                  <PlusCircleOutlined onClick={(event)=>addItem(product.id, event)} />
                  <DeleteOutlined onClick={(event) =>removeProduct(product.id, event)}/>
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
        <Button className="add-product-button" type="primary" shape="circle">
          <PlusOutlined height="4rem" className="add-product-button__icon"/>
        </Button>
      </Link>

      <ItemModal visible={itemModalVisible} toggleVisibility={toggleItemModalVisibility}/>
    </div>
  );
};

export default Larder;
