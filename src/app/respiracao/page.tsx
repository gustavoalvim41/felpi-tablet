"use client"
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

type PhaseName = 'Inspire' | 'Segure' | 'Expire' | 'Pronto';
type PatternKey = '426' | '4444' | '478';
type PatternStep = [PhaseName, number];
const patterns: Record<PatternKey, PatternStep[]> = {
  '426': [ ['Inspire', 4], ['Segure', 2], ['Expire', 6] ],
  '4444': [ ['Inspire', 4], ['Segure', 4], ['Expire', 4], ['Segure', 4] ],
  '478': [ ['Inspire', 4], ['Segure', 7], ['Expire', 8] ],
};
const cues: Record<PhaseName, string> = {
  Inspire: 'Encha a barriga como um balão, ombros soltos.',
  Segure: 'Atenção gentil: você está no controle.',
  Expire: 'Solte pela boca devagar, alongando a saída.',
  Pronto: 'Vamos no seu ritmo. Inspire pelo nariz, eu estou com você.'
};

function getTotal(seqArr: PatternStep[]) {
  return seqArr.reduce((a, [, d]) => a + Number(d), 0);
}

export default function RespiracaoGuiada() {
  const [patternKey, setPatternKey] = useState<PatternKey>('426');
  const [seq, setSeq] = useState<PatternStep[]>(patterns['426']);
  const [phaseIdx, setPhaseIdx] = useState<number>(0);
  const [phase, setPhase] = useState<PhaseName>('Pronto');
  const [tLeft, setTLeft] = useState<number>(0);
  const [cycles, setCycles] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [pctCycle, setPctCycle] = useState<number>(0);
  const [cue, setCue] = useState<string>(cues.Pronto);
  const timerRef = useRef<NodeJS.Timeout | null>(null);


  const router = useRouter();

  useEffect(() => {
    setSeq(patterns[patternKey]);
    resetAll();
    // eslint-disable-next-line
  }, [patternKey]);

  useEffect(() => {
    if (!running) return;
    if (phase === 'Pronto') {
      const [nextPhase, nextDur] = seq[0];
      setPhase(nextPhase);
      setTLeft(nextDur);
      setCue(cues[nextPhase]);
      setPhaseIdx(0);
      setPctCycle(0);
      return;
    }
    timerRef.current = setInterval(() => {
      setTLeft((prev) => {
        if (prev > 1) {
          const [, durRaw] = seq[phaseIdx];
          const dur = Number(durRaw);
          const base = seq.slice(0, phaseIdx).reduce((a, [, d]) => a + Number(d), 0);
          setPctCycle((base + (dur - (prev - 1))) / getTotal(seq));
          return prev - 1;
        } else {
          // Fim da fase
          if (phaseIdx + 1 < seq.length) {
            const [nextPhase, nextDur] = seq[phaseIdx + 1];
            setPhaseIdx(phaseIdx + 1);
            setPhase(nextPhase);
            setTLeft(nextDur);
            setCue(cues[nextPhase]);
          } else {
            setCycles((c) => c + 1);
            const [nextPhase, nextDur] = seq[0];
            setPhaseIdx(0);
            setPhase(nextPhase);
            setTLeft(nextDur);
            setCue(cues[nextPhase]);
            setPctCycle(0);
          }
          return seq[phaseIdx][1] as number;
        }
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line
  }, [running, phase, phaseIdx, seq]);

  function start() {
    if (running) return;
    setRunning(true);
    if (phase === 'Pronto') {
      const [nextPhase, nextDur] = seq[0];
      setPhase(nextPhase);
      setTLeft(nextDur);
      setCue(cues[nextPhase]);
      setPhaseIdx(0);
      setPctCycle(0);
    }
  }
  function pause() {
    setRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }
  function resetAll() {
    setRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase('Pronto');
    setTLeft(0);
    setCycles(0);
    setPhaseIdx(0);
    setCue(cues.Pronto);
    setPctCycle(0);
  }

  // Visual classes
  const meterClass =
    phase === 'Inspire'
      ? 'inhale'
      : phase === 'Segure'
      ? 'hold'
      : phase === 'Expire'
      ? 'exhale'
      : '';

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-[#0f2630]">
      <header className="w-full flex items-center justify-between px-4 py-4 shadow-sm bg-[#122d37] border-b border-[rgba(255,255,255,.12)]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-2xl text-[#e9f1f4]">FELPI</span>
        </div>
        <button
          onClick={() => router.push("/analise")}
          className="px-7 py-2 rounded-full bg-[#e9f1f4] text-[#122d37] font-bold shadow hover:bg-[#bfe9f7] transition"
        >
          Voltar
        </button>
      </header>
      <main className="flex flex-col items-center justify-center w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <section className="card flex flex-col items-center justify-center gap-6 p-6 bg-[#122d37] border border-[rgba(255,255,255,.12)] rounded-2xl">
            <div className={`meter relative w-[330px] h-[330px] ${meterClass}`}>
              <svg width="330" height="330" className="absolute inset-0">
                <circle cx="165" cy="165" r="150" stroke="rgba(255,255,255,.08)" strokeWidth="30" fill="none" />
                <circle
                  cx="165"
                  cy="165"
                  r="150"
                  stroke="#6dd5ed"
                  strokeWidth="30"
                  fill="none"
                  strokeDasharray={942}
                  strokeDashoffset={942 - pctCycle * 942}
                  style={{ transition: 'stroke-dashoffset 1s, stroke 0.5s' }}
                />
              </svg>
              <div className="readout absolute inset-12 rounded-full flex flex-col items-center justify-center text-center">
                <span className="phase font-extrabold text-3xl text-[#e9f1f4]">{phase}</span>
                <span className="count text-[#d4e5ea] text-lg mt-2">{tLeft}s</span>
                <span className="cycles text-[#cbd8dc] text-sm mt-1">{cycles} ciclo{cycles !== 1 ? 's' : ''}</span>
              </div>
            </div>
            <div className="progress w-full h-3 bg-[rgba(255,255,255,.08)] rounded-full overflow-hidden mt-2">
              <span style={{ width: `${pctCycle * 100}%` }} className="block h-full bg-gradient-to-r from-[#6dd5ed] to-[#fbd3a2] transition-all"></span>
            </div>
            <div className="controls flex gap-4 justify-center mt-4">
              <button className="btn primary px-6 py-2 rounded-full font-bold bg-[#f2eadf] text-[#0b1416] border border-[rgba(255,255,255,.12)] shadow" onClick={start}>
                Iniciar
              </button>
              <button className="btn px-6 py-2 rounded-full font-bold bg-[rgba(255,255,255,.06)] text-[#e9f1f4] border border-[rgba(255,255,255,.12)] shadow" onClick={pause}>
                Pausar
              </button>
              <button className="btn px-6 py-2 rounded-full font-bold bg-[rgba(255,255,255,.06)] text-[#e9f1f4] border border-[rgba(255,255,255,.12)] shadow" onClick={resetAll}>
                Resetar
              </button>
            </div>
          </section>
          <section className="card flex flex-col gap-4 p-6 bg-[#122d37] border border-[rgba(255,255,255,.12)] rounded-2xl">
            <h3 className="font-bold text-lg text-[#e9f1f4] mb-2">Benefícios rápidos</h3>
            <ul className="list-disc pl-5 text-[#e9f1f4] text-base leading-relaxed">
              <li>Reduz ativação do estresse e melhora foco.</li>
              <li>Ajuda a estabilizar emoções ao volante.</li>
              <li>Feedback visual suave para manter o ritmo.</li>
            </ul>
            <div className="card bg-[#183c4a] border border-[rgba(255,255,255,.12)] rounded-xl p-4 mt-2">
              <strong className="text-[#f2eadf]">Dica</strong>
              <p className="subtitle text-[#b8c7cd] mt-2">Faça 3–5 ciclos completos antes de retomar maior velocidade se estiver tenso.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
