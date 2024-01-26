'use client'

import { Flex, Typography } from 'antd'
import AchievementCard from './achievementCard';
import { Achievement, User } from '@/entities/backendEntities';


export default function AchievementsSection({ token, user }: { token: string, user: User }) {
  const achievements: Achievement[] = user.achievements;

  return (
    <Flex
      vertical
      gap="1rem"
      style={{
        padding: "1.75rem",
        width: "100%",
        backgroundColor: '#fff',
        boxShadow: '0px 4px 4px 0px #00000014, 0px 0px 2px 0px #0000000A',
        borderRadius: "1rem",
        borderWidth: "0.5px", 
        borderColor: "#EBEBEB",
        borderStyle: "solid"
      }}
    >
      <Typography.Text strong style={{fontSize: "1.5rem"}}>Мои достижения</Typography.Text>
      <Flex
        wrap="wrap"
        gap="1rem"
      >
        {achievements.map((item, i) => (
          <AchievementCard key={i} value={item}/>
        ))}
      </Flex>
    </Flex>
  )
}
