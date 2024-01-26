'use client'

import { Flex, Typography } from 'antd'
import ProfileSection from './profileSection'
import AchievementsSection from './achievementsSection'
import getUser from '@/features/users'


export default function Profile() {
  const userToken = "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2Mjc3NTc3LCJpYXQiOjE3MDYxOTExNzcsImp0aSI6ImE5OTlkN2JjNWRkZTQxMzk5ZmE4ZjNmZGRkM2QzOTc3IiwidXNlcl9pZCI6MX0.RXmtMPb2kWTjwY3jK_ac1j-nqHK048e54UUpul0D-io"

  const user = getUser(userToken)
  console.log(user)

  if (user === undefined) {
    return (
      <></>
    )
  }

  return (
    <Flex 
        vertical 
        style={{ 
            width: "100%", 
            paddingTop: "1rem", 
            paddingBottom: "1rem", 
            paddingLeft: "2rem", 
            paddingRight: "2rem", 
            backgroundColor: '#fff', 
            gap: "1rem"
        }}
    >
      <Typography.Title level={2} style={{marginBottom: "0.25rem"}}>Профиль</Typography.Title>
      <ProfileSection token={userToken} user={user}/>
      <AchievementsSection token={userToken} user={user}/>
    </Flex>
  )
}
