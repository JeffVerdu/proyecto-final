import React from "react";

const featuredPosts = [
  {
    id: 1,
    title: "Exploring new design trends",
    image: "/placeholder.svg?height=400&width=600",
    likes: 124,
    comments: 23,
    date: "2 days ago",
    caption:
      "Looking at the latest UI design patterns for 2023. What do you think about neumorphism making a comeback?",
    badge: "🔥 Oferta imperdible",
  },
  {
    id: 2,
    title: "My workspace setup",
    image: "/placeholder.svg?height=400&width=600",
    likes: 89,
    comments: 12,
    date: "1 week ago",
    caption:
      "Finally upgraded my home office with a new monitor and ergonomic chair. Productivity level up!",
    badge: "⭐ Recomendado",
  },
  // Podés seguir agregando badges o dejarlos en blanco
  {
    id: 3,
    title: "Conference highlights",
    image: "/placeholder.svg?height=400&width=600",
    likes: 215,
    comments: 34,
    date: "2 weeks ago",
    caption:
      "Some key takeaways from the React conference. The future of web development looks exciting!",
    badge: "🔥 Oferta imperdible",
  },
  {
    id: 4,
    title: "New project launch",
    image: "/placeholder.svg?height=400&width=600",
    likes: 178,
    comments: 45,
    date: "3 weeks ago",
    caption:
      "Just launched my latest project - a design system for startups. Check it out and let me know your thoughts!",
    badge: "🚀 Nuevo",
  },
  {
    id: 5,
    title: "Learning new skills",
    image: "/placeholder.svg?height=400&width=600",
    likes: 67,
    comments: 8,
    date: "1 month ago",
    caption:
      "Started learning 3D modeling this week. It's challenging but fun! Here's my first creation.",
    badge: "🚀 Nuevo",
  },
];

const Featured = () => {
  return (
    <section className="relative z-20 -mt-24">
      <div className="overflow-x-auto">
        <div className="flex gap-4 snap-x snap-mandatory mx-auto max-w-7xl py-5 px-4">
          {featuredPosts.map((post) => (
            <div
              key={post.id}
              className="relative w-60 shrink-0 bg-white rounded-xl shadow-md p-4 snap-start"
            >
              {/* Badge destacado */}
              {post.badge && (
                <div className="absolute -top-3 left-4 bg-[#3E3F5B] text-white text-xs font-bold px-2 py-1 rounded shadow-md">
                  {post.badge}
                </div>
              )}

              <h3 className="font-semibold text-sm mb-2">{post.title}</h3>
              <div className="aspect-square bg-gray-200 rounded mb-3">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <p className="text-gray-800 text-lg font-bold">$ 9.999</p>
              <p className="text-green-600 text-sm">Envío gratis</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
