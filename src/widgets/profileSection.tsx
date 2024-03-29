'use client'

import { App, Avatar, Button, Flex, Modal, Tooltip, Typography, Upload, message } from 'antd'
import { useEffect, useState } from 'react'
import ImgCrop from 'antd-img-crop'
import { FileImageOutlined } from '@ant-design/icons'
import Image from 'next/image';

import { useWindowSize } from '@/shared/useWindowSize'
import AchievementBarItem from '@/entities/achievementBarItem'
import { User } from '@/entities/backendEntities'


const getBase64 = (img: any, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

function pluralizeWord(value: number, words: string[]) {
  value = Math.abs(value) % 100; 
  var num = value % 10;
  if(value > 10 && value < 20) return value.toString() + " " + words[2]; 
  if(num > 1 && num < 5) return value.toString() + " " + words[1];
  if(num == 1) return value.toString() + " " + words[0]; 
  return value.toString() + " " + words[2];
}


export default function ProfileSection({ token, user }: { token: string, user: User }) {
  const [messageApi, contextHolder] = message.useMessage();

  const [isMouseOnAvatar, setMouseOnAvatar] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [fileUrl, setFileUrl] = useState<string>()
  const [isLoading, setLoading] = useState(false)
  
  const isMobile = useWindowSize().width < 769

  const [avatarUrl, setAvatarUrl] = useState("")
  const achievements = [
    `${user.rating_position} место в рейтинге`,
    pluralizeWord(user.proposals, ["заявка", "заявки", "заявок"]),
    pluralizeWord(user.achievements_points, ["балл", "балла", "баллов"]),
    pluralizeWord(user.likes_sended, ["лайк", "лайка", "лайков"]),
    pluralizeWord(user.achievements_count, ["достижение", "достижения", "достижений"]),
  ]

  useEffect(() => {
    setAvatarUrl(`https://postideas.store${user.avatar}`)
  }, [])

  const avatar = <Tooltip title="Выберите новый аватар" color='#538E42'>
    <div
      onMouseEnter={() => (setMouseOnAvatar(true))}
      onMouseLeave={() => (setMouseOnAvatar(false))}
      onClick={() => (setModalOpen(true))}
      style={{
        position: "relative", 
        backgroundColor: "#fff", 
        borderRadius: "176px", 
        borderColor: "#fff", 
        borderStyle: "solid", 
        borderWidth: "1px", 
        width: "fit-content"
      }}
    >
      {isMouseOnAvatar && <FileImageOutlined
        style={{
          position: "absolute",
          zIndex: 3,
          width: "100%",
          height: "100%",
          alignContent: "center",
          justifyContent: "center",
          fontSize: "4rem",
          color: "#0006"
        }}
      />}
      <Avatar
        size={isMobile ? 88 : 176}
        src={avatarUrl}
        style={{
          backgroundColor: "#73AE62",
          outlineWidth: "0.25rem",
          outlineColor: "#fff",
          outlineStyle: "solid",
          borderWidth: "0px",
          borderStyle: "none",
          flexShrink: 0,
          filter: isMouseOnAvatar ? "brightness(0.8) blur(2px)" : ""
        }}
      />
    </div>
  </Tooltip>

  return (
    <>
      {contextHolder}
      <Flex
          vertical
          gap="1rem"
          style={{
            position: "relative",
            minHeight: isMobile ? "10rem" : "16rem",
            paddingBottom: "1rem",
            paddingRight: "1rem",
            width: "100%",
            backgroundColor: '#fff',
            boxShadow: '0px 4px 4px 0px #00000014, 0px 0px 2px 0px #0000000A',
            borderRadius: "1rem",
            borderWidth: "0.5px",
            borderColor: "#EBEBEB",
            borderStyle: "solid"
          }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            backgroundColor: "#73AE62",
            height: isMobile ? "4rem" : "6rem",
            backgroundImage: `url("profileBg.png")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            borderRadius: "1rem 1rem 0px 0px"
          }}
        ></div>
        <Flex
          align='center'
          gap="1.25rem"
          style={{
            height: "100%",
            paddingLeft: isMobile ? "1.25rem" : "2.5rem"
          }}
        >
          {!isMobile && avatar}
          <div style={{height: "100%", width: "fit-content"}}>
            <Flex vertical gap="0.5rem" style={{marginTop: isMobile ? "4.5rem" : "6.5rem"}}>
              <Flex vertical={isMobile} gap="0.5rem" wrap='wrap'>
                {achievements.map((item, i) => (
                  <AchievementBarItem key={i} value={item}/>
                ))}
              </Flex>
              {isMobile && <div style={{marginTop:"1rem"}}>{avatar}</div>}
              <Typography.Text strong style={{fontSize: "1.75rem"}}>{`${user.firstname} ${user.lastname}`}</Typography.Text>
              <Typography.Text style={{fontSize: "1.25rem"}}>{`${"Почта России"} / ${user.department}`}</Typography.Text>
            </Flex>
          </div>
        </Flex>
      </Flex>

      <Modal
        title="Выберите новый аватар" 
        open={isModalOpen} 
        onOk={() => {
          // if (fileUrl) {
          //   setAvatar(token, {
          //     uri: fileUrl,
          //     type: 'image/jpeg',
          //     name: `avatar-${Date.now()}.jpg`
          //   })
          // }
          setFileUrl("")
          setModalOpen(false)
        }}
        closeIcon={false}
        footer={(_, { OkBtn }) => (
          <>
            <OkBtn />
          </>
        )}
      >
        <ImgCrop rotationSlider cropShape='round' modalProps={{
          styles: {
            body: {
              colorScheme: "light"
            }
          }
        }}>
          <Upload
            name='avatar'
            action="https://postideas.store/api/users/me/update/"
            accept='image/jpeg'
            method='PATCH'
            headers={{ "Authorization": token }}
            beforeUpload={(info) => {
              const isJPG = info.type === "image/jpeg"

              console.log(isJPG)
              if (!isJPG) {
                messageApi.error(`${info.name} не является .jpg файлом`)
                return false
              }

              return true
            }}
            showUploadList={false}
            onChange={(info) => {
              if (info.file.status !== 'uploading') {
                setLoading(true)
              }
              if (info.file.status === 'done') {
                getBase64(info.file.originFileObj, (url) => {
                  setLoading(false)
                  setFileUrl(url)
                  setAvatarUrl(url)
                });       
                messageApi.success("Аватарка успешно загружена")
              } else if (info.file.status === 'error') {
                setLoading(false)
                messageApi.error("При загрузке аватарки произошла ошибка. Попробуйте другую")
              }
            }}
            onRemove={() => {
              setLoading(false)
              setFileUrl("")
            }}
          >
            <Button 
              type='dashed' 
              style={{ 
                width: "5rem", 
                height: "5rem", 
                borderRadius: "5rem", 
                borderWidth: "0.125rem", 
                color: "#73AE62", 
                position: "relative", 
                overflow: "hidden" 
              }}
            >
              {(!isLoading && !!fileUrl) ?
              <Image src={fileUrl} fill alt="Avatar"/>
              : 
              'Upload'
              }
            </Button>
          </Upload>
        </ImgCrop>
      </Modal>
    </>
  )
}
