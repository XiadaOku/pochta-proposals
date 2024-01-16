'use client'

import { Avatar, Button, Flex, Input, Typography } from 'antd'
import Comment, { CommentEntity } from "@/entities/comment"
import { useState, useEffect } from 'react'


export default function CommentsSection() {
  let title = "Сокращение рутинной ручной работы"
  const [comments, setComments] = useState<CommentEntity[]>([])
  const [myComment, setMyComment] = useState<string>("")

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
    .then(res => res.json())
    .then(data => { setComments(data.filter((item: any) => item.postId == 1)) })
  }, [])

  const sendComment = () => {
    if (myComment.trim() != "") {
      setComments(comments.concat([{ email: "my", body: myComment }]))
      setMyComment("")
    }
  }

  return (
    <Flex vertical align='center' style={{ width: "100vw", minHeight: "100vh", backgroundColor: "#F6FAF7" }}>
      <Typography.Title level={3}>
        Комментарии к заявке <span style={{color: "#449429"}}>"{title}"</span>
      </Typography.Title>

      <Flex vertical gap="1rem" style={{ marginTop: "2rem", maxWidth: "60%" }}>
        {comments.map((item: CommentEntity, i: number) => (
          <Comment key={i} item={item} isAuthor={item.email == "Lew@alysha.tv"} />
        ))}
      </Flex>
      
      <Flex gap="1rem" style={{ marginTop: "4.5rem", width: "60%" }}>
        <Avatar size={32} style={{flexShrink: 0}}>I</Avatar>
        <Flex vertical gap="1.5rem" style={{width: "100%"}}>
          <Input.TextArea 
            placeholder='Комментарий' 
            autoSize 
            showCount 
            maxLength={100} 
            value={myComment} 
            onChange={event => { 
              if (event.target.value[event.target.value.length - 1] != "\n") {
                setMyComment(event.target.value) 
              }
            }}
            onPressEnter={sendComment}
          />
          <Button 
            type="primary" 
            htmlType="submit" 
            style={{
              backgroundColor: "#449429", 
              width: "fit-content", 
              paddingTop: "0.25rem", 
              paddingBottom: "0.25rem", 
              paddingLeft: "1rem", 
              paddingRight: "1rem"
            }}
            onClick={sendComment}>
              Отправить
            </Button>
        </Flex> 
      </Flex>
    </Flex>
  )
}