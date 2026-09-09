'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Lock,
  Gamepad2,
  Users,
  CheckCircle2,
  Sparkles,
  Clock,
  Key,
  ArrowRight,
  ChevronRight,
  Award,
  Cpu,
  RefreshCw,
  Globe2,
} from 'lucide-react';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'mission' | 'verification' | 'pillars'>('mission');

  const stats = [
    {
      label: 'VERIFIED KEYS DELIVERED',
      value: '50,000+',
      description: 'Fully authenticated digital activation keys',
      icon: Key,
      bg: 'bg-[#F4A6C6]',
    },
    {
      label: 'INSTANT DISPATCH LATENCY',
      value: '< 2.4s',
      description: 'Automated cryptographic vault delivery',
      icon: Zap,
      bg: 'bg-[#F3E29B]',
    },
    {
      label: 'PUBLISHER & SELLER PARTNERS',
      value: '150+',
      description: 'Vetted global studios & authorized distributors',
      icon: ShieldCheck,
      bg: 'bg-[#A9E8D6]',
    },
    {
      label: 'KEY GUARANTEE RATE',
      value: '99.98%',
      description: 'Backing every transaction with full replacement',
      icon: Award,
      bg: 'bg-[#F5F4FF]',
    },
  ];

  const pillars = [
    {
      icon: Clock,
      badge: 'SPEED & PRECISION',
      title: 'Instant Dispatch System',
      description:
        'Our automated fulfillment engine delivers keys into your account vault in milliseconds after payment verification.',
    },
    {
      icon: ShieldCheck,
      badge: 'AUTHENTICITY',
      title: '100% Direct Sourcing',
      description:
        'We eliminate marketplace ambiguity. Every single key code undergoes multi-point verification directly from verified publisher pipelines.',
    },
    {
      icon: Lock,
      badge: 'ZERO RISK',
      title: 'Fortress Vault Guarantee',
      description:
        'Every transaction is protected by Appwrite security layers and an unconditional instant replacement policy against invalid activations.',
    },
    {
      icon: Cpu,
      badge: 'ENGINEERING',
      title: 'Y2K Edge Architecture',
      description:
        'Built with ultra-responsive modern edge architecture, ensuring seamless shopping, real-time inventory sync, and zero downtime.',
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Provenance Audit',
      desc: 'Seller and publisher credentials undergo strict cryptographic identity verification before keys are accepted.',
      icon: ShieldCheck,
    },
    {
      step: '02',
      title: 'Encrypted Vault Storage',
      desc: 'Key payload is stored in isolated, encrypted Appwrite database clusters awaiting purchase handshake.',
      icon: Lock,
    },
    {
      step: '03',
      title: 'Atomic Handshake',
      desc: 'Upon payment completion, atomic transaction logic verifies payment status and claims key ownership instantly.',
      icon: RefreshCw,
    },
    {
      step: '04',
      title: 'Instant Reveal & Activation',
      desc: 'The unmasked key code is immediately available in your order dashboard alongside instant platform links.',
      icon: Key,
    },
  ];

  const leaders = [
    {
      name: 'Ramiru Chanmika',
      role: 'Chief Executive Officer',
      bio: 'Founder and Chief Executive leading Game Nest vision, bringing Y2K retro gaming aesthetics to modern digital marketplaces.',
      tag: 'Leadership',
    },
    {
      name: 'Sanduni Nethmini',
      role: 'Chief Operating Officer',
      bio: 'Executive leading operations, customer experience, and automated cryptographic key distribution security.',
      tag: 'Operations',
    },
    {
      name: 'Wimansha Kithmini',
      role: 'Chief Technology Officer',
      bio: 'Technology leader directing system architecture, publisher integration networks, and vault infrastructure.',
      tag: 'Technology',
    },
  ];

  return (
    <div className="min-h-screen bg-[#6C6CEB] text-[#1A1A1A] relative overflow-hidden pb-24">

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16 relative z-10">
        
        {/* HERO SECTION */}
        <section className="text-center space-y-6 max-w-4xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3E29B] border-2.5 border-[#1A1A1A] text-xs font-extrabold text-[#1A1A1A] shadow-sticker-sm uppercase">
            <Sparkles className="w-4 h-4 fill-[#1A1A1A]" />
            <span>ORIGINS & RETRO CRAFTSMANSHIP</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight uppercase leading-tight text-white glitch-text">
            PlayStation Retro Nostalgia Meets <br />
            Next-Gen Digital Ownership
          </h1>

          <p className="text-sm sm:text-base font-semibold text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-[1px_1px_0px_#1A1A1A]">
            Game Nest was established to redefine how digital game keys are bought, sold, and collected. 
            By marrying iconic Y2K retro-gaming nostalgia with military-grade key verification, we deliver total peace of mind for every gamer.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link href="/catalog" className="btn-pill-pink text-xs flex items-center gap-2 font-extrabold">
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
            <Link href="/dashboard" className="btn-pill-yellow text-xs flex items-center gap-2 font-extrabold">
              <span>Become a Verified Seller</span>
            </Link>
          </div>
        </section>

        {/* MISSION & VISION SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="bg-[#F3E29B] rounded-3xl p-6 sm:p-8 border-3 border-[#1A1A1A] shadow-sticker-lg space-y-4 hover:-translate-y-1 transition-transform">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFFFF] border-2 border-[#1A1A1A] text-xs font-extrabold text-[#1A1A1A] shadow-sticker-sm uppercase">
              <span className="text-base">🎮</span>
              <span>Our Mission</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1A1A] leading-snug">
              To bring great games to gamers, simply and reliably.
            </h2>
          </div>

          <div className="bg-[#A9E8D6] rounded-3xl p-6 sm:p-8 border-3 border-[#1A1A1A] shadow-sticker-lg space-y-4 hover:-translate-y-1 transition-transform">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFFFF] border-2 border-[#1A1A1A] text-xs font-extrabold text-[#1A1A1A] shadow-sticker-sm uppercase">
              <span className="text-base">🌎</span>
              <span>Our Vision</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1A1A] leading-snug">
              To become a trusted gaming destination for gamers in Sri Lanka and around the world.
            </h2>
          </div>
        </section>

        {/* IMPACT METRICS GRID */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <div
                key={idx}
                className={`${stat.bg} border-3 border-[#1A1A1A] rounded-2xl p-6 shadow-sticker-md flex flex-col justify-between hover:-translate-y-1 transition-transform`}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border-2 border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] mb-4 shadow-sticker-sm">
                    <IconComp className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-extrabold text-[#1A1A1A] uppercase mt-1">
                    {stat.label}
                  </div>
                </div>
                <p className="text-xs font-bold text-[#1A1A1A]/80 mt-4 border-t-2 border-[#1A1A1A]/20 pt-3">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </section>

        {/* TABBED INTERACTIVE STORY & PHILOSOPHY */}
        <section className="bg-[#F5F4FF] rounded-3xl p-8 sm:p-12 border-3 border-[#1A1A1A] shadow-sticker-lg relative overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            
            {/* Left Nav & Branding */}
            <div className="lg:w-1/3 space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-[#F4A6C6] border-2.5 border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] shadow-sticker-sm">
                <Gamepad2 className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] uppercase tracking-tight">
                The Game Nest <br />
                <span className="text-[#6C6CEB] underline decoration-[#F4A6C6] decoration-4">Standard</span>
              </h2>
              <p className="text-xs font-bold text-[#1A1A1A]/80 leading-relaxed">
                Traditional key marketplaces suffer from unverified sellers and delayed fulfillment. Game Nest fixes every flaw with Y2K sticker perfection.
              </p>

              {/* Navigation Tabs */}
              <div className="flex flex-col space-y-2 pt-2">
                {[
                  { id: 'mission', label: 'Our Core Mission' },
                  { id: 'pillars', label: 'Four Pillars of Trust' },
                  { id: 'verification', label: 'Verification Protocol' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-extrabold uppercase transition-all text-left border-2 border-[#1A1A1A] ${
                      activeTab === tab.id
                        ? 'bg-[#F4A6C6] text-[#1A1A1A] shadow-sticker-sm scale-105'
                        : 'bg-[#FFFFFF] text-[#1A1A1A] hover:bg-[#F3E29B]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <ChevronRight className={`w-4 h-4 stroke-[2.5] transition-transform ${activeTab === tab.id ? 'rotate-90' : ''}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Tab Content */}
            <div className="lg:w-2/3 bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 border-2.5 border-[#1A1A1A] shadow-sticker-md min-h-[340px] flex flex-col justify-between">
              {activeTab === 'mission' && (
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A9E8D6] border-2 border-[#1A1A1A] text-xs font-extrabold text-[#1A1A1A] shadow-sticker-sm uppercase">
                    <Globe2 className="w-4 h-4 stroke-[2.5]" />
                    <span>PHILOSOPHY & FOUNDATION</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#1A1A1A]">
                    Restoring Integrity to Digital Video Game Commerce
                  </h3>
                  
                  {/* Mission & Vision Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                    <div className="bg-[#F3E29B] rounded-2xl p-5 border-2.5 border-[#1A1A1A] shadow-sticker-sm space-y-2">
                      <div className="text-sm font-extrabold text-[#1A1A1A] flex items-center gap-2 uppercase tracking-wide">
                        <span className="text-lg">🎮</span>
                        <span>Our Mission</span>
                      </div>
                      <p className="text-xs font-extrabold text-[#1A1A1A] leading-relaxed">
                        To bring great games to gamers, simply and reliably.
                      </p>
                    </div>

                    <div className="bg-[#A9E8D6] rounded-2xl p-5 border-2.5 border-[#1A1A1A] shadow-sticker-sm space-y-2">
                      <div className="text-sm font-extrabold text-[#1A1A1A] flex items-center gap-2 uppercase tracking-wide">
                        <span className="text-lg">🌎</span>
                        <span>Our Vision</span>
                      </div>
                      <p className="text-xs font-extrabold text-[#1A1A1A] leading-relaxed">
                        To become a trusted gaming destination for gamers in Sri Lanka and around the world.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs font-bold text-[#1A1A1A]/80 leading-relaxed">
                    <p>
                      Game Nest was conceived by gamers who believed purchasing a digital key should feel as joyful and instant as opening a fresh retro game cartridge. We reject gray-market shortcuts and unvetted sellers.
                    </p>
                    <p>
                      Instead, we built a transparent ecosystem that directly connects gamers with verified publishers and vetted sellers. Every key in our inventory is backed by cryptographic provenance logging and our 100% Guarantee.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t-2 border-[#1A1A1A]/15">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 stroke-[2.5] stroke-[#1A1A1A] fill-[#A9E8D6]" />
                      <span className="text-xs font-extrabold text-[#1A1A1A]">Instant Key Unmasking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 stroke-[2.5] stroke-[#1A1A1A] fill-[#F4A6C6]" />
                      <span className="text-xs font-extrabold text-[#1A1A1A]">Zero Counterfeit Promise</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 stroke-[2.5] stroke-[#1A1A1A] fill-[#F3E29B]" />
                      <span className="text-xs font-extrabold text-[#1A1A1A]">Appwrite Vault Security</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 stroke-[2.5] stroke-[#1A1A1A] fill-[#A9E8D6]" />
                      <span className="text-xs font-extrabold text-[#1A1A1A]">24/7 Gamer Support</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'pillars' && (
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3E29B] border-2 border-[#1A1A1A] text-xs font-extrabold text-[#1A1A1A] shadow-sticker-sm uppercase">
                    <Award className="w-4 h-4 stroke-[2.5]" />
                    <span>THE FOUR PILLARS</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#1A1A1A]">
                    Built Upon Four Uncompromising Principles
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pillars.map((pillar, pIdx) => {
                      const PIcon = pillar.icon;
                      return (
                        <div key={pIdx} className="bg-[#F5F4FF] rounded-xl p-4 border-2 border-[#1A1A1A] shadow-sticker-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <PIcon className="w-4 h-4 stroke-[2.5] text-[#1A1A1A]" />
                            <span className="text-[10px] font-extrabold text-[#1A1A1A] uppercase tracking-wider bg-[#F4A6C6] border border-[#1A1A1A] px-2 py-0.5 rounded-full">{pillar.badge}</span>
                          </div>
                          <h4 className="text-xs font-extrabold text-[#1A1A1A] mb-1">{pillar.title}</h4>
                          <p className="text-[11px] font-bold text-[#1A1A1A]/70 leading-relaxed">{pillar.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'verification' && (
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4A6C6] border-2 border-[#1A1A1A] text-xs font-extrabold text-[#1A1A1A] shadow-sticker-sm uppercase">
                    <RefreshCw className="w-4 h-4 stroke-[2.5]" />
                    <span>AUTOMATED KEY VERIFICATION</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#1A1A1A]">
                    How We Guarantee 100% Genuine Activation Keys
                  </h3>
                  <div className="space-y-3">
                    {workflowSteps.map((stepItem, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-4 p-3 rounded-xl bg-[#F5F4FF] border-2 border-[#1A1A1A]">
                        <span className="text-xs font-extrabold text-[#1A1A1A] px-2.5 py-1 rounded-md bg-[#F3E29B] border border-[#1A1A1A]">
                          {stepItem.step}
                        </span>
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-extrabold text-[#1A1A1A]">{stepItem.title}</h4>
                          <p className="text-[11px] font-bold text-[#1A1A1A]/70">{stepItem.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 pt-4 border-t-2 border-[#1A1A1A]/15 flex items-center justify-between text-xs font-extrabold text-[#1A1A1A]">
                <span>Game Nest Protocol v2.0</span>
                <Link href="/catalog" className="text-[#6C6CEB] hover:underline flex items-center gap-1">
                  <span>Browse Current Inventory</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* LEADERSHIP & CRAFTSMANSHIP TEAM */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 text-[#1A1A1A] bg-[#F4A6C6] border-2 border-[#1A1A1A] px-3 py-1 rounded-full text-[11px] font-extrabold uppercase shadow-sticker-sm">
              <Users className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>THE MINDS BEHIND GAME NEST</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white glitch-text uppercase">
              Leadership & Architects
            </h2>
            <p className="text-xs font-bold text-white/90 max-w-xl mx-auto">
              Combining decades of video game industry experience and enterprise security architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leaders.map((leader, lIdx) => (
              <div key={lIdx} className="bg-[#F5F4FF] rounded-2xl p-6 space-y-4 border-3 border-[#1A1A1A] shadow-sticker-md hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-full bg-[#F3E29B] border-2.5 border-[#1A1A1A] flex items-center justify-center font-extrabold text-lg text-[#1A1A1A] shadow-sticker-sm">
                    {leader.name.charAt(0)}
                  </div>
                  <span className="text-[10px] font-extrabold text-[#1A1A1A] bg-[#A9E8D6] border-2 border-[#1A1A1A] px-2.5 py-0.5 rounded-full uppercase shadow-sticker-sm">
                    {leader.tag}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#1A1A1A]">{leader.name}</h3>
                  <p className="text-xs text-[#6C6CEB] font-extrabold mt-0.5">{leader.role}</p>
                  <p className="text-xs font-bold text-[#1A1A1A]/70 mt-3 leading-relaxed">
                    {leader.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA BOTTOM BANNER */}
        <section className="bg-[#F5F4FF] rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border-3 border-[#1A1A1A] shadow-sticker-lg">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-[#F4A6C6] border-2.5 border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] mx-auto shadow-sticker-sm">
              <Sparkles className="w-7 h-7 fill-[#1A1A1A]" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-[#1A1A1A] glitch-text-dark">
              Ready to Upgrade Your <br />
              Digital Gaming Vault?
            </h2>

            <p className="text-xs sm:text-sm font-bold text-[#1A1A1A]/80 leading-relaxed">
              Join thousands of gamers who trust Game Nest for instant key activation, verified title provenance, and Y2K retro style.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link href="/catalog" className="btn-pill-pink text-xs font-extrabold">
                Browse Full Catalog
              </Link>
              <Link href="/orders" className="btn-pill-yellow text-xs font-extrabold">
                View My Keys
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
