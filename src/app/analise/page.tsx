"use client";
import { useEffect, useState } from "react";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useRouter } from "next/navigation";

type EmotionKey =
  | "happy"
  | "sad"
  | "angry"
  | "surprised"
  | "fear"
  | "disgust"
  | "neutral";
type EmotionAverages = Record<EmotionKey, number>;

export default function Analise() {
  const router = useRouter();

  const [latestEmotion, setLatestEmotion] = useState<string>("");

  const [emotionAverages, setEmotionAverages] = useState<EmotionAverages>({
    happy: 0,
    sad: 0,
    angry: 0,
    surprised: 0,
    fear: 0,
    disgust: 0,
    neutral: 0,
  });

  useEffect(() => {
    const sessionsRef = collection(db, "dbfelpi");
    const q = query(sessionsRef, orderBy("created_at", "desc"), limit(1));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const latestSession = querySnapshot.docs[0]?.data();
      if (
        !latestSession ||
        !Array.isArray(latestSession.analises) ||
        latestSession.analises.length === 0
      ) {
        setEmotionAverages({
          happy: 0,
          sad: 0,
          angry: 0,
          surprised: 0,
          fear: 0,
          disgust: 0,
          neutral: 0,
        });
        setLatestEmotion("");
        return;
      }
      // Calcula as médias das emoções
      const analises: Array<{ emotion: EmotionKey; confidence: number }> =
        latestSession.analises;
      const counts: EmotionAverages = {
        happy: 0,
        sad: 0,
        angry: 0,
        surprised: 0,
        fear: 0,
        disgust: 0,
        neutral: 0,
      };
      for (const item of analises) {
        if (typeof item.emotion === "string" && item.emotion in counts) {
          counts[item.emotion as EmotionKey] += 1;
        }
      }
      setEmotionAverages(counts);
      setLatestEmotion(analises[analises.length - 1].emotion);
    });
    return () => unsubscribe();
  }, []);
  // Frases animadas
  const phrases = [
    "Estou aqui com você nesta viagem. Siga tranquilo",
    "Relaxe os ombros, respire fundo. Eu cuido do restante",
    "Você não está sozinho, seguimos juntos nessa estrada",
    "A cada quilômetro, eu acompanho o seu bem-estar",
    "Se precisar, lembre-se: posso indicar uma parada segura",
    "Sua atenção é preciosa. Eu estou aqui para ajudar",
    "Mantenha a calma, vamos juntos até o destino",
    "Você está fazendo um ótimo trabalho, confie em você",
  ];
  const [currentPhrase, setCurrentPhrase] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 20000);
    return () => clearTimeout(timer);
  }, [currentPhrase, phrases.length]);
  return (
    <div className="min-h-screen w-full flex flex-col bg-panel">
      {/* Header FELPI fixo no topo */}
      <header className="w-full flex items-center justify-between px-3 py-3 shadow-sm bg-[#122d37] border-b border-[rgba(255,255,255,.12)]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-2xl text-[#e9f1f4]">FELPI</span>
        </div>
        <button
          onClick={() => router.push("/")}
          className="px-7 py-2 rounded-full bg-[#e9f1f4] text-[#122d37] font-bold shadow hover:bg-[#bfe9f7] transition"
        >
          Início
        </button>
      </header>
      <main className="flex-1 w-full flex flex-col justify-center">
        <div className="w-full flex justify-center">
          <p className="text-lg text-[#e9f1f4] italic font-normal text-center px-6 py-3 leading-relaxed bg-[#122d37] border border-[rgba(255,255,255,.12)] rounded-full">
            {phrases[currentPhrase]}
          </p>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 rounded-2xl p-4">
          <section className="flex flex-col justify-center items-center bg-[#122d37] border border-[rgba(255,255,255,.12)] rounded-xl p-6 min-h-[440px] w-full">
            <div className="w-full">
              <h2 className="text-lg md:text-1xl font-bold text-[#e9f1f4] text-left">
                Análise Emocional em Tempo Real
              </h2>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8 w-full">
              {/* Gráfico circular SVG */}
              <div className="relative w-full max-w-[28rem] h-[28rem] flex items-center justify-center">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 420 420"
                  className="block"
                >
                  <circle
                    cx="210"
                    cy="210"
                    r="170"
                    stroke="rgba(255,255,255,.12)"
                    strokeWidth="44"
                    fill="none"
                  />
                  {/* Calcula a porcentagem da emoção mais recente */}
                  {(() => {
                    const dashArray = 1068;
                    let percent = 0;
                    // Cores para cada emoção
                    const emotionColors: Record<string, string> = {
                      happy: "#ffe600",
                      sad: "#2e69b3",
                      angry: "#d7263d",
                      surprised: "#a78bfa",
                      fear: "#6ad7e5",
                      disgust: "#43b581",
                      neutral: "#e9f1f4",
                    };
                    let strokeColor = "#2e69b3";
                    if (latestEmotion && emotionColors[latestEmotion]) {
                      strokeColor = emotionColors[latestEmotion];
                      const total = Object.values(emotionAverages).reduce(
                        (acc, val) => acc + val,
                        0
                      );
                      percent =
                        total > 0
                          ? Math.round(
                              (emotionAverages[latestEmotion as EmotionKey] /
                                total) *
                                100
                            )
                          : 0;
                    }
                    const dashOffset = dashArray - (dashArray * percent) / 100;
                    return (
                      <circle
                        cx="210"
                        cy="210"
                        r="170"
                        stroke={strokeColor}
                        strokeWidth="44"
                        fill="none"
                        strokeDasharray={dashArray}
                        strokeDashoffset={dashOffset}
                        style={{
                          transition: "stroke-dashoffset 1s, stroke 0.5s",
                        }}
                      />
                    );
                  })()}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {/* Mostra só a emoção mais recente traduzida */}
                    {(() => {
                      const emotionTranslations: Record<string, string> = {
                        happy: "Feliz",
                        sad: "Triste",
                        angry: "Raiva",
                        surprised: "Surpreso",
                        fear: "Medo",
                        disgust: "Nojo",
                        neutral: "Neutro",
                      };
                      return latestEmotion
                        ? emotionTranslations[latestEmotion] || latestEmotion
                        : "-";
                    })()}
                  </span>
                </div>
              </div>
              {/* Lista de estados */}
              <div className="flex flex-col gap-5 min-w-[220px] w-full max-w-sm">
                {(() => {
                  const total = Object.values(emotionAverages).reduce(
                    (acc, val) => acc + val,
                    0
                  );
                  return [
                    { label: "Feliz", key: "happy", color: "bg-[#ffe600]" },
                    { label: "Triste", key: "sad", color: "bg-[#2e69b3]" },
                    { label: "Raiva", key: "angry", color: "bg-[#d7263d]" },
                    {
                      label: "Surpreso",
                      key: "surprised",
                      color: "bg-[#a78bfa]",
                    },
                    { label: "Medo", key: "fear", color: "bg-[#6ad7e5]" },
                    { label: "Nojo", key: "disgust", color: "bg-[#43b581]" },
                    { label: "Neutro", key: "neutral", color: "bg-[#e9f1f4]" },
                  ].map((item) => {
                    const count = emotionAverages[item.key as EmotionKey];
                    const percent =
                      total > 0 ? Math.round((count / total) * 100) : 0;
                    return (
                      <div key={item.label} className="flex items-center gap-2">
                        <span className="w-32 text-[#e9f1f4] text-sm">
                          {item.label}
                        </span>
                        <div className="h-3 w-20 rounded-full bg-[#183c4a] flex items-center">
                          <div
                            className={`h-3 rounded-full ${item.color}`}
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                        <span className="text-[#e9f1f4] font-mono text-sm">
                          {percent}%
                        </span>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </section>
          <section className="flex flex-col justify-center items-center bg-[#122d37] border border-[rgba(255,255,255,.12)] rounded-xl p-4 min-h-[400px] w-full">
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-[#e9f1f4]">
                  Nivel de Sonolência
                </span>
                <span className="text-lg font-bold text-[#e9f1f4]">Baixo</span>
              </div>
              <div className="w-full h-4 rounded-full bg-gradient-to-r from-[#f87171] via-[#fbbf24] to-[#34d399] relative mb-2">
                <div
                  className="absolute top-0 left-[18%] h-4 w-1 bg-white rounded-full"
                  style={{ boxShadow: "0 0 2px #fff" }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-[#e9f1f4] text-sm font-medium">
                <span>Baixo</span>
                <span>Médio</span>
                <span>Alto</span>
              </div>
            </div>
            <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <button onClick={() => router.push("/emergencia")} className="w-full py-4 text-lg rounded-full border border-[rgba(255,255,255,.12)] bg-[rgba(255,255,255,.06)] text-white font-bold shadow-lg cursor-pointer">
                Chamadas de Emergência
              </button>
              <button onClick={() => router.push("/paradas")} className="w-full py-4 text-lg rounded-full border border-[rgba(255,255,255,.12)] bg-[rgba(255,255,255,.06)] text-white font-bold shadow-lg cursor-pointer">
                Paradas Seguras
              </button>
              <button onClick={() => router.push("/respiracao")} className="w-full py-4 text-lg rounded-full border border-[rgba(255,255,255,.12)] bg-[rgba(255,255,255,.06)] text-white font-bold shadow-lg cursor-pointer">
                Guia de Respiração
              </button>
              <button onClick={() => router.push("/playlist")} className="w-full py-4 text-lg rounded-full border border-[rgba(255,255,255,.12)] bg-[rgba(255,255,255,.06)] text-white font-bold shadow-lg cursor-pointer">
                Playlist Calmante
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
