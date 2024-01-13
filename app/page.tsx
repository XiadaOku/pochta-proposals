'use client'

import styles from './page.module.css'
import { Avatar, Button, Flex, Input, Typography } from 'antd'
import LoginForm from '@/widgets/loginForm'


// class FlyingObject extends Component {
//   position: number[]
//   direction: number[]

//   constructor() {
//     super({})
//     this.direction = [Math.random(), Math.random()]
//     this.position = [Math.random(), Math.random()]
//   }

//   frame() {
//     for (let i = 0; i <= 1; i++) {
//       this.position[i] += this.direction[i]

//       if (this.position[i] < 0 || this.position[i] > 1) {
//         this.position[i] = Math.min(Math.max(this.position[i], 0), 1)
//         this.direction[i] *= -1
//       }
//     }
//   }

//   render() {
//     return (
//       <div style={{
//         width: "32px", 
//         height: "32px", 
//         backgroundColor: "red", 
//         position: "absolute",
//         left: `${100 * this.position[0]}%`,
//         top: `${100 * this.position[1]}%`
//       }}></div>
//     )
//   }
// }

export default async function LoginPage() {
  // const flyingObjects = [new FlyingObject(), new FlyingObject(), new FlyingObject()]

  // setInterval(() => (
  //   flyingObjects.forEach(obj => {
  //     obj.frame()
  //     obj.forceUpdate()
  //   })
  // ), 25)

  let title = "Сокращение рутинной ручной работы"
  const comments = (await (await fetch("https://jsonplaceholder.typicode.com/comments")).json()).filter(item => item.postId == 1)

  return (
    // bg
    <>
      <Flex vertical align='center' justify='center' style={{ width: "100vw", height: "100vh", backgroundColor: "#F6FAF7" }}>
        <LoginForm/>
      </Flex>
      <div style={{width: "100vw", height: "2px", backgroundColor: "#222"}}></div>
      <Flex vertical align='center' style={{ width: "100vw", minHeight: "100vh", backgroundColor: "#F6FAF7" }}>
        <Typography.Title level={3}>
          Комментарии к заявке <span style={{color: "#449429"}}>"{title}"</span>
        </Typography.Title>
        <Flex vertical gap="1rem" style={{ marginTop: "2rem", maxWidth: "60%" }}>
          {comments.map((item: any) => (
            <Flex gap="1rem" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              <Avatar size={32} style={{flexShrink: 0}}>U</Avatar>
              <Flex vertical gap="0.25rem">
                <Flex gap="0.5rem">
                  <Typography.Text style={{color: item.email == "Lew@alysha.tv" ? "#449429" : "#00000073"}}>{item.email}</Typography.Text>
                  <Typography.Text style={{color: "#BFBFBF"}}>23 июня, 11:43</Typography.Text>
                </Flex>
                <Typography.Text>{item.body}</Typography.Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
        <Flex gap="1rem" style={{ marginTop: "4.5rem", width: "60%" }}>
          <Avatar size={32} style={{flexShrink: 0}}>I</Avatar>
          <Flex vertical gap="1.5rem" style={{width: "100%"}}>
            <Input.TextArea placeholder='Комментарий' autoSize showCount maxLength={100}/>
            <Button type="primary" htmlType="submit" style={{backgroundColor: "#449429", width: "fit-content", paddingTop: "0.25rem", paddingBottom: "0.25rem", paddingLeft: "1rem", paddingRight: "1rem"}}>Отправить</Button>
          </Flex> 
        </Flex>
      </Flex>
    </>
  )
}
