'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { Flashcard } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Check, X, RotateCcw, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface FlashcardsProps {
  cards: Flashcard[];
}

export function Flashcards({ cards }: FlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [gotIt, setGotIt] = useState<Flashcard[]>([]);
  const [missed, setMissed] = useState<Flashcard[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleNext = useCallback((status: 'got' | 'missed') => {
    if (showResults) return;

    const currentCard = cards[currentIndex];
    if (status === 'got') {
      setGotIt(prev => [...prev, currentCard]);
    } else {
      setMissed(prev => [...prev, currentCard]);
    }

    setIsFlipped(false);

    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  }, [currentIndex, cards, showResults]);

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setGotIt([]);
    setMissed([]);
    setShowResults(false);
  };
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showResults) return;
      if (e.key === 'ArrowLeft') {
        handleNext('missed');
      } else if (e.key === 'ArrowRight') {
        handleNext('got');
      } else if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsFlipped(f => !f);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, showResults]);

  if (showResults) {
    return (
      <div className="flex flex-col h-full w-full text-foreground">
        <div className="text-center p-6 border-b border-white/10">
          <h2 className="text-3xl font-bold">Session Results</h2>
          <p className="text-muted-foreground mt-2">You reviewed {cards.length} cards.</p>
        </div>
        <ScrollArea className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <div>
              <h3 className="flex items-center text-xl font-semibold text-green-400 mb-4">
                <Check className="mr-2" /> Got It ({gotIt.length})
              </h3>
              <ul className="space-y-3">
                {gotIt.map((card, index) => (
                  <li key={index} className="bg-white/5 p-3 rounded-lg text-sm">{card.term}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="flex items-center text-xl font-semibold text-red-400 mb-4">
                <X className="mr-2" /> Missed ({missed.length})
              </h3>
              <ul className="space-y-3">
                {missed.map((card, index) => (
                   <li key={index} className="relative group bg-white/5 p-3 rounded-lg text-sm">
                   {card.term}
                   <Card className="absolute z-10 bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 p-2 bg-popover text-popover-foreground text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                     <p className="font-bold mb-1">{card.term}</p>
                     <p>{card.definition}</p>
                   </Card>
                 </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollArea>
        <div className="p-6 border-t border-white/10 flex justify-center">
          <Button onClick={handleReset} size="lg">
            <RotateCcw className="mr-2" />
            Review Again
          </Button>
        </div>
      </div>
    );
  }
  
  const currentCard = cards[currentIndex];

  return (
    <div className="flex flex-col h-full w-full items-center justify-center p-4 md:p-8 text-foreground">
      <div className="w-full text-center mb-4">
        <p className="text-sm text-muted-foreground">Card {currentIndex + 1} of {cards.length}</p>
        <div className="w-full bg-muted rounded-full h-1.5 mt-2">
          <div className="bg-accent h-1.5 rounded-full" style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}></div>
        </div>
      </div>
      
      <div 
        className="relative w-full max-w-2xl aspect-[16/9] cursor-pointer group [perspective:1000px]"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={cn(
            "relative w-full h-full rounded-2xl shadow-lg transition-transform duration-700 [transform-style:preserve-3d]",
            isFlipped && "[transform:rotateY(180deg)]"
        )}>
          {/* Front of Card */}
          <div className="absolute inset-0 flex items-center justify-center p-8 bg-black/20 backdrop-blur-lg border border-white/10 [backface-visibility:hidden] rounded-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center">{currentCard.term}</h2>
          </div>
          {/* Back of Card */}
          <div className="absolute inset-0 flex items-center justify-center p-8 bg-black/30 backdrop-blur-xl border border-white/10 [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-2xl">
            <ScrollArea className="w-full max-h-full">
              <p className="text-2xl md:text-3xl text-center px-4">{currentCard.definition}</p>
            </ScrollArea>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
              onClick={(e) => {
                e.stopPropagation();
                handleCopy(currentCard.definition);
              }}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex items-center justify-center gap-4 w-full">
        <Button 
          variant="destructive" 
          className="bg-red-500/80 hover:bg-red-500 text-white w-32 h-16"
          onClick={() => handleNext('missed')}
        >
          <ArrowLeft className="w-6 h-6 mr-2"/>
          <div className='text-left'>
            <p className='font-bold text-lg'>Missed</p>
            <p className='text-xs'>(Left)</p>
          </div>
        </Button>
        <Button 
          variant="default" 
          className="bg-green-500/80 hover:bg-green-500 text-white w-32 h-16"
          onClick={() => handleNext('got')}
        >
          <div className='text-right'>
            <p className='font-bold text-lg'>Got it</p>
            <p className='text-xs'>(Right)</p>
          </div>
          <ArrowRight className="w-6 h-6 ml-2"/>
        </Button>
      </div>

      <p className="text-muted-foreground mt-4 text-sm">Or use arrow keys. Press spacebar to flip.</p>
    </div>
  );
}
