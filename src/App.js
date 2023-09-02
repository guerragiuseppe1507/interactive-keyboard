import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Spline from '@splinetool/react-spline';

function App() {
  const spline = useRef();
  const splineToggle = useRef();
  let toggle = false;

  function onLoad(splineApp) {
    // save the app in a ref for later use 
    spline.current = splineApp;
    spline.current.setZoom(1);
  }

  function onLoadToggle(splineApp) {
    // save the app in a ref for later use
    splineToggle.current = splineApp;
  }

  function Key1Down(key) {
    spline.current.emitEvent('keyDown', key);
  }

  function Key1Up(key) {
    spline.current.emitEvent('keyUp', key);
  }

  function onMouseDown(e) {
    if (e.target.name === 'Group') {
      if(toggle){
        spline.current.emitEvent('keyUp', "KEY 1");
        spline.current.emitEvent('keyUp', "KEY 2");
        spline.current.emitEvent('keyUp', "KEY 0");
        spline.current.emitEvent('keyUp', "KEY GO");
      } else {
        spline.current.emitEvent('keyDown', "KEY 1");
        spline.current.emitEvent('keyDown', "KEY 2");
        spline.current.emitEvent('keyDown', "KEY 0");
        spline.current.emitEvent('keyDown', "KEY GO");
      }
      toggle = !toggle;
    }
  }

  const toggleStyle = {
    position: "fixed", // camel cased
    width: "300px",
    height: "600px",
    top: "0px",
    left: "0px",
    zIndex: "-1"
  }

  const keyboardStyle = {
    position: "fixed", // camel cased
    width: "100%",
    height: "100%",
    top: "0px",
    left: "0px",
    zIndex: "-2"
  }

  const buttonStyle = {
    position: "relative",
    margin: "0 auto",
    width: "400px",
  }

  return (
    <div>
      <div style={buttonStyle}>
        <button type="button" 
          onMouseUp={(event) => Key1Up("KEY 1")} 
          onMouseDown={(event) => Key1Down("KEY 1")}>
          Press Key 1
        </button>

        <button type="button" 
          onMouseUp={(event) => Key1Up("KEY 2")} 
          onMouseDown={(event) => Key1Down("KEY 2")}>
          Press Key 2
        </button>

        <button type="button" 
          onMouseUp={(event) => Key1Up("KEY 0")} 
          onMouseDown={(event) => Key1Down("KEY 0")}>
          Press Key 0
        </button>

        <button type="button" 
          onMouseUp={(event) => Key1Up("KEY GO")} 
          onMouseDown={(event) => Key1Down("KEY GO")}>
          Press Key GO
        </button>
      </div>
      <div style={toggleStyle}>
        <Spline scene={process.env.PUBLIC_URL + "scene-toggle.splinecode"} onLoad={onLoadToggle} onMouseDown={onMouseDown} />
      </div>
      <div style={keyboardStyle}>
        <Spline scene={process.env.PUBLIC_URL + "scene.splinecode"} onLoad={onLoad} onWheel={(e) => null}/>
      </div>
    </div>
  );
}

export default App;
