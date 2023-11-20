import { notification } from "antd"

export const successfully = (success:any) =>{
  return notification.success({message: success?.data?.message})
}
export const warning = (warning:any) =>{
  return notification.warning({message: warning?.data?.message})
}
export const error = (error:any) =>{
  return notification.error({message: error?.data?.message})
}