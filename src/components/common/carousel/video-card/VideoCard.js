import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  moveVideos,
  stepVideosCarousel
} from "../../../../redux/actions/carouselActions";
import { useCarouselCard } from "../../../../hooks/carouselHooks";
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

  return (
    <>
      <video
        ref={video}
        width={352 * widthScale}
        height={videoHeight * widthScale}
        onLoadedMetadata={onLoadedMetadata}
        onTouchStart={(e) => onMoveStart(e)}
        onTouchMove={(e) => onMove(e)}
        onTouchEnd={(e) => onMoveEnd(e)}
        controls
        className="video-card"
        src={"../../../../assets/" + videos[cardIndex]}
        style={{
          "--left-position": leftPosition + "px",
          "--width-scale": widthScale
        }}
      ></video>
      {/* <div
        className="video-card-controls"
        onTouchStart={(e) => onMoveStart(e)}
        onTouchMove={(e) => onMove(e)}
        onTouchEnd={(e) => onMoveEnd(e)}
        style={{
          "--left-position": leftPosition + "px",
          "--video-card-height": videoHeight + "px",
          "--video-card-width": videoWidth + "px"
        }}
      ></div> */}
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
