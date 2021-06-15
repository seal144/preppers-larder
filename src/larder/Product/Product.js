import React from 'react';
import { Form, Input, InputNumber, Radio, Button } from 'antd';

import MetadataForm from '../Metadata/MetadadaForm';
import { MAX_CHAR_LONG_INPUT } from '../../variables';

const PRODUCT_TYPE = {
  COUNTABLE: 'COUNTABLE',
  UNCOUNTABLE: 'UNCOUNTABLE',
};

const MAX_QUANTITY = 1000000;

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const tailFormLayout = {
  wrapperCol: { offset: 6, span: 12 },
};

const Product = () => {

  const [productForm, setProductForm] = React.useState({
    name: '',
    type: PRODUCT_TYPE.COUNTABLE,
    desiredQuantity: 0,
    metadata: []
  });

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
        layout="horizontal"
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

        <Form.Item name="type" {...tailFormLayout}>
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
