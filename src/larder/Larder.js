import React from 'react';
import { Collapse } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import './Larder.scss';
import Metadata from './Metadata/Metadata';
import ItemsList from './ItemsList/ItemsList';

const { Panel } = Collapse;

class Larder extends React.Component {
  state = {
    productsMock: []
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
  
  render() {
    // @todo smaller padding on Panel
    return (
      <div>
        <h1>YOUR LARDER</h1>
        <Collapse>
          {
            this.state.productsMock.map(product => (
              <Panel 
                key={product.id} 
                header={product.name} 
                extra={<DeleteOutlined onClick={(event) => this.removeProduct(product.id, event)}/>}
              >
                <Metadata metadata={product.metadata} />
                {product.items && product.items.length ? <ItemsList product={product} /> : null}
              </Panel>
            ))
          }
        </Collapse>
      </div>
    );
  };
};

export default Larder;
