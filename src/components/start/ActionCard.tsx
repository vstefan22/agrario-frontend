import Button from "../common/Button";
import { useRef, useState } from "react";
import playIcon from "../../assets/images/play-video.png";

type ActionCardTypes = {
    buttonText: string;
    isVideo: true;
    videoSrc: string;
    imageSrc?: never;
    onClick: () => void;
} |
{
    buttonText: string;
    isVideo?: false;
    imageSrc: string;
    videoSrc?: never;
    onClick: () => void;
};

const ActionCard = ({ buttonText, isVideo = false, imageSrc, videoSrc, onClick }: ActionCardTypes) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleVideoClick = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVideoEnded = () => {
        setIsPlaying(false);
    };


    return (
        <div className="w-[360px] h-[380px] bg-white shadow-[6px_6px_54px_0px_#0000000D] rounded-2xl flex flex-col">
            {!isVideo ?
                <img src={imageSrc} alt="Card Image 1" className="rounded-t-2xl w-[360px] h-[276px]" /> :
                <div className="relative">
                    <video
                        src={videoSrc}
                        className="rounded-t-2xl w-[360px] h-[276px] object-cover cursor-pointer"
                        muted
                        preload="metadata"
                        ref={videoRef}
                        onClick={handleVideoClick}
                        onEnded={handleVideoEnded}
                    >
                        Your browser does not support the video tag.
                    </video>
                    {!isPlaying && (
                        <img
                            src={playIcon}
                            alt="Play Icon"
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92px] h-[92px] cursor-pointer"
                            onClick={handleVideoClick}
                        />
                    )}
                </div>}
            <div className="h-full flex justify-center items-center">
                <Button type="button" variant="bluePrimary" onClick={onClick}>{buttonText}</Button>
            </div>
        </div>
    );
}

export default ActionCard;