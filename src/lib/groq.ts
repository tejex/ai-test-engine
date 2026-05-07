import 'dotenv/config'; // Must be first!
import Groq from "groq-sdk";


console.log('GROQ_API_KEY exists:', !!process.env.GROQ_API_KEY);
console.log('First few chars:', process.env.GROQ_API_KEY?.substring(0, 10));

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export default groq