export const dynamic = "force-dynamic"; // 1. Fix the Build Error

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 2. The Server Action (The Reporter)
async function fetchLatestNews() {
  "use server";
  
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) return;

  // We search for "Artificial Intelligence" OR "Immigration"
  // We grab the newest 10 articles
  const url = `https://newsapi.org/v2/everything?q="Artificial Intelligence" OR Immigration&sortBy=publishedAt&pageSize=10&language=en&apiKey=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.articles) {
    for (const article of data.articles) {
      // Don't save if it doesn't have a title
      if (article.title && article.url) {
        // Try to save (skip if error)
        try {
            await prisma.newsArticle.create({
            data: {
                title: article.title,
                description: article.description || "No description",
                url: article.url,
                publishedAt: new Date(article.publishedAt), // Convert string to Date
                topic: article.title.includes("Immigration") ? "Immigration" : "AI & Tech"
            },
            });
        } catch (e) {
            // Ignore duplicates or errors
        }
      }
    }
    revalidatePath("/news");
  }
}

// 3. The Page (The Newspaper)
export default async function NewsPage() {
  // Get saved news from DB, newest saved first
  const articles = await prisma.newsArticle.findMany({
    orderBy: { savedAt: "desc" },
    take: 50, // Show last 50 saved items
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              Daily Briefing
            </h1>
            <p className="text-slate-400 mt-2">Tracking AI & Immigration</p>
          </div>
          
          <form action={fetchLatestNews}>
            <button className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-full font-bold transition shadow-lg hover:shadow-blue-500/50">
              📡 Fetch Latest News
            </button>
          </form>
        </div>

        <div className="space-y-6">
          {articles.map((article) => (
            <div key={article.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                <span className={article.topic === "Immigration" ? "text-orange-400" : "text-cyan-400"}>
                  {article.topic || "News"}
                </span>
                <span className="text-slate-500">
                  {article.publishedAt.toLocaleDateString()} 
                </span>
              </div>
              
              <a href={article.url} target="_blank" className="text-xl font-semibold hover:text-blue-400 transition block mb-2">
                {article.title}
              </a>
              
              <p className="text-slate-400 text-sm leading-relaxed">
                {article.description}
              </p>
            </div>
          ))}

          {articles.length === 0 && (
            <div className="text-center text-slate-500 py-20">
              <p>Your archive is empty.</p>
              <p>Click the button above to start tracking history!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}