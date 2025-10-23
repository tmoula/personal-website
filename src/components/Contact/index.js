// src/components/Contact/index.js
import { useEffect, useRef, useState } from 'react'
import Loader from 'react-loaders'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'
import 'leaflet/dist/leaflet.css'
import emailjs from '@emailjs/browser'

// Leaflet marker icon fixes
import L from 'leaflet'
import marker2x from 'leaflet/dist/images/marker-icon-2x.png'
import marker1x from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: marker1x,
  shadowUrl: markerShadow,
})

/** ---------- ENV VARS: define FIRST ---------- */
// Vite first, CRA fallback
const SERVICE_ID =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_EMAILJS_SERVICE_ID) ||
  process.env.REACT_APP_EMAILJS_SERVICE_ID

const TEMPLATE_ID =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_EMAILJS_TEMPLATE_ID) ||
  process.env.REACT_APP_EMAILJS_TEMPLATE_ID

const PUBLIC_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_EMAILJS_PUBLIC_KEY) ||
  process.env.REACT_APP_EMAILJS_PUBLIC_KEY

// TEMP: verify values
console.log('EmailJS SERVICE:', SERVICE_ID)
console.log('EmailJS TEMPLATE:', TEMPLATE_ID)
console.log('EmailJS KEY:', PUBLIC_KEY ? PUBLIC_KEY.slice(0, 4) + '***' : 'undefined')

// OPTIONAL: init AFTER PUBLIC_KEY exists
if (PUBLIC_KEY) {
  emailjs.init(PUBLIC_KEY)
}

/** ------------------------------------------- */

// Fix Leaflet sizing after entrance animations
function ResizeMapOnShow({ delay = 900 }) {
  const map = useMap()
  useEffect(() => {
    const id = setTimeout(() => map.invalidateSize(), delay)
    return () => clearTimeout(id)
  }, [map, delay])
  return null
}

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const formRef = useRef(null)

  useEffect(() => {
    const id = setTimeout(() => setLetterClass('text-animate-hover'), 3000)
    return () => clearTimeout(id)
  }, [])

  const sendEmail = async (e) => {
    e.preventDefault()
    try {
      // You can keep the key here even if you called init — both are fine.
      const res = await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      console.log('EmailJS success:', res)
      alert('Message successfully sent!')
      e.target.reset()
    } catch (err) {
      console.error('EmailJS error object:', err)
      alert(`Failed to send: ${err?.text || err?.message || 'see console'}`)
    }
  }

  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'M', 'e']}
              idx={15}
            />
          </h1>
        <h2>
          <p className="subtitle">
            I’m interested in any learning opportunities whether internships or projects. If you have other
            requests or questions, use the form below.
          </p>
        </h2>

          <div className="contact-form">
            <form ref={formRef} onSubmit={sendEmail}>
              <ul>
                <li><input placeholder="Name" type="text" name="from_name" required /></li>
                <li><input placeholder="Email" type="email" name="reply_to" required /></li>
                <li><input placeholder="Subject" type="text" name="subject" required /></li>
                <li><textarea placeholder="Message" name="message" required /></li>
                <li className="actions"><input type="submit" className="flat-button" value="SEND" /></li>
              </ul>
            </form>
          </div>
        </div>

        <div className="map-wrap">
          <MapContainer center={[41.7475, -72.6901]} zoom={15} scrollWheelZoom={false}>
            <ResizeMapOnShow />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
            <Marker position={[41.7475, -72.6901]}>
              <Popup>Trinity College — Hartford, CT 🎓</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      <Loader type="ball-spin-fade-loader" active className="loader-active" />
    </>
  )
}

export default Contact
