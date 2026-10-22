"use client";

import { useEffect, useRef } from "react";

type Props = {
  accent1?: string;
  accent2?: string;
  intensity?: number;
  mode?: "dark" | "light";
};

type Particle = {
  x: number;
  y: number;
  px: number;
  py: number;
  life: number;
  age: number;
  hue: number;
  speed: number;
};

type Ripple = { x: number; y: number; r: number; maxR: number; alpha: number };

type Mouse = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  down: boolean;
};

export default function BackgroundCanvas({
  accent1 = "#00F0FF",
  accent2 = "#FF2E93",
  intensity = 1,
  mode = "dark",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const hex = (h: string): [number, number, number] => {
      const m = h.replace("#", "");
      return [
        parseInt(m.slice(0, 2), 16),
        parseInt(m.slice(2, 4), 16),
        parseInt(m.slice(4, 6), 16),
      ];
    };
    const c1 = hex(accent1);
    const c2 = hex(accent2);
    const bg: [number, number, number] =
      mode === "light" ? [244, 241, 232] : [7, 8, 13];
    const isLight = mode === "light";

    const state = {
      mouse: {
        x: 0,
        y: 0,
        tx: 0,
        ty: 0,
        vx: 0,
        vy: 0,
        down: false,
      } as Mouse,
      scroll: 0,
      tscroll: 0,
      scrollVel: 0,
      particles: [] as Particle[],
      ripples: [] as Ripple[],
      w: 0,
      h: 0,
      dpr: 1,
      raf: 0,
      t0: 0,
    };

    const spawn = (): Particle => ({
      x: Math.random() * state.w,
      y: Math.random() * state.h,
      px: 0,
      py: 0,
      life: Math.random() * 280 + 80,
      age: 0,
      hue: Math.random(),
      speed: 0.6 + Math.random() * 0.9,
    });

    const resize = () => {
      state.dpr = Math.min(window.devicePixelRatio || 1, 2);
      state.w = window.innerWidth;
      state.h = window.innerHeight;
      canvas.width = state.w * state.dpr;
      canvas.height = state.h * state.dpr;
      canvas.style.width = state.w + "px";
      canvas.style.height = state.h + "px";
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
      ctx.fillStyle = `rgb(${bg[0]},${bg[1]},${bg[2]})`;
      ctx.fillRect(0, 0, state.w, state.h);

      const target = Math.min(
        1800,
        Math.floor((state.w * state.h) / 900)
      );
      state.particles = [];
      for (let i = 0; i < target; i++) state.particles.push(spawn());
      state.mouse.x = state.mouse.tx = state.w / 2;
      state.mouse.y = state.mouse.ty = state.h / 2;
    };

    const onMove = (e: MouseEvent) => {
      state.mouse.tx = e.clientX;
      state.mouse.ty = e.clientY;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        state.mouse.tx = e.touches[0].clientX;
        state.mouse.ty = e.touches[0].clientY;
      }
    };
    const onDown = (e: MouseEvent | TouchEvent) => {
      state.mouse.down = true;
      let x: number | undefined;
      let y: number | undefined;
      if (e instanceof MouseEvent) {
        x = e.clientX;
        y = e.clientY;
      } else if (e.touches && e.touches[0]) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      }
      if (x != null && y != null) {
        state.ripples.push({
          x,
          y,
          r: 0,
          maxR: Math.max(state.w, state.h) * 0.6,
          alpha: 1,
        });
      }
    };
    const onUp = () => {
      state.mouse.down = false;
    };
    const onScroll = () => {
      state.tscroll = window.scrollY || 0;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("touchstart", onDown as EventListener, {
      passive: true,
    });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    window.addEventListener("scroll", onScroll, { passive: true });

    const fieldAngle = (
      x: number,
      y: number,
      t: number,
      scrollRot: number
    ) => {
      const a =
        Math.sin(x * 0.0032 + t * 0.25) + Math.cos(y * 0.0041 - t * 0.18);
      const b = Math.sin((x + y) * 0.0023 + t * 0.12);
      return (a + b) * 1.2 + scrollRot;
    };

    let last = performance.now();
    state.t0 = last;

    const tick = (now: number) => {
      const dt = Math.min(33, now - last) / 16.666;
      last = now;
      const t = (now - state.t0) * 0.001;

      const oldMx = state.mouse.x;
      const oldMy = state.mouse.y;
      state.mouse.x += (state.mouse.tx - state.mouse.x) * 0.15 * dt;
      state.mouse.y += (state.mouse.ty - state.mouse.y) * 0.15 * dt;
      state.mouse.vx = state.mouse.x - oldMx;
      state.mouse.vy = state.mouse.y - oldMy;

      const oldScroll = state.scroll;
      state.scroll += (state.tscroll - state.scroll) * 0.12 * dt;
      state.scrollVel =
        state.scrollVel * 0.9 + (state.scroll - oldScroll) * 0.1;

      const scrollN = Math.min(1, state.scroll / Math.max(1, state.h * 4));
      const scrollRot = scrollN * Math.PI * 1.5;

      const fade = isLight ? 0.14 : 0.09;
      ctx.fillStyle = `rgba(${bg[0]},${bg[1]},${bg[2]},${fade})`;
      ctx.fillRect(0, 0, state.w, state.h);

      for (let i = state.ripples.length - 1; i >= 0; i--) {
        const rp = state.ripples[i];
        rp.r += 6 * dt;
        rp.alpha = Math.max(0, 1 - rp.r / rp.maxR);
        if (rp.alpha <= 0) state.ripples.splice(i, 1);
      }

      for (const rp of state.ripples) {
        ctx.strokeStyle = `rgba(${c1[0]},${c1[1]},${c1[2]},${0.35 * rp.alpha * intensity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      const mx = state.mouse.x;
      const my = state.mouse.y;
      const mSpeed = Math.hypot(state.mouse.vx, state.mouse.vy);
      const mPower = (state.mouse.down ? 2.2 : 1) * (1 + mSpeed * 0.03);
      const vortexR = 160;
      const attractR = 420;

      for (const p of state.particles) {
        p.px = p.x;
        p.py = p.y;
        p.age++;

        const ang = fieldAngle(p.x, p.y, t, scrollRot);
        let ux = Math.cos(ang);
        let uy = Math.sin(ang);

        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy;

        if (d2 < attractR * attractR) {
          const d = Math.sqrt(d2) + 0.01;
          const tvx = -dy / d;
          const tvy = dx / d;
          const nearW = Math.max(0, 1 - d / vortexR);
          const farW = Math.max(0, 1 - d / attractR) * 0.35;
          ux += tvx * nearW * 1.8 * mPower;
          uy += tvy * nearW * 1.8 * mPower;
          ux += (-dx / d) * farW * mPower;
          uy += (-dy / d) * farW * mPower;
        }

        for (const rp of state.ripples) {
          const rdx = p.x - rp.x;
          const rdy = p.y - rp.y;
          const rd = Math.hypot(rdx, rdy);
          const band = 90;
          const diff = Math.abs(rd - rp.r);
          if (diff < band && rd > 0.01) {
            const w = (1 - diff / band) * rp.alpha * 2.2;
            ux += (rdx / rd) * w;
            uy += (rdy / rd) * w;
          }
        }

        const mag = Math.hypot(ux, uy) + 0.001;
        ux /= mag;
        uy /= mag;
        const sp = p.speed * (1 + scrollN * 0.4) * dt;
        p.x += ux * sp;
        p.y += uy * sp;

        if (
          p.x < -10 ||
          p.x > state.w + 10 ||
          p.y < -10 ||
          p.y > state.h + 10 ||
          p.age > p.life
        ) {
          Object.assign(p, spawn());
          continue;
        }

        const mix = Math.max(0, Math.min(1, p.hue * 0.6 + scrollN * 0.6));
        const r = Math.round(c1[0] * (1 - mix) + c2[0] * mix);
        const g = Math.round(c1[1] * (1 - mix) + c2[1] * mix);
        const b = Math.round(c1[2] * (1 - mix) + c2[2] * mix);

        const alpha = 0.55 * intensity * (isLight ? 0.55 : 1);
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }

      const vg = ctx.createRadialGradient(
        state.w / 2,
        state.h / 2,
        Math.min(state.w, state.h) * 0.35,
        state.w / 2,
        state.h / 2,
        Math.max(state.w, state.h) * 0.85
      );
      vg.addColorStop(0, `rgba(${bg[0]},${bg[1]},${bg[2]},0)`);
      vg.addColorStop(
        1,
        `rgba(${bg[0]},${bg[1]},${bg[2]},${isLight ? 0.45 : 0.7})`
      );
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, state.w, state.h);

      state.raf = requestAnimationFrame(tick);
    };
    state.raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(state.raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("touchstart", onDown as EventListener);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("scroll", onScroll);
    };
  }, [accent1, accent2, intensity, mode]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
