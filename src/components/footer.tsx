'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Phone, Mail, Clock, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current)
      }
    }
  }, [])

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-black border-t border-white/10 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 md:px-6   relative z-10">
        {/* Logo Section */}
       <div
  className={`flex justify-center transition-all duration-1000 ease-out ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  }`}
>

           <Link href="/" className="relative h-36 md:h-48 w-56 md:w-72">
    <div className="relative w-full h-full">
      <Image
        src="/images/logorem.png"
        alt="Yahya Parfumerie"
        fill
        className="object-contain"
        priority
      />
    </div>
  </Link>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12">
          {/* SERVICE CLIENT */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">
              Service Client
            </h3>
            <div className="space-y-4">
              <a
                href="tel:+212535401149"
                className="flex items-center gap-3 text-white/50 hover:text-accent transition-colors duration-300 group"
              >
                <Phone className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-sm">+212 5 35 40 11 49</span>
              </a>
              <a
                href="tel:+212623159261"
                className="flex items-center gap-3 text-white/50 hover:text-accent transition-colors duration-300 group"
              >
                <Phone className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-sm">+212 6 23 15 92 61</span>
              </a>
              <a
                href="mailto:Yahya79@gmail.com"
                className="flex items-center gap-3 text-white/50 hover:text-accent transition-colors duration-300 group"
              >
                <Mail className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-sm break-all">Yahya79@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-white/50">
                <Clock className="w-4 h-4" />
                <span className="text-sm">7j / 7j</span>
              </div>
              <div className="flex items-center gap-3 text-white/50">
                <Clock className="w-4 h-4" />
                <span className="text-sm">10h00 - 22h30</span>
              </div>
              <div className="flex items-center gap-3 text-white/50">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">MEKNES - Maroc</span>
              </div>
            </div>
          </div>

          {/* MENU */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">
              Menu
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Parfums', href: '/products/parfum' },
                { label: 'Maquillage', href: '/products/maquillage' },
                { label: 'Coloration', href: '/products/coloration' },
                { label: 'Appareils Électriques', href: '/products/appareils' },
                { label: 'Ongles', href: '/products/ongles' },
                { label: 'Soins', href: '/products/soins' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/50 hover:text-accent transition-colors duration-300 inline-block hover:translate-x-1 transform"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* PAGES LÉGALES */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">
              Pages Légales
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'CGV', href: '/cgv' },
                { label: 'Politique de confidentialité', href: '/confidentialite' },
                { label: 'Politique de retour', href: '/retour' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/50 hover:text-accent transition-colors duration-300 inline-block hover:translate-x-1 transform"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUIVEZ-NOUS */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">
              Suivez-nous
            </h3>
            <div className="space-y-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/50 hover:text-accent transition-all duration-300 group"
              >
                <Facebook className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-sm">Facebook</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/50 hover:text-accent transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-sm">Instagram</span>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/50 hover:text-accent transition-all duration-300 group"
              >
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
                <span className="text-sm">TikTok</span>
              </a>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">
              Inscrivez-vous sur notre newsletter
            </h3>
            <p className="text-sm text-white/50 mb-6 leading-relaxed">
              Soyez les premiers à découvrir nos dernières nouveautés et offres exclusives directement dans votre boîte mail !
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-accent transition-colors duration-300"
              />
              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-all duration-300 hover:scale-105"
              >
                S&apos;inscrire
              </Button>
            </form>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center text-white hover:text-accent-foreground transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center text-white hover:text-accent-foreground transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center text-white hover:text-accent-foreground transition-all duration-300 hover:scale-110"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`border-t border-white/10 pt-8 text-center transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <p className="text-sm text-white/50">
            © 2026,{' '}
            <Link
              href="/"
              className="text-accent hover:underline transition-all duration-300"
            >
              Parfumerie Yahya
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}