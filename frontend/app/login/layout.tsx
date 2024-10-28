import Navbar from "@/components/navbar"


export const metadata = {
  title: "Voici le soleil | Login",
}

export default function Login({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="container flex flex-col items-center py-8">
        {children}
      </main>
    </>
  )
}
