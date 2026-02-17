import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoSectionProps {
    src: string;
    poster?: string;
    className?: string;
    title?: string;
}

export const VideoSection = ({ src, poster, className = '', title }: VideoSectionProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.5, once: false });

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true); // Default to muted for autoplay compatibility
    const [progress, setProgress] = useState(0);

    // Auto-pause when out of view
    useEffect(() => {
        if (videoRef.current) {
            if (!isInView && isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    }, [isInView, isPlaying]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(progress);
        }
    };

    const handleVideoEnded = () => {
        setIsPlaying(false);
        setProgress(100);
    };

    return (
        <section
            ref={containerRef}
            className={`relative flex min-h-[50vh] w-full flex-col items-center justify-center py-24 ${className}`}
        >
            {title && (
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8 text-center font-display text-2xl text-white md:text-4xl"
                >
                    {title}
                </motion.h3>
            )}

            <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-xl shadow-2xl">
                <video
                    ref={videoRef}
                    src={src}
                    poster={poster}
                    className="w-full cursor-pointer object-cover"
                    onClick={togglePlay}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleVideoEnded}
                    muted={isMuted}
                    playsInline
                />

                {/* Play/Pause Overlay Button */}
                <div
                    className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
                        }`}
                    onClick={togglePlay}
                >
                    <button className="rounded-full bg-white/20 p-4 backdrop-blur-sm transition-transform hover:scale-110">
                        {isPlaying ? (
                            <Pause className="h-8 w-8 text-white fill-current" />
                        ) : (
                            <Play className="h-8 w-8 text-white fill-current ml-1" />
                        )}
                    </button>
                </div>

                {/* Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center justify-between gap-4">
                        {/* Progress Bar */}
                        <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/30">
                            <div
                                className="absolute inset-y-0 left-0 bg-primary transition-all duration-100"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* Mute Button */}
                        <button
                            onClick={toggleMute}
                            className="text-white hover:text-primary transition-colors"
                        >
                            {isMuted ? (
                                <VolumeX className="h-5 w-5" />
                            ) : (
                                <Volume2 className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
