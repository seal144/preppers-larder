import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const MetadataForm = () => {
  return ( 
    <Form.List name='metadata' className="metadata-form">
          {
            (fields, {add, remove}) => (
              <>
                {fields.map(field => (
                  <Space key={field.key} className="metadata-form__space">
                    <Form.Item 
                      { ...field }
                      className = "metadata-form__input"
                      name={[field.name, 'metadataName']}
                      rules={[{ required: true, message: 'Missing metadata name' }]}
                    >
                      <Input placeholder="metadata name" />
                    </Form.Item>

                    <Form.Item 
                      { ...field }
                      className = "metadata-form__input"
                      rules={[{ required: true, message: 'Missing metadata value' }]}
                      name={[field.name, 'metadataValue']}
                    >
                      <Input placeholder="metadata value" />
                    </Form.Item>
                    <DeleteOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Button onClick={() => add()} className="metadata-form__add-button">
                  Add field
                </Button>
             </>
            )
          }
        </Form.List>
   );
};
 
export default MetadataForm;