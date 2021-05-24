import React, {useState} from 'react';
import { Form, Input, InputNumber, Radio, Button } from 'antd';

import MetadataForm from '../Metadata/MetadadaForm';
import { MAX_CHAR_LONG_INPUT } from '../../variables';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const PRODUCT_TYPE = {
  COUNTABLE: 'COUNTABLE',
  UNCOUNTABLE: 'UNCOUNTABLE',
};

const MAX_QUANTITY = 1000000;

const startFormLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const StartRadioFormLayout = {
  wrapperCol: {offset: 6, span: 12},
};

const startTailFormLayout = {
  wrapperCol: {offset: 6, span: 12},
};

let formLayout = {...startFormLayout};

let tailFormLayout = {...startTailFormLayout};

let radioFormLayout = {...StartRadioFormLayout};

const Product = () => {

  const [productForm, setProductForm] = useState({
    name: '',
    type: PRODUCT_TYPE.COUNTABLE,
    desiredQuantity: 0,
    metadata: []
  });

  const [verticalFormToggle, setVerticalFormToggle] = useState(false);

  const { width } = useWindowDimensions();

  if(width < 600 ) {
    formLayout = {
      labelCol: {span: 24},
      wrapperCol: {span: 24},
    };

    radioFormLayout = {
      wrapperCol: {span: 24},
    };

    tailFormLayout = {
      wrapperCol: {span: 24},
    };

    if (!verticalFormToggle){
      setVerticalFormToggle(true);
    }
  } else if(width < 1000) {
    formLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 15 },
    };

    radioFormLayout = {
      wrapperCol: {offset: 9, span: 15},
    };

    tailFormLayout = {
      wrapperCol: {offset: 2, span: 22},
    };

    if (verticalFormToggle){
      setVerticalFormToggle(false);
    }
  } else {
    formLayout = {...startFormLayout};
    tailFormLayout = {...startTailFormLayout};
    radioFormLayout = {...StartRadioFormLayout};
    if (verticalFormToggle){
      setVerticalFormToggle(false);
    }
  }

  const handleSubmit = () => {
    console.log('submit', productForm);
  };

  const updateFormState = (_, formValue) => {
    setProductForm({ ...formValue });
  };

  const quantityPrecision = productForm.type === PRODUCT_TYPE.COUNTABLE ? 0 : 2;

  const maxQuantity = (_, value) => {
    if (typeof value !== 'number') {
      return Promise.reject(new Error('Must be number'));
    }

    if (value > MAX_QUANTITY) {
      return Promise.reject(new Error(`Must be less than ${MAX_QUANTITY}`));
    }
    
    return Promise.resolve();
  };

  return ( 
    <div className="product-form">
      <Form
        {...formLayout}
        layout = {verticalFormToggle ? "vertical" : "horizontal"}    
        onValuesChange={updateFormState}
        onFinish={handleSubmit}
        initialValues={{ ...productForm }}
        size="medium"
        name="productForm"
      >
        <Form.Item 
          label="Product name" 
          name="name"
          rules={[
            { required: true, message: 'Product name is required' },
            { max: MAX_CHAR_LONG_INPUT, message: `Product name can have maximum ${MAX_CHAR_LONG_INPUT} characters` }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="type" {...radioFormLayout}>
          <Radio.Group>
            <Radio value={PRODUCT_TYPE.COUNTABLE}>countable</Radio>
            <Radio value={PRODUCT_TYPE.UNCOUNTABLE}>uncountable</Radio>
          </Radio.Group>
        </Form.Item>
        
        <Form.Item 
          label="Desired quantity" 
          name="desiredQuantity"
          rules={[
            { required: true, message: 'Quantity is required' },
            { validator: maxQuantity }
          ]}
        >
          <InputNumber 
            min={0} precision={quantityPrecision} 
            className='wide-element'
          />
        </Form.Item>
        
        <MetadataForm layout={tailFormLayout}/>
        
        <Form.Item {...tailFormLayout}>
          <Button type="primary" htmlType="submit" className="wide-element">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
 
export default Product;
