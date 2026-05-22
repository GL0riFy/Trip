import Groq from "groq-sdk";

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "gsk_dummy_key_for_compilation_purposes",
});