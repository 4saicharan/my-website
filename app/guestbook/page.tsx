export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. Define the Action to save data
async function saveMessage(formData: FormData) {
  "use server"; // This runs on the server
  const message = formData.get("message") as string;
  
  if (message) {
    await prisma.guestbookEntry.create({
      data: { message },
    });
    revalidatePath("/guestbook"); // Refresh the page
  }
}

// 2. The Main Page
export default async function Guestbook() {
  // Fetch messages and sort by newest first
  const entries = await prisma.guestbookEntry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold mb-8 text-blue-400">Guestbook 🖊️</h1>

      {/* The Form */}
      <form action={saveMessage} className="flex gap-2 mb-10">
        <input
          name="message"
          type="text"
          placeholder="Sign my guestbook..."
          className="px-4 py-2 rounded-lg text-black w-64"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-bold transition"
        >
          Sign
        </button>
      </form>

      {/* The List of Messages */}
      <div className="flex flex-col gap-4 w-full max-w-md">
        {entries.map((entry) => (
          <div key={entry.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <p className="text-lg">{entry.message}</p>
            {/* THE FIX: We convert the date to a localized string here */}
            <p className="text-xs text-slate-500 mt-2">
              {entry.createdAt.toLocaleDateString()} at {entry.createdAt.toLocaleTimeString()}
            </p>
          </div>
        ))}

        {entries.length === 0 && (
          <p className="text-slate-500 text-center">No messages yet. Be the first!</p>
        )}
      </div>
    </div>
  );
}

