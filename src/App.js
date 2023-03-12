import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css"


import "@tensorflow/tfjs";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/face_mesh";
import { runDetector } from "./geradorPontos";



function App() {
  const imagem = useRef(null)
  const canva = useRef(null)

  const pointRef = useRef({ x: 0, y: 0, largura: 5, altura: 5 })

  function desenhar() {
    const point = pointRef.current
    //const canva = document.getElementById("canva")
    const contexto = canva.current.getContext("2d")
    //contexto.clearRect(0, 0, 533, 800)
    contexto.fillStyle = "red";
    contexto.fillRect(point.x, point.y, point.largura, point.altura)

    console.log(point.x, point.y, point.largura, point.altura);
  }


  useEffect(() => {

    function chamarQuandoHouverEvento(event) {
      const code = event.code
  
      switch (code) {
        case "KeyW":
          console.log("cima");
          pointRef.current.y = pointRef.current.y - 1
  
          break
        case "KeyS":
          console.log("baixo");
          pointRef.current.y = pointRef.current.y + 1
  
          break
        case "KeyA":
          console.log("esquerda");
  
          pointRef.current.x = pointRef.current.x - 1
          break
        case "KeyD":
          console.log("direita");
          pointRef.current.x = pointRef.current.x + 1
  
          break
  
      }
  
  
      desenhar()
    }

    window.addEventListener("keydown", chamarQuandoHouverEvento)

    return () => {
      window.removeEventListener("keydown", chamarQuandoHouverEvento)
    }
  }, [])

  console.log("mudou");


  async function handleGerarPontos() {
    const faces = await runDetector(imagem.current)

    const { xMax, xMin, yMax, yMin } = faces[0].box





    const contexto = canva.current.getContext("2d")
    contexto.clearRect(0, 0, 533, 800)


    contexto.fillStyle = "yellow";
    contexto.fillRect(xMax, yMax, 5, 5)


    contexto.fillStyle = "yellow";
    contexto.fillRect(xMin, yMin, 5, 5)


    contexto.fillStyle = "yellow";
    contexto.fillRect(xMax, yMin, 5, 5)

    contexto.fillStyle = "yellow";
    contexto.fillRect(xMin, yMax, 5, 5)


    for (let i = 0; i < faces[0].keypoints.length; i++) {
      const { x, y } = faces[0].keypoints[i]

      contexto.fillStyle = "green";
      contexto.fillRect(x, y, 5, 5)
    }

  }



  return (
    <div className="container">
      <div className="boxOverlay">
        <img
          id="ruiva"
          ref={imagem}
          src="ruiva.jpg"
          style={{ position: "absolute" }}
        />

        <canvas
          id="canva"
          ref={canva}
          width={533}
          height={800}

          style={{ position: "absolute" }}
        ></canvas>

      </div>





      <button onClick={handleGerarPontos}>Clicar</button>
    </div>
  );
}

export default App;
