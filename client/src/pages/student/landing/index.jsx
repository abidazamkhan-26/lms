import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Users, Star, ArrowRight, CheckCircle2, ShieldCheck, Globe, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: <BookOpen className="w-6 h-6 text-indigo-500" />,
      title: "500+ Premium Courses",
      description: "Access high-quality content curated by industry experts across all categories."
    },
    {
      icon: <Users className="w-6 h-6 text-purple-500" />,
      title: "Expert Instructors",
      description: "Learn from the best in the field with personalized mentorship and guidance."
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: "Interactive Learning",
      description: "Engage with dynamic content, quizzes, and hands-on projects for better retention."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: "Verified Certificates",
      description: "Gain industry-recognized certifications to boost your career prospects."
    }
  ];

  const stats = [
    { label: "Active Learners", value: "10k+" },
    { label: "Expert Tutors", value: "200+" },
    { label: "Course Categories", value: "25+" },
    { label: "Satisfaction Rate", value: "99%" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="LMS Logo" className="h-10 w-auto" />
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
              <a href="#courses" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Courses</a>
              <a href="#about" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">About Us</a>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/auth")}
                className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate("/auth")}
                className="bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-100"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-40">
        <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-indigo-50 blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-purple-50 blur-3xl opacity-60" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/50 px-4 py-1.5 mb-8"
          >
            <span className="relative flex h-5 w-5 mr-1 text-indigo-600">
              <img src="/favicon.png" alt="LMS Icon" className="h-full w-full object-contain" />
            </span>
            <span className="text-sm font-medium text-indigo-700">New courses just added for 2025</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl lg:text-[5.5rem] leading-[1.1]"
          >
            Master the Future <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent italic">
              with Expert Learning
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mt-8 max-w-2xl text-lg text-slate-600 sm:text-xl lg:text-2xl"
          >
            Empower your journey with our state-of-the-art LMS. Bridge the gap between knowledge and achievement with AI-powered insights.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-4"
          >
            <Button 
                size="lg" 
                onClick={() => navigate("/auth")}
                className="h-14 px-8 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200"
            >
              Start Learning for Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate("/courses")}
                className="h-14 px-8 text-lg font-semibold border-slate-200 bg-white hover:bg-slate-50"
            >
              Explore Our Catalog
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-16 relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/20 bg-white/5 shadow-2xl backdrop-blur-2xl ring-1 ring-slate-200"
          >
            <img 
                src="/hero-img.png" 
                alt="AI LMS Hero" 
                className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-20 flex flex-wrap justify-center items-center gap-10 md:gap-x-20 opacity-70"
          >
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-base font-semibold text-indigo-600 uppercase tracking-wide">Premium Features</h2>
            <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to excel in your career
            </p>
            <p className="mt-4 text-lg text-slate-600">
              Our platform provides tools designed to make learning intuitive, effective, and collaborative.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col p-8 rounded-3xl border border-slate-100 bg-white transition-all hover:shadow-2xl hover:shadow-indigo-100 hover:border-indigo-100"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 transition-colors group-hover:bg-indigo-50">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-indigo-900 px-6 py-20 text-center shadow-2xl lg:px-12">
            <div className="absolute top-0 right-0 -z-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 -z-0 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
            
            <div className="relative z-10 mx-auto max-w-3xl">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                Ready to transform your skills?
              </h2>
              <p className="mt-6 text-xl text-indigo-100/90 leading-relaxed">
                Join thousands of students and start your learning journey today. Get unlimited access to all courses and certificates.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Button 
                    size="lg" 
                    onClick={() => navigate("/auth")}
                    className="h-14 px-10 text-lg font-bold bg-white text-indigo-900 hover:bg-indigo-50 shadow-lg"
                >
                  Join for Free
                </Button>
                <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={() => navigate("/auth")}
                    className="h-14 px-10 text-lg font-bold border-white/30 text-white bg-indigo-800/30 backdrop-blur-sm hover:bg-white/10"
                >
                  View All Courses
                </Button>
              </div>
              <div className="mt-10 flex items-center justify-center gap-6 text-indigo-200">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-5 h-5" /> No credit card required</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-5 h-5" /> Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="LMS Logo" className="h-8 w-auto" />
            </div>
            <p className="py-4 text-center text-xs md:text-sm">
        © 2026 Gadgety. Developed By <span href="" target="_blank" className="font-medium ">Abid Azam Khan</span> · CEO of <span href="" target="_blank" className="font-medium">Unipixer</span>
      </p>
            </p>
            <div className="flex items-center gap-6">
                <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">Privacy</a>
                <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">Terms</a>
                <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
