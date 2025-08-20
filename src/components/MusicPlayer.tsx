"use client";
import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

interface MusicPlayerProps {
  className?: string;
  src: string;
  title?: string;
}

export default function MusicPlayer({ className = "", src, title = "Track" }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.muted = false; // unmute when user clicks
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);

    // try autoplay muted
    audio.muted = true;
    audio.play().catch(() => {
      console.log("Autoplay blocked until user interacts.");
    });

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
    };
  }, []);

  return (
    <div
      className={`flex items-center gap-3  px-4 py-2 text-zinc-400 bg-zinc-900 rounded-full shadow-lg ${className}`}
    >
      {/* Play / Pause */}
      <button
        onClick={togglePlay}
        className="p-2 rounded-full hover:bg-zinc-800 transition"
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>

      {/* Title */}
      <span className="text-sm w-28 truncate">{title}</span>

      {/* Progress */}
      <input
        type="range"
        min={0}
        max={duration || 0}
        step={0.1}
        value={progress}
        onChange={handleSeek}
        className="flex-1 accent-zinc-200 cursor-pointer"
      />

      {/* Time */}
      <span className="text-xs w-12 bg-zinc-800 py-0.5 text-center rounded text-white">
        {formatTime(progress)}
      </span>
      <span className="text-xs w-12 text-right">{formatTime(duration)}</span>

      {/* Volume */}
      <div className="flex items-center gap-2 w-28">
        <Volume2 size={16} />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolume}
          className="w-full accent-zinc-500 cursor-pointer"
        />
      </div>

      <audio ref={audioRef} src={src} preload="auto" />
    </div>
  );
}
