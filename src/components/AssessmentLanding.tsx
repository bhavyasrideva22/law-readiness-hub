import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Scale, 
  Shield, 
  FileText, 
  Users, 
  Brain, 
  Zap,
  CheckCircle,
  Clock,
  Star
} from "lucide-react";

interface AssessmentLandingProps {
  onStartAssessment: () => void;
}

const AssessmentLanding = ({ onStartAssessment }: AssessmentLandingProps) => {
  const traits = [
    { icon: Brain, label: "Analytical Thinking", description: "Structure complex legal problems" },
    { icon: Shield, label: "Ethical Orientation", description: "Strong rule-based decision making" },
    { icon: FileText, label: "Legal-Tech Fluency", description: "Bridge law and technology" },
    { icon: Users, label: "Communication Skills", description: "Negotiate in legal contexts" },
    { icon: CheckCircle, label: "Attention to Detail", description: "Precise compliance work" },
    { icon: Zap, label: "Adaptability", description: "Navigate evolving regulations" }
  ];

  const roles = [
    "Cyber Law Specialist / Advisor",
    "Information Security Legal Advisor", 
    "Data Privacy Lawyer",
    "Compliance and Cyber Regulators",
    "E‑commerce Legal Consultant"
  ];

  return (
    <div className="min-h-screen gradient-secondary">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
              Professional Readiness Assessment
            </Badge>
            <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
              Are You Ready to Become a{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Cyber Law Specialist?
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Discover your psychological, cognitive, and technical readiness for a career navigating 
              legal frameworks in cyberspace—from cybersecurity to data protection and digital compliance.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-12">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>20-30 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>WISCAR Framework</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Psychometric Analysis</span>
              </div>
            </div>
            <Button 
              size="lg" 
              className="gradient-primary text-primary-foreground px-8 py-6 text-lg font-semibold shadow-elevated hover:shadow-floating transition-bounce"
              onClick={onStartAssessment}
            >
              Begin Assessment
              <Zap className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Role Overview */}
      <section className="py-16 px-6 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              The Cyber Law Specialist Role
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Navigate the intersection of law and technology, ensuring organizations comply with 
              evolving cyber regulations while protecting digital rights and assets.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-primary" />
                  Key Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                    <span>Cybersecurity legal framework compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                    <span>Data protection and privacy law advisory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                    <span>Digital contract and e-commerce law</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                    <span>Cybercrime legislation and incident response</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Associated Career Paths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  {roles.map((role, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-1 shrink-0" />
                      <span>{role}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Traits */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Traits That Lead to Success
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our assessment evaluates these critical competencies to determine your readiness 
              for a cyber law career.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {traits.map((trait, index) => (
              <Card key={index} className="shadow-card border-0 hover:shadow-elevated transition-smooth">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="p-2 rounded-lg gradient-accent">
                      <trait.icon className="h-5 w-5 text-white" />
                    </div>
                    {trait.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {trait.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Overview */}
      <section className="py-16 px-6 bg-card">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            What You'll Discover
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto gradient-primary rounded-full flex items-center justify-center">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Psychological Fit</h3>
              <p className="text-muted-foreground">
                Personality, motivation, and cognitive style alignment with cyber law careers
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto gradient-primary rounded-full flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Technical Readiness</h3>
              <p className="text-muted-foreground">
                Legal reasoning, domain knowledge, and problem-solving capacity evaluation
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto gradient-primary rounded-full flex items-center justify-center">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Career Guidance</h3>
              <p className="text-muted-foreground">
                Personalized learning roadmap and alternative career path recommendations
              </p>
            </div>
          </div>
          
          <div className="mt-12">
            <Button 
              size="lg" 
              className="gradient-primary text-primary-foreground px-8 py-6 text-lg font-semibold shadow-elevated hover:shadow-floating transition-bounce"
              onClick={onStartAssessment}
            >
              Start Your Assessment Journey
              <Zap className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssessmentLanding;