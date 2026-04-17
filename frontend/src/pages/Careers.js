import React from 'react';
import { Coffee, Briefcase, GraduationCap } from 'lucide-react';

const Careers = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      {/* Fun glowing background logic */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="z-10 bg-gray-800/80 p-10 rounded-3xl backdrop-blur-sm border border-gray-700 shadow-2xl max-w-lg transform hover:scale-105 transition-transform duration-500 relative">
        <div className="absolute -top-5 -right-5 uppercase text-[10px] font-black bg-red-500 text-white px-3 py-1 rounded-full shadow-lg transform rotate-12 animate-pulse">404 Hiring Not Found</div>
        
        <div className="flex justify-center gap-4 mb-6 text-blue-400">
           <Briefcase size={40} className="animate-bounce" />
           <GraduationCap size={40} className="animate-pulse text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
           <Coffee size={40} className="animate-bounce" />
        </div>
        
        <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Wait... you want a job? 😅</h1>
        
        <p className="text-xl text-gray-300 mb-6 font-medium leading-relaxed">
          Bro, this is a <span className="text-blue-400 font-bold underline decoration-wavy">college project</span>. 
          The only person I'm hiring is myself to finish this assignment on time!
        </p>

        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 p-6 rounded-2xl mb-8 group hover:bg-green-500/20 transition-colors">
           <p className="text-green-400 font-bold text-lg mb-2 flex items-center justify-center gap-2">Are you a Professor or Recruiter?</p>
           <p className="text-gray-300 text-sm">
             In that particular scenario... <span className="font-extrabold text-white">YES</span>, I am absolutely available for hire! 
             Please give this project an A+ and a dream job offer! 🙏🚀
           </p>
        </div>

        <button onClick={() => window.close()} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-110 active:scale-95 flex items-center justify-center gap-2 mx-auto w-full max-w-[250px]">
          Close Tab & Go Back
        </button>
      </div>
      
      <p className="absolute bottom-6 text-gray-500 text-xs font-bold tracking-[0.2em] uppercase">
        Engineered with panic, React hooks, and caffeine by Vaibhav Dwivedi.
      </p>
      
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default Careers;
