import React, { useEffect, useState } from 'react';
import { Modal, Form, DatePicker } from 'antd';
import moment from 'moment';

import MetadataForm from '../Metadata/MetadadaForm';

const ItemModal = ({ visible, productId, itemId, hideItemModal }) => {
  const [form] = Form.useForm();

  const emptyItemForm = {
    expirationDate: null,
    metadata: [],
  };

  const [itemForm, setItemForm] = useState({ ...emptyItemForm });

  useEffect(()=>{
    if (itemId){
      const item = {
        expirationDate: moment('2023-01-01'),
        metadata: [{metadataName:'type', metadataValue:'hazelnuts'}, {metadataName:'weight', metadataValue:'200g'}]
      };
      
      setItemForm(item);
      form.setFieldsValue(item);
    }
  },[visible]);
  
  const onSaveItem = () => {
    const addDate = moment().format();
    console.log('onSave', itemForm, productId, addDate);
    hideItemModal();
  };

  const updateFormState = (_, formValue) => {
    setItemForm({ ...formValue });
    console.log(itemForm);
  };

  return ( 
    <Modal
        title="Add item"
        visible={visible}
        maskClosable={false}
        onOk={form.submit}
        onCancel={hideItemModal}
        destroyOnClose={true}
      >
        <Form
          layout="horizontal"
          onFinish={onSaveItem}
          onValuesChange={updateFormState}
          initialValues={{ ...itemForm }}
          size="small"
          name="itemForm"
          preserve={false}
          form={form}
        >
          <Form.Item 
            label="Expiration date" 
            name="expirationDate"
          >
           <DatePicker className="full-width"/>
          </Form.Item>
          <MetadataForm />
        </Form>
      </Modal>
   );
};
 
export default ItemModal;
