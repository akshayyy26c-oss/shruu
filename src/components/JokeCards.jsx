
const jokes = [
  "Are you WiFi? Because I feel disconnected when you're angry. 😂",
  "Warning! Excessive anger detected. Restarting friendship.exe... 🤣",
];

export default function JokeCards() {
  return (
    <section className="mx-auto mt-16 grid w-full max-w-4xl gap-4 md:grid-cols-2">

      {jokes.map((joke, index) => (
        <article
          key={joke}
          style={{ animationDelay: `${index * 180}ms` }}
          className="joke-reveal rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-pink-400/30 hover:bg-white/[0.08]"
        >
          <div className="mb-4 text-[10px] font-bold tracking-[0.25em] text-violet-300">
            FRIENDSHIP INTELLIGENCE / 0{index + 1}
          </div>

          <p className="text-sm leading-7 text-white/75">
            {joke}
          </p>
        </article>
      ))}

    </section>
  );
}
