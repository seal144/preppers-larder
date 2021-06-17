import React, { useState } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

// @todo fix after db connection
const dbUser = {
  id: '164add',
  username: 'jacek',
  password: 'lato1',
  question: 'Czy Ziemia jest kulą?',
  answer: 'tak'
};

const LogInPage = () => {
  const [username, setUsername] = useState('');

  const [form] = Form.useForm();

  const history = useHistory();

  // @todo fix after db connection
  const onFinish = (values) => {
    if (values.username === dbUser.username && values.password === dbUser.password) {
      history.push('/larder');
    } else if (values.username !== dbUser.username) {
      form.setFields([{ name: 'username', errors: ['Incorrect username!']}]);
    } else if (values.password !== dbUser.password) {
      form.setFields([{ name: 'password', errors: ['Incorrect password!']}]);
    }
  };

  const forgotPassword = () => {
    if (username === '') {
      return form.setFields([{ name: 'username', errors: ['Please input your username!'], },]);
    } if (username !== dbUser.username) { // @todo fix after db connection
      return form.setFields([{ name: 'username', errors: ['Incorrect username!'], },]);
    } else {
      history.push(`/account/${dbUser.id}`);
    }
  };

  const goToRegisterPage = () => {
    history.push('/account');
  };

  const usernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div className="login-form">
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        autocomplete="off"
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: 'Please input your username!' },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" value={username} onChange={usernameChange} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={11}>
              <Button type="button" className="full-width" onClick={goToRegisterPage}>Register</Button>
            </Col>
            <Col span={11} offset={2}>
              <Button type="button" className="full-width"  onClick={forgotPassword}>Forgot password</Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item >
          <Button type="primary submit" htmlType="submit" className="full-width">
            Login
          </Button>
        </Form.Item>
      </Form>
      {/* delete after db connection */}
      <p style={{ fontSize: '.6rem', color: '#aaa' }}>mocked: {dbUser.username}, {dbUser.password}, {dbUser.answer}</p>
    </div>
  );
};

export default LogInPage;
