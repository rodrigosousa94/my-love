import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { storyData } from "./data/storyData";
import SecretStage from "./components/SecretStage";


export default function App() {
  const [showTimeline, setShowTimeline] = useState(false);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [secretStage, setSecretStage] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const totalSlides = storyData.length + 3; // 3 slides extras
  

  const next = () => {
    if (current < totalSlides - 1) {
      setDirection("right");
      setCurrent((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (current > 0) {
      setDirection("left");
      setCurrent((prev) => prev - 1);
    }
  };

  const variants = {
    enter: (dir: "left" | "right") => ({
      x: dir === "right" ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: "right" | "left") => ({
      x: dir === "right" ? -300 : 300,
      opacity: 0,
    }),
  };

  // Avança automaticamente do slide "O que pode ser?" para o slide do jogo após 2s
  useEffect(() => {
    if (current === storyData.length + 1) {
      const timer = setTimeout(() => {
        setDirection("right");
        setCurrent((prev) => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [current]);

  const onClickCorrectEmoji = () => {
    setSecretStage(true);
  };

  const onClickWrongEmoji = () => {
    setShowErrorModal(true);
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  if (secretStage) {
    return <SecretStage />;
  }

  return (
    <div className="bg-pink-100 min-h-screen flex items-center justify-center flex-col px-4 py-10 overflow-hidden relative">
      {!showTimeline ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span className="text-7xl animate-pulse">❤️</span>
          </motion.div>

          <motion.p
            className="text-xl text-pink-800 mt-6 mb-8 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            Essa é a nossa história. Feita de amor, risos e momentos eternos.
          </motion.p>

          <motion.button
            className="bg-pink-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-pink-700 transition-all"
            onClick={() => setShowTimeline(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Ver nossa história
          </motion.button>
        </motion.div>
      ) : (
        <>
          <h1 className="text-4xl text-pink-800 font-bold mb-6">Nossa História 💖</h1>

          <div className="w-full max-w-xl relative bg-white rounded-2xl shadow-xl p-6 flex flex-col">
            <AnimatePresence mode="wait" custom={direction}>
              {current < storyData.length ? (
                // Slides normais
                <motion.div
                  key={storyData[current].id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <div>
                    <img
                      src={storyData[current].image}
                      alt={storyData[current].title}
                      className="rounded-xl mb-4 w-full max-h-80 object-cover object-top"
                    />
                    <h2 className="text-2xl font-bold mb-1">{storyData[current].title}</h2>
                    <p className="text-sm text-gray-500 mb-3">{storyData[current].date}</p>
                    <p className="text-gray-700 whitespace-pre-line">{storyData[current].text}</p>
                  </div>
                </motion.div>
              ) : current === storyData.length ? (
                // Slide: "Ainda falta algo para tudo se tornar perfeito..."
                <motion.div
                  key="faltando-slide"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                  className="w-full flex flex-col items-center justify-center h-full"
                >
                  <p className="mb-6 text-xl font-semibold text-pink-600 text-center px-4">
                    Ainda falta algo para tudo se tornar perfeito...
                  </p>
                </motion.div>
              ) : current === storyData.length + 1 ? (
                // Slide: "O que pode ser?" - sem botões e avança automático após 2s
                <motion.div
                  key="o-que-pode-ser-slide"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                  className="w-full flex flex-col items-center justify-center h-full gap-8"
                >
                  <p className="text-xl font-semibold text-pink-600 text-center px-4">O que pode ser?</p>
                </motion.div>
              ) : (
                // Slide do jogo do emoji
                <motion.div
                  key="emoji-game-slide"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                  className="w-full flex flex-col items-center justify-center h-full gap-8"
                >
                  <p className="text-xl font-semibold text-pink-600 text-center px-4">Escolha o emoji certo para continuar</p>
                  <div className="flex gap-10 text-7xl select-none cursor-pointer">
                    <span
                      role="img"
                      aria-label="Coroa"
                      title="Coroa"
                      onClick={onClickWrongEmoji}
                    >
                      👑
                    </span>
                    <span
                      role="img"
                      aria-label="Chupetinha"
                      title="Chupetinha"
                      onClick={onClickCorrectEmoji}
                    >
                      🍼
                    </span>
                    <span
                      role="img"
                      aria-label="Coração partido"
                      title="Coração partido"
                      onClick={onClickWrongEmoji}
                    >
                      💔
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botões só aparecem se não estiver no slide "O que pode ser?" (current !== storyData.length + 1) */}
            {current !== storyData.length + 1 && current < storyData.length + 2 && (
              <div className="mt-6 flex gap-4 justify-center">
                <button
                  onClick={prev}
                  disabled={current === 0}
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg disabled:opacity-40"
                >
                  Anterior
                </button>
                <button
                  onClick={next}
                  disabled={current === totalSlides - 1}
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg disabled:opacity-40"
                >
                  Próximo
                </button>
              </div>
            )}
          </div>

          <p className="text-pink-700 mt-4 font-medium">
            Capítulo {current + 1} de {totalSlides}
          </p>

          {/* Modal simples de erro */}
          <AnimatePresence>
            {showErrorModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.7 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.7 }}
                  className="bg-white rounded-xl p-8 max-w-xs text-center shadow-lg"
                >
                  <p className="mb-4 text-pink-700 font-semibold text-lg">Você errou, tente novamente!</p>
                  <button
                    onClick={closeErrorModal}
                    className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
                  >
                    Fechar
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
