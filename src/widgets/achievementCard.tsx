'use client'

import AchievementProgressBar from "@/entities/achievementProgressBar";
import { Achievement } from "@/entities/backendEntities";
import { Flex, Typography } from "antd";
import Image from "next/image";


export default function AchievementCard({ value }: { value: Achievement }) {
  return (
    <Flex 
      vertical
      align="center"
      gap="0.75rem" 
      style={{
        backgroundColor: "#F6FAF7",
        borderRadius: "1rem",
        padding: "1rem",
        borderWidth: "0.5px",
        borderColor: "#EBEBEB",
        borderStyle: "solid"
      }}
    >
      <div style={{width: "5.5rem", height: "5.5rem", position: "relative"}}>
        <Image
          src={`https://postideas.store/${value.achievement_type.cover}`}
          alt="Icon"
          fill
          sizes="5.5rem"
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRhgDAABXRUJQVlA4WAoAAAAgAAAAgQAAgQAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggKgEAAJAKAJ0BKoIAggA+nU6fTaWkIyIgaYCwE4lpbuA+jb/Jjw9wBQhw13ku+K7VVr5mqV7qq185VsoPqQR5MKd30zsfyTnNdCoBGqp6+xbDy++Sez2vHgNdUuqNthaoYAD+8Ju/+IunvAIZ+7O0WmOHQt5+fXEYpMSENWyQOPU2i9neih394UISUBnznnmOgxP2tP6RmSvkMiuLECYIr/Cb/GtttKuYsvwv8IzIf9FhyvB2BPhWlxV1RMWtlJXXpBeeKYYBKsaZWiOPyX2J9UpSLUGdWT5YlWHnTITxToMJCqt+D3fDhMAJaBooq8DafwlCGx7/wgs6hu1aZQju9IrFOO25Og04R/xWCzFZ0WHgV/ApnYI1GJU5ABRj5MNImlzjSAw8KovDxrp2AAA="
        />
      </div>
      <Flex
        vertical
        gap="1rem"
        align="center"
        style={{ maxWidth: "12rem" }}
      >
        <Typography.Text strong style={{ fontSize: "1.25rem" }}>{value.achievement_type.name}</Typography.Text>
        <AchievementProgressBar current={value.current_progress} max={value.achievement_type.total_progress}/>
        <Typography.Text style={{ fontSize: "1rem", color: "#939393", marginRight: "1rem", marginLeft: "1rem", textAlign: "center" }}>{value.achievement_type.description}</Typography.Text>
        <div style={{ 
          paddingLeft: "0.5rem", 
          paddingRight: "0.5rem", 
          paddingTop: "0.25rem", 
          paddingBottom: "0.25rem", 
          backgroundColor: value.current_progress == value.achievement_type.total_progress ? "#73AE62" : "#ADADAD",
          borderRadius: "0.25rem"
        }}>
          <Typography.Text strong style={{ color: "#fff", fontSize: "0.75rem" }}>{`${value.achievement_type.points} баллов`}</Typography.Text>
        </div>
      </Flex>
    </Flex>
  )
}