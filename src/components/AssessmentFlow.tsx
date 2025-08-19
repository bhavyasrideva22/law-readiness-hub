import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Brain, Zap, Target, CheckCircle } from "lucide-react";

interface Question {
  id: string;
  section: string;
  type: 'multiple-choice' | 'scale' | 'text' | 'scenario';
  question: string;
  description?: string;
  options?: { value: string; label: string; description?: string }[];
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: { min: string; max: string };
}

interface AssessmentFlowProps {
  onComplete: (results: any) => void;
  onBack: () => void;
}

const questions: Question[] = [
  // Psychometric Section
  {
    id: "psych_1",
    section: "Psychometric Evaluation",
    type: "multiple-choice",
    question: "When facing a complex legal problem, what's your natural approach?",
    description: "This helps us understand your problem-solving style",
    options: [
      { value: "structured", label: "Break it down systematically", description: "Analyze step-by-step" },
      { value: "intuitive", label: "Trust my instincts first", description: "Go with gut feeling" },
      { value: "research", label: "Research similar cases extensively", description: "Find precedents" },
      { value: "collaborate", label: "Discuss with colleagues immediately", description: "Seek multiple perspectives" }
    ]
  },
  {
    id: "psych_2",
    section: "Psychometric Evaluation",
    type: "scale",
    question: "How comfortable are you with constantly changing regulations?",
    description: "Cyber law evolves rapidly with new technologies",
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: "Very uncomfortable", max: "Thrive on change" }
  },
  {
    id: "psych_3",
    section: "Psychometric Evaluation",
    type: "multiple-choice",
    question: "What motivates you most in professional work?",
    options: [
      { value: "rules", label: "Ensuring rules are followed correctly" },
      { value: "innovation", label: "Creating new solutions to problems" },
      { value: "protection", label: "Protecting people's rights and privacy" },
      { value: "challenge", label: "Solving complex technical puzzles" }
    ]
  },
  
  // Technical Readiness Section
  {
    id: "tech_1",
    section: "Technical & Aptitude Readiness",
    type: "scenario",
    question: "A company suffers a data breach affecting EU citizens. What's the FIRST legal priority?",
    description: "This tests your understanding of GDPR requirements",
    options: [
      { value: "notify_police", label: "Notify local law enforcement" },
      { value: "fix_breach", label: "Fix the security vulnerability" },
      { value: "notify_authority", label: "Notify supervisory authority within 72 hours" },
      { value: "notify_customers", label: "Inform all affected customers immediately" }
    ]
  },
  {
    id: "tech_2",
    section: "Technical & Aptitude Readiness",
    type: "multiple-choice",
    question: "Which of these best describes 'data minimization'?",
    options: [
      { value: "encrypt", label: "Encrypting all personal data" },
      { value: "collect_necessary", label: "Collecting only data necessary for the purpose" },
      { value: "delete_old", label: "Deleting data after one year" },
      { value: "anonymize", label: "Making all data anonymous" }
    ]
  },
  {
    id: "tech_3",
    section: "Technical & Aptitude Readiness",
    type: "scenario",
    question: "A client asks about storing customer data in the cloud. What's your primary legal concern?",
    options: [
      { value: "cost", label: "The cost of cloud storage" },
      { value: "jurisdiction", label: "Data jurisdiction and transfer restrictions" },
      { value: "speed", label: "Data access speed for users" },
      { value: "backup", label: "Backup and recovery procedures" }
    ]
  },

  // WISCAR Framework Questions
  {
    id: "will_1",
    section: "WISCAR: Will (Persistence)",
    type: "scale",
    question: "When learning complex legal concepts, how do you typically respond to initial confusion?",
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: "Give up quickly", max: "Persist until mastery" }
  },
  {
    id: "interest_1",
    section: "WISCAR: Interest",
    type: "scale",
    question: "How much do you enjoy staying updated on new technology trends?",
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: "Not at all", max: "Extremely interested" }
  },
  {
    id: "skill_1",
    section: "WISCAR: Skill Assessment",
    type: "multiple-choice",
    question: "How would you rate your current understanding of cybersecurity basics?",
    options: [
      { value: "beginner", label: "Beginner - Basic awareness only" },
      { value: "intermediate", label: "Intermediate - Some practical knowledge" },
      { value: "advanced", label: "Advanced - Strong technical understanding" },
      { value: "expert", label: "Expert - Could teach others" }
    ]
  },
  {
    id: "cognitive_1",
    section: "WISCAR: Cognitive Readiness",
    type: "scenario",
    question: "You're reviewing a contract with conflicting clauses about data retention. How do you resolve this?",
    options: [
      { value: "legal_precedent", label: "Research legal precedents for similar conflicts" },
      { value: "client_intent", label: "Determine the client's original intent" },
      { value: "stricter_rule", label: "Apply the stricter data protection rule" },
      { value: "expert_consult", label: "Consult with a senior legal expert" }
    ]
  },
  {
    id: "ability_1",
    section: "WISCAR: Ability to Learn",
    type: "scale",
    question: "How quickly do you typically adapt to new legal frameworks or regulations?",
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: "Very slowly", max: "Very quickly" }
  },
  {
    id: "realworld_1",
    section: "WISCAR: Real-World Alignment",
    type: "text",
    question: "Describe how you would spend a typical day as a Cyber Law Specialist.",
    description: "Help us understand your expectations vs. reality of the role"
  }
];

const AssessmentFlow = ({ onComplete, onBack }: AssessmentFlowProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentSection, setCurrentSection] = useState("");

  const sections = [
    "Psychometric Evaluation",
    "Technical & Aptitude Readiness", 
    "WISCAR: Will (Persistence)",
    "WISCAR: Interest",
    "WISCAR: Skill Assessment",
    "WISCAR: Cognitive Readiness",
    "WISCAR: Ability to Learn",
    "WISCAR: Real-World Alignment"
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  useEffect(() => {
    setCurrentSection(question.section);
  }, [currentQuestion, question.section]);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate results and complete assessment
      const results = calculateResults(answers);
      onComplete(results);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const calculateResults = (answers: Record<string, string>) => {
    // Simplified scoring logic
    const psychometricScore = calculateSectionScore(answers, "Psychometric Evaluation");
    const technicalScore = calculateSectionScore(answers, "Technical & Aptitude Readiness");
    const wiscarScores = {
      will: calculateSectionScore(answers, "WISCAR: Will"),
      interest: calculateSectionScore(answers, "WISCAR: Interest"), 
      skill: calculateSectionScore(answers, "WISCAR: Skill"),
      cognitive: calculateSectionScore(answers, "WISCAR: Cognitive"),
      ability: calculateSectionScore(answers, "WISCAR: Ability"),
      realWorld: calculateSectionScore(answers, "WISCAR: Real-World")
    };

    const overallScore = Math.round((psychometricScore + technicalScore + Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6) / 2);

    return {
      psychometricScore,
      technicalScore,
      wiscarScores,
      overallScore,
      answers,
      recommendation: overallScore >= 80 ? "Yes" : overallScore >= 50 ? "Maybe" : "No",
      confidence: overallScore
    };
  };

  const calculateSectionScore = (answers: Record<string, string>, section: string) => {
    const sectionQuestions = questions.filter(q => q.section.includes(section) || section.includes(q.section));
    let score = 0;
    let count = 0;

    sectionQuestions.forEach(q => {
      const answer = answers[q.id];
      if (answer) {
        count++;
        // Simplified scoring - in reality this would be more sophisticated
        if (q.type === 'scale') {
          score += (parseInt(answer) / 5) * 100;
        } else if (q.type === 'multiple-choice' || q.type === 'scenario') {
          // Give points based on "correct" or preferred answers
          const goodAnswers = ['structured', 'notify_authority', 'collect_necessary', 'jurisdiction', 'legal_precedent', 'stricter_rule'];
          score += goodAnswers.includes(answer) ? 85 : 60;
        } else {
          score += 70; // Default for text answers
        }
      }
    });

    return count > 0 ? Math.round(score / count) : 0;
  };

  const getSectionIcon = (section: string) => {
    if (section.includes("Psychometric")) return Brain;
    if (section.includes("Technical")) return Zap;
    if (section.includes("WISCAR")) return Target;
    return CheckCircle;
  };

  const SectionIcon = getSectionIcon(currentSection);
  const currentAnswer = answers[question.id];
  const canProceed = currentAnswer !== undefined && currentAnswer !== "";

  return (
    <div className="min-h-screen gradient-secondary">
      <div className="container mx-auto max-w-4xl py-8 px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={handlePrevious}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {currentQuestion === 0 ? "Back to Overview" : "Previous"}
            </Button>
            <Badge variant="secondary" className="px-4 py-2">
              Question {currentQuestion + 1} of {questions.length}
            </Badge>
          </div>
          
          <Progress value={progress} className="h-3 mb-4" />
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg gradient-accent">
              <SectionIcon className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">{currentSection}</h2>
          </div>
          <p className="text-muted-foreground">
            Progress: {Math.round(progress)}% complete
          </p>
        </div>

        {/* Question Card */}
        <Card className="shadow-elevated border-0 mb-8">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">
              {question.question}
            </CardTitle>
            {question.description && (
              <CardDescription className="text-base">
                {question.description}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {/* Multiple Choice */}
            {(question.type === 'multiple-choice' || question.type === 'scenario') && (
              <RadioGroup
                value={currentAnswer || ""}
                onValueChange={(value) => handleAnswer(question.id, value)}
                className="space-y-4"
              >
                {question.options?.map((option) => (
                  <div key={option.value} className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-accent/50 transition-smooth">
                    <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={option.value} className="text-base font-medium cursor-pointer">
                        {option.label}
                      </Label>
                      {option.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {option.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </RadioGroup>
            )}

            {/* Scale */}
            {question.type === 'scale' && (
              <div className="space-y-6">
                <RadioGroup
                  value={currentAnswer || ""}
                  onValueChange={(value) => handleAnswer(question.id, value)}
                  className="flex justify-between"
                >
                  {Array.from({ length: question.scaleMax! - question.scaleMin! + 1 }, (_, i) => {
                    const value = (question.scaleMin! + i).toString();
                    return (
                      <div key={value} className="flex flex-col items-center space-y-2">
                        <RadioGroupItem value={value} id={value} />
                        <Label htmlFor={value} className="text-sm font-medium">
                          {value}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{question.scaleLabels?.min}</span>
                  <span>{question.scaleLabels?.max}</span>
                </div>
              </div>
            )}

            {/* Text */}
            {question.type === 'text' && (
              <Textarea
                value={currentAnswer || ""}
                onChange={(e) => handleAnswer(question.id, e.target.value)}
                placeholder="Type your response here..."
                className="min-h-[120px] resize-none"
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {currentQuestion === 0 ? "Back to Overview" : "Previous"}
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={!canProceed}
            className={canProceed ? "gradient-primary text-primary-foreground" : ""}
          >
            {currentQuestion === questions.length - 1 ? "Complete Assessment" : "Next Question"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentFlow;