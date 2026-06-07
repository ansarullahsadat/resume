-- Ensure all templates exist and are available to every user
INSERT INTO public.templates (id, name, slug, description, required_plan) VALUES
  ('minimal', 'Minimal', 'minimal', 'Clean and simple layout', 'free'),
  ('ats-friendly', 'ATS-Friendly', 'ats-friendly', 'Optimized for applicant tracking systems', 'free'),
  ('professional', 'Professional', 'professional', 'Corporate-ready design', 'free'),
  ('modern', 'Modern', 'modern', 'Contemporary with bold accents', 'free'),
  ('creative', 'Creative', 'creative', 'Stand out with personality', 'free'),
  ('executive', 'Executive', 'executive', 'Polished layout for senior roles', 'free')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  required_plan = 'free';
