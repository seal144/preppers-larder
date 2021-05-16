import React from 'react';
import {Form, Input} from 'antd';

import {MAX_CHAR_INPUT, MIN_CHAR_PASSWORD} from '../variables';

const SetPasswordInput = ({label}) => {

  const passwordValidator = (_,value) => {
    if (value === undefined || value.length < MIN_CHAR_PASSWORD){
      return Promise.resolve();
    } 
    
    const pattern = /\d+.*[a-z]+|[a-z]+.*\d+/i;
    const hasLetterAndNumber = pattern.test(value);
    
    if (!hasLetterAndNumber){
      return Promise.reject(new Error('Must contain at least one letter and a number!'));
    }

    return Promise.resolve();
  };

  return ( 
    <div>
      <Form.Item
          name="password"
          label={label}
          tooltip="Must contain letters and numbers"
          rules={[
            { required: true, message: 'Please input your password!'},
            { max: MAX_CHAR_INPUT, message: `Password can have maximum ${MAX_CHAR_INPUT} characters` },
            { min: MIN_CHAR_PASSWORD, message: `Password must have at least ${MIN_CHAR_PASSWORD} characters` },
            { validator: passwordValidator}
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label={`Confirm ${label}`}
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                return !value || getFieldValue('password') === value
                  ? Promise.resolve()
                  : Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </div>
   );
};
 
export default SetPasswordInput;
