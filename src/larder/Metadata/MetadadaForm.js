import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { MAX_CHAR_INPUT, MAX_CHAR_TEXT_INPUT } from '../../variables';

const MetadataForm = ({layout}) => {
  return ( 
    <Form.List name='metadata' className="metadata-form">
          {
            (fields, {add, remove}) => (
              <>
                {fields.map(field => (
                  <Form.Item key={field.key} {...layout}>
                    <Row>
                      <Col flex={1}>
                        <Form.Item 
                          { ...field }
                          className = "metadata-form__input"
                          name={[field.name, 'metadataName']}
                          rules={[
                            { required: true, message: 'Missing metadata name' },
                            { max: MAX_CHAR_INPUT, message: `Name field can have maximum ${MAX_CHAR_INPUT} characters`}
                          ]}
                        >
                          <Input placeholder="metadata name" />
                        </Form.Item>
                      </Col>
                      <Col flex={1}>
                        <Form.Item 
                          { ...field }
                          className = "metadata-form__input"
                          rules={[
                            { required: true, message: 'Missing metadata value' },
                            { max: MAX_CHAR_TEXT_INPUT, message: `Value field can have maximum ${MAX_CHAR_TEXT_INPUT} characters`}
                          ]}
                          name={[field.name, 'metadataValue']}
                        >
                          <Input placeholder="metadata value" />
                        </Form.Item>
                      </Col>
                      <Col flex="none" >
                        <Button onClick={() => remove(field.name)} className='full-width'>
                          <DeleteOutlined />
                        </Button>
                     </Col>
                    </Row>
                  </Form.Item>
                ))}

                <Form.Item {...layout}>
                  <Button 
                    onClick={() => add()} 

                    className="full-width"
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
