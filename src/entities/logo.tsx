import { Typography } from 'antd'


export default function Logo() {
    return (
        <Typography.Title level={3} disabled style={{color: "#222", textAlign: "center", cursor: "default"}}>
            Inverse.<span style={{color: "#449429"}}>Заявки</span>
        </Typography.Title>
    )
}

