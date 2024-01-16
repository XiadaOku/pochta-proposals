import { Avatar, Flex, Typography } from 'antd'


export type CommentEntity = {
    email: string
    body: string
}

export default function CommentCard(props: { item: CommentEntity, isAuthor?: boolean }) {
    return (
      <Flex gap="1rem" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <Avatar size={32} style={{flexShrink: 0}}>U</Avatar>
        <Flex vertical gap="0.25rem">
          <Flex gap="0.5rem">
            <Typography.Text style={{color: props.isAuthor ? "#449429" : "#00000073"}}>{props.item.email}</Typography.Text>
            <Typography.Text style={{color: "#BFBFBF"}}>23 июня, 11:43</Typography.Text>
          </Flex>
          <Typography.Text>{props.item.body}</Typography.Text>
        </Flex>
      </Flex>
    )
}