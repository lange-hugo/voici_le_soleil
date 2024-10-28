"use server"

import Landing from "@/components/landing"
import Navbar from "@/components/navbar"



export default async function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Landing />
      </main>
    </>
  )
}
