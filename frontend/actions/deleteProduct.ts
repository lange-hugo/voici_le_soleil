import axiosInstance from "@/api/axios"

export default async function deleteProduct(id: number) {
  const res = await axiosInstance.delete(`/api/product/${id}/`)
  return res
}
