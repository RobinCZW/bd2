import { GoogleGenAI } from "@google/genai";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBirthdayWish = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short, warm, elegant, and slightly witty birthday wish for a female friend named "老李" (Lao Li) who is turning 29. 
      The tone should be suitable for a close friend. 
      Include emojis. 
      Language: Chinese. 
      Limit: Under 60 words.`,
    });

    return response.text || "祝老李29岁生日快乐！愿你年年有今日，岁岁有今朝！🎂✨";
  } catch (error) {
    console.error("Error generating wish:", error);
    return "祝老李29岁生日快乐！愿你永远十八岁！🎂✨";
  }
};