'use client'
import InfiniteScroll from 'react-infinite-scroll-component'

import styles from './page.module.css'
import { Flex, List } from 'antd'
import { useEffect, useState } from 'react'

import LoginForm from '@/widgets/loginForm'
import CommentsSection from '@/widgets/commentsSection'
import NewProposalForm from '@/widgets/newProposalForm'


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


export default function LoginPage() {
  // const flyingObjects = [new FlyingObject(), new FlyingObject(), new FlyingObject()]

  // setInterval(() => (
  //   flyingObjects.forEach(obj => {
  //     obj.frame()
  //     obj.forceUpdate()
  //   })
  // ), 25)
  const [items, setItems] = useState<string[]>(["0"])
  const [loading, setLoading] = useState(false)
  const fetchData = () => {
    if (loading) {
      return
    }
    
    setLoading(true)
    
    let i = items.length ? parseInt(items[items.length - 1]) + 1 : 0
    const data: string[] = []

    for (let j = 0; j < 10; j++) {
      data.push(i.toString())
      i += 1
    }

    setItems([...items, ...data])

    setLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Flex vertical align='center' justify='center' style={{ width: "100vw", height: "100vh", backgroundColor: "#F6FAF7" }}>
        <LoginForm/>
      </Flex>
      <div style={{height: "0.25rem", width: "100%", backgroundColor: "#222"}}></div>
      <Flex vertical align='center' justify='center' style={{ width: "100vw", minHeight: "100vh", backgroundColor: "#F6FAF7" }}>
        <CommentsSection/>
      </Flex>
      <div style={{height: "0.25rem", width: "100%", backgroundColor: "#222"}}></div>
      <Flex vertical style={{ width: "100vw", padding: "2rem", backgroundColor: "#F6FAF7" }}>
        <div 
          id="scrollableDiv"
          style={{
            height: 400,
            overflow: 'auto',
            padding: '0 16px',
            border: '1px solid rgba(140, 140, 140, 0.35)',
        }}>
          <InfiniteScroll
            scrollableTarget="scrollableDiv"
            dataLength={items.length}
            next={fetchData}
            hasMore={true}
            loader={<h4 style={{color: "#333"}}>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <List
              dataSource={items}
              renderItem={(item) => (
                <List.Item key={item}>
                  <div>{item}</div>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </Flex>
      <div style={{height: "0.25rem", width: "100%", backgroundColor: "#222"}}></div>
      <Flex vertical align='center' justify='center' style={{ width: "100vw", minHeight: "100vh", backgroundColor: "#F6FAF7" }}>
        <NewProposalForm/>
      </Flex>
    </>
  )
}
