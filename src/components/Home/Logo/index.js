import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import TahaImg from '../../../assets/images/tahamoula.png' // make sure this path/file exists
import './index.scss'

const Logo = () => {
  const containerRef = useRef(null)
  const maskRectRef  = useRef(null)
  const outlineRef   = useRef(null)
  const colorRef     = useRef(null)
  const ringRef      = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    // initial states
    gsap.set(containerRef.current, { opacity: 0, scale: 0.96, rotate: -2, filter: 'blur(6px)' })
    gsap.set(maskRectRef.current, { attr: { width: 0 } })
    gsap.set(outlineRef.current, { opacity: 0 })
    gsap.set(colorRef.current,   { opacity: 0 })
    gsap.set(ringRef.current,    { opacity: 0 })

    tl.to(containerRef.current, { opacity: 1, duration: 0.2 })
      // cinematic entrance: deblur + scale/rotate to rest
      .to(containerRef.current, { filter: 'blur(0px)', scale: 1, rotate: 0, duration: 1.0, ease: 'power3.out' }, '<')
      // sweep reveal (left -> right)
      .to(maskRectRef.current,  { attr: { width: 200 }, duration: 1.4 }, '<0.1')
      .to(outlineRef.current,   { opacity: 0.8, duration: 0.2 }, '<')
      // color fades in as sketch finishes
      .to(colorRef.current,     { opacity: 1, duration: 0.8 }, '>-0.2')
      .to(outlineRef.current,   { opacity: 0, duration: 0.5 }, '<')
      // glow ring pops in with a soft pulse
      .to(ringRef.current,      { opacity: 1, duration: 0.35 }, '<0.05')
      .fromTo(ringRef.current,  { scale: 1 }, { scale: 1.04, duration: 1.1, yoyo: true, repeat: 1, transformOrigin: '50% 50%', ease: 'sine.inOut' }, '<')

    return () => tl.kill()
  }, [])

  return (
    <div className="logo-portrait" ref={containerRef}>
      <svg className="portrait-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          {/* circular crop */}
          <clipPath id="pfClip">
            <circle cx="100" cy="100" r="95" />
          </clipPath>

          {/* sweep mask for reveal */}
          <mask id="revealMask" x="0" y="0" width="200" height="200">
            <rect x="0" y="0" width="200" height="200" fill="black" />
            <rect ref={maskRectRef} x="0" y="0" height="200" width="0" fill="white" />
          </mask>

          {/* edges filter for a subtle sketch look during reveal */}
          <filter id="edges" x="-20%" y="-20%" width="140%" height="140%">
            <feConvolveMatrix order="3" kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1" result="edge" />
            <feColorMatrix in="edge" type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncR type="gamma" exponent="0.5" amplitude="1" />
              <feFuncG type="gamma" exponent="0.5" amplitude="1" />
              <feFuncB type="gamma" exponent="0.5" amplitude="1" />
            </feComponentTransfer>
          </filter>

          {/* bright border gradient */}
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"  stopColor="#ffffff"/>
            <stop offset="50%" stopColor="#c2ac30ff"/>
            <stop offset="100%" stopColor="#ffffff"/>
          </linearGradient>
        </defs>

        {/* sketch layer (masked sweep) */}
        <image
          ref={outlineRef}
          href={TahaImg}
          x="0" y="0" width="200" height="200"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#pfClip)"
          mask="url(#revealMask)"
          filter="url(#edges)"
          className="img-zoom"
        />

        {/* color layer */}
        <image
          ref={colorRef}
          href={TahaImg}
          x="0" y="0" width="200" height="250"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#pfClip)"
          className="img-zoom"
        />

        {/* bright glow ring */}
        <circle
          ref={ringRef}
          cx="100" cy="100" r="96"
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="3.5"
          className="glow-ring"
        />
      </svg>
    </div>
  )
}

export default Logo
