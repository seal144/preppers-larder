import React, {useEffect, useState} from 'react';
import { Form, Input, InputNumber, Radio, Button } from 'antd';

import MetadataForm from '../Metadata/MetadadaForm';
import { MAX_CHAR_LONG_INPUT } from '../../variables';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const PRODUCT_TYPE = {
  COUNTABLE: 'COUNTABLE',
  UNCOUNTABLE: 'UNCOUNTABLE',
};

const MAX_QUANTITY = 1000000;

const formLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 9 }, lg: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: {span: 15 }, lg: { span: 12 } },
};

const radioFormLayout = {
  wrapperCol: { xs: { span: 24 }, sm: {offset: 9, span: 15}, lg: { offset: 6, span: 12 } }
};

const tailFormLayout = {
  wrapperCol: { xs: { span: 24 }, sm: {offset: 2, span: 22}, lg: { offset: 6, span:12 } } 
};

const Product = ({match}) => {
  
  const [productForm, setProductForm] = useState({
    name: '',
    type: PRODUCT_TYPE.COUNTABLE,
    desiredQuantity: 0,
    metadata: []
  });

  const [verticalFormToggle, setVerticalFormToggle] = useState(false);

  const [form] = Form.useForm();

  //@todo replace mocked product after db connection
  useEffect(()=>{
    if(match.params.productId){
      const product ={
        name: 'oliwki',
        type: PRODUCT_TYPE.COUNTABLE,
        desiredQuantity: 5,
        metadata: [{metadataName:'opakowanie', metadataValue:'słoik'}, {metadataName:'kolor', metadataValue:'zielone'}]
      };

      setProductForm(product);
      form.setFieldsValue(product);
    }
  },[]);

  const { width } = useWindowDimensions();

  if ( width < 576) {
    if (!verticalFormToggle) {
      setVerticalFormToggle(true);
    }
  } else if (width >= 576) {
    if (verticalFormToggle) {
      setVerticalFormToggle(false);
    }
  };

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
      <h1 className="page-title">
        {!match.params.productId ? 'ADD PRODUCT' : 'EDIT PRODUCT'}
      </h1>
      <Form
        {...formLayout}
        form = {form}
        layout = {verticalFormToggle ? "vertical" : "horizontal"}    
        onValuesChange={updateFormState}
        onFinish={handleSubmit}
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
