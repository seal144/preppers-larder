import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {Form, Input, Button} from 'antd';

import './LoginRegisterPage.scss';
import {MAX_CHAR_INPUT, MAX_CHAR_PASS_QUESTION} from './variable';
import SetPasswordInput from './SetPasswordInput';

const formItemLayout = {
  labelCol: { span:8 },
  wrapperCol: { span:8 },
};
const tailFormItemLayout = {
  wrapperCol: {offset:8, span:8},
};

const RegisterPage = ({match}) => {
  const [ isNewUser, setIsNewUser ] = useState(true);
  const [ formValues, setFormValues ] = useState({
    username:'',
    password:'',
    question: '',
    answer: '',
  });
  const [ isCorrectAnswer, setIsCorrectAnswer ] = useState(false);

  const history = useHistory();
  const [form] = Form.useForm();

  //@todo replace mocked user after db connection
  let dbUser = null;
  if(match.params.user==='164add'){
    if(isNewUser) setIsNewUser(false);

    dbUser = {
      id: '164add',
      username: 'jacek',
      password: 'lato1',
      question: 'Czy Ziemia jest kulą?',
      answer: 'tak'
    };
  };

  const setConstFields = () => {
    form.setFields([
      { name: 'username', value: dbUser.username},
      { name: 'question', value: dbUser.question}
    ]);
  };

  useEffect(()=>{
    if (!isNewUser) {
      setFormValues({...dbUser});
      setConstFields();
    }
  },[]);

  const answerValidator = (_,value) => {
    if (!isNewUser && value !== dbUser.answer ) {
      if(isCorrectAnswer) setIsCorrectAnswer(false);
      return Promise.reject(new Error(`Incorrect answer`));
    } else {
      setIsCorrectAnswer(true);
      return Promise.resolve();
    }
  };

  const updateFormState = (_,inputValues) => {
    setFormValues({...formValues, ...inputValues});
    if(!isNewUser) {
      setConstFields();
    } 
  };

  const onFinish = () => {
    console.log('Received values of form: ', formValues);
    history.push('/');
  };

  return ( 
    <div className="register-form">
      <Form
        {...formItemLayout}
        form = {form}
        name="register"
        onFinish={onFinish}
        onValuesChange={updateFormState}
        scrollToFirstError
        autocomplete="off"
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[
            { required: true, whitespace: true, message: 'Please input your username!' },
            { max: MAX_CHAR_INPUT, message: `Username can have maximum ${MAX_CHAR_INPUT} characters` }
          ]}
        >
          <Input />
        </Form.Item>

        {isNewUser && <SetPasswordInput label="Password"/>}

        <Form.Item 
          name="question" 
          label="Question" 
          tooltip="Password-recovery question"
          rules={[
            { max: MAX_CHAR_PASS_QUESTION, message: `Question can have maximum ${MAX_CHAR_PASS_QUESTION} characters` },
          ]}
        >
            <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="answer"
          label="Answer"
          tooltip="Answer for password-recovery question"
          rules={[
            { max: MAX_CHAR_INPUT, message: `Answer can have maximum ${MAX_CHAR_INPUT} characters` },
            { validator: answerValidator }
          ]}
        >
          <Input />
        </Form.Item>

        {!isNewUser && isCorrectAnswer && <SetPasswordInput label="New password"/>}

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className="submit-button">
            {isNewUser? 'Register': 'Change Password'}
          </Button>
        </Form.Item>
      </Form>
    </div>
   );
};
 
export default RegisterPage;
