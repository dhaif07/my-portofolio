'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/utils';
import { FadeIn } from '@/components/animations/fade-in';
import { AnimatePresence, motion } from 'framer-motion';

const MAX_NAME_LEN = 50;
const MAX_SUBJECT_LEN = 100;
const MAX_MESSAGE_LEN = 1000;

const formSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter').max(MAX_NAME_LEN, 'Nama terlalu panjang'),
  email: z.string().email('Masukkan email yang valid'),
  subject: z.string().min(5, 'Subject minimal 5 karakter').max(MAX_SUBJECT_LEN, 'Subject terlalu panjang'),
  message: z.string().min(10, 'Pesan minimal 10 karakter').max(MAX_MESSAGE_LEN, 'Pesan terlalu panjang'),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const nameVal    = watch('name', '');
  const subjectVal = watch('subject', '');
  const messageVal = watch('message', '');

  const onSubmit = async (data: FormData) => {
    setStatus('submitting');
    try {
      const res = await fetch('https://formsubmit.co/ajax/dhaifmuharram@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name:    data.name,
          email:   data.email,
          subject: data.subject,
          message: data.message,
          _captcha: 'false',
        }),
      });

      if (res.ok) {
        setStatus('success');
        reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Server error');
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <div className="glass-card p-6 md:p-10 w-full max-w-2xl mx-auto relative overflow-hidden">
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 z-20 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-success/30"
          >
            <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={40} className="text-success" />
            </div>
            <h3 className="font-clash text-2xl md:text-3xl font-bold text-primary mb-2">Thank you!</h3>
            <p className="font-inter text-secondary text-lg">
              Your message has been sent successfully. <br/> I'll get back to you soon.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <label htmlFor="name" className="font-inter text-sm font-medium text-secondary">
                Name
              </label>
              <span className="text-xs text-secondary/50">{nameVal.length}/{MAX_NAME_LEN}</span>
            </div>
            <input
              id="name"
              type="text"
              {...register('name')}
              className={cn(
                "bg-surface/50 border rounded-input px-4 py-3 font-inter text-primary transition-colors duration-200",
                "focus:outline-none focus:border-accent focus:bg-surface",
                errors.name ? "border-danger/50 focus:border-danger" : "border-border"
              )}
              placeholder="John Doe"
              disabled={status === 'submitting'}
            />
            {errors.name && (
              <span className="font-inter text-xs text-danger flex items-center gap-1 mt-1">
                <AlertCircle size={12} /> {errors.name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <label htmlFor="email" className="font-inter text-sm font-medium text-secondary">
                Email
              </label>
            </div>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={cn(
                "bg-surface/50 border rounded-input px-4 py-3 font-inter text-primary transition-colors duration-200",
                "focus:outline-none focus:border-accent focus:bg-surface",
                errors.email ? "border-danger/50 focus:border-danger" : "border-border"
              )}
              placeholder="john@example.com"
              disabled={status === 'submitting'}
            />
            {errors.email && (
              <span className="font-inter text-xs text-danger flex items-center gap-1 mt-1">
                <AlertCircle size={12} /> {errors.email.message}
              </span>
            )}
          </div>
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <label htmlFor="subject" className="font-inter text-sm font-medium text-secondary">
              Subject
            </label>
            <span className="text-xs text-secondary/50">{subjectVal.length}/{MAX_SUBJECT_LEN}</span>
          </div>
          <input
            id="subject"
            type="text"
            {...register('subject')}
            className={cn(
              "bg-surface/50 border rounded-input px-4 py-3 font-inter text-primary transition-colors duration-200",
              "focus:outline-none focus:border-accent focus:bg-surface",
              errors.subject ? "border-danger/50 focus:border-danger" : "border-border"
            )}
            placeholder="How can I help you?"
            disabled={status === 'submitting'}
          />
          {errors.subject && (
            <span className="font-inter text-xs text-danger flex items-center gap-1 mt-1">
              <AlertCircle size={12} /> {errors.subject.message}
            </span>
          )}
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <label htmlFor="message" className="font-inter text-sm font-medium text-secondary">
              Message
            </label>
            <span className="text-xs text-secondary/50">{messageVal.length}/{MAX_MESSAGE_LEN}</span>
          </div>
          <textarea
            id="message"
            rows={5}
            {...register('message')}
            className={cn(
              "bg-surface/50 border rounded-input px-4 py-3 font-inter text-primary transition-colors duration-200 resize-none",
              "focus:outline-none focus:border-accent focus:bg-surface",
              errors.message ? "border-danger/50 focus:border-danger" : "border-border"
            )}
            placeholder="Tell me about your project..."
            disabled={status === 'submitting'}
          />
          {errors.message && (
            <span className="font-inter text-xs text-danger flex items-center gap-1 mt-1">
              <AlertCircle size={12} /> {errors.message.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <FadeIn y={10} delay={0.2} className="mt-4">
          <button 
            type="submit"
            disabled={status === 'submitting' || status === 'success'}
            className={cn(
              "group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-btn font-inter font-semibold text-base transition-all duration-300",
              "bg-gradient-to-r from-accent to-[#00bfff] text-background overflow-hidden",
              "hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:-translate-y-1",
              "disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            )}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer" />
            
            <span className="relative flex items-center gap-2">
              {status === 'submitting' ? (
                <>
                  Sending... <span className="w-5 h-5 border-2 border-background/50 border-t-background rounded-full animate-spin" />
                </>
              ) : (
                <>
                  Send Message <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
          </button>
        </FadeIn>
      </form>
    </div>
  );
}
