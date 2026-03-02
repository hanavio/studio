"use client";

import { useState } from 'react';
import { chapters, Flashcard } from '@/lib/data';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Quiz } from '@/components/quiz/Quiz';
import { Flashcards } from '@/components/flashcards/Flashcards';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BookOpen, Clapperboard, Film, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';


export default function Home() {
  const glassmorphicClass = 'bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg transition-all duration-300 hover:border-white/20 hover:shadow-cyan-500/10';

  const [fullscreenContent, setFullscreenContent] = useState<{ title: string; url: string; isPdf?: boolean } | null>(null);
  const [activeFlashcards, setActiveFlashcards] = useState<Flashcard[] | null>(null);


  const openFullscreen = (content: { title: string; url: string; isPdf?: boolean }) => {
    setFullscreenContent(content);
  };

  const closeFullscreen = () => {
    setFullscreenContent(null);
  };

  const openFlashcards = (cards: Flashcard[]) => {
    setActiveFlashcards(cards);
  };
  
  const closeFlashcards = () => {
    setActiveFlashcards(null);
  }

  const mediaItems = (chapter: (typeof chapters)[0]) => [
    { type: 'lecture', title: chapter.lecture.title, url: chapter.lecture.videoUrl },
    { type: 'simulation', title: chapter.simulation.title, url: chapter.simulation.videoUrl },
    { type: 'presentation', title: chapter.presentation.title, url: chapter.presentation.embedUrl, isPdf: true },
  ];
  
  const getIconForType = (type: string) => {
    const iconClass = "w-20 h-20 text-accent transition-transform duration-300 group-hover:scale-110";
    switch (type) {
        case 'lecture':
            return <Clapperboard className={iconClass} />;
        case 'simulation':
            return <Film className={iconClass} />;
        case 'presentation':
            return <FileText className={iconClass} />;
        default:
            return null;
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
          <Tabs defaultValue={chapters[0].id} className="w-full">
            <div className="flex justify-center">
              <TabsList className="grid w-full max-w-lg grid-cols-2 bg-primary/20 backdrop-blur-sm h-12 rounded-xl">
                {chapters.map((chapter) => (
                  <TabsTrigger key={chapter.id} value={chapter.id} className="text-base h-10 rounded-lg">
                    {chapter.shortTitle}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {chapters.map((chapter) => (
              <TabsContent key={chapter.id} value={chapter.id} className="mt-8">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold tracking-tight">{chapter.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {mediaItems(chapter).map((item, index) => (
                      <Card key={index} className={cn(glassmorphicClass, "flex flex-col")}>
                        <CardHeader>
                          <CardTitle className="text-secondary text-center">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col items-center justify-center">
                           <div
                            className="w-full h-full min-h-[150px] flex items-center justify-center rounded-lg bg-black/20 group cursor-pointer"
                            onClick={() => openFullscreen(item)}
                          >
                             {getIconForType(item.type)}
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                  
                  {/* Flashcards Card */}
                   <Card className={cn(glassmorphicClass, "flex flex-col")}>
                    <CardHeader>
                      <CardTitle className="text-secondary text-center">Flashcards</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col items-center justify-center">
                       <div
                        className="w-full h-full min-h-[150px] flex items-center justify-center rounded-lg bg-black/20 group cursor-pointer"
                        onClick={() => openFlashcards(chapter.flashcards)}
                      >
                         <BookOpen className="w-20 h-20 text-accent transition-transform duration-300 group-hover:scale-110" />
                       </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quiz Section */}
                <div className="mt-16">
                  <Quiz questions={chapter.quiz} />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </main>
        <Footer />
      </div>

      {fullscreenContent && (
        <Dialog open={!!fullscreenContent} onOpenChange={(isOpen) => !isOpen && closeFullscreen()}>
          <DialogContent className="max-w-none w-[95vw] h-[95vh] p-0 bg-black/80 backdrop-blur-lg border-white/20 flex flex-col">
            <DialogHeader className="p-4 border-b border-white/10 shrink-0">
              <DialogTitle className="text-white">{fullscreenContent.title}</DialogTitle>
            </DialogHeader>
            <div className="flex-grow">
              <iframe
                src={fullscreenContent.url}
                title={fullscreenContent.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {activeFlashcards && (
         <Dialog open={!!activeFlashcards} onOpenChange={(isOpen) => !isOpen && closeFlashcards()}>
           <DialogContent className="max-w-none w-[95vw] h-[95vh] p-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] border-white/20 flex flex-col">
             <DialogHeader className="p-4 border-b border-white/10 shrink-0">
               <DialogTitle className="text-white">Flashcards</DialogTitle>
             </DialogHeader>
             <div className="flex-grow min-h-0">
              <Flashcards cards={activeFlashcards} />
             </div>
           </DialogContent>
         </Dialog>
      )}
    </>
  );
}
