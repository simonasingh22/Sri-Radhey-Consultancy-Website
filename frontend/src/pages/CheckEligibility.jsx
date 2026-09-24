import { useReducer, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft, ArrowRight, Check, Loader2, MessageCircle, RotateCcw } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import SEO from '../components/SEO';

const sectors = [
  { value: 'Textiles', description: 'Spinning, weaving and garments.' },
  { value: 'MSME', description: 'Guidance for growing units.' },
  { value: 'Electronics', description: 'Assembly and hardware units.' },
  { value: 'Pharma', description: 'Formulations and extracts.' },
];

const initialState = { step: 1, answers: { branch: '', product: '', nocs: '' }, direction: 1 };

function reducer(state, action) {
  switch (action.type) {
    case 'START':
      return { ...state, step: 2, direction: 1 };
    case 'ANSWER_BRANCH':
      return { ...state, answers: { ...state.answers, branch: action.value }, step: 3, direction: 1 };
    case 'ANSWER_PRODUCT':
      return { ...state, answers: { ...state.answers, product: action.value }, step: 4, direction: 1 };
    case 'ANSWER_NOCS':
      return { ...state, answers: { ...state.answers, nocs: action.value }, step: 5, direction: 1 };
    case 'BACK':
      return { ...state, step: Math.max(1, state.step - 1), direction: -1 };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const branchLabels = { new: 'New Unit', existing: 'Existing / Expanding Unit' };

function OptionCard({ label, description, selected, onClick }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`group flex w-full items-center justify-between gap-4 rounded-xl border p-5 text-left transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${selected ? 'border-accent bg-accent/10 shadow-premium' : 'border-primary/10 bg-white hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-premium'}`}
    >
      <span>
        <span className="block font-display text-base font-bold text-primary">{label}</span>
        {description && <span className="mt-1 block text-xs leading-relaxed text-text-muted">{description}</span>}
      </span>
      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${selected ? 'border-accent bg-accent text-primary-dark' : 'border-primary/20 text-transparent group-hover:border-accent'}`} aria-hidden="true">
        <Check className="h-3.5 w-3.5" />
      </span>
    </button>
  );
}

function StepContent({ state, dispatch }) {
  const { step, answers } = state;
  if (step === 1) {
    return (
      <div className="max-w-xl space-y-6">
        <span className="inline-flex rounded-full bg-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent-dark">Eligibility navigator</span>
        <h1 className="font-display text-4xl font-bold leading-tight text-primary md:text-5xl">Let&apos;s map the right next step for your unit.</h1>
        <p className="max-w-lg text-sm leading-relaxed text-text-muted md:text-base">Answer three quick questions about your unit, sector, and NOC status. Our team will use the details to review applicable subsidy and compliance routes.</p>
        <button type="button" onClick={() => dispatch({ type: 'START' })} className="inline-flex items-center gap-2 rounded bg-primary px-6 py-3 text-sm font-semibold text-white shadow-premium transition hover:-translate-y-0.5 hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">Start <ArrowRight className="h-4 w-4" /></button>
      </div>
    );
  }
  if (step === 2) {
    return <Question title="What is the status of your unit?" eyebrow="Incorporation details"><OptionCard label="New Unit" description="A new manufacturing or industrial setup." selected={answers.branch === 'new'} onClick={() => dispatch({ type: 'ANSWER_BRANCH', value: 'new' })} /><OptionCard label="Existing / Expanding Unit" description="An operating unit adding capacity, machinery, or a new line." selected={answers.branch === 'existing'} onClick={() => dispatch({ type: 'ANSWER_BRANCH', value: 'existing' })} /></Question>;
  }
  if (step === 3) {
    return <Question title="Which product/sector does your unit fall under?" eyebrow={answers.branch === 'new' ? 'New unit profile' : 'Expansion profile'}><div className="grid gap-3 sm:grid-cols-2">{sectors.map((sector) => <OptionCard key={sector.value} label={sector.value} description={sector.description} selected={answers.product === sector.value} onClick={() => dispatch({ type: 'ANSWER_PRODUCT', value: sector.value })} />)}</div></Question>;
  }
  if (step === 4) {
    return <Question title="Are you availing / have you availed NOCs for this unit?" eyebrow="Compliance status"><div className="grid gap-3 sm:grid-cols-2"><OptionCard label="Yes" description="NOCs are already in progress or available." selected={answers.nocs === 'yes'} onClick={() => dispatch({ type: 'ANSWER_NOCS', value: 'yes' })} /><OptionCard label="No" description="NOCs are not yet in place for this unit." selected={answers.nocs === 'no'} onClick={() => dispatch({ type: 'ANSWER_NOCS', value: 'no' })} /></div><div role="note" className="mt-5 flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950"><AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" /><p>NOCs are required for major capital grants.</p></div></Question>;
  }
  return <Summary answers={answers} dispatch={dispatch} />;
}

function Question({ eyebrow, title, children }) {
  return <div className="max-w-2xl space-y-6"><div><span className="text-xs font-bold uppercase tracking-widest text-accent-dark">{eyebrow}</span><h1 className="mt-3 font-display text-3xl font-bold leading-tight text-primary md:text-4xl">{title}</h1><p className="mt-2 text-sm text-text-muted">Choose one option to continue.</p></div><div className="space-y-3">{children}</div></div>;
}

function Summary({ answers, dispatch }) {
  const { settings } = useSettings();
  const [status, setStatus] = useState('idle');
  const submit = async () => {
    setStatus('submitting');
    try {
      const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
      const response = await fetch(`${apiBase}/api/eligibility`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(answers) });
      if (!response.ok) throw new Error('Request failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };
  const whatsapp = `https://wa.me/${(settings.whatsapp || '916387688787').replace(/\D/g, '')}?text=${encodeURIComponent('Hello, I would like to discuss my subsidy eligibility review.')}`;
  return <div className="max-w-2xl space-y-6"><div><span className="text-xs font-bold uppercase tracking-widest text-accent-dark">Review your answers</span><h1 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">Your eligibility profile is ready.</h1><p className="mt-2 text-sm leading-relaxed text-text-muted">Based on your answers, our team will review your eligibility for applicable subsidy schemes.</p></div><div className="divide-y divide-primary/10 rounded-xl border border-primary/10 bg-white shadow-sm">{[['Unit status', branchLabels[answers.branch]], ['Product / sector', answers.product], ['NOC status', answers.nocs === 'yes' ? 'Yes' : 'No']].map(([label, value]) => <div key={label} className="flex items-center justify-between gap-5 px-5 py-4 text-sm"><span className="text-text-muted">{label}</span><strong className="text-right text-primary">{value}</strong></div>)}</div>{status === 'success' && <p role="status" className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">Your details have been submitted for review.</p>}{status === 'error' && <p role="alert" className="rounded-lg bg-rose-50 p-3 text-sm text-rose-800">We could not submit right now. Please try again or contact an expert on WhatsApp.</p>}<div className="flex flex-col gap-3 sm:flex-row"><button type="button" onClick={submit} disabled={status === 'submitting' || status === 'success'} className="inline-flex items-center justify-center gap-2 rounded bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60">{status === 'submitting' && <Loader2 className="h-4 w-4 animate-spin" />}{status === 'success' ? 'Submitted' : 'Submit for Review'}</button><a href={whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded border border-secondary bg-secondary/5 px-5 py-3 text-sm font-semibold text-secondary transition hover:bg-secondary hover:text-white"><MessageCircle className="h-4 w-4" /> WhatsApp Expert</a></div><button type="button" onClick={() => dispatch({ type: 'RESET' })} className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-primary"><RotateCcw className="h-3.5 w-3.5" /> Start over</button></div>;
}

export default function CheckEligibility() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { step, direction } = state;
  return <><SEO title="Check Subsidy Eligibility" description="Answer a few questions to help Sri Radhey Consultancy review your industrial subsidy and compliance eligibility." path="/check-eligibility" /><main className="min-h-[calc(100vh-5rem)] bg-background-alt"><div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col px-6 py-10 md:py-16"><div className="mb-10 flex items-center justify-between gap-5"><div><p className="font-display text-lg font-bold text-primary">Eligibility check</p><p className="text-xs text-text-muted">A guided review, not a guaranteed approval.</p></div>{step > 1 && step < 5 && <span className="rounded-full bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">Step {step - 1} of 3</span>}</div>{step > 1 && step < 5 && <div className="mb-10 flex gap-2" aria-label={`Eligibility progress: step ${step - 1} of 3`}>{[2, 3, 4].map((item) => <span key={item} className={`h-1.5 flex-1 rounded-full ${item <= step ? 'bg-accent' : 'bg-primary/10'}`} />)}</div>}<div className="flex flex-1 items-center"><AnimatePresence mode="wait" initial={false}><motion.div key={step} initial={{ opacity: 0, x: direction * 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: direction * -30 }} transition={{ duration: 0.22 }} className="w-full">{step > 1 && step < 5 && <button type="button" onClick={() => dispatch({ type: 'BACK' })} className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-text-muted transition hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent"><ArrowLeft className="h-4 w-4" /> Back</button>}<StepContent state={state} dispatch={dispatch} /></motion.div></AnimatePresence></div></div></main></>;
}

