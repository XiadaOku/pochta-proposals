'use client'

import { User } from "@/entities/backendEntities";
import { Modal, Radio, Space, Typography } from "antd";
import { useState } from "react";


export default function HeadsModal({ userHeads, isOpen, setOpen, onOk, onCancel }: { userHeads: User[], isOpen: undefined | boolean, setOpen: any, onOk: (id: number) => void, onCancel: () => void }) {
    const [head, setHead] = useState(undefined)
    const [isError, setError] = useState(false)

    return (
        <Modal 
            title="Выберите руководителя" 
            open={isOpen === undefined ? false : isOpen} 
            onOk={(e) => {
                if (head === undefined) {
                    setError(true)
                    return
                }

                onOk(head)
                setHead(undefined)
                setOpen(false)
            }} 
            onCancel={(e) => {
                onCancel()
                setHead(undefined)
                setOpen(false)
            }}
            cancelText="Отмена"
        >
            <Space direction="vertical">
                <Radio.Group value={head} onChange={(event) => { setHead(event.target.value); setError(false) }} buttonStyle="solid">
                    <Space direction="vertical">
                        {userHeads.map((item) => (
                            <Radio.Button 
                                key={item.id} 
                                value={item.id} 
                                style={{width: "100%"}}
                            >{item.firstname} {item.lastname}</Radio.Button>
                        ))}
                    </Space>
                </Radio.Group>
                <Typography.Text hidden={!isError} type="danger">Выберите руководителя, которому хотите отправить заявку</Typography.Text>
            </Space>
        </Modal>
    )
}
