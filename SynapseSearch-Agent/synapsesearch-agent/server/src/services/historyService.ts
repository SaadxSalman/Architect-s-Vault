import { Message } from '../models/ChatHistory';

export const getRecentHistory = async (sessionId: string, limit = 5) => {
  const history = await Message.find({ sessionId })
    .sort({ timestamp: -1 })
    .limit(limit);
  
  // Format for LangChain (Reverse because we sorted by -1 for newest)
  return history.reverse().map(msg => ({
    role: msg.role,
    content: msg.content
  }));
};

export const saveExchange = async (sessionId: string, userQuery: string, aiResponse: string, intent: string) => {
  await Message.create([
    { sessionId, role: 'human', content: userQuery, intent },
    { sessionId, role: 'ai', content: aiResponse }
  ]);
};