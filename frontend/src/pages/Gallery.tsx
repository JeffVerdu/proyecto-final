import { title } from "@/components/primitives"
import DefaultLayout from "@/layouts/Default"

export default function GalleryPage() {
  const posts = [
    {
      id: 1,
      title: "Exploring new design trends",
      image: "/placeholder.svg?height=400&width=600",
      likes: 124,
      comments: 23,
      date: "2 days ago",
      caption:
        "Looking at the latest UI design patterns for 2023. What do you think about neumorphism making a comeback?",
    },
    {
      id: 2,
      title: "My workspace setup",
      image: "/placeholder.svg?height=400&width=600",
      likes: 89,
      comments: 12,
      date: "1 week ago",
      caption: "Finally upgraded my home office with a new monitor and ergonomic chair. Productivity level up!",
    },
    {
      id: 3,
      title: "Conference highlights",
      image: "/placeholder.svg?height=400&width=600",
      likes: 215,
      comments: 34,
      date: "2 weeks ago",
      caption: "Some key takeaways from the React conference. The future of web development looks exciting!",
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
    },
    {
      id: 5,
      title: "Learning new skills",
      image: "/placeholder.svg?height=400&width=600",
      likes: 67,
      comments: 8,
      date: "1 month ago",
      caption: "Started learning 3D modeling this week. It's challenging but fun! Here's my first creation.",
    },
    {
      id: 6,
      title: "Team building day",
      image: "/placeholder.svg?height=400&width=600",
      likes: 93,
      comments: 15,
      date: "1 month ago",
      caption: "Great day out with the team. Nothing builds collaboration better than solving escape rooms together!",
    },
  ]

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>My Gallery</h1>
        </div>

        <div className="w-full max-w-7xl mx-auto mt-8 px-4">
          {/* User info summary */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-16 w-16 rounded-full bg-[#8AB2A6] dark:bg-[#8AB2A6] flex items-center justify-center text-[#3E3F5B] dark:text-[#F6F1DE] text-2xl font-bold">
              JD
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#3E3F5B] dark:text-[#F6F1DE]">Jane Doe</h2>
              <p className="text-[#8AB2A6] dark:text-[#8AB2A6]">
                <span className="font-medium">{posts.length} posts</span> ·{" "}
                <a href="/profile" className="hover:underline">
                  View Profile
                </a>
              </p>
            </div>
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-[#F6F1DE] dark:bg-[#3E3F5B] rounded-xl overflow-hidden shadow-md transition-transform hover:scale-[1.02]"
              >
                <div className="relative h-64 w-full">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#3E3F5B] dark:text-[#F6F1DE] mb-2">{post.title}</h3>
                  <p className="text-[#3E3F5B]/80 dark:text-[#F6F1DE]/80 text-sm mb-4 line-clamp-2">{post.caption}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <span className="text-[#ACD3A8] dark:text-[#ACD3A8]">♥</span>
                        <span className="text-[#3E3F5B] dark:text-[#F6F1DE]">{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[#ACD3A8] dark:text-[#ACD3A8]">💬</span>
                        <span className="text-[#3E3F5B] dark:text-[#F6F1DE]">{post.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[#ACD3A8] dark:text-[#ACD3A8]">↗</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="text-[#8AB2A6] dark:text-[#8AB2A6]">📅</span>
                      <span className="text-[#8AB2A6] dark:text-[#8AB2A6]">{post.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load more button */}
          <div className="flex justify-center mt-10">
            <button className="px-6 py-2 bg-[#ACD3A8] hover:bg-[#ACD3A8]/90 text-[#3E3F5B] dark:text-[#3E3F5B] font-medium rounded-full transition-colors">
              Load More
            </button>
          </div>
        </div>
      </section>
    </DefaultLayout>
  )
}