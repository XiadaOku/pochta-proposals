'use client'

import styles from './page.module.css'

import Profile from '@/widgets/profile'
import { Flex } from 'antd'


export default function ProfilePage() {
  return (
    <Flex 
      vertical 
      align='center' 
      style={{ 
        width: "100vw", 
        minHeight: "100vh", 
        paddingTop: "2rem", 
        paddingBottom: "2rem", 
        paddingLeft: "2.5rem", 
        paddingRight: "2.5rem",
        backgroundColor: "#F6FAF7" 
      }}
    >
      <Profile/>
    </Flex>
  )
}
