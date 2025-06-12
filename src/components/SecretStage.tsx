import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import LoveCompleted from './LoveCompleted'

export default function SecretStage() {
  const [found, setFound] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFound(true)
    }, 3000) // 3 segundos

    return () => clearTimeout(timer)
  }, [])

  if (found) return <LoveCompleted />

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-6xl mb-4"
      >
        🧩
      </motion.div>
      <p className="text-xl mt-4 max-w-md mx-auto">
        Algo está para acontecer... Esta é a peça do quebra-cabeças que faltava na nossa vida!
      </p>
    </div>
  )
}
