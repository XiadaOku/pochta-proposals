export type Category = {
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
    "phone_number": string,
    "telegram": string,
    "firstname": string,
    "lastname": string,
    "surname": string,
    "birthday": Date,
    "job": Job,
    "role": Role,
    "division": string
}