import axiosInstance from "@/api/axios"

export default async function getUserInfo() {
  const res = await axiosInstance.get("/api/user/")
  return res.data
}
