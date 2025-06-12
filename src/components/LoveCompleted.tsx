import { motion } from 'framer-motion'

export default function LoveCompleted() {
  const carColors = [
    "text-red-400",
    "text-yellow-400",
    "text-green-400",
    "text-blue-400",
    "text-purple-400",
    "text-pink-400",
  ];

  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-center px-6 bg-blue-100 overflow-hidden">
      {/* Carrinhos coloridos no fundo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none grid grid-cols-8 gap-10 p-12 opacity-20"
        style={{ zIndex: 0 }}
      >
        {Array.from({ length: 50 }).map((_, i) => {
          const colorClass = carColors[i % carColors.length];
          return (
            <span
              key={i}
              className={`${colorClass} text-5xl select-none animate-pulse`}
            >
              🧸
            </span>
          );
        })}
      </div>

      {/* Imagem grande e texto */}
      <motion.img
        src="/menino-desenhado.png"
        alt="Nosso filho"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-[400px] md:w-[500px] h-auto rounded-3xl shadow-xl z-10"
      />

      <motion.h2
        className="text-2xl md:text-3xl mt-8 max-w-3xl text-blue-900 font-semibold drop-shadow-md z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Quero agradecer por me dar o maior presente que alguém pode receber: um filho lindo, carinhoso e inteligente. Ele é minha inspiração diária, minha força para seguir em frente e sempre buscar ser uma pessoa melhor e mais dedicada. Mesmo quando falho, é pensando em vocês que encontro motivação para continuar lutando e crescendo. Obrigado por esse amor que transforma minha vida todos os dias.
      </motion.h2>
    </div>
  )
}
