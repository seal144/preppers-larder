import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const MetadataForm = ({layout}) => {
  return ( 
    <Form.List name='metadata' className="metadata-form">
          {
            (fields, {add, remove}) => (
              <>
                {fields.map(field => (
                  <Form.Item key={field.key} {...layout}>
                    <Row>
                      <Col span={9}>
                        <Form.Item 
                          { ...field }
                          className = "metadata-form__input"
                          name={[field.name, 'metadataName']}
                          rules={[{ required: true, message: 'Missing metadata name' }]}
                        >
                          <Input placeholder="metadata name" />
                        </Form.Item>
                      </Col>
                      <Col span={10} offset={1}>
                        <Form.Item 
                          { ...field }
                          className = "metadata-form__input"
                          rules={[{ required: true, message: 'Missing metadata value' }]}
                          name={[field.name, 'metadataValue']}
                        >
                          <Input placeholder="metadata value" />
                        </Form.Item>
                      </Col>
                      <Col span={3} offset={1}>
                        <Button onClick={() => remove(field.name)} className='wide-element'>
                          <DeleteOutlined />
                        </Button>
                     </Col>
                    </Row>
                  </Form.Item>
                ))}

                <Form.Item {...layout}>
                  <Button 
                    onClick={() => add()} 

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