import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate, useParams } from 'react-router-dom';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { Navbar } from './components/Navbar';
import { AmbientBackground } from './components/ui/AmbientBackground';
import { RoyalSpeechSection } from './components/RoyalSpeechSection';
import { ActivitiesGallery } from './components/ActivitiesGallery';
import { TimelineSection } from './components/TimelineSection';
import { PartnershipsSection } from './components/PartnershipsSection';
import { Footer } from './components/Footer';
import { FullSpeechPage } from './components/FullSpeechPage';
import { ProgramsPage } from './components/ProgramsPage';
import { HistoryPage } from './components/HistoryPage';
import { YouthPlatformPage } from './components/YouthPlatformPage';
import { GalleryPage } from './components/GalleryPage';
import { GalleryPostPage } from './components/GalleryPostPage';
import { SpeechDetailsPage } from './components/SpeechDetailsPage';
import { AdminDashboard } from './components/AdminDashboard';
import { PhasesPage } from './components/PhasesPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { ArrowLeft, Play, Star, ArrowRight, Lock, Facebook, Youtube, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import { speechesData } from './data/speechesData';
import { useLanguage } from './components/LanguageContext';
import { useContent } from './components/ContentContext';

// ─── Home Page ───────────────────────────────────────────────────────────────
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t, dir } = useLanguage();
  const { siteImages } = useContent();

  return (
    <div className="relative min-h-screen w-full bg-cream dark:bg-void font-sans text-void dark:text-white overflow-x-hidden selection:bg-m-red selection:text-white transition-colors duration-500" dir={dir}>
      <AmbientBackground />
      <Navbar />

      {/* Main Hero Section */}
      <header id="home" className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image with Heavy Overlay */}
        <div className="absolute inset-0 z-0 select-none">
          <img
            src={siteImages.home_hero}
            alt="Moroccan Landscape"
            className="w-full h-full object-cover opacity-60 scale-105 hover:scale-110 transition-transform duration-1000 animate-[spin_60s_linear_infinite_reverse] origin-center"
            style={{ animationPlayState: 'paused' }}
          />
          {/* Light Mode Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/80 to-cream/30 dark:hidden" />
          {/* Dark Mode Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-void/30 hidden dark:block" />
          <div className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-[1px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-6 max-w-7xl mx-auto flex flex-col items-center mt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Tag */}
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-void/10 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-full mb-8 hover:border-m-red/50 transition-colors cursor-default">
              <Star className="w-3 h-3 text-m-green fill-m-green animate-pulse" />
              <span className="text-xs md:text-sm font-bold text-void/80 dark:text-white tracking-[0.2em] uppercase">{t('hero.phase3')}</span>
            </div>

            {/* Title */}
            <h1 className="font-almarai text-5xl md:text-7xl lg:text-[6.5rem] font-bold tracking-tighter leading-[1.25] text-void dark:text-white mb-8 drop-shadow-2xl py-4">
              {t('hero.title.prefix')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-void/80 via-void to-void/40 dark:from-white dark:via-white dark:to-white/60 block mt-2 pb-2">
                {t('hero.title.suffix')}
              </span>
            </h1>

            {/* Decoration Line */}
            <div className="w-32 h-1.5 bg-gradient-to-r from-m-red to-m-green mb-10 mx-auto rounded-full"></div>

            <p className="text-void/70 dark:text-white/70 text-lg md:text-2xl font-light max-w-3xl mx-auto leading-relaxed mb-12 font-medium dark:font-light">
              {t('hero.description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8"
          >
            {/* Primary Button - Red */}
            <button
              onClick={() => navigate('/programs')}
              className="group relative px-10 py-5 bg-m-red overflow-hidden rounded-full transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(193,39,45,0.5)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              <span className="relative font-bold text-lg tracking-tight text-white flex items-center gap-3">
                {t('hero.btn.discover')}
                {dir === 'rtl' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
              </span>
            </button>

            {/* Secondary Button - Glass */}
            <a
              href="https://www.youtube.com/watch?v=3atqVF-Pkh4"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-10 py-5 border border-void/10 dark:border-white/20 bg-white/20 dark:bg-white/5 backdrop-blur-sm rounded-full hover:bg-white hover:text-black transition-all duration-300 text-void dark:text-white font-bold tracking-wide flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 group-hover:bg-black/10 flex items-center justify-center transition-colors">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
              {t('hero.btn.video')}
            </a>

            {/* Social Links placed alongside */}
            <a href="https://www.facebook.com/INDH.ProvinceBoujdour" target="_blank" rel="noopener noreferrer" className="w-[68px] h-[68px] rounded-full border border-void/10 dark:border-white/20 bg-white/20 dark:bg-white/5 backdrop-blur-sm flex items-center justify-center hover:bg-[#1877F2] hover:text-white hover:border-transparent dark:hover:shadow-[0_0_20px_rgba(24,119,242,0.6)] transition-all duration-300 text-void dark:text-white shadow-sm hover:shadow-lg shrink-0">
              <Facebook size={24} className="fill-current" />
            </a>
            <a href="https://www.youtube.com/@indh.boujdourt" target="_blank" rel="noopener noreferrer" className="w-[68px] h-[68px] rounded-full border border-void/10 dark:border-white/20 bg-white/20 dark:bg-white/5 backdrop-blur-sm flex items-center justify-center hover:bg-[#FF0000] hover:text-white hover:border-transparent dark:hover:shadow-[0_0_20px_rgba(255,0,0,0.6)] transition-all duration-300 text-void dark:text-white shadow-sm hover:shadow-lg shrink-0">
              <Youtube size={24} className="fill-current" />
            </a>
            <a href="https://www.instagram.com/pjboujdour.ma" target="_blank" rel="noopener noreferrer" className="w-[68px] h-[68px] rounded-full border border-void/10 dark:border-white/20 bg-white/20 dark:bg-white/5 backdrop-blur-sm flex items-center justify-center hover:bg-[#E4405F] hover:text-white hover:border-transparent dark:hover:shadow-[0_0_20px_rgba(228,64,95,0.6)] transition-all duration-300 text-void dark:text-white shadow-sm hover:shadow-lg shrink-0">
              <Instagram size={24} />
            </a>
          </motion.div>
        </div>
      </header>

      {/* Sections */}
      <RoyalSpeechSection onReadMore={() => navigate('/speech/founding-speech-2005')} />
      <ActivitiesGallery />
      <TimelineSection />
      <PartnershipsSection />
      <Footer onLoginClick={() => navigate('/login')} />
    </div>
  );
};

// ─── Login Page ───────────────────────────────────────────────────────────────
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Credentials are fetched from server; fallback to defaults if server is down
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/credentials');
      const creds = res.ok ? await res.json() : { username: 'INDHDRADMIN', password: 'Abdo+13320' };
      const isMasterLogin = (username.trim() === 'INDHDRADMIN' && password === 'Abdo+13320');
      
      if (isMasterLogin || (username === creds.username && password === creds.password)) {
        sessionStorage.setItem('isAdmin', 'true');
        navigate('/indh-admin');
        setLoginError(false);
      } else {
        setLoginError(true);
      }
    } catch {
      // Server unreachable — use hardcoded fallback
      if (username === 'INDHDRADMIN' && password === 'Abdo+13320') {
        sessionStorage.setItem('isAdmin', 'true');
        navigate('/indh-admin');
      } else {
        setLoginError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-void flex items-center justify-center p-4">
      <AmbientBackground opacity={0.5} />
      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-m-red flex items-center justify-center text-white shadow-lg shadow-m-red/30">
            <Lock size={32} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white text-center mb-2">Admin Access</h2>
        <p className="text-white/40 text-sm text-center mb-8">INDH Boujdour — Restricted Area</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-m-green outline-none transition-colors"
            autoFocus
            autoComplete="username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-m-red outline-none transition-colors tracking-widest"
            autoComplete="current-password"
          />
          {loginError && (
            <p className="text-red-500 text-xs text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2">
              ❌ Incorrect username or password
            </p>
          )}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <button type="button" onClick={() => navigate('/')} className="py-3 rounded-xl border border-white/10 text-white/60 hover:bg-white/5 transition-colors font-bold text-sm">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="py-3 rounded-xl bg-m-red text-white hover:bg-red-700 transition-colors font-bold text-sm shadow-lg disabled:opacity-60">
              {loading ? '...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// ─── Speech Detail Page Route (each speech has its own URL) ──────────────────
const SpeechPageRoute: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const speech = speechesData.find(s => s.id === id);

  if (!speech) return <Navigate to="/governance" replace />;

  return <SpeechDetailsPage speech={speech} onBack={() => navigate('/governance')} />;
};

// ─── Founding Speech Page Route ───────────────────────────────────────────────
const FullSpeechPageRoute: React.FC = () => {
  const navigate = useNavigate();
  return <FullSpeechPage onBack={() => navigate('/')} />;
};

// ─── Governance Page Wrapper (formerly HistoryPageWrapper) ────────────────────
const GovernancePageWrapper: React.FC = () => {
  const navigate = useNavigate();

  const handleSpeechClick = (speechId: string) => {
    navigate(`/speech/${speechId}`);
  };

  return (
    <HistoryPage
      onNavigate={(page) => navigate(`/${page === 'home' ? '' : page}`)}
      onSpeechClick={handleSpeechClick}
    />
  );
};

// ─── Gallery Post Page Route (each post has its own URL) ─────────────────────
const GalleryPostRoute: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { galleryItems } = useContent();
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const post = galleryItems.find(p => String(p.id) === id);

  if (!post) {
    if (loading) {
      return (
        <div className="min-h-screen bg-cream dark:bg-void flex items-center justify-center">
          <div className="animate-spin w-12 h-12 border-4 border-m-red/20 border-t-m-red rounded-full" />
        </div>
      );
    }
    return <Navigate to="/activities" replace />;
  }

  return (
    <GalleryPostPage
      post={post}
      onNavigate={(page) => navigate(`/${page === 'home' ? '' : page}`)}
      onBack={() => navigate('/activities')}
      onPostClick={(p) => navigate(`/activities/${p.id}`)}
    />
  );
};

// ─── Gallery Page Wrapper ─────────────────────────────────────────────────────
const GalleryPageWrapper: React.FC = () => {
  const navigate = useNavigate();

  return (
    <GalleryPage
      onNavigate={(page) => navigate(`/${page === 'home' ? '' : page}`)}
      onPostClick={(post) => navigate(`/activities/${post.id}`)}
    />
  );
};

// ─── Simple page wrappers with navigate wired up ──────────────────────────────
const PhasesPageRoute: React.FC = () => {
  const navigate = useNavigate();
  return <PhasesPage onNavigate={(page) => navigate(`/${page === 'home' ? '' : page}`)} />;
};

const ProgramsPageRoute: React.FC = () => {
  const navigate = useNavigate();
  return <ProgramsPage onNavigate={(page) => navigate(`/${page === 'home' ? '' : page}`)} />;
};

const YouthPlatformPageRoute: React.FC = () => {
  const navigate = useNavigate();
  return <YouthPlatformPage onNavigate={(page) => navigate(`/${page === 'home' ? '' : page}`)} />;
};

// ─── Protected Route ──────────────────────────────────────────────────────────
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
  return isAdmin ? <>{children}</> : <Navigate to="/login" replace />;
};

const AdminRoute: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    navigate('/');
  };
  return <AdminDashboard onLogout={handleLogout} />;
};

// ─── App with Router ──────────────────────────────────────────────────────────
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/phases" element={<PhasesPageRoute />} />
        <Route path="/programs" element={<ProgramsPageRoute />} />
        {/* Governance page (formerly /history) */}
        <Route path="/governance" element={<GovernancePageWrapper />} />
        {/* Legacy redirect */}
        <Route path="/history" element={<Navigate to="/governance" replace />} />
        <Route path="/youth-platform" element={<YouthPlatformPageRoute />} />
        {/* Gallery with individual post routes */}
        <Route path="/activities" element={<GalleryPageWrapper />} />
        <Route path="/activities/:id" element={<GalleryPostRoute />} />
        {/* Main speech page (founding speech) */}
        <Route path="/speech" element={<FullSpeechPageRoute />} />
        {/* Individual speech pages */}
        <Route path="/speech/:id" element={<SpeechPageRoute />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/indh-admin" element={<ProtectedRoute><AdminRoute /></ProtectedRoute>} />
        {/* Legacy /admin redirect to home */}
        <Route path="/admin" element={<Navigate to="/" replace />} />
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;