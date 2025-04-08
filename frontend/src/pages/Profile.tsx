import { title } from "@/components/primitives"
import DefaultLayout from "@/layouts/Default"
import { UserCircle, Mail, MapPin, Calendar, Briefcase, LinkIcon } from "lucide-react"

export default function ProfilePage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center py-8 md:py-1">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Profile</h1>
        </div>

        <div className="w-full max-w-4xl mx-auto mt-8">
          <div className="bg-[#F6F1DE] dark:bg-[#3E3F5B] rounded-xl shadow-md overflow-hidden">
            <div className="h-32 bg-[#ACD3A8] dark:bg-[#8AB2A6]"></div>
            <div className="relative px-6 py-4">
              <div className="absolute -top-16 left-4">
                <div className="h-32 w-32 rounded-full border-4 border-[#F6F1DE] dark:border-[#3E3F5B] bg-[#8AB2A6] dark:bg-[#8AB2A6] flex items-center justify-center">
                  <UserCircle className="h-36 w-24 text-[#3E3F5B] dark:text-[#F6F1DE]" />
                </div>
              </div>

              <div className="mt-16">
                <h2 className="text-2xl font-bold text-[#3E3F5B] dark:text-[#F6F1DE]">Jane Doe</h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[#ACD3A8] dark:text-[#ACD3A8]" />
                    <span className="text-[#3E3F5B] dark:text-[#F6F1DE]">jane.doe@example.com</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#ACD3A8] dark:text-[#ACD3A8]" />
                    <span className="text-[#3E3F5B] dark:text-[#F6F1DE]">San Francisco, CA</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-[#ACD3A8] dark:text-[#ACD3A8]" />
                    <span className="text-[#3E3F5B] dark:text-[#F6F1DE]">Joined January 2023</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Briefcase className="h-5 w-5 text-[#ACD3A8] dark:text-[#ACD3A8]" />
                    <span className="text-[#3E3F5B] dark:text-[#F6F1DE]">TechCorp Inc.</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <LinkIcon className="h-5 w-5 text-[#ACD3A8] dark:text-[#ACD3A8]" />
                    <a href="#" className="text-[#ACD3A8] dark:text-[#ACD3A8] hover:underline">
                      github.com/janedoe
                    </a>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-[#3E3F5B] dark:text-[#F6F1DE] mb-2">About</h3>
                  <p className="text-[#8AB2A6] dark:text-[#8AB2A6]">
                    Frontend developer with 5 years of experience specializing in React and Next.js. Passionate about
                    creating accessible and performant web applications with beautiful user interfaces.
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-[#3E3F5B] dark:text-[#F6F1DE] mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Next.js", "TypeScript", "Tailwind CSS", "UI/UX", "Responsive Design"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-sm bg-[#ACD3A8]/20 dark:bg-[#ACD3A8]/20 text-[#3E3F5B] dark:text-[#F6F1DE]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  )
}

