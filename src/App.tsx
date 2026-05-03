import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppKitProvider, useAppKitAccount } from '@reown/appkit/react'
import { AppProvider } from '@/components/app/AppContext'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { WalletConnect } from '@/components/WalletConnect'
import { AIChat } from '@/components/AIChat'
import { Market } from '@/components/Market'
import { Footer } from '@/components/Footer'
import { AppShell } from '@/components/app/AppShell'
import { projectId, networks, ethersAdapter } from '../config/walletconnect'
import DocsPage from './routes/doc'
import BlogPostPage from './routes/blog'

// Landing page component
function LandingPage() {
  const{isConnected}=useAppKitAccount()
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Features />
        {
          isConnected &&
        <WalletConnect />
        }
        <AIChat />
        <Market />
      </main>
      <Footer />
    </div>
  )
}

// 404 component
function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <AppKitProvider projectId={projectId} networks={networks} adapters={[ethersAdapter]}>
        <AppProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app/*" element={<AppShell />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />

          </Routes>
        </AppProvider>
      </AppKitProvider>
    </Router>
  )
}
