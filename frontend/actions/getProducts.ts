import axiosInstance from "@/api/axios"

export default async function getProducts() {
  const res = await axiosInstance.get("/api/product/")
  return res.data
}
