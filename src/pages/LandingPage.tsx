import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, BarChart3, Clock, Users, CheckCircle } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function LandingPage() {
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const benefitsRef = useRef(null);
  const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.2 });
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 });
  useEffect(() => {
    document.title = 'RiskGuard - Modern Risk Assessment System';
  }, []);
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-24 lg:pt-32 pb-16 lg:pb-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                  Identify & Manage Business Risks with Confidence
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8">
                  RiskGuard provides comprehensive risk assessment tools to help you identify, 
                  evaluate, and mitigate potential risks before they impact your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register">
                    <Button size="large">Get Started For Free</Button>
                  </Link>
                  <Link to="/features">
                    <Button variant="outlined" size="large">Explore Features</Button>
                  </Link>
                </div>
                
                <div className="mt-12 flex flex-wrap gap-6 items-center">
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden"
                        >
                          <span className="text-xs font-medium text-gray-600">
                            {String.fromCharCode(65 + i)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Trusted by 10,000+ companies</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <p className="ml-2 text-sm font-medium text-gray-900">4.9 out of 5 stars</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://i.pinimg.com/originals/a0/d4/16/a0d41629b9ade1749a96519ccc315db4.gif" 
                    alt="Business team analyzing risks" 
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/30 to-transparent"></div>
                </div>
                
                {/* Floating stat cards */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 max-w-[160px]">
                  <div className="flex items-center space-x-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-success-500" />
                    <span className="font-semibold text-gray-800">Risk Score</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-sm text-success-500 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    Up 12% from last week
                  </div>
                </div>
                
                <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4 max-w-[180px]">
                  <div className="flex items-center space-x-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-primary-500" />
                    <span className="font-semibold text-gray-800">Threats Mitigated</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">254</div>
                  <div className="text-sm text-primary-500">This quarter</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section 
          ref={featuresRef} 
          className="py-16 lg:py-24 bg-gray-50"
        >
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              className="text-center mb-16"
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Powerful Risk Assessment Features
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our comprehensive toolset helps you identify, analyze, and mitigate risks
                across your entire organization.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {[
                {
                  icon: <ShieldCheck className="w-10 h-10 text-primary-500" />,
                  title: "Risk Identification",
                  description: "Quickly identify potential risks across your organization with our comprehensive assessment tools."
                },
                {
                  icon: <BarChart3 className="w-10 h-10 text-primary-500" />,
                  title: "Risk Analysis",
                  description: "Analyze and quantify risks with powerful visualization tools and statistical models."
                },
                {
                  icon: <Clock className="w-10 h-10 text-primary-500" />,
                  title: "Real-time Monitoring",
                  description: "Monitor risk factors in real-time with automated alerts and notifications."
                },
                {
                  icon: <Users className="w-10 h-10 text-primary-500" />,
                  title: "Team Collaboration",
                  description: "Collaborate with your team on risk assessment and mitigation strategies."
                },
                {
                  icon: <CheckCircle className="w-10 h-10 text-primary-500" />,
                  title: "Compliance Management",
                  description: "Ensure compliance with industry regulations and standards."
                },
                {
                  icon: <svg className="w-10 h-10 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>,
                  title: "Customizable Reports",
                  description: "Generate detailed reports tailored to your organization's specific needs."
                }
              ].map((feature, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <Card hover className="h-full flex flex-col">
                    <div className="p-2 rounded-full bg-primary-50 w-fit mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section 
          ref={benefitsRef}
          className="py-16 lg:py-24"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="order-2 lg:order-1"
                initial="hidden"
                animate={benefitsInView ? "visible" : "hidden"}
                variants={fadeIn}
              >
                <img 
                  src="https://i.gifer.com/75ez.gif" 
                  alt="Team collaborating on risk assessment" 
                  className="rounded-xl shadow-lg w-full h-auto"
                />
              </motion.div>
              
              <motion.div
                className="order-1 lg:order-2"
                initial="hidden"
                animate={benefitsInView ? "visible" : "hidden"}
                variants={fadeIn}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Why Choose RiskGuard?
                </h2>
                
                <div className="space-y-6">
                  {[
                    {
                      title: "Increased Operational Efficiency",
                      description: "Identify and address potential issues before they impact your operations."
                    },
                    {
                      title: "Enhanced Decision Making",
                      description: "Make informed decisions based on comprehensive risk assessments."
                    },
                    {
                      title: "Regulatory Compliance",
                      description: "Stay compliant with industry regulations and standards."
                    },
                    {
                      title: "Cost Reduction",
                      description: "Minimize financial losses by identifying and mitigating risks early."
                    }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-4 mt-1">
                        <div className="rounded-full bg-success-500 p-1">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <Link to="/register">
                    <Button>Start Your Free Trial</Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section 
          ref={ctaRef}
          className="py-16 lg:py-24 bg-primary-500"
        >
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              className="text-center"
              initial="hidden"
              animate={ctaInView ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Take Control of Your Risks?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                Join thousands of businesses that use RiskGuard to identify, assess, and mitigate risks.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/register">
                  <Button className="bg-black text-black-300 hover:bg-white-100" size="large">
                    Get Started For Free
                  </Button>
                </Link>
                <Link to="/contact">
                                  <Button 
                  variant="outlined" 
                  size="large"
                  className="border-white text-white hover:bg-blue-400"
                  href="#"
                >
                  Schedule a Demo
                </Button>
                </Link>

              </div>
            </motion.div>
          </div>
        </section>
        
        <Footer />
      </div>
    </PageTransition>
  );
}