import React, { useState, useRef, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, Info, CheckCircle2 } from "lucide-react";
import { DscetCrest } from "@/src/components/dscet-crest";

interface SignInStepProps {
  onSuccess: (email: string) => void;
  onOpenRegistrarDesk?: () => void;
}

export function SignInStep({ onSuccess, onOpenRegistrarDesk }: SignInStepProps) {
  const [email, setEmail] = useState("student@dscet.ac.in");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [forgotSent, setForgotSent] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Upward particle ambient canvas effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    type Particle = { x: number; y: number; speed: number; opacity: number };
    let particles: Particle[] = [];

    const createParticle = (): Particle => ({
      x: Math.random() * (canvas.width || 1200),
      y: Math.random() * (canvas.height || 800),
      speed: Math.random() * 0.35 + 0.1,
      opacity: Math.random() * 0.45 + 0.15,
    });

    const init = () => {
      particles = [];
      const count = Math.min(80, Math.floor(((canvas.width || 1200) * (canvas.height || 800)) / 12000));
      for (let i = 0; i < count; i++) particles.push(createParticle());
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < 0) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + Math.random() * 30;
          p.speed = Math.random() * 0.35 + 0.1;
          p.opacity = Math.random() * 0.45 + 0.15;
        }
        ctx.fillStyle = `rgba(180, 210, 255, ${p.opacity})`;
        ctx.fillRect(p.x, p.y, 1.2, 2.8);
      });
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", setCanvasSize);
    init();
    render();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(email);
  };

  return (
    <section className="relative min-h-screen w-full bg-zinc-950 text-zinc-50 flex flex-col justify-between overflow-hidden select-none">
      {/* Background radial glow & particles */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(80%_60%_at_50%_30%,rgba(30,64,175,0.18),transparent_70%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70 mix-blend-screen pointer-events-none" />

      {/* Decorative coordinate grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[18%] left-0 right-0 h-[1px] bg-zinc-800 animate-drawX" />
        <div className="absolute top-[50%] left-0 right-0 h-[1px] bg-zinc-800 animate-drawX" />
        <div className="absolute top-[82%] left-0 right-0 h-[1px] bg-zinc-800 animate-drawX" />
        <div className="absolute left-[20%] top-0 bottom-0 w-[1px] bg-zinc-800 animate-drawY" />
        <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-zinc-800 animate-drawY" />
        <div className="absolute left-[80%] top-0 bottom-0 w-[1px] bg-zinc-800 animate-drawY" />
      </div>

      {/* Header bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <DscetCrest dark />
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block text-xs font-medium px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
            Admissions & Student Portal
          </span>
          <button
            onClick={() => {
              if (onOpenRegistrarDesk) onOpenRegistrarDesk();
              else {
                alert("Registrar Desk: Contact info@dscet.ac.in | Office Hours: Mon-Sat 9:00 AM - 5:00 PM | Admissions Hotline: +91 4639 242482");
              }
            }}
            className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition cursor-pointer"
          >
            <span>Registrar Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main sign-in card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-[480px] rounded-2xl border border-zinc-700/60 bg-zinc-900/90 backdrop-blur-xl p-8 sm:p-10 shadow-2xl shadow-blue-950/40 animate-fadeUp">
          <div className="text-center space-y-2 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950/80 border border-blue-800/60 text-blue-300 mb-2">
              Academic Year 2026–2027
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Welcome back</h1>
            <p className="text-sm text-zinc-300">
              Sign in to DSCET Student Portal to access your enrollment & registration records.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Institute Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white block">Institute Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 rounded-lg bg-zinc-800/90 border border-zinc-700 pl-10 pr-4 text-white text-base placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="student@dscet.ac.in"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 rounded-lg bg-zinc-800/90 border border-zinc-700 pl-10 pr-12 text-white text-base placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember & Recovery */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-0 cursor-pointer"
                />
                <span>Remember this device for 30 days</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  setRecoveryEmail(email);
                  setShowForgotModal(true);
                }}
                className="font-medium text-blue-400 hover:text-blue-300 hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* Primary CTA */}
            <button
              type="submit"
              className="w-full h-12 rounded-lg bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-700/30 transition duration-200 active:scale-[0.99] cursor-pointer"
            >
              <span>Proceed to Student Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider text-zinc-500 bg-zinc-900 px-3">
                Or Continue With
              </div>
            </div>

            {/* SSO Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onSuccess("kaakash58266@gmail.com")}
                className="h-11 rounded-lg border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-800 text-white text-sm font-medium flex items-center justify-center gap-2 transition cursor-pointer hover:border-zinc-500"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                Google SSO
              </button>
              <button
                type="button"
                onClick={() => onSuccess("student@dscet.ac.in")}
                className="h-11 rounded-lg border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-800 text-white text-sm font-medium flex items-center justify-center gap-2 transition cursor-pointer hover:border-zinc-500"
              >
                <span>🔑</span> DSCET SSO
              </button>
            </div>
          </form>

          {/* Quick Demo Pre-fill helper */}
          <div className="mt-6 pt-5 border-t border-zinc-800/70">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-2.5">
              <span>Quick Demo Profiles:</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setEmail("kaakash58266@gmail.com");
                  setPassword("Password@2026");
                }}
                className="text-left p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 transition"
              >
                <div className="font-semibold text-white">Aakash K</div>
                <div className="text-[10px] text-zinc-400">CSE • 310525104001</div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail("priyadharshini.m@dscet.ac.in");
                  setPassword("Password@2026");
                }}
                className="text-left p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 transition"
              >
                <div className="font-semibold text-white">Priyadharshini M</div>
                <div className="text-[10px] text-zinc-400">AI & DS • 310525243015</div>
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-zinc-400">
            New student?{" "}
            <button
              onClick={() => onSuccess("new.applicant@dscet.ac.in")}
              className="text-blue-400 hover:underline font-medium cursor-pointer"
            >
              Begin registration
            </button>
          </p>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeUp">
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl p-6 sm:p-8 space-y-5 text-left shadow-2xl">
            <h3 className="text-lg font-bold text-white">Password Recovery</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Enter your institutional email address to receive an official password reset PIN issued by the DSCET Academic Computing Center.
            </p>

            {forgotSent ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Reset instructions dispatched!</p>
                  <p className="text-[11px] text-emerald-300/80 mt-0.5">
                    Check your mailbox for instructions sent to <span className="font-mono underline">{recoveryEmail}</span>.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <label className="text-xs font-semibold text-zinc-300">Registered Email</label>
                <input
                  type="email"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  className="w-full h-11 rounded-lg bg-zinc-800 border border-zinc-700 px-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="student@dscet.ac.in"
                />
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => {
                  setShowForgotModal(false);
                  setForgotSent(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white rounded-lg transition"
              >
                Close
              </button>
              {!forgotSent && (
                <button
                  type="button"
                  onClick={() => {
                    if (recoveryEmail) setForgotSent(true);
                  }}
                  className="px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
                >
                  Send Reset Link
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer bar */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-3">
        <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> 256-Bit SSL Institutional Encryption
          </span>
          <span className="hidden sm:inline">•</span>
          <span>FERPA Compliant System</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://dscet.ac.in" target="_blank" rel="noreferrer" className="hover:text-zinc-300 transition">
            dscet.ac.in
          </a>
          <span className="text-zinc-700">•</span>
          <button
            onClick={() => alert("DSCET Data Privacy Policy: All student records are governed under Institute Registrar Bylaws and strictly maintained.")}
            className="hover:text-zinc-300 transition cursor-pointer"
          >
            Privacy Policy
          </button>
          <span className="text-zinc-700">•</span>
          <button
            onClick={() => alert("Terms of Academic Enrollment: All submitted documents must match official state higher secondary certificates.")}
            className="hover:text-zinc-300 transition cursor-pointer"
          >
            Terms of Service
          </button>
        </div>
      </footer>
    </section>
  );
}
