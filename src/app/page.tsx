import CurrencyCalculator from '@/components/CurrencyCalculator';

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4 pt-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 drop-shadow-sm">
            Currency Converter
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl font-medium tracking-wide">
            Real-time interbank conversion rates.
          </p>
        </div>
        
        <CurrencyCalculator />
      </div>
    </main>
  );
}
