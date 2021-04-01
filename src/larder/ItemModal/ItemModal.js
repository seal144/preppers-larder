import React from 'react';
import { Input, Modal, Form, DatePicker, Space, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

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
          <Form.List name='metadata'>
            {
              // @todo fix classNames and reusable component for adding metadata
              (fields, {add, remove}) => (
                <>
                  {fields.map(field => (
                    <Space key={field.key} className="product-form__metadata__space">
                      <Form.Item 
                        { ...field }
                        className = "product-form__metadata__input"
                        name={[field.name, 'metadataName']}
                        rules={[{ required: true, message: 'Missing metadata name' }]}
                      >
                        <Input placeholder="metadata name" />
                      </Form.Item>

                      <Form.Item 
                        { ...field }
                        className = "product-form__metadata__input"
                        rules={[{ required: true, message: 'Missing metadata value' }]}
                        name={[field.name, 'metadataValue']}
                      >
                        <Input placeholder="metadata value" />
                      </Form.Item>
                      <DeleteOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                  <Button onClick={() => add()} className="product-form__metadata__add-button">
                    Add field
                  </Button>
              </>
              )
            }
          </Form.List>
        </Form>
      </Modal>
   );
};
 
export default ItemModal;
