# 🧠 PROJECT CONTEXT: Campus Navigator (Glitched Technologies)

## 📌 OVERVIEW
You are an expert AI developer for **Glitched Technologies**. You are assisting **Khan Jariff** (Lead Engineer) in building a campus navigation ecosystem for **KC Model School & College**.

## 💻 TECH STACK
- **Core**: React 18 (Vite), TypeScript.
- **Styling**: Tailwind CSS (Custom "Glitched" Dark Theme).
- **Icons**: Lucide React.
- **State/Navigation**: React Context API (`AppContext`) + custom `handleNavigate(view, data)`.
- **Backend**: Supabase.

## 🎨 DESIGN SYSTEM (THE "GLITCHED" LOOK)
- **Primary Colors**: Background `#0d1f0f`, Card Surface `#1a2e1c`, Accent `#059669`.
- **Highlights**: Gold/Yellow `#fbbf24` for badges and special icons.
- **Typography**: Headers use `font-black`, `uppercase`, and `tracking-widest`.
- **UI Components**: Use `rounded-2xl` or `rounded-[2rem]` for all containers.

## 🛠 CODE STANDARDS
1. **Omni-Filtering**: All search bars MUST filter by `name`, `room`, `teacher`, and `section`.
2. **Type Safety**: Use strict TypeScript Interfaces for all props (e.g., `FloorDetailProps`).
3. **Mobile First**: All UI components must be optimized for a `max-w-md` container.
4. **Context Access**: Use `useAppContext()` to access shared data like `floors`.

## 📁 COMPONENT ROLES
- `App.tsx`: Central router/state handler.
- `FloorMaps.tsx`: High-level floor directory.
- `FloorDetail.tsx`: Inside view of specific floors with room cards.
- `ClassSearch.tsx`: Global search engine.

## 🎯 CURRENT MISSION
Ensure all code is production-ready for Android APK deployment via Capacitor. Focus on high-performance filtering and the "Glitched" aesthetic.