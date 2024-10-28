import Navbar from "@/components/navbar"


export const metadata = {
  title: "Voici le soleil | Contact",
}

export default function Contact({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="container flex flex-col items-center py-8">
        {children}
      </main>
    </>
  )
}
