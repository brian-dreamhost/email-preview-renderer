import { useState, memo } from 'react'

const CLIENTS = [
  { id: 'gmail', name: 'Gmail', icon: 'G' },
  { id: 'outlook', name: 'Outlook', icon: 'O' },
  { id: 'apple', name: 'Apple Mail', icon: 'A' },
]

const SAMPLE_HTML = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
  <div style="background: #0073EC; padding: 30px; text-align: center;">
    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Welcome to Our Newsletter!</h1>
    <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0;">Your weekly dose of marketing insights</p>
  </div>
  <div style="padding: 30px;">
    <p style="color: #333; font-size: 16px; line-height: 1.6;">Hi there,</p>
    <p style="color: #333; font-size: 16px; line-height: 1.6;">Thanks for subscribing! Here's what you'll get every week:</p>
    <ul style="color: #333; font-size: 16px; line-height: 1.8;">
      <li>Marketing tips and strategies</li>
      <li>Industry news and updates</li>
      <li>Exclusive offers and discounts</li>
    </ul>
    <div style="text-align: center; margin: 30px 0;">
      <a href="#" style="background: #0073EC; color: #ffffff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">Get Started</a>
    </div>
    <img src="https://via.placeholder.com/540x200/f0f0f0/999?text=Featured+Image" alt="Featured content" style="width: 100%; border-radius: 8px;" />
    <p style="color: #333; font-size: 16px; line-height: 1.6; margin-top: 20px;">Have questions? Just reply to this email — we read every message.</p>
    <p style="color: #333; font-size: 16px;">Best regards,<br><strong>The Marketing Team</strong></p>
  </div>
  <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #999;">
    <p>You're receiving this because you signed up at example.com</p>
    <p><a href="#" style="color: #0073EC;">Unsubscribe</a> | <a href="#" style="color: #0073EC;">Manage Preferences</a></p>
    <p>123 Main St, Suite 100, San Francisco, CA 94102</p>
  </div>
</div>`

function getClientStyles(clientId, darkMode) {
  const base = {
    gmail: {
      fontFamily: 'Arial, sans-serif',
      background: darkMode ? '#1a1a2e' : '#ffffff',
      textColor: darkMode ? '#e8eaed' : '#222222',
      linkColor: darkMode ? '#8ab4f8' : '#1a73e8',
      headerBg: darkMode ? '#202124' : '#f6f8fc',
      notes: darkMode
        ? ['Gmail dark mode inverts light backgrounds', 'White backgrounds become dark gray (#1a1a2e)', 'Links turn to lighter blue (#8ab4f8)', 'Images are NOT inverted']
        : ['Gmail strips <style> tags and class attributes', 'Only inline styles are preserved', 'Background images may be blocked', 'External fonts fallback to Arial'],
    },
    outlook: {
      fontFamily: 'Calibri, Arial, sans-serif',
      background: darkMode ? '#212121' : '#ffffff',
      textColor: darkMode ? '#d4d4d4' : '#333333',
      linkColor: darkMode ? '#71afe5' : '#0563C1',
      headerBg: darkMode ? '#333333' : '#f4f4f4',
      notes: darkMode
        ? ['Outlook dark mode uses [data-ogsb] and [data-ogsc]', 'Background colors inverted to dark equivalents', 'Text lightened automatically', 'Button backgrounds may be altered']
        : ['Outlook uses Word rendering engine (HTML limitations)', 'border-radius NOT supported', 'padding on <a> tags NOT supported', 'max-width may not work — use fixed widths', 'Background images require VML fallback'],
    },
    apple: {
      fontFamily: '-apple-system, Helvetica, Arial, sans-serif',
      background: darkMode ? '#1c1c1e' : '#ffffff',
      textColor: darkMode ? '#f5f5f7' : '#1d1d1f',
      linkColor: darkMode ? '#419cff' : '#06c',
      headerBg: darkMode ? '#2c2c2e' : '#f5f5f7',
      notes: darkMode
        ? ['Apple Mail uses auto dark mode', 'Light backgrounds become #1c1c1e', 'System fonts render as SF Pro', 'Most CSS properties supported']
        : ['Apple Mail has excellent HTML/CSS support', 'Supports <style> tags and media queries', 'Renders border-radius, shadows, gradients', 'System font stack renders as SF Pro'],
    },
  }
  return base[clientId]
}

const ClientPreview = memo(function ClientPreview({ clientId, html, darkMode }) {
  const styles = getClientStyles(clientId, darkMode)
  const client = CLIENTS.find(c => c.id === clientId)

  // Apply client-specific transformations
  let processedHtml = html
  if (darkMode) {
    // Simulate dark mode inversions
    processedHtml = html
      .replace(/background:\s*#fff(?:fff)?/gi, `background: ${styles.background}`)
      .replace(/background:\s*#f[0-9a-f]{5}/gi, `background: ${styles.headerBg}`)
      .replace(/background:\s*white/gi, `background: ${styles.background}`)
      .replace(/background-color:\s*#fff(?:fff)?/gi, `background-color: ${styles.background}`)
      .replace(/background-color:\s*#f[0-9a-f]{5}/gi, `background-color: ${styles.headerBg}`)
      .replace(/background-color:\s*white/gi, `background-color: ${styles.background}`)
      .replace(/color:\s*#[1-4][0-9a-f]{5}/gi, `color: ${styles.textColor}`)
      .replace(/color:\s*#333/gi, `color: ${styles.textColor}`)
      .replace(/color:\s*#222/gi, `color: ${styles.textColor}`)
      .replace(/color:\s*black/gi, `color: ${styles.textColor}`)
      .replace(/color:\s*#999/gi, `color: ${darkMode ? '#8e8e93' : '#999'}`)
  }

  if (clientId === 'outlook' && !darkMode) {
    processedHtml = processedHtml.replace(/border-radius:\s*[^;]+;?/gi, '')
  }

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl overflow-hidden">
      {/* Client header bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-metal/20" style={{ background: darkMode ? '#1a1a1a' : '#f0f0f0' }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
        </div>
        <span className="text-sm font-medium" style={{ color: darkMode ? '#ccc' : '#666' }}>{client.name}</span>
      </div>

      {/* Email header */}
      <div className="px-4 py-3 border-b text-xs" style={{ background: darkMode ? '#222' : styles.headerBg, borderColor: darkMode ? '#333' : '#e0e0e0' }}>
        <div style={{ color: darkMode ? '#aaa' : '#666' }}>
          <div className="flex gap-2 mb-1"><span className="font-medium" style={{ color: darkMode ? '#ccc' : '#333' }}>From:</span> Marketing Team &lt;hello@company.com&gt;</div>
          <div className="flex gap-2 mb-1"><span className="font-medium" style={{ color: darkMode ? '#ccc' : '#333' }}>To:</span> you@email.com</div>
          <div className="flex gap-2"><span className="font-medium" style={{ color: darkMode ? '#ccc' : '#333' }}>Subject:</span> Welcome to Our Newsletter!</div>
        </div>
      </div>

      {/* Email body */}
      <div className="p-4 overflow-auto max-h-[500px]" style={{ background: styles.background, fontFamily: styles.fontFamily }}>
        <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
      </div>

      {/* Rendering notes */}
      <div className="px-4 py-3 border-t border-metal/20 bg-midnight/50">
        <p className="text-xs font-medium text-galactic mb-2">Rendering Notes:</p>
        <ul className="text-xs text-galactic space-y-1">
          {styles.notes.map((note, i) => <li key={i} className="flex gap-2"><span className="text-metal">•</span>{note}</li>)}
        </ul>
      </div>
    </div>
  )
})

export default function App() {
  const [html, setHtml] = useState('')
  const [activeClient, setActiveClient] = useState('gmail')
  const [darkMode, setDarkMode] = useState(false)
  const [viewMode, setViewMode] = useState('single')

  const fillTestData = () => {
    setHtml(`<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
  <div style="background: #2D3748; padding: 30px; text-align: center;">
    <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Product Launch Announcement</h1>
    <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0; font-size: 14px;">Introducing our newest feature</p>
  </div>
  <div style="padding: 30px;">
    <p style="color: #333; font-size: 16px; line-height: 1.6;">Hi there,</p>
    <p style="color: #333; font-size: 16px; line-height: 1.6;">We're excited to announce <strong>Smart Analytics Dashboard</strong> — a new way to track your website performance in real time.</p>
    <img src="https://via.placeholder.com/540x200/e2e8f0/4a5568?text=Smart+Analytics+Dashboard" alt="Smart Analytics Dashboard preview" style="width: 100%; border-radius: 8px; margin: 20px 0;" />
    <h2 style="color: #2D3748; font-size: 18px; margin-top: 25px;">What's New</h2>
    <ul style="color: #333; font-size: 15px; line-height: 1.8;">
      <li>Real-time visitor tracking with geographic heatmaps</li>
      <li>Conversion funnel analysis with drop-off alerts</li>
      <li>Custom report builder with scheduled email delivery</li>
      <li>Integration with Google Analytics and Search Console</li>
    </ul>
    <div style="text-align: center; margin: 30px 0;">
      <a href="#" style="background: #4C51BF; color: #ffffff; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 16px;">Try It Free for 14 Days</a>
    </div>
    <p style="color: #333; font-size: 16px; line-height: 1.6;">All existing customers get free access during the beta period. No credit card required.</p>
    <p style="color: #333; font-size: 16px;">Cheers,<br><strong>The Product Team</strong></p>
  </div>
  <div style="background: #f7fafc; padding: 20px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #e2e8f0;">
    <p>You're receiving this because you're a registered user.</p>
    <p><a href="#" style="color: #4C51BF;">Unsubscribe</a> | <a href="#" style="color: #4C51BF;">View in browser</a></p>
    <p>789 Innovation Blvd, San Jose, CA 95134</p>
  </div>
</div>`)
  }

  const displayHtml = html || ''

  return (
    <div className="min-h-screen bg-abyss bg-glow bg-grid">
      <div className="max-w-[1600px] mx-auto px-4 py-12 animate-fadeIn">
        <nav className="mb-8 text-sm text-galactic">
          <a href="https://seo-tools-tau.vercel.app/" className="text-azure hover:text-white transition-colors">Free Tools</a>
          <span className="mx-2 text-metal">/</span>
          <a href="https://seo-tools-tau.vercel.app/email-marketing/" className="text-azure hover:text-white transition-colors">Email Marketing</a>
          <span className="mx-2 text-metal">/</span>
          <span className="text-cloudy">Email Preview Renderer</span>
        </nav>

        <div className="text-center mb-10">
          <div className="inline-flex items-center px-4 py-2 border border-turtle text-turtle rounded-full text-sm font-medium mb-6">Free Tool</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Email Preview Renderer</h1>
          <p className="text-cloudy text-lg max-w-2xl mx-auto">See how your HTML email renders across Gmail, Outlook, and Apple Mail — including dark mode.</p>
        </div>

        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={fillTestData}
            className="px-3 py-1.5 text-xs font-mono bg-prince/20 text-prince border border-prince/30 rounded hover:bg-prince/30 transition-colors focus:outline-none focus:ring-2 focus:ring-prince focus:ring-offset-2 focus:ring-offset-abyss"
          >
            Fill Test Data
          </button>
        </div>

        {/* Input */}
        <div className="card-gradient border border-metal/20 rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-cloudy">HTML Email Code</label>
            <button onClick={() => setHtml(SAMPLE_HTML)} className="text-sm text-azure hover:text-white transition-colors">Load Sample</button>
          </div>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            placeholder="Paste your HTML email code here..."
            rows={8}
            className="w-full bg-midnight border border-metal/30 rounded-lg px-4 py-3 text-sm text-white placeholder-galactic focus:outline-none focus:border-azure transition-colors font-mono resize-y"
          />
        </div>

        {/* Controls */}
        <div className="card-gradient border border-metal/20 rounded-2xl p-4 mb-6 flex flex-wrap items-center gap-4">
          <div className="flex gap-1 bg-midnight rounded-lg p-1">
            {CLIENTS.map(c => (
              <button key={c.id} onClick={() => setActiveClient(c.id)} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors hover-lift ${activeClient === c.id && viewMode === 'single' ? 'bg-azure text-white' : 'text-galactic hover:text-white'}`}>
                {c.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button onClick={() => setDarkMode(!darkMode)} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-colors ${darkMode ? 'border-prince/50 text-prince bg-prince/10' : 'border-metal/30 text-galactic hover:text-white'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>
              Dark Mode
            </button>
            <div className="flex gap-1 bg-midnight rounded-lg p-1">
              <button onClick={() => setViewMode('single')} className={`px-3 py-1.5 rounded-md text-sm transition-colors ${viewMode === 'single' ? 'bg-metal/30 text-white' : 'text-galactic hover:text-white'}`}>Single</button>
              <button onClick={() => setViewMode('all')} className={`px-3 py-1.5 rounded-md text-sm transition-colors ${viewMode === 'all' ? 'bg-metal/30 text-white' : 'text-galactic hover:text-white'}`}>All Clients</button>
            </div>
          </div>
        </div>

        {/* Previews */}
        {!displayHtml ? (
          <div className="card-gradient border border-metal/20 rounded-2xl p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-galactic mx-auto mb-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
            <p className="text-galactic text-lg">Paste HTML email code above to preview</p>
            <p className="text-metal text-sm mt-2">Or click "Load Sample" to see an example</p>
          </div>
        ) : viewMode === 'single' ? (
          <ClientPreview clientId={activeClient} html={displayHtml} darkMode={darkMode} />
        ) : (
          <div className="grid lg:grid-cols-3 gap-4">
            {CLIENTS.map((c, index) => <div key={c.id} className="animate-slideUp" style={{ animationDelay: `${index * 0.08}s` }}><ClientPreview clientId={c.id} html={displayHtml} darkMode={darkMode} /></div>)}
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-6 p-4 rounded-2xl bg-midnight/50 border border-metal/10">
          <p className="text-xs text-galactic">
            <strong className="text-cloudy">Note:</strong> These previews are approximations based on known rendering behaviors. Actual rendering may vary depending on email client version, device, OS, and user settings. For pixel-perfect testing, use dedicated email testing services like Litmus or Email on Acid. Dark mode simulation shows common inversions but may differ from actual client behavior.
          </p>
        </div>
      </div>

      <footer className="border-t border-metal/30 mt-16">
        <div className="max-w-[1600px] mx-auto px-4 py-6 text-center text-sm text-galactic">
          Free marketing tools by <a href="https://www.dreamhost.com" target="_blank" rel="noopener" className="text-azure hover:text-white transition-colors">DreamHost</a>
        </div>
      </footer>
    </div>
  )
}
