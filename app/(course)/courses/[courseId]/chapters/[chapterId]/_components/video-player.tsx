"use client";

import axios from "axios";

import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  courseId: string;
  chapterId: string;
  isLocked: boolean;
  title: string;
  //completeOnEnd: boolean;
  playbackId: string;
}

export const VideoPlayer = ({
  playbackId,
  chapterId,
  //completeOnEnd,
  courseId,
  isLocked,
  title,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(true);

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <video
          controls
          className={cn("aspect-video", !isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          onEnded={() => {}}
          autoPlay
        >
          <source src={`/${playbackId}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};
