import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';

interface HeroSectionProps {
  content: any;
  setContent: (content: any) => void;
  isAdminMode: boolean;
  scrollToSection?: (sectionId: string) => void;
}

const HeroSection = ({ content, setContent, isAdminMode, scrollToSection }: HeroSectionProps) => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/e8762d55-c19f-4166-bef2-57db3c6eb8a5', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Заявка успешно отправлена!');
        setFormData({ name: '', phone: '', message: '' });
      } else {
        toast.error('Ошибка при отправке: ' + (result.error || 'Попробуйте позже'));
      }
    } catch (error) {
      toast.error('Ошибка при отправке заявки');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="home" className="pt-32 pb-20 px-4 min-h-screen flex items-center tech-pattern relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-blue-900/10 pointer-events-none" />
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            {isAdminMode ? (
              <Textarea
                value={content.heroTitle}
                onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                className="text-5xl lg:text-6xl font-bold leading-tight bg-muted h-32"
              />
            ) : (
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-foreground uppercase tracking-wide">
                {content.heroTitle}
              </h1>
            )}
            
            {isAdminMode ? (
              <Textarea
                value={content.heroSubtitle}
                onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                className="text-xl text-muted-foreground bg-muted"
              />
            ) : (
              <p className="text-xl text-muted-foreground">
                {content.heroSubtitle}
              </p>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gold-gradient text-background font-semibold text-lg">
                Получить консультацию
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => scrollToSection?.('services')}
              >
                Наши услуги
              </Button>
            </div>
          </div>
          
          <Card className="p-8 cyber-card shadow-2xl animate-fade-in backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 text-gold">Запишитесь на консультацию</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name">Имя</Label>
                <Input 
                  id="name" 
                  placeholder="Ваше имя" 
                  className="bg-muted" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input 
                  id="phone" 
                  placeholder="+7 (___) ___-__-__" 
                  className="bg-muted" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="message">Сообщение</Label>
                <Textarea 
                  id="message" 
                  placeholder="Опишите вашу задачу" 
                  className="bg-muted" 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
              <Button type="submit" className="w-full gold-gradient text-background font-semibold" disabled={isSubmitting}>
                {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
              </Button>
            </form>
          </Card>
        </div>
      </div>
      <div className="section-divider mt-12" />
    </section>
  );
};

export default HeroSection;