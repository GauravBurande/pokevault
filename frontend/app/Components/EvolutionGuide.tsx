import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

export default function EvolutionGuide() {
  const [isEvolving, setIsEvolving] = useState(false);
  const [evolved, setEvolved] = useState(false);
  const [evolutionStage, setEvolutionStage] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  // Handle evolution process
  const handleEvolve = () => {
    setShowConfirm(false);
    setIsEvolving(true);
    setEvolutionStage(1);
  };

  // Control the evolution animation stages
  useEffect(() => {
    if (isEvolving) {
      const stageTimers = [
        setTimeout(() => setEvolutionStage(2), 1000),
        setTimeout(() => setEvolutionStage(3), 2000),
        setTimeout(() => {
          setEvolutionStage(4);
          setEvolved(true);
          setIsEvolving(false);
        }, 3000),
      ];

      return () => stageTimers.forEach((timer) => clearTimeout(timer));
    }
  }, [isEvolving]);

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden pt-6 bg-background text-foreground"
      id="evolution"
    >
      {/* Background Video */}
      <video
        className="absolute w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/pokemon.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80 z-10" />

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-3xl px-4 py-12">
        <div className="bg-muted backdrop-blur-md rounded-2xl p-6 border border-border shadow-lg">
          <h1 className="text-4xl font-extrabold text-primary text-center mb-6">
            Evolution Chamber
          </h1>

          {/* Info Section */}
          <div className="bg-muted backdrop-blur-sm border border-border rounded-lg p-4 mb-6">
            <div className="flex items-center mb-2">
              <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
              <h2 className="text-lg font-semibold text-foreground">
                How Evolution Works
              </h2>
            </div>
            <ul className="text-muted-foreground text-sm pl-6 list-disc space-y-2">
              <li>Sacrifice 2 identical Level 1 Pokémon to evolve</li>
              <li>Both original NFTs will be burned permanently</li>
              <li>
                A new, more powerful evolved Pokémon NFT will be minted to your
                wallet
              </li>
              <li>
                Evolved Pokémon have higher attack power and special abilities
              </li>
            </ul>
          </div>

          {/* Evolution Section */}
          <div className="flex flex-col items-center">
            {!evolved ? (
              <>
                {/* Pokémon Cards */}
                <div className="flex gap-4 md:gap-10 mb-10 relative">
                  {/* First Card */}
                  <div
                    className={`transition-all duration-500 ${
                      evolutionStage >= 2 ? "opacity-0 scale-90" : "opacity-100"
                    } ${evolutionStage === 1 ? "translate-x-10" : ""}`}
                  >
                    <Card className="w-40 h-52 md:w-72 md:h-72 border-2 border-primary bg-muted rounded-xl overflow-hidden">
                      <div className="h-8 bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold text-primary-foreground">
                          LEVEL 1
                        </span>
                      </div>
                      <CardContent className="p-2 flex flex-col items-center">
                        <div className="w-40 h-40 bg-background rounded-full flex items-center justify-center">
                          <img
                            src="https://i.pinimg.com/originals/f1/b6/c7/f1b6c7591a909b12eda1d980fe83a16a.gif"
                            alt="Pichu"
                            className="w-full h-full rounded-full"
                          />
                        </div>
                        <Badge className="mt-2">Pichu #25</Badge>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Second Card */}
                  <div
                    className={`transition-all duration-500 ${
                      evolutionStage >= 2 ? "opacity-0 scale-90" : "opacity-100"
                    } ${evolutionStage === 1 ? "-translate-x-10" : ""}`}
                  >
                    <Card className="w-40 h-52 md:w-72 md:h-72 border-2 border-primary bg-muted rounded-xl overflow-hidden">
                      <div className="h-8 bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold text-primary-foreground">
                          LEVEL 1
                        </span>
                      </div>
                      <CardContent className="p-2 flex flex-col items-center">
                        <div className="w-40 h-40 bg-background rounded-full flex items-center justify-center">
                          <img
                            src="https://i.pinimg.com/originals/f1/b6/c7/f1b6c7591a909b12eda1d980fe83a16a.gif"
                            alt="Pichu"
                            className="w-full h-full rounded-full"
                          />
                        </div>
                        <Badge className="mt-2">Pichu #25</Badge>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Evolution Effect */}
                  {evolutionStage >= 2 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-40 h-40 rounded-full bg-primary animate-pulse flex items-center justify-center transition-all duration-1000">
                        <div className="w-32 h-32 rounded-full bg-muted animate-spin flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-border animate-ping" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col items-center">
                  {!isEvolving && !showConfirm && (
                    <Button
                      onClick={() => setShowConfirm(true)}
                      className="px-6 py-2 text-lg font-bold"
                    >
                      Evolve Pokémon
                    </Button>
                  )}

                  {showConfirm && (
                    <div className="bg-background border border-destructive/50 p-4 rounded-lg mt-2">
                      <p className="text-destructive font-semibold mb-3">
                        Your 2 Pichu NFTs will be burned permanently!
                      </p>
                      <div className="flex gap-4">
                        <Button onClick={handleEvolve} className="bg-primary">
                          Confirm
                        </Button>
                        <Button
                          onClick={() => setShowConfirm(false)}
                          variant="destructive"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  {isEvolving && (
                    <div className="text-center mt-4">
                      <p className="text-lg font-bold text-primary animate-pulse">
                        Evolution in Progress...
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Please wait while your new Pokémon is being minted
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Evolved Card */}
                <div className="animate-bounce-once transition-all duration-500">
                  <Card className="w-56 h-72 md:w-80 md:h-96 border-2 border-primary bg-muted rounded-xl overflow-hidden">
                    <div className="h-10 bg-primary flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-foreground">
                        LEVEL 2
                      </span>
                    </div>
                    <CardContent className="p-3 flex flex-col items-center">
                      <div className="w-48 h-48 md:w-64 md:h-64 bg-background rounded-full flex items-center justify-center">
                        <img
                          src="https://media.tenor.com/R8Tx0HToiqoAAAAM/raichu-pok%C3%A9mon-raichu.gif"
                          alt="Raichu"
                          className="w-full h-full"
                        />
                      </div>
                      <Badge className="mt-2 text-white">Pikachu #7</Badge>
                    </CardContent>
                  </Card>
                </div>

                {/* Reset */}
                <div className="mt-6 text-center">
                  <p className="text-xl font-bold text-primary mb-2">
                    Evolution Complete!
                  </p>
                  <p className="text-muted-foreground">
                    Your new Pikachu has been minted to your wallet
                  </p>
                  <Button
                    onClick={() => {
                      setEvolved(false);
                      setEvolutionStage(0);
                    }}
                    className="mt-4"
                  >
                    Evolve Another Pokémon
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
