import { useEffect, useState } from "react";

import AnimatedBackground from "./components/AnimatedBackground";
import Hero from "./components/Hero";
import JokeCards from "./components/JokeCards";
import QuestionCard from "./components/QuestionCard";
import SuccessScreen from "./components/SuccessScreen";

const defaultQuestions = [
{
question: "Do you want me to stop caring about you?",
yes: "Good! Because that's not happening anyway.",
no: "Too late! Caring mode is permanently activated.",
},
{
question: "Would you like to come with me on the bus today?",
yes: "Bus journey officially saved!",
no: "Even the bus is waiting for you!",
},
{
question: "Can we forget this fight and start smiling again?",
yes: "That's the answer I was waiting for!",
no: "Friendship is too precious to give up!",
},
];

const saveResponse = async (answer) => {
try {
const response = await fetch("/api/responses", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
question: questions[current].question,
answer: answer,
}),
});

const result = await response.json();  

if (!response.ok) {  
  throw new Error(result.message || "Failed to save response");  
}  

console.log("Response saved:", result);  
return true;

} catch (error) {
console.error("Save error:", error);
alert("Unable to save your answer. Please try again.");
return false;
}
};

function App() {
const [current, setCurrent] = useState(0);
const [answers, setAnswers] = useState({});
const [success, setSuccess] = useState(false);

const [questions, setQuestions] = useState(defaultQuestions);
const [loading, setLoading] = useState(true);

// FETCH QUESTIONS FROM BACKEND
useEffect(() => {
const fetchContents = async () => {
try {
const response = await fetch("/api/content");

if (!response.ok) {  
      throw new Error("Failed to fetch content");  
    }  

    const result = await response.json();  

    console.log("Backend API:", result);  

    if (Array.isArray(result.data) && result.data.length > 0) {  
      const backendQuestions = result.data.map((item) => ({  
        question: item.question,  
        yes: item.yes || "That's the answer I was waiting for!",  
        no: item.no || "Friendship is too precious to give up!",  
      }));  

      setQuestions(backendQuestions);  
    }  
  } catch (error) {  
    console.error("API Error:", error);  
    console.log("Using default questions");  
  } finally {  
    setLoading(false);  
  }  
};  

fetchContents();

}, []);

const handleYes = () => {
setAnswers((prev) => ({
...prev,
[current]: "yes",
}));

if (current === questions.length - 1) {  
  setSuccess(true);  
} else {  
  setCurrent((prev) => prev + 1);  
}

};

const handleNext = () => {
if (current < questions.length - 1) {
setCurrent((prev) => prev + 1);
}
};

return (
<main className="relative min-h-screen overflow-hidden bg-[#080611] text-white">

<AnimatedBackground />  

  <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-8 md:px-10">  

    {/* HEADER */}  
    <header className="flex items-center justify-between">  
      <a href="/" className="text-lg font-black tracking-tight">  
        FRIENDSHIP<span className="text-pink-400">.</span>  
      </a>  

      <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs tracking-widest text-white/60">  
        SPECIAL EDITION / 001  
      </span>  
    </header>  

    {/* MAIN CONTENT */}  
    {loading ? (  
      <div className="flex flex-1 items-center justify-center">  
        <p className="animate-pulse text-pink-300">  
          Loading friendship questions...  
        </p>  
      </div>  
    ) : !success ? (  
      <>  
        <Hero />  

        <JokeCards />  

        <section className="mx-auto mt-12 w-full max-w-2xl pb-12">  

          {/* QUESTION PROGRESS */}  
          <div className="mb-6 flex items-center justify-between">  
            <span className="text-xs tracking-[0.3em] text-white/40">  
              FRIENDSHIP TEST  
            </span>  

            <span className="text-xs text-pink-300">  
              {String(current + 1).padStart(2, "0")} /{" "}  
              {String(questions.length).padStart(2, "0")}  
            </span>  
          </div>  

          {/* PROGRESS BAR */}  
          <div className="mb-7 flex gap-2">  
            {questions.map((_, index) => (  
              <div  
                key={index}  
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${  
                  index <= current  
                    ? "bg-gradient-to-r from-pink-500 to-violet-500"  
                    : "bg-white/10"  
                }`}  
              />  
            ))}  
          </div>  

          {/* QUESTION CARD */}  
          <QuestionCard  
            key={current}  
            question={questions[current]}  
            questionNumber={current}  
            onYes={handleYes}  
            onNext={handleNext}  
          />  

          {answers[current] && (  
            <p className="mt-5 text-center text-sm text-pink-200">  
              {questions[current].yes}  
            </p>  
          )}  

        </section>  
      </>  
    ) : (  
      <SuccessScreen />  
    )}  

    {/* FOOTER */}  
    <footer className="mt-auto border-t border-white/10 py-6 text-center text-xs tracking-widest text-white/30">  
      MADE WITH CARE · FRIENDSHIP NEVER EXPIRES  
    </footer>  

  </div>  
</main>

);
}

export default App;
