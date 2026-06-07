-- Plan tiers: free, pro, ultra_pro
-- Run in Supabase SQL Editor if your project already exists

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS subscription_plan TEXT NOT NULL DEFAULT 'free';

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_subscription_plan_check;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_subscription_plan_check
  CHECK (subscription_plan IN ('free', 'pro', 'ultra_pro'));

ALTER TABLE public.templates
  ADD COLUMN IF NOT EXISTS required_plan TEXT NOT NULL DEFAULT 'free';

ALTER TABLE public.templates
  DROP CONSTRAINT IF EXISTS templates_required_plan_check;

ALTER TABLE public.templates
  ADD CONSTRAINT templates_required_plan_check
  CHECK (required_plan IN ('free', 'pro', 'ultra_pro'));

INSERT INTO public.templates (id, name, slug, description, required_plan) VALUES
  ('minimal', 'Minimal', 'minimal', 'Clean and simple layout', 'free'),
  ('ats-friendly', 'ATS-Friendly', 'ats-friendly', 'Optimized for applicant tracking systems', 'free'),
  ('professional', 'Professional', 'professional', 'Corporate-ready design', 'pro'),
  ('modern', 'Modern', 'modern', 'Contemporary with bold accents', 'pro'),
  ('creative', 'Creative', 'creative', 'Stand out with personality', 'ultra_pro'),
  ('executive', 'Executive', 'executive', 'Polished layout for senior roles', 'ultra_pro')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  required_plan = EXCLUDED.required_plan;

UPDATE public.templates SET required_plan = 'free' WHERE id IN ('minimal', 'ats-friendly');
UPDATE public.templates SET required_plan = 'pro' WHERE id IN ('professional', 'modern');
UPDATE public.templates SET required_plan = 'ultra_pro' WHERE id IN ('creative', 'executive');
