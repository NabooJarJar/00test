"use client";

import { useRef, useState, useEffect } from "react";
import {Play, Pause} from "lucide-react";


import Link from "next/link";
import React from "react";
import MusicPlayer from "@/components/MusicPlayer";


export default function Home() {



  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      {/* Title */}
      <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-black sm:text-6xl md:text-8xl whitespace-nowrap bg-clip-text">
        FRANCESCO ZELA
      </h1>

      {/* Navigation */}
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-around gap-10">
          <li>
            <Link
              href="/gallery"
              className="text-lg duration-500 text-zinc-500 hover:text-white hover:border hover:p-2 hover:rounded"
            >
              Gallery
            </Link>

          </li>
          <li>
            <Link
              href="/about"
              className="text-lg duration-500 text-zinc-500 hover:text-white hover:border-1 hover:p-2 hover:rounded"
            >
              About Me
            </Link>
          </li>
          <li className="text-lg text-white border-1 p-2 rounded cursor-pointer">FZ © 2025-2026</li>
        </ul>
      </nav>
      {/** Player */}
        <MusicPlayer  
          className=" mt-6 border border-zinc-700"
        src="/audi.mp3" title="Chill Vibes"  />
    </div>
  );
}
