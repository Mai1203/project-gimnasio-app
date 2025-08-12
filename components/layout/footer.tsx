'use client';

// ==========================================
// FOOTER ANIMADO DE LA APLICACIÓN
// ==========================================

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Dumbbell, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter,
  Clock
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'PowerGym',
      items: [
        { label: 'Sobre Nosotros', href: '/about' },
        { label: 'Nuestros Entrenamientos', href: '/workouts' },
        { label: 'Membresías', href: '/plans' },
        { label: 'Testimonios', href: '/testimonials' }
      ]
    },
    {
      title: 'Servicios',
      items: [
        { label: 'Entrenamiento Personal', href: '/personal-training' },
        { label: 'Clases Grupales', href: '/group-classes' },
        { label: 'Nutrición', href: '/nutrition' },
        { label: 'Spa & Relajación', href: '/spa' }
      ]
    },
    {
      title: 'Soporte',
      items: [
        { label: 'Centro de Ayuda', href: '/help' },
        { label: 'Contacto', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Términos de Uso', href: '/terms' }
      ]
    }
  ];

  const contactInfo = [
    { icon: Phone, text: '+52 55 1234 5678', href: 'tel:+5255123456778' },
    { icon: Mail, text: 'info@powergym.com', href: 'mailto:info@powergym.com' },
    { icon: MapPin, text: 'Av. Reforma 123, CDMX', href: '#' },
    { icon: Clock, text: 'Lun-Dom: 5:00 AM - 11:00 PM', href: '#' }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' }
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-black border-t border-slate-800">
      {/* Sección principal del footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Columna de branding */}
          <motion.div
            className="col-span-1 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg">
                <Dumbbell className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                PowerGym
              </span>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Tu destino para el fitness y bienestar. Transformamos vidas a través del ejercicio, 
              la nutrición y el apoyo de nuestra comunidad.
            </p>

            {/* Información de contacto */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-3 text-gray-300 hover:text-amber-400 transition-colors duration-200 group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon size={16} className="group-hover:text-amber-400" />
                    <span className="text-sm">{item.text}</span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Columnas de navegación */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (sectionIndex + 1) * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold text-lg mb-6 relative">
                {section.title}
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
              </h3>
              
              <ul className="space-y-3">
                {section.items.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm group"
                    >
                      <motion.span
                        className="border-b border-transparent group-hover:border-amber-500 transition-colors duration-200"
                        whileHover={{ x: 3 }}
                      >
                        {item.label}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter sección */}
        <motion.div
          className="mt-12 pt-8 border-t border-slate-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="text-white font-semibold text-xl mb-2">
                Mantente en forma con nuestras noticias
              </h3>
              <p className="text-gray-400">
                Recibe tips de entrenamiento, ofertas exclusivas y más directamente en tu email.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
              />
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Suscribirse
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sección inferior */}
      <div className="border-t border-slate-800 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            
            {/* Copyright */}
            <motion.p
              className="text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              © {currentYear} PowerGym. Todos los derechos reservados.
            </motion.p>

            {/* Redes sociales */}
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-gray-400 text-sm mr-2">Síguenos:</span>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;