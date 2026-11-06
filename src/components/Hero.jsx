import img1 from "../assets/imgs/0119f4c3-1f66-4a1c-a78f-3e37350d8144_20261105_001530_0000.png"
import img2 from "../assets/imgs/InCollage_20261104_232547659.png"


export default function Hero() {
  return (
    <section className="relative mx-auto mt-20 w-full max-w-4xl text-center md:mt-28">

      <div className="absolute -left-50 top-0 hidden -rotate-12 md:block">
        <img
          src= {img1}
          alt="Angry cartoon bird"
          className="w-32 animate-float drop-shadow-2xl"
        />
      </div>

      <div className="absolute -right-50 bottom-0 hidden rotate-12 md:block">
        <img
          src={img2}
          alt="Funny sheep character"
          className="w-32 animate-float-delayed drop-shadow-2xl"
        />
      </div>

      <span className="inline-block rounded-full border border-pink-400/20 bg-pink-500/10 px-5 py-2 text-[10px] font-bold tracking-[0.3em] text-pink-300">
        A VERY IMPORTANT FRIENDSHIP MEETING
      </span>

      <h1 className="mt-8 text-5xl font-black leading-[1.1] tracking-tight sm:text-7xl">
        Hey, Angry
        <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
          Bird!
        </span>
      </h1>

      <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
        I have an extremely serious matter to discuss.
        It involves friendship, one bus journey, and your
        very talented anger management skills.
      </p>

      <div className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
    </section>
  );
}
