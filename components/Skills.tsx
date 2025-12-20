import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "../src/lib/utils";

// --- 1. DATA: Skills with Specific Brand Colors ---
const SKILLS = [
  {
    category: "Frontend Core",
    items: [
      { name: "React 19", icon: "react", color: "#61DAFB" },
      { name: "Next.js", icon: "next", color: "#ffffff" },
      { name: "TypeScript", icon: "ts", color: "#3178C6" },
      { name: "Tailwind CSS", icon: "tailwind", color: "#06B6D4" },
    ],
  },
  {
    category: "Backend & Cloud",
    items: [
      { name: "Node.js", icon: "node", color: "#339933" },
      { name: "PostgreSQL", icon: "postgres", color: "#4169E1" },
      { name: "AWS", icon: "aws", color: "#FF9900" },
      { name: "Vercel", icon: "vercel", color: "#ffffff" },
    ],
  },
  {
    category: "Tools & Architecture",
    items: [
      { name: "Docker", icon: "docker", color: "#2496ED" },
      { name: "Figma", icon: "figma", color: "#F24E1E" },
      { name: "Git", icon: "git", color: "#F05032" },
      { name: "GraphQL", icon: "graphql", color: "#E10098" },
    ],
  },
];

// --- 2. COMPONENTS: The Lamp Header ---
const LampHeader = () => {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden min-h-[30vh] w-full rounded-md z-0">
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{ backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))` }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-to-br from-blue-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute  w-[100%] left-0 bg-black h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute  w-40 h-[100%] left-0 bg-black  bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{ backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))` }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-to-bl from-transparent via-transparent to-blue-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute  w-40 h-[100%] right-0 bg-black  bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute  w-[100%] right-0 bg-black h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-black blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-blue-500 opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-blue-400 blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-blue-400 "
        ></motion.div>
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-black "></div>
      </div>
      <div className="relative z-50 flex -translate-y-20 flex-col items-center px-5">
        <motion.h2
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Tech Stack
        </motion.h2>
      </div>
    </div>
  );
};

// --- 3. COMPONENTS: The Spotlight Card ---
type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
  key?: React.Key; // allow React `key` in JSX
};

const SpotlightCard = ({ children, className = "" }: SpotlightCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const position = { x: useMotionValue(0), y: useMotionValue(0) };
  const opacity = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    position.x.set(e.clientX - rect.left);
    position.y.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => opacity.set(1)}
      onMouseLeave={() => opacity.set(0)}
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 px-8 py-16 shadow-2xl",
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: useMotionTemplate`radial-gradient(650px circle at ${position.x}px ${position.y}px, rgba(37, 99, 235, 0.15), transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

// --- 4. ICON RENDERER (NOW WITH REAL SVG PATHS) ---
const Icon = ({ name, color }: { name: string, color: string }) => {
  const paths: Record<string, string> = {
    react: "M12 0c-1.82 0-3.53.5-5.05 1.36.95 1.05 2.21 1.64 3.55 1.64 1.34 0 2.6-.59 3.55-1.64-1.52-.86-3.23-1.36-5.05-1.36zm-6.2 3.14c-1.28 1.28-2.15 2.94-2.43 4.79 1.34-.33 2.76-.23 4.07.28.21-1.46 1.1-2.75 2.45-3.6-1.55-.78-3.03-1.25-4.09-1.47zm12.4 0c-1.06.22-2.54.69-4.09 1.47 1.35.85 2.24 2.14 2.45 3.6 1.31-.51 2.73-.61 4.07-.28-.28-1.85-1.15-3.51-2.43-4.79zm-13.84 6.78c-.76 1.45-1.03 3.09-.76 4.7 1.25-.66 2.68-.99 4.12-.99 0-1.34.6-2.6 1.65-3.55-.86-1.52-1.35-3.23-1.35-5.05 0 1.05-.22 2.06-.61 3.01-.98 1.06-2.09 1.63-3.05 1.88zm13.68 0c-.96-.25-2.07-.82-3.05-1.88-.39-.95-.61-1.96-.61-3.01 0 1.82-.49 3.53-1.35 5.05 1.05.95 1.65 2.21 1.65 3.55 1.44 0 2.87.33 4.12.99.27-1.61 0-3.25-.76-4.7zm-6.04 2.08c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zm-5.69 4.41c.22 1.06.69 2.54 1.47 4.09.85-1.35 2.14-2.24 3.6-2.45-.51-1.31-.61-2.73-.28-4.07-1.85.28-3.51 1.15-4.79 2.43zm11.38 0c-1.28-1.28-2.94-2.15-4.79-2.43.33 1.34.23 2.76-.28 4.07 1.46-.21 2.75-1.1 3.6-2.45.78 1.55 1.25 3.03 1.47 4.09zm-8.38 3.25c1.52.86 3.23 1.36 5.05 1.36 1.82 0 3.53-.5 5.05-1.36-.95-1.05-2.21-1.64-3.55-1.64-1.34 0-2.6.59-3.55 1.64z",

    // NEXT JS
    next: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385l-7.075-8.509h4.417l5.064 6.302 4.965-6.302h4.169l-7.469 8.922v7.714c5.442-1.275 9.504-6.16 9.504-11.597z",

    // TYPESCRIPT
    ts: "M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM8.837 5.582h7.828v2.859h-2.594v9.977H11.43V8.441H8.837V5.582zM15.42 16.596c.219.782.724 1.266 1.407 1.266.657 0 1.055-.375 1.055-1.03 0-.688-.423-1.048-1.642-1.579-1.922-.843-2.742-1.78-2.742-3.483 0-2.031 1.547-3.328 3.75-3.328 1.687 0 3.125.688 3.578 2.219l-2.28 1.062c-.204-.64-.641-.953-1.329-.953-.625 0-1.015.359-1.015.937 0 .64.406 1.015 1.64 1.547 2.016.859 2.766 1.843 2.766 3.562 0 2.156-1.594 3.422-3.875 3.422-1.89 0-3.39-.75-3.812-2.547l2.5-1.094z",

    // TAILWIND
    tailwind: "M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C7.666,17.818,9.027,19.2,12.001,19.2c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z",

    // NODE
    node: "M12.007 0C5.376 0 0 5.373 0 12.002c0 6.629 5.376 12.003 12.007 12.003 6.63 0 11.993-5.374 11.993-12.003C24 5.373 18.636 0 12.007 0zm5.285 17.518h-2.253v-5.467l-3.375 1.94v5.42H9.37v-7.228l-2.062-1.196v6.52H5.054v-8.483l6.57-3.82 6.57 3.82v8.484zm0 0",

    // POSTGRES
    postgres: "M11.91 0c-6.6 0-11.95 5.35-11.95 11.95S5.3 23.9 11.91 23.9s11.95-5.35 11.95-11.95S18.51 0 11.91 0zm7.32 17.65c-1.39.81-2.83 1.25-4.27 1.25-2.09 0-3.69-1.02-3.69-3.23 0-2.3 2.01-4.04 5.06-4.27 0-.02.01-.05.01-.08 0-1.12-.66-1.58-1.85-1.58-1.01 0-1.74.34-2.87 1.09l-.7-1.12c1.45-.98 2.62-1.42 4.14-1.42 2.39 0 3.32 1.35 3.32 3.65v3.48c0 .61.07.9.27 1.15l.58.07zm-4.38-1.25c1.07 0 1.92-.47 2.45-1.31v-1.66c-1.79.22-2.84 1.05-2.84 2.21 0 .54.19.76.39.76z",

    // AWS
    aws: "M17.85 19.5c.35-.43.55-.68.83-1.08l-2.43-.8c-.18.4-.33.73-.63 1.15-.3.45-.63.83-1.05 1.13-.4.33-.93.58-1.53.68-.63.1-1.23.08-1.85-.1-.48-.15-.88-.4-1.2-.7-.35-.35-.55-.78-.65-1.25-.08-.43-.03-.98.15-1.55l3.25 1.23c.3.1.58.15.8.15.65 0 1.2-.28 1.55-.75.38-.48.53-1.08.45-1.73-.03-.13-.05-.28-.08-.43-.13-.75-.43-1.4-1-1.93-.53-.53-1.18-.9-1.95-1.13-.8-.23-1.65-.3-2.5-.18-.85.1-1.68.4-2.45.83-.75.43-1.38 1-1.83 1.7-.48.7-.75 1.53-.8 2.38-.03.43.03.85.13 1.28.08.38.2.73.38 1.05l.08.15c.65 1.13 1.55 2.03 2.73 2.65 1.15.6 2.48.9 3.85.93 1.15.03 2.28-.18 3.33-.58 1.03-.38 1.93-.95 2.7-1.68zm-5.63-5.28c.45-.05.88-.03 1.25.08.38.1.7.3.98.58.28.25.48.58.55.93.08.35.03.73-.1 1.1l-2.73-1.03c.03-.6.03-1.15.05-1.65zM11.95 5.5c-4.45 0-8.1 3.65-8.1 8.1 0 1.25.3 2.43.83 3.5l1.83-1.55c-.28-.6-.43-1.25-.43-1.95 0-3.23 2.63-5.85 5.85-5.85 3.23 0 5.85 2.63 5.85 5.85 0 .73-.15 1.4-.45 2.03l1.83 1.5c.53-1.05.83-2.23.83-3.5 0-4.48-3.63-8.13-8.1-8.13z",

    // VERCEL
    vercel: "M24 22.525H0l12-21.05 12 21.05z",

    // DOCKER
    docker: "M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.119a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m0 2.716h2.119a.186.186 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.119a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.185m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.185m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.185m5.892 2.715h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.929 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.084.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-1.843 0-2.55 1.25-2.55 1.25s-.998-1.25-2.55-1.25c-1.239 0-1.866.436-1.953.508v-.815a1.86 1.86 0 00-1.86-1.86h-.768v-1.12a.56.56 0 00-.558-.56H8.591a.56.56 0 00-.558.56v1.12h-.765a1.86 1.86 0 00-1.86 1.86v1.517c-.12-.047-.258-.076-.403-.076-.805 0-1.46.654-1.46 1.458 0 .044.002.088.006.13-.585.34-1.397.745-2.607.745C.28 12.89 0 13.568 0 14.41c0 2.21 2.228 3.514 3.992 4.418 2.378 1.22 4.863 1.29 5.252 1.29.61 0 1.2-.072 1.772-.212.98-.24 3.018-.76 5.845-.76 1.786 0 5.176.536 7.135 1.968L24 16.74c0-3.87-2.927-6.527-2.927-6.527.24-.135.535-.224.85-.224.814 0 1.477.663 1.477 1.48 0 .152-.023.298-.066.438.257-.04.52-.062.79-.062 1.636 0 3.125.79 3.125 2.123 0 1.543-1.639 2.508-3.483 3.024",

    // FIGMA
    figma: "M8.7 24a4.35 4.35 0 110-8.7 4.35 4.35 0 010 8.7zm0-12.18c-2.4 0-4.35-1.94-4.35-4.35S6.3 3.13 8.7 3.13 13.05 5.07 13.05 7.47v4.35H8.7zM15.3 7.47c0 2.4-1.95 4.35-4.35 4.35h-2.25V7.47c0-2.4 1.95-4.35 4.35-4.35s4.35 1.94 4.35 4.35zM8.7 15.3c0 2.4 1.95 4.35 4.35 4.35s4.35-1.94 4.35-4.35-1.95-4.35-4.35-4.35H8.7v4.35z",

    // GIT
    git: "M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.541-.539-.674-1.335-.404-1.996L7.733 3.609 1.125 10.217c-.604.604-.604 1.584 0 2.188l10.48 10.477c.604.604 1.582.604 2.186 0l9.755-9.753c.605-.603.605-1.584 0-2.188z",

    // GRAPHQL
    graphql: "M4.965 20.318a.908.908 0 01-.336-.062l-4.18-1.854a.908.908 0 01-.54-1.042l1.62-5.918a.908.908 0 01.69-.652l5.774-1.316a.91.91 0 01.81.168l4.49 3.32a.91.91 0 01.21.998l-2.074 5.568a.908.908 0 01-.84.59h-5.624zM23.55 17.36l-4.18 1.854a.908.908 0 01-.335.062h-5.625a.908.908 0 01-.84-.59l-2.073-5.568a.909.909 0 01.21-.998l4.49-3.32a.91.91 0 01.81-.168l5.773 1.316a.908.908 0 01.69.652l1.62 5.918a.908.908 0 01-.54 1.042zM12.001 4.706a.909.909 0 01-.362.074.908.908 0 01-.803-.49L8.35 1.528A.908.908 0 018.66.38L12 0l3.34.38a.908.908 0 01.31 1.148L13.165 4.29a.908.908 0 01-.803.49.91.91 0 01-.362-.074z",

    // Default fall-back
    default: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z",
  };

  // Choose the path based on name or default
  const path = paths[name] || paths.default;

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-slate-400 group-hover:text-[var(--icon-color)] transition-colors duration-500" style={{ "--icon-color": color } as React.CSSProperties}>
      <path d={path} />
    </svg>
  )
}

// --- 5. MAIN SKILLS COMPONENT ---
const Skills = () => {
  return (
    <section id="skills" className="bg-black py-20 relative overflow-hidden">

      {/* 1. The Lamp Effect Title */}
      <LampHeader />

      <div className="container mx-auto px-4 relative z-10 -mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">

          {SKILLS.map((category) => (
            <div key={category.category} className="space-y-4">
              {/* Category Title with glow */}
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px bg-slate-800 flex-1"></div>
                <span className="text-slate-500 uppercase tracking-widest text-xs font-bold">{category.category}</span>
                <div className="h-px bg-slate-800 flex-1"></div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {category.items.map((skill) => (
                  <SpotlightCard key={skill.name} className="group p-6 flex-row gap-6 items-center justify-start text-left hover:border-slate-700/50 transition-colors duration-500">
                    <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-black border border-slate-800 group-hover:border-[var(--skill-color)] group-hover:shadow-[0_0_20px_var(--skill-color-dim)] transition-all duration-500" style={{ "--skill-color": skill.color, "--skill-color-dim": skill.color + '40' } as React.CSSProperties}>
                      <Icon name={skill.icon} color={skill.color} />
                    </div>
                    <div className="z-10">
                      <h3 className="text-xl font-bold text-slate-200 group-hover:text-white transition-colors">{skill.name}</h3>
                      <p className="text-sm text-slate-500 group-hover:text-slate-400">Expert Proficiency</p>
                    </div>
                    {/* Subtle arrow appearing on hover */}
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-[-10px] group-hover:translate-x-0">
                      <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Floating Background Particles */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: Math.random() * 1000, x: Math.random() * 100 + "%" }}
              animate={{ opacity: [0, 1, 0], y: [null, Math.random() * -100] }}
              transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
              className="absolute w-0.5 h-0.5 bg-slate-600 rounded-full"
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;