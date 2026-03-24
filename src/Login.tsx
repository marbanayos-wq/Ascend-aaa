import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from './AuthContext';

export const Login = () => {
  const { login, isAdmin, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin');
    }
  }, [user, isAdmin, navigate]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-12 rounded-3xl shadow-2xl border border-white/10"
      >
        <div className="text-center mb-12">
          <ShieldCheck className="mx-auto mb-6 text-accent" size={48} />
          <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Admin Portal</h1>
          <p className="text-primary/40 text-[10px] font-bold uppercase tracking-widest">Authorized Personnel Only</p>
        </div>

        <div className="space-y-8">
          <p className="text-center text-sm text-primary/60">
            Please sign in with your authorized Google account to access the admin dashboard.
          </p>

          <button
            onClick={handleLogin}
            className="w-full py-5 bg-primary text-white font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-accent hover:text-primary transition-all shadow-xl transform hover:-translate-y-1"
          >
            <LogIn size={20} />
            Sign In with Google
            <ArrowRight size={20} />
          </button>
        </div>

        <p className="text-center mt-8 text-[10px] text-primary/40 uppercase tracking-widest">
          Secure admin portal for ASCEND Sportswear
        </p>
      </motion.div>
    </div>
  );
};
