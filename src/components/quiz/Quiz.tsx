"use client";

import React, { useState } from 'react';
import type { Question } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizProps {
  questions: Question[];
}

export function Quiz({ questions }: QuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  
  const glassmorphicClass = 'bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg';

  const handleOptionChange = (questionIndex: number, option: string) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: option }));
  };

  const handleSubmit = () => {
    let currentScore = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        currentScore++;
      }
    });
    setScore(currentScore);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  const getOptionClass = (questionIndex: number, option: string) => {
    if (!isSubmitted) return '';
    const question = questions[questionIndex];
    const isCorrect = option === question.correctAnswer;
    const isSelected = selectedAnswers[questionIndex] === option;

    if (isCorrect) return 'text-green-400 border-green-400';
    if (isSelected && !isCorrect) return 'text-red-400 border-red-400';
    return 'border-muted-foreground/50';
  };
  
  const getIcon = (questionIndex: number, option: string) => {
    if (!isSubmitted) return null;
    const question = questions[questionIndex];
    const isCorrect = option === question.correctAnswer;
    const isSelected = selectedAnswers[questionIndex] === option;

    if (isCorrect) return <CheckCircle2 className="w-5 h-5 text-green-400" />;
    if (isSelected && !isCorrect) return <XCircle className="w-5 h-5 text-red-400" />;
    return null;
  }

  return (
    <Card className={glassmorphicClass}>
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-destructive">
          Test Your Knowledge
        </CardTitle>
        {isSubmitted && (
          <CardDescription className="text-lg font-medium pt-2">
            You scored {score} out of {questions.length}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-8">
        {questions.map((q, index) => (
          <div key={index} className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground/90">{index + 1}. {q.question}</h4>
            <RadioGroup
              value={selectedAnswers[index]}
              onValueChange={(value) => handleOptionChange(index, value)}
              disabled={isSubmitted}
            >
              <div className="space-y-3">
                {q.options.map((option, optionIndex) => (
                   <div key={optionIndex}>
                     <RadioGroupItem value={option} id={`q${index}-o${optionIndex}`} className="peer sr-only" />
                     <Label
                      htmlFor={`q${index}-o${optionIndex}`}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors peer-data-[state=checked]:border-accent",
                        "hover:bg-white/10",
                        getOptionClass(index, option)
                      )}
                    >
                      <span>{option}</span>
                      {getIcon(index, option)}
                    </Label>
                   </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-center">
        {!isSubmitted ? (
          <Button onClick={handleSubmit} size="lg" className="bg-accent hover:bg-accent/80 text-accent-foreground">Submit Answers</Button>
        ) : (
          <Button onClick={handleReset} variant="outline" size="lg" className="bg-transparent hover:bg-white/10">
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
