export type Category = {
  "id": number,
  "name": string
}

export type Division = {
  "id": number,
  "name": string
}

export type Job = {
  "id": number,
  "name": string,
  "description": string
}

export type Role = {
  "id": number,
  "name": string,
  "role_type": string
}

export type User = {
  "id": number,
  "email": string,
  "avatar": string,
  "phone_number": string,
  "telegram": string,
  "firstname": string,
  "lastname": string,
  "surname": string,
  "birthday": Date,
  "job": Job,
  "role": Role,
  "achievements": Achievement[],
  "achievements_count": number,
  "achievements_points": number,
  "likes_sended": number,
  "proposals": number,
  "division": string,
  "department": string,
  "office": string,
  "rating_position": number
}

export type Achievement = {
  "id": number,
  "current_progress": number,
  "achievement_type": AchievementType
}

export type AchievementType = {
  "id": number,
  "name": string,
  "cover": string,
  "description": string,
  "points": number,
  "total_progress": number,
}