import React from 'react';
import {Form, Input} from 'antd';

import {MAX_CHAR_INPUT, MIN_CHAR_PASSWORD} from './variable';

const SetPasswordInput = ({label}) => {

  const passwordValidator = (_,value) => {
    if (value === undefined) return Promise.resolve();

    value = value.toLowerCase();
    const valueArray = value.split('');

    const isLetter = valueArray.find(character => {
      if (97 <= character.charCodeAt(0) && character.charCodeAt(0)<= 122) 
      return true; 
      return false;
    });

    const isNumber = valueArray.find(character => {
      if(48 <= character.charCodeAt(0) && character.charCodeAt(0)<= 57)
      return true;
      return false;
    });
    
    if (!isLetter || !isNumber){
      return Promise.reject(new Error(`Must contain at least one letter and a number!`));
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
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
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