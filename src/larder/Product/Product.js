import React from 'react';
import { Form, Input, InputNumber, Radio, Button } from 'antd';

import MetadataForm from '../Metadata/MetadadaForm';
import './Product.scss';

const PRODUCT_TYPE = {
  COUNTABLE: 'COUNTABLE',
  UNCOUNTABLE: 'UNCOUNTABLE',
};

const MAX_QUANTITY = 1000000;

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
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onValuesChange={updateFormState}
        onFinish={handleSubmit}
        initialValues={{ ...productForm }}
        size="large"
        name="productForm"
      >
        <Form.Item 
          label="Product name" 
          name="name"
          rules={[
            { required: true, message: 'Product name is required' },
            { max: 50, message: 'Product name can have maximum 50 characters' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="type">
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
          <InputNumber min={0} precision={quantityPrecision} />
        </Form.Item>
        
        <MetadataForm />
        
        <Button type="primary" htmlType="submit">Save</Button>
      </Form>
    </div>
  );
};
 
export default Product;
