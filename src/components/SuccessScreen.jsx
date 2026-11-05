import img3 from "../assets/imgs/InCollage_20261105_001954975.png"


export default function SuccessScreen() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center py-20 text-center">

      <img
        src={img3}
        alt="Happy cartoon bird"
        className="mb-8 w-48 animate-success-bounce drop-shadow-[0_0_35px_rgba(236,72,153,0.3)]"
      />

      <span className="rounded-full border border-pink-400/20 bg-pink-500/10 px-5 py-2 text-[10px] font-bold tracking-[0.3em] text-pink-300">
        FRIENDSHIP RESTORED
      </span>

      <h1 className="mt-8 text-5xl font-black tracking-tight sm:text-7xl">
        Mission
        <span className="block bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
          Successful!
        </span>
      </h1>

      <p className="mx-auto mt-7 max-w-lg text-base leading-8 text-white/55">
        Official announcement: The fight is cancelled.
        Friendship subscription renewed permanently.
      </p>

      <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-2xl">
        <p className="text-xl font-bold text-white">
          Tomorrow, same bus stop, same friendship?
        </p>

        <p className="mt-3 text-sm text-pink-300">
          Some friendships are simply too special to lose.
        </p>
      </div>

      <button
        onClick={() => window.location.reload()}
        className="mt-10 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-9 py-4 text-sm font-bold transition hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/20"
      >
        Replay Friendship Test
      </button>

    </section>
  );
}
