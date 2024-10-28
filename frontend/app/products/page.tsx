"use client"

import HeadingText from "@/components/ui/heading-text"
import { LayoutGrid } from "@/components/ui/layout-grid"



export default function LayoutGridDemo() {
  return (
    <>
      <div className="h-screen w-full py-10">
        <div className="flex flex-col items-center space-y-2 py-10 text-center">
          <HeadingText subtext="Découvrez les différentes experiences que je propose.">
            Mes offres
          </HeadingText>
        </div>
        <LayoutGrid cards={cards} />
      </div>
      <div className="p-20"></div>
    </>
  )
}

const cards = [
  {
    id: 1,
    title: "Film de mariage",
    description:
      "Souvenir unique et intemporel composé des plus belles images et des plus beaux passages de discours. Durée entre 4 et 8 min.",
    price: 1500,
    className: "md:col-span-2",
    thumbnail: "/produit1.jpg",
  },
  {
    id: 2,
    title: "Film de mariage version longue",
    price: 2500,
    description:
      "Pour ne pas oublier un seul moment de la journée. Durée entre 15 et 20 min.",
    className: "col-span-1",
    thumbnail: "/produit2.jpg",
  },
  {
    id: 3,
    title: "Captation au drone",
    description:
      "Prise de vue aérienne aux différents lieux du mariage, rendant le film encore plus cinématique.",
    price: 500,
    className: "col-span-1",
    thumbnail: "/produit3.jpg",
  },
  {
    id: 4,
    title: "Souvenir cérémonie",
    description:
      "Captation entière de la cérémonie et des discours avec plusieurs angles de vue et une prise de son très qualitative. Rendu d'une vidéo non coupée.",
    price: 500,
    className: "md:col-span-2",
    thumbnail: "/produit4.jpg",
  },
  {
    id: 5,
    title: "Highlights",
    description:
      "Une petite vidéo d'une minute des meilleures images et des moments les plus touchants, résumant au mieux votre journée. Parfait pour partager avec les proches ou sur les réseaux. En format portrait ou paysage.",
    price: 500,
    className: "col-span-3",
    thumbnail: "/produit5.jpg",
  },
]
