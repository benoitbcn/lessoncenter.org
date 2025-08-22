export async function onRequestGet() {
  const posts = [
    { title: "Socratic Questioning (Quick Guide)", url: "https://en.wikipedia.org/wiki/Socratic_questioning", summary: "Prompts that deepen thinking." },
    { title: "Spaced Repetition 101", url: "https://en.wikipedia.org/wiki/Spaced_repetition", summary: "Space out practice to remember more." },
    { title: "Graphic Organizers Pack", url: "https://en.wikipedia.org/wiki/Graphic_organizer", summary: "Concept maps and more." }
  ];
  return new Response(JSON.stringify({ posts }), { headers: { "content-type": "application/json" } });
}