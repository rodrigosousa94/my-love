import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Timeline() {
  const [showSecretStage, setShowSecretStage] = useState(false)
  const [foundPiece, setFoundPiece] = useState(false)

  if (foundPiece) {
    // Tela final com o menininho (surpresa)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <motion.img
          src="/menino-desenhado.png"
          alt="Nosso filho"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-48 h-auto"
        />
        <motion.h2
          className="text-2xl mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Você encontrou o que completa a nossa história: o nosso maior presente.
        </motion.h2>
      </div>
    )
  }

  if (showSecretStage) {
    // Tela da caça ao tesouro
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-6xl"
        >
          💔
        </motion.div>
        <p className="text-xl mt-4">Algo está faltando... encontre a peça do nosso amor!</p>

        <div className="flex gap-6 mt-8">
          {['🧸', '🧩', '🍭'].map((emoji, i) => (
            <button
              key={i}
              onClick={() => emoji === '🧩' && setFoundPiece(true)}
              className="text-4xl hover:scale-125 transition-transform"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Tela normal da timeline com emoji mais visível
  return (
    <div style={{ position: 'relative', padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      {/* Outros capítulos... */}

      {/* Último capítulo */}
      <motion.div
        key="chapter-final"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        style={{
          border: '2px solid #f87171',
          borderRadius: '12px',
          padding: '1.5rem',
          marginTop: '2rem',
          position: 'relative',
          backgroundColor: '#fff0f0',
        }}
      >
        <h2>Nosso Último Capítulo</h2>
        <p>Esse momento é muito especial para nós...</p>

        {/* Emoji chupeta mais visível */}
        <span
          role="button"
          aria-label="Peça escondida"
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            fontSize: '3rem',
            opacity: 0.5,
            cursor: 'pointer',
            userSelect: 'none',
            transition: 'opacity 0.3s',
          }}
          onClick={() => setShowSecretStage(true)}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}
        >
          🍼
        </span>
      </motion.div>
    </div>
  )
}
