import React from 'react';
import { Modal, Form, DatePicker } from 'antd';

import MetadataForm from '../Metadata/MetadadaForm';

const ItemModal = ({ visible, toggleVisibility }) => {
  const [form] = Form.useForm();

  const emptyItemForm = {
    expirationDate: null,
    addDate: null,
    metadata: [],
  };

  const [itemForm, setItemForm] = React.useState({ ...emptyItemForm });
  
  const onSaveItem = () => {
    console.log('onSave', itemForm);
    toggleVisibility();
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
        onCancel={toggleVisibility}
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
           <DatePicker />
          </Form.Item>
          <MetadataForm />
        </Form>
      </Modal>
   );
};
 
export default ItemModal;
