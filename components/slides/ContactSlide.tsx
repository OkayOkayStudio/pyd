import { motion } from 'framer-motion'
import { Mail, Phone, Globe, MessageCircle } from 'lucide-react'

export default function ContactSlide() {
  return (
    <div className="text-left">
      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-light mb-8"
      >
        Ready to Recover?
      </motion.h2>
      
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-12 rounded-xl max-w-2xl mx-auto"
      >
        <h3 className="text-2xl font-light mb-8">Let&apos;s Start Your Recovery Today</h3>
        
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="flex items-center gap-3">
            <Mail className="" size={12} />
            <span>hello@pydagency.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="" size={12} />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="text-purple-400" size={12} />
            <span>www.pydagency.com</span>
          </div>
          <div className="flex items-center gap-3">
            <MessageCircle className="" size={12} />
            <span>Free consultation</span>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600  px-8 py-4 rounded-lg font-light text-lg"
        >
          Schedule Emergency Call
        </motion.button>
      </motion.div>
      
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 "
      >
        Every day you wait, you lose more revenue to competitors
      </motion.div>
    </div>
  )
}