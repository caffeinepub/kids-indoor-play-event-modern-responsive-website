import { Baby, Music, Puzzle, Rocket, Smile, Zap } from "lucide-react";
import React from "react";

export default function PlayAreas() {
  const playAreas = [
    {
      icon: Baby,
      title: "Toddler Zone",
      description:
        "Safe, soft play area designed specifically for our youngest visitors (6 months - 3 years)",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Smile,
      title: "Climbing Structures",
      description:
        "Multi-level climbing equipment with slides and tunnels for active play",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Zap,
      title: "Active Play Zone",
      description:
        "High-energy area with obstacle courses and physical challenges",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Music,
      title: "Interactive Games",
      description:
        "Digital and physical games that encourage learning through play",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Puzzle,
      title: "Creative Corner",
      description:
        "Arts, crafts, and imaginative play stations for creative minds",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Rocket,
      title: "Adventure Area",
      description: "Themed play zones that spark imagination and adventure",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <section
      id="play-areas"
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Play Areas
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our diverse play zones designed to engage, entertain, and
            inspire children of all ages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {playAreas.map((area) => {
            const Icon = area.icon;
            return (
              <div
                key={area.title}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:scale-105"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${area.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {area.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {area.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Equipment Designed for Children's Safety
          </h3>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            All our play equipment meets or exceeds safety standards and is
            regularly inspected and maintained. We prioritize your child's
            safety while ensuring maximum fun!
          </p>
        </div>
      </div>
    </section>
  );
}
