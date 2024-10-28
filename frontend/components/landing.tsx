"use client"

import Image from "next/image"
import { Suspense, useEffect, useState } from "react"
import ReactPlayer from "react-player/lazy"

export default function Landing() {
  const [hasWindow, setHasWindow] = useState(false)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true)
    }
  }, [])
  return (
    <>
      <div className="relative h-screen bg-black">
        <video
          className="absolute inset-0 size-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/video_VLS.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 flex justify-center">
          <Image
            src="/logo_VLS.png"
            alt="Logo 1"
            className="lg:w-128 mt-4 h-auto w-96"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="flex h-screen items-center justify-center p-8">
        <div className="mx-auto max-w-4xl px-10">
          <p className=" mb-4 font-serif text-4xl leading-relaxed text-gray-800 lg:text-6xl ">
            “Le soleil est pour tout le monde ; pour tous, il éclaire et
            réchauffe.”
          </p>
          <p className="text-right text-lg text-gray-600">
            — Voltaire, <em>Candide</em>
          </p>
        </div>
      </div>
      <div className="bg-creme flex h-screen items-center justify-center p-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-xl leading-relaxed text-gray-700 lg:text-3xl">
            <strong>voici le soleil</strong> est une maison de production de{" "}
            <strong>films de mariage</strong> basée à Grenoble. Inspirée par la
            beauté du cinéma et l’harmonie du jazz, elle a pour objectif de
            créer un <strong>souvenir unique, intemporel et authentique</strong>{" "}
            de votre mariage.
          </p>
        </div>
      </div>
      <div className="w-full">
        <div className="flex h-screen flex-col items-center justify-center bg-white p-4">
          <p className="font-serif text-3xl font-bold">Thomas & Yoann</p>
          <div className="m-10 w-full ">
            {hasWindow && (
              <Suspense fallback={<div></div>}>
                <ReactPlayer
                  url="https://vimeo.com/848196351"
                  controls
                  // playing
                  loop
                  width="100%"
                />
              </Suspense>
            )}
          </div>
        </div>
        <div className="flex h-screen flex-col items-center justify-center bg-white p-4">
          <p className="font-serif text-3xl font-bold">Camille & Florian</p>
          <div className="m-10 w-full ">
            {hasWindow && (
              <Suspense fallback={<div></div>}>
                <ReactPlayer
                  url="https://vimeo.com/952798505"
                  controls
                  // playing
                  loop
                  width="100%"
                />{" "}
              </Suspense>
            )}
          </div>
        </div>
      </div>
      <div className="h-screen bg-[url('/public/20230708-photo_discretion-2.jpg')] bg-cover bg-center">
        <div className="flex h-full flex-col justify-center ">
          <h2 className="mb-4 text-center font-serif text-3xl font-bold text-white">
            authenticité & discrétion
          </h2>
          <h3 className="text-center font-sans text-xs font-light text-white sm:text-base lg:text-xl">
            Mon but est de capturer des moments authentiques, <br />
            pour enfin construire une histoire structurée au montage.
            <br /> <br />
            Je veux être le plus discret possible pour capter les plus beaux
            sourires,
            <br />
            les plus belles larmes, sans que personne ne le remarque.
            <br />
            <br />
            Je cherche le minimalisme car il est intemporel et touchant.
          </h3>
        </div>
      </div>
      <div className="h-screen bg-[url('/public/photo_montage_video.jpg')] bg-cover bg-center">
        <div className="flex h-full flex-col justify-center ">
          <h2 className="mb-4 text-center font-serif text-5xl font-bold text-white lg:text-7xl">
            Contact
          </h2>
          <h3 className="text-center font-sans text-base font-light text-white lg:text-xl">
            voici.le.soleil.films@gmail.com <br />
            06 44 39 55 98{" "}
          </h3>
        </div>
      </div>
    </>
  )
}
