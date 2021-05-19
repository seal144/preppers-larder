import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const MetadataForm = ({layout}) => {
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

                <Form.Item {...layout}>
                  <Button 
                    onClick={() => add()} 
                    className="metadata-form__add-button"
                    className="wide-element"
                  >
                    Add field
                  </Button>
                </Form.Item>
             </>
            )
          }
        </Form.List>
   );
};
 
export default MetadataForm;