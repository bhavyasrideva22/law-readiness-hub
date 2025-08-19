import { useState } from "react";
import AssessmentLanding from "@/components/AssessmentLanding";
import AssessmentFlow from "@/components/AssessmentFlow";
import AssessmentResults from "@/components/AssessmentResults";

type AppState = "landing" | "assessment" | "results";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("landing");
  const [assessmentResults, setAssessmentResults] = useState<any>(null);

  const handleStartAssessment = () => {
    setCurrentState("assessment");
  };

  const handleAssessmentComplete = (results: any) => {
    setAssessmentResults(results);
    setCurrentState("results");
  };

  const handleBackToLanding = () => {
    setCurrentState("landing");
  };

  const handleRestart = () => {
    setAssessmentResults(null);
    setCurrentState("landing");
  };

  // Render the appropriate component based on current state
  switch (currentState) {
    case "landing":
      return <AssessmentLanding onStartAssessment={handleStartAssessment} />;
    
    case "assessment":
      return (
        <AssessmentFlow
          onComplete={handleAssessmentComplete}
          onBack={handleBackToLanding}
        />
      );
    
    case "results":
      return (
        <AssessmentResults
          results={assessmentResults}
          onRestart={handleRestart}
        />
      );
    
    default:
      return <AssessmentLanding onStartAssessment={handleStartAssessment} />;
  }
};

export default Index;