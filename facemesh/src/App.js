import React, {useRef} from 'react';
import './App.css';
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from 'react-webcam';

function App() {
  //references setup
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //loading facemesh
  const runFacemesh= async()=>{
    const net= await facemesh.load({
      inputResolution:{width:640, height:480}, scale:0.8
    });
    setInterval(()=>{
      detect(net)
    },100)
  };

  //Detect function
  const detect= async(net)=>{
    if(
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ){
      // video properties
      const video =webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight= webcamRef.current.video.videoHeight;

      // set video width and height
      webcamRef.current.video.width=videoWidth;
      webcamRef.current.video.height=videoHeight;

      // set canvas width and height
      canvasRef.current.width = videoWidth;
      canvasRef.current.height= videoHeight;

      //making detections
      const face= await net.estimateFaces(video);
      console.log(face);

    }
  };


  runFacemesh();
  return (
    <div className="App">
      <header className="App-header">
        <Webcam ref={webcamRef} style={
          {
            position:"absolute",
            marginLeft:"auto",
            marginRight:"auto",
            left:0,
            right:0,
            textAlign:"center",
            zIndex:9,
            width:640,
            height:480
          }}
        />

        <canvas ref={canvasRef} style={
          {
            position:"absolute",
            marginLeft:"auto",
            marginRight:"auto",
            left:0,
            right:0,
            textAlign:"center",
            zIndex:9,
            width:640,
            height:480
          }}
        />
        </header>
    </div>
  );
}

export default App;
