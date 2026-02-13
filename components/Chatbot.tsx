import React, { useMemo, useState } from 'react';

const SYSTEM_PROMPT = `You are a hindi and hinglish style chatbot created to help people in street vendoring and land selling and telling legal rights and vendoring process of getting a street vendor license in india your knowledge will be the whole legal section of the web app`;
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY ?? '';

// Local knowledge base chatbot (no external API).
// The knowledge base contains key Q&A about the Street Vendors Act, 2014 and related
// procedures, rights, duties, penalties, TVC, and resources. Answers are returned via
// simple keyword/overlap matching on the client.

type Message = { role: 'user' | 'assistant' | 'system'; text: string };

const KB: Array<{ id: string; q: string; a: string; tags?: string[] }> = [
  {
    id: 'act-overview',
    q: 'What is the Street Vendors Act 2014?',
    a: 'The Street Vendors (Protection of Livelihood and Regulation of Street Vending) Act, 2014 recognises street vending as a legitimate occupation, provides for vendor surveys, formation of Town Vending Committees (TVCs), issuance of vending certificates and protection from arbitrary eviction. Official text: https://www.indiacode.nic.in/handle/123456789/2124',
    tags: ['act', 'overview', '2014', 'indiacode']
  },
  {
    id: 'right-to-vend',
    q: 'What rights do certified vendors have?',
    a: 'Certified vendors have the right to carry on vending activities under their vending certificate (Section 12). They cannot be prevented from vending so long as they comply with the certificate conditions and the Act.',
    tags: ['right', 'section 12', 'vending']
  },
  {
    id: 'relocation',
    q: 'Can vendors be relocated?',
    a: 'If vendors are relocated, the authorities must consult the Town Vending Committee and provide an alternative site to ensure livelihood continuity (Section 13). Relocation should balance public convenience and vendors’ rights.',
    tags: ['relocation', 'section 13', 'tvc']
  },
  {
    id: 'protection-harassment',
    q: 'Are vendors protected from harassment?',
    a: 'Yes. A certified vendor lawfully vending cannot be removed or harassed by police or authorities so long as they follow the Act. This offers protection against arbitrary action (Section 27).',
    tags: ['harassment', 'section 27', 'protection']
  },
  {
    id: 'penalties',
    q: 'What penalties apply for vending without a certificate?',
    a: 'Selling without a vending certificate or contravening conditions can attract penalties set by local authorities (often modest fines). Vendors should obtain a vending certificate and follow terms to avoid fines (Section 28).',
    tags: ['penalty', 'section 28', 'fines']
  },
  {
    id: 'duties',
    q: 'What duties do vendors have?',
    a: 'Vendors must maintain public hygiene: keep the vending spot clean, remove goods after vending hours, not damage public property, and pay any applicable maintenance charges.',
    tags: ['duties', 'hygiene', 'cleanliness']
  },
  {
    id: 'constitutional-rights',
    q: 'Do constitutional rights support vendors?',
    a: 'Yes. Articles such as Article 19(1)(g) (profession, trade or business), Article 14 (equality before law), and Article 21 (right to livelihood) provide constitutional backing for vendors’ economic activity.',
    tags: ['article 19', 'article 14', 'article 21', 'constitution']
  },
  {
    id: 'tvc-role',
    q: 'What does the Town Vending Committee (TVC) do?',
    a: 'TVCs (set up by local bodies) conduct vendor surveys, allocate vending spaces, issue vending certificates, recommend relocation where necessary, and balance public convenience with livelihoods.',
    tags: ['tvc', 'town vending committee', 'local body']
  },
  {
    id: 'file-complaint',
    q: 'How do I file a complaint?',
    a: 'Complaints against harassment or illegal eviction can be filed with the local municipal office, the Town Vending Committee, or through legal aid resources. Keep records (photos, witness names) and submit a written complaint to the municipal authority.',
    tags: ['complaint', 'file complaint', 'grievance']
  },
  {
    id: 'resources',
    q: 'Where can I find more resources?',
    a: 'Useful resources: Official Act text: https://www.indiacode.nic.in/handle/123456789/2124 ; Overview article: https://www.legalserviceindia.com/legal/article-14339-rights-of-street-vendors-and-their-exploitation.html',
    tags: ['resources', 'links', 'indiacode', 'legalserviceindia']
  }
];

function tokenize(s: string) {
  return s.toLowerCase().replace(/[.,:/()\\-]/g, ' ').split(/\\s+/).filter(Boolean);
}

function findBestMatch(query: string) {
  const qTokens = tokenize(query);
  let best: { score: number; entry: typeof KB[number] | null } = { score: 0, entry: null };
  for (const entry of KB) {
    const hay = tokenize(entry.q + ' ' + (entry.tags || []).join(' ') + ' ' + entry.a);
    // simple overlap score
    let score = 0;
    for (const t of qTokens) if (hay.includes(t)) score++;
    if (score > best.score) best = { score, entry };
  }
  return best;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const suggested = useMemo(() => KB.slice(0, 6).map(k => k.q), []);

  const sendMessage = async () => {
    const userText = input.trim();
    if (!userText) return;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setLoading(true);

    // If we have an API key, try OpenRouter first
    if (API_KEY) {
      try {
        const payload = {
          model: 'arcee-ai/trinity-large-preview:free',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userText }
          ]
        } as any;

        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'HTTP-Referer': window.location.origin,
            'X-Title': document.title || 'NukkadBazaar',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const txt = await res.text();
          console.error('OpenRouter error', res.status, txt);
          // fall back to KB below
        } else {
          const data = await res.json();
          console.debug('OpenRouter response', data);
          let assistant = '';
          if (data && data.choices && data.choices[0]) {
            assistant = data.choices[0].message?.content || data.choices[0].text || '';
          }
          if (!assistant && data?.output) assistant = data.output;
          if (assistant) {
            setMessages(prev => [...prev, { role: 'assistant', text: assistant }]);
            setLoading(false);
            return;
          }
        }
      } catch (e: any) {
        console.error('OpenRouter request failed', e?.message || e);
        // continue to local KB fallback
      }
    }

    // local KB fallback
    const match = findBestMatch(userText);
    let reply = '';
    if (match.entry && match.score >= Math.max(1, Math.floor(userText.split(' ').length / 3))) {
      reply = match.entry.a;
    } else {
      reply = `Mujhe maaf kariyega — mujhe seedha jawab nahi mila. Aap in sawalon mein se chun sakte hain: ${suggested.slice(0,4).join(' | ')}. Ya phir apna sawaal thoda aur spasht likhiye.`;
    }

    // small delay to feel conversational
    await new Promise(r => setTimeout(r, 250));
    setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
    setLoading(false);
  };

  return (
    <div className={`fixed z-50 right-4 bottom-4 ${open ? '' : ''}`}>
      {open && (
        <div className="w-80 max-w-xs h-96 bg-white dark:bg-gray-800 rounded-xl shadow-xl border-2 border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
          <div className="p-2 bg-brick text-white font-bold flex items-center justify-between">
            <span>Bhaiya Ji (Knowledge Bot)</span>
            <button onClick={() => setOpen(false)} className="text-white/80">Close</button>
          </div>
          <div className="p-2 flex-1 overflow-y-auto text-sm space-y-2">
            {messages.length === 0 && <div className="text-xs text-gray-500">Namaste! Main Bhaiya Ji — poochiye apna sawaal (Hindi/Hinglish)</div>}
            {messages.map((m, i) => (
              <div key={i} className={`p-2 rounded ${m.role === 'assistant' ? 'bg-gray-100 dark:bg-gray-700 self-start' : 'bg-saffron-50 self-end text-right'}`}>
                <div className="text-xs">{m.text}</div>
              </div>
            ))}
            {loading && <div className="text-xs text-gray-500">Soch raha hoon...</div>}
          </div>
          <div className="p-2 border-t border-gray-100 dark:border-gray-700">
            <div className="flex gap-2">
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); sendMessage(); } }} className="flex-1 p-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none" placeholder="Type in Hindi / Hinglish" />
              <button onClick={sendMessage} disabled={loading} className="bg-brick text-white px-3 rounded">{loading ? '...' : 'Boli'}</button>
            </div>
            <div className="mt-2 text-[11px] text-wood-dark/80">
              Suggested: {suggested.slice(0,4).map((s,i) => <button key={i} onClick={() => { setInput(s); }} className="underline ml-1">{s}</button>)}
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setOpen(o => !o)} className="w-14 h-14 rounded-full bg-brick text-white shadow-lg flex items-center justify-center">{open ? '✕' : '💬'}</button>
    </div>
  );
}
