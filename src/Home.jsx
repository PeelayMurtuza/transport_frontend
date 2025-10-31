import React, { useState, useEffect } from "react";

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const Icon = ({ name, size = 24 }) => {
    const icons = {
      truck: <path d="M1 3h15v13H1V3zm17 5h3l3 3v5h-6V8z M20 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z M7 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />,
      map: <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z M12 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />,
      message: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />,
      users: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z M20 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />,
      chart: <path d="M18 20V10 M12 20V4 M6 20v-6" />,
      clock: <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 6v6l4 2" />,
      check: <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3" />,
      star: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
      arrow: <path d="M5 12h14 M12 5l7 7-7 7" />,
      zap: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
      shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
      trend: <path d="M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6" />,
      globe: <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />,
      sparkle: <path d="M12 3v18 M21 12H3 M18.36 5.64l-12.72 12.72 M5.64 5.64l12.72 12.72" />
    };
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {icons[name]}
      </svg>
    );
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-slate-300 via-blue-250 to-slate-400 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl transition-all duration-300 ease-out"
          style={{ top: mousePos.y - 192, left: mousePos.x - 192 }}
        />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center py-20 px-6 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 backdrop-blur-sm animate-fadeIn">
                <Icon name="sparkle" size={16} />
                <span className="text-sm font-medium text-blue-900">Enterprise Logistics Platform</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight animate-slideUp">
                Transform Your
                <span className="block bg-gradient-to-r from-blue-800 via-cyan-400 to-purple-900 bg-clip-text text-transparent">
                  Logistics Network
                </span>
              </h1>

              <p className="text-xl text-slate-700 leading-relaxed max-w-xl animate-slideUp" style={{ animationDelay: "0.1s" }}>
                A robust platform connecting agents, drivers, and businesses. Real-time tracking, secure communication, and operational tools to run your fleet reliably.
              </p>

              <div className="flex flex-wrap gap-4 animate-slideUp" style={{ animationDelay: "0.2s" }}>
                <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50">
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started Free
                    <Icon name="arrow" size={20} />
                  </span>
                </button>
                <button className="px-8 py-4 rounded-full font-bold text-lg border-2 border-blue-400/30 backdrop-blur-sm hover:bg-blue-400/10 transition-all hover:scale-105">
                  Watch Demo
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 animate-slideUp" style={{ animationDelay: "0.3s" }}>
                {[
                  { icon: "truck", value: "5K+", label: "Active Fleets" },
                  { icon: "zap", value: "99.9%", label: "Uptime SLA" },
                  { icon: "trend", value: "40%", label: "Operational Savings" }
                ].map((stat, i) => (
                  <div key={i} className="group">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 backdrop-blur-sm group-hover:scale-110 transition-transform">
                      <div className="text-blue-400 mb-2"><Icon name={stat.icon} size={24} /></div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-xs text-slate-400">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 animate-slideUp" style={{ animationDelay: "0.2s" }}>
              <div className="relative">
                <div
                  className="absolute -top-10 -left-10 p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-blue-400/30 shadow-2xl transition-transform"
                  style={{ transform: `translateY(${scrollY * 0.1}px)` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Icon name="check" size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold">Load Delivered</div>
                      <div className="text-xs text-slate-400">#LD-10234</div>
                    </div>
                  </div>
                </div>

                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-xs text-slate-400 mb-1">LIVE TRACKING</div>
                      <div className="font-bold text-lg">#LD-10234 · Refrigerated</div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">ON TIME</div>
                  </div>

                  <div className="relative h-64 rounded-2xl overflow-hidden mb-6 group bg-gradient-to-br from-slate-700 to-slate-800">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <video
                        src="/video/truck_video.mp4"
                        autoPlay
                        loop
                        muted
                        className="w-full h-full object-cover "
                      />
                    </div>

                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-900 animate-pulse" />
                      <span className="text-sm font-medium text-black">Live · 68 km/h</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Icon name="map" size={18} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Origin</div>
                        <div className="text-sm font-medium">Mumbai Hub</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Icon name="map" size={18} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Destination</div>
                        <div className="text-sm font-medium">Pune Center</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold">RK</div>
                      <div>
                        <div className="font-medium">Ramesh Kumar</div>
                        <div className="text-xs text-slate-400">MH12 AB 1234 · ⭐ 4.9</div>
                      </div>
                    </div>
                    <button className="p-2 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition-colors">
                      <Icon name="message" size={18} />
                    </button>
                  </div>
                </div>

                <div
                  className="absolute -bottom-8 -right-8 p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-400/30 shadow-2xl transition-transform"
                  style={{ transform: `translateY(${scrollY * -0.08}px)` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Icon name="zap" size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold">Route Optimized</div>
                      <div className="text-xs text-slate-400">Saved 45 min</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative py-32 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-400/20 backdrop-blur-sm mb-4">
              <Icon name="shield" size={16} />
              <span className="text-sm font-medium text-purple-500">Enterprise-Grade Platform</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Everything You Need,
              <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                All in One Place
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "chart", title: "Advanced Analytics", desc: "Operational dashboards, KPIs and custom reporting for fleet performance.", color: "from-blue-500 to-cyan-500" },
              { icon: "globe", title: "Real-Time Tracking", desc: "Sub-second GPS updates with geofencing and automated alerts.", color: "from-green-500 to-emerald-500" },
              { icon: "message", title: "Unified Communication", desc: "In-app messaging, calls and document sharing in one place.", color: "from-purple-500 to-pink-500" },
              { icon: "shield", title: "Enterprise Security", desc: "End-to-end encryption, SSO and audit logging for compliance.", color: "from-orange-500 to-red-500" }
            ].map((f, i) => (
              <div key={i} className="group relative p-8 rounded-3xl bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 transition-all hover:scale-105">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${f.color} bg-opacity-10 mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon name={f.icon} size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UNTHINKABLE FEATURE SET */}
      <section className="relative py-24 px-6 lg:px-20 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black">Unthinkable Features</h2>
          <p className="block text-transparent bg-gradient-to-r from-cyan-800 to-blue-500 bg-clip-text max-w-2xl mx-auto mt-3 text-xl">Capabilities designed for operations where reliability, offline resilience, and situational clarity matter most.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-slate-700/50">
            <div className="inline-flex items-center justify-center p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 mb-4">
              <Icon name="globe" size={28} />
            </div>
            <h4 className="font-semibold mb-2">Mesh Mode (Offline Sync)</h4>
            <p className="text-slate-400 text-sm">Drivers form a peer-to-peer mesh when cellular is unavailable. Jobs, signatures and logs sync automatically once any node regains connectivity.</p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-slate-700/50">
            <div className="inline-flex items-center justify-center p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 mb-4">
              <Icon name="chart" size={28} />
            </div>
            <h4 className="font-semibold mb-2">Digital-Twin Replay</h4>
            <p className="text-slate-400 text-sm">Record a vehicle’s telemetry and replay routes as a digital twin for post-trip audits, incident reconstruction and process optimization.</p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-slate-700/50">
            <div className="inline-flex items-center justify-center p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 mb-4">
              <Icon name="truck" size={28} />
            </div>
            <h4 className="font-semibold mb-2">AR Load Visualizer</h4>
            <p className="text-slate-400 text-sm">Use the driver device camera to validate load placement with an augmented overlay — reduces damage and speeds loading checks.</p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-slate-700/50">
            <div className="inline-flex items-center justify-center p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 mb-4">
              <Icon name="shield" size={28} />
            </div>
            <h4 className="font-semibold mb-2">Edge-First Privacy</h4>
            <p className="text-slate-400 text-sm">Sensitive processing runs at the device edge where possible; only operational metadata is transmitted to servers to preserve privacy and latency.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative py-32 px-6 lg:px-20 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Three Steps to
              <span className="block text-transparent bg-gradient-to-r from-cyan-800 to-blue-500 bg-clip-text">Operational Excellence</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
            {[
              { step: "01", icon: "clock", title: "Create & Post", desc: "Define your load, schedule windows and attach documents.", color: "from-blue-500 to-cyan-500" },
              { step: "02", icon: "users", title: "Match & Assign", desc: "Dispatchers allocate the best available vehicle and team.", color: "from-purple-500 to-pink-500" },
              { step: "03", icon: "check", title: "Track & Confirm", desc: "Track every mile and collect proof of delivery.", color: "from-green-500 to-emerald-500" }
            ].map((s, i) => (
              <div key={i} className="relative pt-20">
                <div className="text-8xl font-black text-slate-800/50 absolute -top-8  pointer-events-none ">{s.step}</div>
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 transition-all hover:scale-105 group">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${s.color} mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon name={s.icon} size={32} />
                  </div>
                  <h4 className="text-2xl font-bold mb-3">{s.title}</h4>
                  <p className="text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-32 px-6 lg:px-20 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-black mb-4">
              Trusted by Industry
              <span className="block text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">Leaders</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rajesh Patel", company: "Mumbai Logistics Co.", role: "Operations Director" },
              { name: "Priya Sharma", company: "Delhi Freight Solutions", role: "Fleet Manager" },
              { name: "Amit Desai", company: "Bangalore Express", role: "CEO" }
            ].map((t, i) => (
              <div key={i} className="p-8 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 transition-all hover:scale-105">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => <Icon key={j} name="star" size={20} />)}
                </div>
                <p className="text-slate-300 leading-relaxed mb-6 italic">"TransConnect transformed our operations. Real-time visibility and smarter routing reduced our delivery times significantly."</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-lg">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-sm text-slate-400">{t.role}</div>
                    <div className="text-xs text-slate-500">{t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-16 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-blue-400/30">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Ready to Transform Your
              <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">Logistics Operations?</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">Join thousands of companies already running reliable fleets with TransConnect.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-10 py-5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-bold text-lg hover:scale-105 transition-transform hover:shadow-2xl hover:shadow-blue-500/50">Start Free Trial</button>
              <button className="px-10 py-5 rounded-full font-bold text-lg border-2 border-blue-400/30 backdrop-blur-sm hover:bg-blue-400/10 transition-all hover:scale-105">Schedule Demo</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative py-16 px-6 lg:px-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            <div>
              <div className="text-3xl font-black mb-2">
                Trans<span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-600 bg-clip-text">Connect</span>
              </div>
              <div className="text-slate-500">Reliable logistics for modern teams</div>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-600 hover:text-white transition-colors">Features</a>
              <a href="#" className="text-slate-600 hover:text-white transition-colors">About</a>
              <a href="#" className="text-slate-600 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="text-center text-slate-500 text-sm">© {new Date().getFullYear()} TransConnect. Built with precision for logistics excellence.</div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.7s ease-out forwards; }
      `}</style>
    </main>
  );
}
