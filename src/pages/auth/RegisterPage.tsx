import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Shield, AlertCircle } from 'lucide-react';

import { useAuth } from '../../contexts/AuthContext';
import PageTransition from '../../components/layout/PageTransition';
import Button from '../../components/ui/Button';
import FormInput from '../../components/forms/FormInput';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });
  
  const password = watch('password');
  
  useEffect(() => {
    document.title = 'Create Account - RiskGuard';
  }, []);

  const onSubmit = async (data: RegisterFormData) => {
    setRegisterError(null);
    setIsSubmitting(true);
    try {
      const success = await registerUser(data.name, data.email, data.password);
      
      if (success) {
        navigate('/dashboard');
      } else {
        setRegisterError('Failed to create your account. Please try again.');
      }
    } catch (error) {
      setRegisterError('An unexpected error occurred. Please try again later.');
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 bg-white">
          <div className="mx-auto w-full max-w-md">
            <div className="text-center mb-6">
              <Link to="/" className="inline-flex items-center gap-2">
                <Shield className="w-8 h-8 text-primary-500" />
                <span className="text-2xl font-bold text-primary-500">RiskGuard</span>
              </Link>
            </div>
            
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
              <p className="text-gray-600">
                Start your 30-day free trial, no credit card required
              </p>
            </div>
            
            {registerError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg bg-error-50 text-error-500 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>{registerError}</span>
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormInput
                id="name"
                label="Full Name"
                placeholder="John Doe"
                register={register}
                rules={{
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  },
                }}
                error={errors.name}
              />
              
              <FormInput
                id="email"
                label="Email Address"
                type="email"
                placeholder="your@email.com"
                register={register}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                }}
                error={errors.email}
              />
              
              <FormInput
                id="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                register={register}
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                  },
                }}
                error={errors.password}
              />
              
              <FormInput
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                register={register}
                rules={{
                  required: 'Please confirm your password',
                  validate: (value) => value === password || 'Passwords do not match',
                }}
                error={errors.confirmPassword}
              />
              
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{' '}
                  <Link to="/terms" className="font-medium text-primary-500 hover:text-primary-600">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="font-medium text-primary-500 hover:text-primary-600">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              
              <Button
                type="submit"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                      <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  'Create account'
                )}
              </Button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-primary-500 hover:text-primary-600">
                  Sign in
                </Link>
              </p>
            </div>
            
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                </button>
                
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" fill="#1877F2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Image */}
        <div className="hidden md:block relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 opacity-90"></div>
          <img
            src="https://t4.ftcdn.net/jpg/05/98/79/31/360_F_598793121_ZJwUp1XCfV4jd1r4QYjOeTylEH5OaDVa.jpg"
            alt="Team working together on risk assessment"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center p-12">
            <div className="max-w-md text-white">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white mb-4">
                  <svg className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-4">Trusted by leading companies</h2>
                <p className="text-white/80 text-lg mb-6">
                  Join thousands of organizations that rely on our comprehensive risk assessment platform.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    quote: "RiskGuard has transformed how we identify and mitigate risks across our organization.",
                    author: "Sarah Johnson",
                    title: "Chief Risk Officer, Fortune 500 Company"
                  }
                ].map((testimonial, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <p className="text-white/90 italic mb-4">{testimonial.quote}</p>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-white/70 text-sm">{testimonial.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}