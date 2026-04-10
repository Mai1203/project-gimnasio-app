'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Compañía',
      items: [
        { label: 'Sobre Nosotros', href: '/about' },
        { label: 'Entrenamientos', href: '/training' },
        { label: 'Membresías', href: '/plans' },
      ],
    },
    {
      title: 'Servicios',
      items: [
        { label: 'Personalizado', href: '/personal-training' },
        { label: 'Disciplinas', href: '/classes' },
        { label: 'Spa & Recovery', href: '/spa' },
      ],
    },
    {
      title: 'Legal',
      items: [
        { label: 'Privacidad', href: '/privacy' },
        { label: 'Términos', href: '/terms' },
        { label: 'Cookies', href: '/cookies' },
      ],
    },
  ];

  return (
    <footer className="relative z-30 py-24 text-white bg-black border-t border-white/10 md:py-32">
      <div className="px-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-32">
          {/* Logo y Manifesto */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center mb-10 space-x-4">
              <Image 
                src="/Logo.svg" 
                alt="Logo" 
                width={32} 
                height={32} 
                className="object-contain brightness-0 invert" 
              />
              <span className="text-xs font-black tracking-[0.6em] uppercase">
                Esthetic <span className="italic text-primary">Gym</span>
              </span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] leading-loose text-white max-w-xs">
              El nexo entre la arquitectura del cuerpo y la ciencia del rendimiento. Elevando el estándar del fitness en Colombia.
            </p>
          </div>

          {/* Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-10">
                {section.title}
              </h3>
              <ul className="space-y-6">
                {section.items.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-[10px] font-bold uppercase tracking-[0.3em] text-white hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-8 justify-between items-center pt-12 mt-24 border-t md:mt-32 border-white/10 md:flex-row">
          <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">
            &copy; {currentYear} Esthetic Gym. El Estándar de la Fuerza.
          </div>
          <div className="flex space-x-10">
            {['Instagram', 'Twitter', 'Facebook'].map(social => (
              <a key={social} href="#" className="text-[10px] font-black uppercase tracking-[0.6em] text-white hover:text-primary transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
