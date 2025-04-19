import { useEffect, useRef } from 'react'

function AnimatedBackground() {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let particles = []
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resize)

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = 'rgba(255, 0, 204, 0.3)'
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
        p.x += p.dx
        p.y += p.dy

        if (p.x < 0 || p.x > width) p.dx *= -1
        if (p.y < 0 || p.y > height) p.dy *= -1
      })
      requestAnimationFrame(draw)
    }

    draw()
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 -z-1 w-screen h-screen pointer-events-none opacity-1000"
    />
  )
}

export default AnimatedBackground
