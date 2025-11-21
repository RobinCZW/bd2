import React from 'react';

interface MessageCardProps {
  message: string;
  loading: boolean;
  onGenerate: () => void;
}

const MessageCard: React.FC<MessageCardProps> = ({ message, loading, onGenerate }) => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pointer-events-none">
      <div className="pointer-events-auto bg-white/30 backdrop-blur-md border border-white/50 shadow-xl rounded-3xl p-8 max-w-md w-[90%] transform transition-all hover:scale-105 duration-500">
        <h1 className="text-4xl font-bold text-purple-800 text-center mb-2 font-serif">
          Happy Birthday!
        </h1>
        <h2 className="text-2xl font-semibold text-pink-600 text-center mb-6 font-serif">
          Lao Li (老李)
        </h2>

        <div className="min-h-[100px] flex items-center justify-center mb-6">
          {loading ? (
             <div className="flex space-x-2 justify-center items-center">
                <div className="h-3 w-3 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-3 w-3 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-3 w-3 bg-indigo-500 rounded-full animate-bounce"></div>
             </div>
          ) : (
            <p className="text-lg text-gray-800 text-center leading-relaxed font-medium font-serif whitespace-pre-wrap">
              {message || "点击下方按钮，生成专属祝福 ✨"}
            </p>
          )}
        </div>

        <button
          onClick={onGenerate}
          disabled={loading}
          className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg transform transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "正在思考祝福语..." : "送上祝福 / Generate Wish 🎁"}
        </button>
      </div>
      
      <p className="absolute bottom-4 text-purple-900/50 text-sm font-sans">
        Made with ❤️ for your 29th
      </p>
    </div>
  );
};

export default MessageCard;