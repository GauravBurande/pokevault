"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Hero = () => {
  // Sample Pokemon data with evolution paths
  const featuredPokemon = [
    {
      id: 1,
      name: "Bulbasaur",
      evolution: "Evolves to Ivysaur",
      rarity: "Uncommon",
      gifUrl:
        "https://i.pinimg.com/originals/a4/00/bb/a400bbe6c782df285a1ce363fa55e6b9.gif",
    },
    {
      id: 4,
      name: "Charmander",
      evolution: "Evolves to Charmeleon",
      rarity: "Rare",
      gifUrl:
        "https://media0.giphy.com/media/u1k1kpDZSw5sA/giphy.gif?cid=6c09b9527wip9bsst0btw9vgwo6rreya8ijfr9whcu13vbqe&ep=v1_gifs_search&rid=giphy.gif&ct=g",
    },
    {
      id: 7,
      name: "Squirtle",
      evolution: "Evolves to Wartortle",
      rarity: "Rare",
      gifUrl: "https://i.imgur.com/mceazdp.gif",
    },
    {
      id: 25,
      name: "Pikachu",
      evolution: "Evolves to Raichu",
      rarity: "Epic",
      gifUrl:
        "https://i.pinimg.com/originals/a5/2d/15/a52d151bcdb80882d805c83bd5d11ad6.gif",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate cards every 2 seconds
  useEffect(() => {
    let interval: any;

    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % featuredPokemon.length
        );
      }, 6000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredPokemon.length]);

  // Pause auto-rotation when user interacts with navigation
  const handleManualNavigation = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);

    // Resume auto-rotation after 5 seconds of inactivity
    const timeout = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);

    return () => clearTimeout(timeout);
  };

  const nextCard = () => {
    handleManualNavigation((currentIndex + 1) % featuredPokemon.length);
  };

  const prevCard = () => {
    handleManualNavigation(
      (currentIndex - 1 + featuredPokemon.length) % featuredPokemon.length
    );
  };

  // Get current Pokemon
  const currentPokemon = featuredPokemon[currentIndex];

  // Determine rarity color class
  const getRarityColorClass = (rarity: string) => {
    switch (rarity) {
      case "Epic":
        return "bg-purple-500 text-white";
      case "Rare":
        return "bg-blue-500 text-white";
      case "Uncommon":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="h-full bg-background text-foreground relative overflow-hidden">
      {/* Frosted glass background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/40 to-background/80 backdrop-blur-2xl z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center gap-12 md:pt-16">
          {/* Left Section */}
          <div className="w-full md:w-1/2 space-y-6">
            <motion.h1
              className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-white bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span>Collect.</span> <span>Evolve.</span> <span>Trade.</span>
            </motion.h1>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-xl md:text-2xl font-medium">
                Claim Level 1 Pokémon appearing throughout the digital world.
              </p>
              <p className="text-lg md:text-xl">
                Combine two identical Pokémon to trigger evolution into higher
                forms.
              </p>
              <p className="text-lg md:text-xl">
                Build your ultimate collection of rare and powerful evolved
                Pokémon.
              </p>

              <div className="flex gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Start Collecting
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Section: Carousel with glass card styling */}
          <div className="w-full md:w-1/2 relative pt-10">
            <div className="relative h-[500px] w-full max-w-[400px] mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100, rotateY: 45 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -100, rotateY: -45 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 0.5,
                  }}
                  className="absolute inset-0"
                >
                  <Card className="h-full border border-border bg-background/30 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                    <CardContent className="p-0 h-full flex flex-col">
                      <div className="relative flex-grow">
                        <img
                          src={currentPokemon.gifUrl || "/placeholder.svg"}
                          alt={currentPokemon.name}
                          className="w-full h-full object-cover rounded-t-xl"
                        />
                        <div className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold">
                          #{currentPokemon.id.toString().padStart(3, "0")}
                        </div>
                        <div
                          className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-bold ${getRarityColorClass(
                            currentPokemon.rarity
                          )}`}
                        >
                          {currentPokemon.rarity}
                        </div>

                        {/* Sparkles */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 bg-primary rounded-full"
                              style={{
                                top: `${1 * 100}%`,
                                left: `${1 * 100}%`,
                              }}
                              animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1.5, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.4,
                              }}
                            />
                          ))}
                        </motion.div>
                      </div>

                      <div className="p-6 bg-background/70 backdrop-blur-md rounded-b-xl">
                        <h3 className="text-2xl font-bold">
                          {currentPokemon.name}
                        </h3>
                        <p className="text-lg text-muted-foreground">
                          {currentPokemon.evolution}
                        </p>
                        <div className="mt-4 flex justify-between items-center">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-primary hover:text-primary hover:bg-primary/10"
                          >
                            View Details
                          </Button>
                          <div className="text-lg font-medium text-primary">
                            <span className="text-muted-foreground">
                              Price:
                            </span>{" "}
                            0.05 MON
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-background/80 backdrop-blur-md z-10 shadow-lg"
                onClick={prevCard}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-background/80 backdrop-blur-md z-10 shadow-lg"
                onClick={nextCard}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {featuredPokemon.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleManualNavigation(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary scale-125"
                      : "bg-muted hover:bg-primary/50"
                  }`}
                  aria-label={`View Pokemon ${index + 1}`}
                />
              ))}
            </div>

            {/* View All CTA */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <a href="/Marketplace">
                <Button variant="link" className="text-primary">
                  View All Pokémon NFTs →
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
