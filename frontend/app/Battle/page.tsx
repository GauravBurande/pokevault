"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

const Battle = () => {
  const [animationStep, setAnimationStep] = useState(0);

  // Animation cycle effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4);
    }, 750);

    return () => clearInterval(interval);
  }, []);

  // Animation for the battle text
  const getBattleText = () => {
    switch (animationStep) {
      case 0:
        return "BATTLE ARENA";
      case 1:
        return "BATTLE ARENA.";
      case 2:
        return "BATTLE ARENA..";
      case 3:
        return "BATTLE ARENA...";
      default:
        return "BATTLE ARENA";
    }
  };

  return (
    <div className="container mx-auto py-24 px-4 min-h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-bold mb-4 text-center text-[--primary]">
          {getBattleText()}
        </h1>

        <div className="w-64 h-1 bg-[--primary] mb-12 rounded-full" />

        <div className="max-w-4xl w-full">
          <Card className="border border-[--primary]/40 mb-12 bg-background relative">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold text-[--primary-foreground]">
                COMING SOON
              </CardTitle>
              <div className="flex justify-center space-x-2 mt-2">
                <Badge
                  variant="outline"
                  className="bg-[--primary]/10 border-[--primary]/40 text-[--primary]"
                >
                  High Stakes
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-[--secondary]/10 border-[--secondary]/40 text-[--secondary]"
                >
                  NFT Battles
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-[--accent]/10 border-[--accent]/40 text-[--accent]"
                >
                  Strategy
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pb-8">
              <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                {/* Rules List */}
                <div className="w-full md:w-1/2 space-y-2">
                  <h3 className="font-bold text-xl mb-4 text-[--primary-foreground]">
                    Battle Rules
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    {[
                      "Choose 3 of your Pokémon NFTs to compete in the battle arena",
                      "Battle will be fought based on your NFTs' attributes and stats",
                      "If you lose, one random NFT from your team will be transferred to your opponent",
                      "If you win, you'll receive one random NFT from your opponent's team",
                    ].map((rule, i) => (
                      <li className="flex items-start" key={i}>
                        <span className="bg-[--primary] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-3 flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Simple VS Icon */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="relative w-64 h-64 flex items-center justify-center">
                    <div className="w-32 h-32 bg-[--muted] rounded-full opacity-20" />
                    <div className="absolute w-16 h-16 border-4 border-[--primary] border-t-transparent rounded-full animate-spin" />
                    <div className="absolute text-2xl font-bold text-[--primary]">
                      VS
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center text-muted-foreground italic mb-6">
                Choose wisely which Pokémon to send into battle. The strongest
                team doesn’t always win!
              </div>

              <div className="flex justify-center">
                <Button
                  size="lg"
                  className="bg-[--primary] text-white font-bold px-8 py-6 hover:bg-[--primary]/90"
                  disabled
                >
                  {animationStep === 3 ? "PREPARE FOR BATTLE" : "COMING SOON"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 text-[--primary-foreground]">
              Trainer, are you ready?
            </h3>
            <p className="text-muted-foreground mb-4">
              Get your strongest Pokémon ready for the ultimate test. Build your
              collection now to prepare for upcoming battles!
            </p>
            <div className="flex justify-center gap-4">
              <a href="/Collection">
                <Button variant="outline">View Collection</Button>
              </a>
              <a href="/Marketplace">
                <Button variant="outline">Get More Pokémon</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Battle;
