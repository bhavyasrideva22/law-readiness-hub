import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Brain, 
  Zap, 
  Target, 
  CheckCircle, 
  AlertCircle, 
  BookOpen, 
  Users, 
  ArrowRight, 
  Download,
  RefreshCw
} from "lucide-react";

interface AssessmentResultsProps {
  results: {
    psychometricScore: number;
    technicalScore: number;
    wiscarScores: {
      will: number;
      interest: number;
      skill: number;
      cognitive: number;
      ability: number;
      realWorld: number;
    };
    overallScore: number;
    recommendation: "Yes" | "Maybe" | "No";
    confidence: number;
    answers: Record<string, string>;
  };
  onRestart: () => void;
}

const AssessmentResults = ({ results, onRestart }: AssessmentResultsProps) => {
  const { psychometricScore, technicalScore, wiscarScores, overallScore, recommendation, confidence } = results;

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "Yes": return "text-green-600 bg-green-50 border-green-200";
      case "Maybe": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "No": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case "Yes": return CheckCircle;
      case "Maybe": return AlertCircle;
      case "No": return AlertCircle;
      default: return AlertCircle;
    }
  };

  const careerPaths = [
    {
      title: "Cyber Law Specialist",
      description: "Legal governance in cyber operations",
      fit: overallScore >= 80 ? "High" : overallScore >= 60 ? "Medium" : "Low"
    },
    {
      title: "Data Privacy Lawyer",
      description: "Advise on privacy rights and legal compliance",
      fit: psychometricScore >= 75 ? "High" : psychometricScore >= 60 ? "Medium" : "Low"
    },
    {
      title: "Cybersecurity Legal Advisor",
      description: "Bridge legal and security frameworks",
      fit: technicalScore >= 75 ? "High" : technicalScore >= 60 ? "Medium" : "Low"
    },
    {
      title: "E-commerce Legal Consultant",
      description: "Support online business compliance",
      fit: wiscarScores.realWorld >= 70 ? "High" : wiscarScores.realWorld >= 50 ? "Medium" : "Low"
    },
    {
      title: "Compliance Officer (Tech Sector)",
      description: "Monitor and enforce cyber policies",
      fit: wiscarScores.skill >= 60 ? "High" : wiscarScores.skill >= 40 ? "Medium" : "Low"
    }
  ];

  const skillGaps = [
    {
      skill: "Cybersecurity Fundamentals",
      target: 85,
      current: Math.max(20, technicalScore - 20),
      suggestion: "Take IT Security Basics course"
    },
    {
      skill: "Cyber Law Frameworks (GDPR, etc.)",
      target: 90,
      current: Math.max(15, technicalScore - 25),
      suggestion: "Enroll in Cyber Law 101"
    },
    {
      skill: "Analytical & Legal Reasoning",
      target: 80,
      current: psychometricScore,
      suggestion: "Practice case study analysis"
    },
    {
      skill: "Policy Drafting & Reporting",
      target: 85,
      current: Math.max(30, wiscarScores.realWorld),
      suggestion: "Practice drafting compliance docs"
    }
  ];

  const learningJourney = [
    {
      level: "Beginner",
      courses: ["Intro to Cyber Law", "Data Protection Acts", "Legal Research Methods"],
      duration: "2-3 months"
    },
    {
      level: "Intermediate", 
      courses: ["GDPR Deep Dive", "Breach Reporting Protocols", "Cybercrime Investigation"],
      duration: "3-4 months"
    },
    {
      level: "Job-Ready",
      courses: ["Compliance Strategy", "Cyber Policy Drafting", "Jurisdiction Case Studies"],
      duration: "2-3 months"
    }
  ];

  const alternativePaths = recommendation === "No" ? [
    "Compliance Administrator",
    "Policy Researcher", 
    "IT Governance Associate",
    "Legal Technology Specialist"
  ] : [];

  const RecommendationIcon = getRecommendationIcon(recommendation);

  return (
    <div className="min-h-screen gradient-secondary">
      <div className="container mx-auto max-w-6xl py-8 px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 rounded-full gradient-primary">
              <Trophy className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Your Cyber Law Specialist Readiness Report
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Based on your responses, here's your comprehensive career readiness analysis with personalized recommendations.
          </p>
        </div>

        {/* Overall Recommendation */}
        <Card className={`shadow-elevated border-2 mb-8 ${getRecommendationColor(recommendation)}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <RecommendationIcon className="h-8 w-8" />
              Should You Pursue Cyber Law? <strong>{recommendation}</strong>
            </CardTitle>
            <CardDescription className="text-lg">
              Confidence Score: <strong>{confidence}%</strong> alignment with cyber law specialist requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Overall Readiness</span>
                  <span className="font-bold">{overallScore}%</span>
                </div>
                <Progress value={overallScore} className="h-3" />
              </div>
              
              {recommendation === "Yes" && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-green-800 font-medium">🎉 Excellent alignment! You show strong potential for a cyber law career.</p>
                  <p className="text-green-700 mt-1">Your analytical profile and ethical orientation make you well-suited for this field.</p>
                </div>
              )}
              
              {recommendation === "Maybe" && (
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800 font-medium">⚡ Good potential with targeted development needed.</p>
                  <p className="text-yellow-700 mt-1">Focus on building technical knowledge and legal reasoning skills.</p>
                </div>
              )}
              
              {recommendation === "No" && (
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-red-800 font-medium">🤔 Consider alternative paths that better match your profile.</p>
                  <p className="text-red-700 mt-1">Your skills may be better suited for related roles in compliance or policy.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Psychological Fit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Score</span>
                  <span className="font-bold">{psychometricScore}%</span>
                </div>
                <Progress value={psychometricScore} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  {psychometricScore >= 80 ? "Strong alignment" : 
                   psychometricScore >= 50 ? "Moderate fit" : "Potential mismatch"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Technical Readiness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Score</span>
                  <span className="font-bold">{technicalScore}%</span>
                </div>
                <Progress value={technicalScore} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  {technicalScore >= 80 ? "Ready for advanced training" : 
                   technicalScore >= 50 ? "Needs targeted upskilling" : "Foundational building needed"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                WISCAR Average
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Score</span>
                  <span className="font-bold">
                    {Math.round(Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6)}%
                  </span>
                </div>
                <Progress 
                  value={Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6} 
                  className="h-2" 
                />
                <p className="text-sm text-muted-foreground">
                  Six-dimensional career readiness
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* WISCAR Detailed Breakdown */}
        <Card className="shadow-card border-0 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              WISCAR Framework Analysis
            </CardTitle>
            <CardDescription>
              Six critical dimensions for career preparedness
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(wiscarScores).map(([key, score]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium capitalize">
                      {key === 'realWorld' ? 'Real-World Alignment' : key}
                    </span>
                    <span className="font-bold">{score}%</span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Career Paths */}
        <Card className="shadow-card border-0 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Recommended Career Paths
            </CardTitle>
            <CardDescription>
              Based on your assessment results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {careerPaths.map((path, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-smooth">
                  <div className="flex-1">
                    <h4 className="font-semibold">{path.title}</h4>
                    <p className="text-sm text-muted-foreground">{path.description}</p>
                  </div>
                  <Badge 
                    variant={path.fit === "High" ? "default" : path.fit === "Medium" ? "secondary" : "outline"}
                    className="ml-4"
                  >
                    {path.fit} Fit
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills Gap Analysis */}
        <Card className="shadow-card border-0 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              Skill Development Roadmap
            </CardTitle>
            <CardDescription>
              Areas for improvement and targeted suggestions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {skillGaps.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium">{skill.skill}</h4>
                      <p className="text-sm text-muted-foreground">{skill.suggestion}</p>
                    </div>
                    <div className="text-right text-sm">
                      <div>Current: <span className="font-bold">{skill.current}%</span></div>
                      <div>Target: <span className="font-bold">{skill.target}%</span></div>
                    </div>
                  </div>
                  <div className="relative">
                    <Progress value={skill.current} className="h-2" />
                    <div 
                      className="absolute top-0 w-1 h-2 bg-red-500"
                      style={{ left: `${skill.target}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Gap: {Math.max(0, skill.target - skill.current)}%</span>
                    {skill.current >= skill.target ? (
                      <span className="text-green-600">✓ Target met</span>
                    ) : (
                      <span className="text-red-600">Needs improvement</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Journey */}
        <Card className="shadow-card border-0 mb-8">
          <CardHeader>
            <CardTitle>Your Learning Journey</CardTitle>
            <CardDescription>
              Structured path to cyber law expertise
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {learningJourney.map((level, index) => (
                <div key={index} className="relative">
                  {index < learningJourney.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-border" />
                  )}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{level.level}</h3>
                        <Badge variant="outline">{level.duration}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {level.courses.map((course, courseIndex) => (
                          <Badge key={courseIndex} variant="secondary">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alternative Paths */}
        {alternativePaths.length > 0 && (
          <Card className="shadow-card border-0 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-6 w-6 text-primary" />
                Alternative Career Paths
              </CardTitle>
              <CardDescription>
                Consider these related roles that may be a better fit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {alternativePaths.map((path, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-smooth">
                    <h4 className="font-medium">{path}</h4>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="gradient-primary text-primary-foreground">
            <Download className="h-5 w-5 mr-2" />
            Download Full Report
          </Button>
          <Button variant="outline" size="lg" onClick={onRestart}>
            <RefreshCw className="h-5 w-5 mr-2" />
            Take Assessment Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;