import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  moveVideos,
  stepVideosCarousel
} from "../../../../redux/actions/carouselActions";
import { useCarouselCard } from "../../../../hooks/carouselHooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import "./video-card.css";

const VideoCard = ({
  cardIndex,
  videos,
  currentIndex,
  stepCarousel,
  delta,
  widthScale,
  moveCarousel
}) => {
  const [leftPosition, onMoveStart, onMove, onMoveEnd] = useCarouselCard(
    cardIndex,
    352 * widthScale,
    currentIndex,
    delta,
    moveCarousel,
    stepCarousel,
    videos.length
  );
  const [videoHeight, setVideoHeight] = useState(0);
  const [videoWidth, setVideoWidth] = useState(0);
  const [canPlay, setCanPlay] = useState(false);
  const [playing, setPlaying] = useState(false);

  const video = useRef(null);

  const onLoadedMetadata = () => {
    if (videoHeight === 0) {
      setVideoHeight(
        (352 * video.current.videoHeight * widthScale) /
          video.current.videoWidth
      );
      setVideoWidth(352 * widthScale);
    }
  };

  const onCanPlayThrough = () => {
    setCanPlay(true);
  };

  const onCardClick = () => {
    if (video.current.paused) {
      video.current.play();
    } else {
      video.current.pause();
    }
  };

  const onPlay = () => {
    setPlaying(true);
  };

  const onPause = () => {
    setPlaying(false);
  };

  const onEnded = () => {
    video.current.load();
  };

  return (
    <>
      <video
        ref={video}
        width={videoWidth}
        height={videoHeight}
        disablepictureinpicture="true"
        playsInline
        onLoadedMetadata={onLoadedMetadata}
        onLoad={onEnded}
        onCanPlayThrough={onCanPlayThrough}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
        controls={playing ? true : false}
        className="video-card"
        src={videos[cardIndex] + "#t=0.001"}
        style={{
          "--left-position": leftPosition + "px",
          "--width-scale": widthScale
        }}
      >
        Disculpe, su navegador no soporta este tipo de videos
      </video>
      <div
        className={"video-card-controls" + (playing ? " playing" : "")}
        onTouchStart={(e) => onMoveStart(e)}
        onTouchMove={(e) => onMove(e)}
        onTouchEnd={(e) => onMoveEnd(e)}
        style={{
          "--left-position": leftPosition + "px",
          "--video-card-height": videoHeight + "px",
          "--video-card-width": videoWidth + "px"
        }}
        onClick={onCardClick}
      >
        {canPlay && !playing && (
          <FontAwesomeIcon
            icon={faPlayCircle}
            style={{
              color: "rgb(0, 122, 255)",
              cursor: "pointer",
              height: "73px",
              width: "73px"
            }}
          />
        )}
      </div>
    </>
  );
};

VideoCard.propTypes = {
  cardIndex: PropTypes.number.isRequired,
  videos: PropTypes.array.isRequired,
  currentIndex: PropTypes.number.isRequired,
  stepCarousel: PropTypes.func.isRequired,
  delta: PropTypes.number.isRequired,
  widthScale: PropTypes.number.isRequired,
  moveCarousel: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    delta: state.videosCarousel.delta,
    currentIndex: state.videosCarousel.currentIndex,
    widthScale: state.constants.widthScale
  };
};

const mapDispatchToProps = {
  moveCarousel: moveVideos,
  stepCarousel: stepVideosCarousel
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoCard);
