'use client'

import { useState } from 'react'
import { Flex, Form, Typography, Input, Button } from 'antd'
import Logo from '@/entities/logo'


export default function LoginForm() {
    let [isUsername, setUsername] = useState(false)
    let [isPassword, setPassword] = useState(false)
    let isActive = isUsername && isPassword

    const [form] = Form.useForm()

    return (
        <Flex 
        vertical 
        style={{ 
            width: "25rem", 
            paddingTop: "1rem", 
            paddingBottom: "1rem", 
            paddingLeft: "2rem", 
            paddingRight: "2rem", 
            backgroundColor: '#fff', 
            boxShadow: "0px 17px 46px 0px #5C636B14",
            borderRadius: "1rem"
        }}>
        
        {/* form */}
        <Form
            onFinish={(values) => { console.log("success", values) }}
            onFinishFailed={(error) => { console.log("error", error) }}
            autoComplete="on"
            form={form}
        >
            <Logo/>
            
            <Form.Item 
            name="username"
            rules={[{ required: true, message: 'Введите вашу почту' }]}
            >
            <Input 
                placeholder="dinrinx@icloud.com" 
                onChange={(event) => (setUsername(event.target.value.length > 0))}
            />
            </Form.Item>
            <Form.Item 
            name="password"
            rules={[{ required: true, message: 'Введите ваш пароль' }]}
            >
            <Input.Password
                placeholder="12345677"
                onChange={(event) => (setPassword(event.target.value.length > 0))}
                // iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
            </Form.Item>

            <Form.Item>
            <Button disabled={!isActive} type="primary" htmlType="submit" style={{backgroundColor: isActive ? "#449429" : "#44942980", width: "100%", marginTop: "1rem"}}>
                <Typography.Text strong style={{color: "#fff"}}>Войти</Typography.Text>
            </Button>
            </Form.Item>
        </Form>
        </Flex>
    )
}

