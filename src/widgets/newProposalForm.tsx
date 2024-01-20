'use client'

import { useState } from 'react'
import { Flex, Form, Typography, Input, Button, Space, Radio, Checkbox, Modal } from 'antd'
import { CheckboxValueType } from 'antd/es/checkbox/Group'
import { useWindowSize } from '@/shared/useWindowSize'
import createProposal from '@/features/proposal'
import getHeads from '@/features/heads'
import HeadsModal from './headsModal'
import { User } from '@/entities/backendEntities'
import getCategories from '@/features/categories'
import getDivisions from '@/features/divisions'


export default function NewProposalForm() {
    const userToken = "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA1ODQwMTU2LCJpYXQiOjE3MDU3NTM3NTYsImp0aSI6IjE0Y2MwMDE1MjU3NjQzMDZhMDg0NGU2NDQxZTZhNDRiIiwidXNlcl9pZCI6MX0.s9sH6pJFgDIedlSYrj0GGHBbMjXDRbTRzDsL26TSznM"
    
    
    const inputIds = [
        "proposal-title", 
        "full-name", 
        "telegram-id", 
        "division",
        "type-other",
        "proposal-goal",
        "proposal-benefit",
        "divisions-other",
        "limiting-factors",
        "proposal-improvement",
        "tor-link"
    ]
    const [inputData, setInputData] = useState(Object.assign({}, ...inputIds.map((title) => ( {[title]: ""} ))))
    const [proposalType, setProposalType] = useState(0)
    const [relatedDivisions, setRelatedDivisions] = useState<CheckboxValueType[]>([])
    const [isModalOpen, setModalOpen] = useState(false)
    const [userHeads, setUserHeads] = useState<User[]>([])
    const [isLoading, setLoading] = useState(false)

    const isMobile = useWindowSize().width < 769

    const [form] = Form.useForm()

    const formButtons = 
    <Space>
        <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} style={{
                backgroundColor: "#449429", 
                paddingTop: "0.25rem", 
                paddingBottom: "0.25rem", 
                paddingLeft: "1rem", 
                paddingRight: "1rem"
            }}>
                <Typography.Text strong style={{color: "#fff"}}>Отправить</Typography.Text>
            </Button>
        </Form.Item>
        <Form.Item>
            <Button type="primary" style={{
                backgroundColor: "#fff", 
                paddingTop: "0.25rem", 
                paddingBottom: "0.25rem", 
                paddingLeft: "1rem", 
                paddingRight: "1rem"
            }}>
                <Typography.Text strong style={{color: "#000"}}>Отменить</Typography.Text>
            </Button>
        </Form.Item>
    </Space>

    const categories = getCategories()
    const divisions = getDivisions(userToken)

    return (
        <>
            <Flex
                vertical
                style={{
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    paddingLeft: "2rem",
                    paddingRight: isMobile ? "2rem" : "22rem",
                    marginTop: "2rem",
                    backgroundColor: '#fff',
                    borderColor: "#000",
                    borderWidth: "1rem",
                    borderRadius: "1rem"
                }}
            >
                <Form
                    onFinish={async (values) => {
                        setLoading(true)
                        setUserHeads(await getHeads(userToken))
                        setModalOpen(true)
                    }}
                    autoComplete='off'
                    form={form}
                    layout='vertical'
                >
                    <Space align='start' style={{gap: "5rem"}} direction={isMobile ? "vertical" : "horizontal"}>
                        <Space direction='vertical' style={{gap: "1.5rem", width: "25rem"}}>
                            <Form.Item
                                label="Название заявки"
                                name={inputIds[0]}
                                rules={[{ required: true, message: 'Введите название заявки' }]}
                            >
                                <Input
                                    onChange={(event) => (setInputData((data: any) => ( { ...data, [event.target.id]: event.target.value } )))}
                                />
                            </Form.Item>
                            <Form.Item
                                label="ФИО"
                                name={inputIds[1]}
                                rules={[{ required: true, message: 'Введите ФИО' }]}
                            >
                                <Input
                                    placeholder='Петров Николай Андреевич'
                                    // disabled
                                    onChange={(event) => (setInputData((data: any) => ( { ...data, [event.target.id]: event.target.value } )))}
                                />
                            </Form.Item>
                            <Form.Item
                                label="ID в Telegram"
                                name={inputIds[2]}
                                rules={[{ required: true, message: 'Введите ваш Telegram ID' }]}
                            >
                                <Input
                                    placeholder='userid'
                                    // disabled
                                    onChange={(event) => (setInputData((data: any) => ( { ...data, [event.target.id]: event.target.value } )))}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Отдел"
                                name={inputIds[3]}
                                rules={[{ required: true, message: 'Введите ваш отдел' }]}
                            >
                                <Input
                                    placeholder='Операционный отдел'
                                    // disabled
                                    onChange={(event) => (setInputData((data: any) => ( { ...data, [event.target.id]: event.target.value } )))}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Тип запроса"
                                name="type"
                                rules={[{ required: true, message: 'Выберите тип запроса' }]}
                            >
                                <Radio.Group onChange={(event) => setProposalType(event.target.value)}>
                                    <Space direction='vertical'>
                                        {
                                            categories.slice(0, -1).map((item) => (
                                                <Radio value={item.id} key={item.id}>{item.name}</Radio>
                                            ))
                                        }
                                        <Radio value={categories.at(-1)?.id}>
                                            <Space>
                                                Другое
                                                {proposalType == categories.at(-1)?.id ?
                                                <Form.Item
                                                    noStyle
                                                    name={inputIds[4]}
                                                    rules={[{ required: true, message: 'Введите тип вашего запроса' }]}
                                                >
                                                    <Input
                                                        onChange={(event) => (setInputData((data: any) => ( { ...data, [event.target.id]: event.target.value } )))}
                                                    />
                                                </Form.Item>
                                                : ""}
                                            </Space>
                                        </Radio>
                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                label="Цель проекта"
                                name={inputIds[5]}
                                rules={[{ required: true, message: 'Введите цель вашего проекта' }]}
                            >
                                <Input.TextArea
                                    placeholder='Какую проблему решаем запуском этого проекта?'
                                    showCount
                                    maxLength={100}
                                    autoSize
                                    onChange={(event) => (setInputData((data: any) => ( { ...data, [event.target.id]: event.target.value } )))}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Какую выгоду несет реализация проекта в деньгах?"
                                name={inputIds[6]}
                                rules={[{ required: true, message: 'Введите аргументацию для вашего проекта' }]}
                            >
                                <Input.TextArea
                                    placeholder='Напишите здесь всё про деньги, ваши расчеты и итоги'
                                    showCount
                                    maxLength={100}
                                    autoSize
                                    onChange={(event) => (setInputData((data: any) => ( { ...data, [event.target.id]: event.target.value } )))}
                                />
                            </Form.Item>
                            {!isMobile && formButtons}
                        </Space>
                        <Space direction="vertical" style={{gap: "1.5rem", width: "25rem"}}>
                            <Form.Item
                                label="Какие смежные отделы затрагивает ваш проект/запрос?"
                                name="relatedDivisions"
                                rules={[
                                    {
                                        validator: () => {
                                            if (relatedDivisions.length == 0) {
                                                return Promise.reject('Выберите хотя бы один смежный отдел')
                                            }
                                            else {
                                                return Promise.resolve()
                                            }
                                        },
                                        required: true,
                                    }
                                ]}
                            >
                                <Checkbox.Group onChange={(values) => {
                                    setRelatedDivisions(values)
                                    form.validateFields(["relatedDivisions"])
                                }}>
                                    <Space direction='vertical'>
                                        {
                                            divisions.map((item) => (
                                                <Checkbox value={item.id} key={item.id}>{item.name}</Checkbox>
                                            ))
                                        }
                                    </Space>
                                </Checkbox.Group>
                            </Form.Item>
                            <Form.Item
                                label="Есть ли какие-либо ограничивающие факторы?"
                                name={inputIds[8]}
                                rules={[{ required: true, message: 'Введите ограничивающие факторы вашего проекта' }]}
                            >
                                <Input.TextArea
                                    placeholder='Например, если вышло новое законодательство и по нему есть строгие временные рамки'
                                    showCount
                                    maxLength={100}
                                    autoSize
                                    onChange={(event) => (setInputData((data: any) => ( { ...data, [event.target.id]: event.target.value } )))}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Как ваш проект/запрос поможет достичь развитие формата и покрытие регионов магазинами?"
                                name={inputIds[9]}
                                rules={[{ required: true, message: 'Введите развитие формата от вашего проекта' }]}
                            >
                                <Input.TextArea
                                    showCount
                                    maxLength={100}
                                    autoSize
                                    onChange={(event) => (setInputData((data: any) => ( { ...data, [event.target.id]: event.target.value } )))}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Ссылка на техническое задание"
                                name={inputIds[10]}
                                rules={[{ required: true, message: 'Введите ссылку на техническое задание', type: "url" }]}
                            >
                                <Input
                                    onChange={(event) => (setInputData((data: any) => ( { ...data, [event.target.id]: event.target.value } )))}
                                />
                            </Form.Item>
                            {isMobile && formButtons}
                            <Form.Item>
                                <Button
                                    type="primary"
                                    disabled
                                    style={{
                                        backgroundColor: "#44942980",
                                        paddingTop: "0.25rem",
                                        paddingBottom: "0.25rem",
                                        paddingLeft: "1rem",
                                        paddingRight: "1rem"
                                    }}
                                >
                                    <Typography.Text strong style={{color: "#fff"}}>Сгенерировать с помощью ИИ</Typography.Text>
                                </Button>
                            </Form.Item>
                        </Space>
                    </Space>
                </Form>
            </Flex>

            <HeadsModal 
                userHeads={userHeads} 
                isOpen={isModalOpen} 
                setOpen={setModalOpen} 
                onOk={async (id) => {
                    setLoading(false)

                    const content = inputData
                    content["relatedDivisions"] = relatedDivisions

                    const response = await createProposal(userToken, inputData[inputIds[0]], proposalType, id, content)
                    console.log(response)
                }}
                onCancel={() => {
                    setLoading(false)
                }}
            />
        </>
    )
}

