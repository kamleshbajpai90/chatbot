import ResumeEnhancer from "../components/ResumeEnhancer";

export default function ResumePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <main className="flex flex-col w-full max-w-3xl p-8 bg-white dark:bg-zinc-900 rounded-lg shadow-md">
        <ResumeEnhancer />
      </main>
    </div>
  );
}
