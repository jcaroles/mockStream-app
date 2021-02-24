import React, { useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import flv from "flv.js"; //for video

import { fetchStream } from "../../actions";

const StreamShow = (props) => {
  const videoRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(videoRef);
    dispatch(fetchStream(props.match.params.id));
    const player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${props.match.params.id}.flv`, //${props.match.params.id} is stream_key of OBS
    });
    player.attachMediaElement(videoRef.current);
    player.load();

    return () => {
      player.destroy();
    };
  }, [dispatch, props.match.params.id]);

  const render = () => {
    //put video here cos when first rendered, it wont render video ref cos it wont go to else statement
    if (!props.stream) {
      return (
        <div>
          <video ref={videoRef} style={{ width: "100%" }} controls={true} />
        </div>
      );
    } else {
      // controls have controls in video
      // ref to hook up the flv for video
      return (
        <div>
          <video ref={videoRef} style={{ width: "100%" }} controls={true} />
          <h1>{props.stream.title}</h1>
          <h5>{props.stream.description}</h5>
        </div>
      );
    }
  };

  return <div>{render()}</div>;
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
