import React from 'react';
import { Collapse, Button } from 'antd';
import { DeleteOutlined, PlusOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import './Larder.scss';
import Metadata from './Metadata/Metadata';
import ItemsList from './ItemsList/ItemsList';
import ItemModal from './ItemModal/ItemModal';

const { Panel } = Collapse;

//@todo add info in collapse
class Larder extends React.Component {
  state = {
    productsMock: [],
    itemModalVisible: false,
  }

  async componentDidMount() {
    try {
      const fetchResponse = await fetch('data/productsMock.json');

      if (!fetchResponse.ok) {
        throw Error(fetchResponse.status);
      }

      this.setState({ productsMock: await fetchResponse.json() });
    } catch(err) {
      console.error(err);
    }
  }

  removeProduct = (productId, event) => {
    event.stopPropagation();
    console.log(`removed product ${productId}`);
  }

  addItem = (productId, event) => {
    event.stopPropagation();
    this.toggleItemModalVisibility();
  }

  toggleItemModalVisibility = () => {
    this.setState({ itemModalVisible: !this.state.itemModalVisible });
  }

  getHeaderText(product) {
    return (
      <span>
        <span className='bold'>{product.name}&nbsp;</span>
        <span>{product.type ==='COUNTABLE' ? product.items.length : product.quantity}/{product.desiredQuantity}</span>
      </span>
    );
  };
  
  render() {
    return (
      <div>
        <h1>YOUR LARDER</h1>
        <Collapse>
          {
            this.state.productsMock.map(product => (
              <Panel 
                key={product.id} 
                header={this.getHeaderText(product)} 
                extra={
                  <div>
                    <PlusCircleOutlined onClick={(event)=>this.addItem(product.id, event)} />
                    <DeleteOutlined onClick={(event) => this.removeProduct(product.id, event)}/>
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

        <ItemModal visible={this.state.itemModalVisible} toggleVisibility={this.toggleItemModalVisibility}/>
      </div>
    );
  };
};

export default Larder;
