
import React from 'react';
import { PlayCircleIcon } from './icons';

interface VideoPlayerProps {
  videoId: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, title }) => {
  const titleId = `video-title-${videoId}`;

  return (
    <section className="my-4 bg-slate-800/50 rounded-lg p-6 flex flex-col items-center" aria-labelledby={titleId}>
        <div className="flex items-center gap-4 mb-4">
             <div className="w-8 h-8 text-blue-400"><PlayCircleIcon /></div>
             <h3 id={titleId} className="text-xl font-semibold text-slate-200">{title}</h3>
        </div>
      <div className="aspect-video w-full max-w-3xl rounded-lg overflow-hidden shadow-lg">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          style={{ border: 0 }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default VideoPlayer;
