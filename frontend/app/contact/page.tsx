import HeadingText from "@/components/ui/heading-text";
import ContactForm from "./contactForm";


export default function Contact() {
  return (
    <>
      <div className="flex flex-col items-center space-y-2 pt-20 text-center">
        <HeadingText subtext="Envoyez moi un message!">Contact</HeadingText>
      </div>
      <ContactForm />
    </>
  )
}
