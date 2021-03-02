import React, { useRef, useEffect, useCallback, useState } from 'react'
import logo from './logo.svg';

const Canvas = (props: any) => {
  const canvasRef = useRef(null)
  const [text, setText] = useState('');
  const [base64Image, setBase64Image] = useState('')
  const onChange = useCallback(({ target }) => {
    setText(target.value)
  }, []);

  useEffect(() => {
    const canvas: any = canvasRef.current
    const context = canvas.getContext('2d')
    const draw = (ctx: any) => {
      console.log(text)
      ctx.font = '48px serif';
      ctx.fillText(text, 10, 50)
    }
    const image = new Image()
    image.src = logo;
    image.onload = () => {
      context.drawImage(image, 0, 0, 300, 300)
      draw(context)
      setBase64Image(canvas.toDataURL('image/png'))
    };

  }, [text, setText])

  return (
    <>
      <input placeholder="please input..." onChange={e => onChange(e)} style={{fontSize: '16px'}}></input>
      <canvas ref={canvasRef} {...props} width="300" height="300" />
      {canvasRef.current &&
        <a download="image.png" href={base64Image}>save</a>
      }
    </>
  )
}

export default Canvas