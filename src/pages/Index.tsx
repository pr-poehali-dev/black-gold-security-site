import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authPassword, setAuthPassword] = useState('');
  const [editingItem, setEditingItem] = useState<any>(null);

  const [content, setContent] = useState({
    logo: '',
    companyName: 'SECURITY PRO',
    heroTitle: 'Защита вашего бизнеса — наша профессия',
    heroSubtitle: 'Комплексные решения по аутсорсингу службы безопасности для компаний любого масштаба',
    aboutTitle: 'О компании',
    aboutDescription: 'Мы специализируемся на аутсорсинге служб безопасности для крупных и средних компаний. Наша команда экспертов с опытом работы в правоохранительных органах обеспечивает максимальную защиту вашего бизнеса от всех видов угроз.',
    aboutStats: [
      { value: '15+', label: 'лет опыта' },
      { value: '300+', label: 'довольных клиентов' },
      { value: '98%', label: 'успешных проектов' },
    ],
    servicesTitle: 'Наши услуги',
    servicesSubtitle: 'Комплексные решения для защиты вашего бизнеса',
    services: [
      {
        title: 'Проверка контрагентов',
        description: 'Комплексная или выборочная проверка: анализ благонадежности, финансовой документации, кредитной истории, установление бенефициаров',
        icon: 'SearchCheck',
      },
      {
        title: 'Проверка кандидатов',
        description: 'Тщательная проверка при приеме на работу для минимизации рисков',
        icon: 'UserCheck',
      },
      {
        title: 'Аналитические материалы',
        description: 'Подготовка информационно-аналитических материалов по запросу клиента',
        icon: 'FileText',
      },
      {
        title: 'Финансовый аудит',
        description: 'Анализ и решение вопросов, связанных с безопасностью предприятия',
        icon: 'DollarSign',
      },
      {
        title: 'Защита информации',
        description: 'Контроль коммерческой тайны. DLP, SIEM, антивирусные комплексы',
        icon: 'Shield',
      },
      {
        title: 'Антикоррупционная политика',
        description: 'Разработка и реализация, выявление внутрикорпоративных злоупотреблений',
        icon: 'Scale',
      },
    ],
    portfolioTitle: 'Портфолио',
    portfolio: [
      {
        title: 'Крупный производственный холдинг',
        description: 'Выявили схему хищений на сумму 45 млн руб. Взыскано 100% ущерба',
        result: '45 млн ₽',
      },
      {
        title: 'Строительная компания',
        description: 'Проверка объемов работ подрядчиков. Предотвращено завышение стоимости на 28 млн руб',
        result: '28 млн ₽',
      },
      {
        title: 'Логистическая компания',
        description: 'Комплексная проверка 150 контрагентов. Исключены 12 недобросовестных партнеров',
        result: '150 проверок',
      },
    ],
    casesTitle: 'Успешные кейсы',
    cases: [
      {
        title: 'Металлургический комбинат',
        description: 'Проведена комплексная проверка системы закупок. Выявлены 8 схем необоснованного завышения стоимости ТМЦ. Экономия бюджета составила 67 млн рублей за год.',
        duration: 'Срок: 3 месяца',
        result: 'Результат: 67 млн ₽',
      },
      {
        title: 'Торговая сеть',
        description: 'Внедрена система контроля персонала и DLP-решение. Предотвращена утечка коммерческой тайны. Выявлены 3 случая промышленного шпионажа.',
        duration: 'Срок: 2 месяца',
        result: '3 выявленных случая',
      },
    ],
    blogTitle: 'Экспертный блог',
    blogPosts: [
      {
        title: 'Как проверить контрагента перед заключением сделки',
        date: '15 декабря 2024',
        category: 'Безопасность бизнеса',
      },
      {
        title: 'DLP-системы: зачем они нужны вашему бизнесу',
        date: '10 декабря 2024',
        category: 'Защита информации',
      },
      {
        title: 'Признаки недобросовестного подрядчика',
        date: '5 декабря 2024',
        category: 'Аудит',
      },
    ],
    contactsTitle: 'Контакты',
    contacts: [
      { icon: 'MapPin', title: 'Адрес', value: 'г. Москва, ул. Тверская, д. 1' },
      { icon: 'Phone', title: 'Телефон', value: '+7 (495) 123-45-67' },
      { icon: 'Mail', title: 'Email', value: 'info@securitypro.ru' },
    ],
    footerText: '© 2024 Security Pro. Все права защищены.',
    menuItems: [
      { id: 'home', label: 'Главная' },
      { id: 'about', label: 'О компании' },
      { id: 'services', label: 'Услуги' },
      { id: 'portfolio', label: 'Портфолио' },
      { id: 'cases', label: 'Кейсы' },
      { id: 'blog', label: 'Блог' },
      { id: 'contacts', label: 'Контакты' },
    ],
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'services', 'portfolio', 'cases', 'blog', 'contacts'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleAuth = () => {
    if (authPassword === 'admin123') {
      setIsAdminMode(true);
      setShowAuthDialog(false);
      toast.success('Вы вошли в режим администратора');
    } else {
      toast.error('Неверный пароль');
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent({ ...content, logo: reader.result as string });
        toast.success('Логотип загружен');
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = (section: string) => {
    const newContent = { ...content };
    
    if (section === 'aboutStats') {
      newContent.aboutStats.push({ value: '0', label: 'Новый показатель' });
    } else if (section === 'services') {
      newContent.services.push({ title: 'Новая услуга', description: 'Описание услуги', icon: 'Shield' });
    } else if (section === 'portfolio') {
      newContent.portfolio.push({ title: 'Новый проект', description: 'Описание проекта', result: '0' });
    } else if (section === 'cases') {
      newContent.cases.push({ title: 'Новый кейс', description: 'Описание кейса', duration: 'Срок:', result: 'Результат:' });
    } else if (section === 'blogPosts') {
      newContent.blogPosts.push({ title: 'Новая статья', date: new Date().toLocaleDateString('ru-RU'), category: 'Категория' });
    } else if (section === 'contacts') {
      newContent.contacts.push({ icon: 'Mail', title: 'Новый контакт', value: 'Значение' });
    } else if (section === 'menuItems') {
      newContent.menuItems.push({ id: 'new-section', label: 'Новый раздел' });
    }
    
    setContent(newContent);
    toast.success('Блок добавлен');
  };

  const removeItem = (section: string, index: number) => {
    const newContent = { ...content };
    (newContent as any)[section].splice(index, 1);
    setContent(newContent);
    toast.success('Блок удален');
  };

  const updateItem = (section: string, index: number, field: string, value: any) => {
    const newContent = { ...content };
    (newContent as any)[section][index][field] = value;
    setContent(newContent);
  };

  const iconOptions = ['Shield', 'SearchCheck', 'UserCheck', 'FileText', 'DollarSign', 'Scale', 'Lock', 'Eye', 'TrendingUp', 'Award', 'CheckCircle', 'MapPin', 'Phone', 'Mail', 'Globe'];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 relative group">
              {content.logo ? (
                <img src={content.logo} alt="Logo" className="h-10 w-10 object-contain" />
              ) : (
                <Icon name="Shield" className="text-primary" size={32} />
              )}
              {isAdminMode && (
                <div className="absolute -top-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label htmlFor="logo-upload" className="cursor-pointer text-xs bg-primary text-background px-2 py-1 rounded">
                    Изменить
                  </label>
                </div>
              )}
              {isAdminMode ? (
                <Input
                  value={content.companyName}
                  onChange={(e) => setContent({ ...content, companyName: e.target.value })}
                  className="text-xl font-bold text-primary bg-transparent border-primary/30 w-48"
                />
              ) : (
                <span className="text-xl font-bold text-primary">{content.companyName}</span>
              )}
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              {content.menuItems.map((item, index) => (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {item.label}
                  </button>
                  {isAdminMode && (
                    <button
                      onClick={() => removeItem('menuItems', index)}
                      className="absolute -top-6 right-0 opacity-0 group-hover:opacity-100 text-xs text-red-500"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              {isAdminMode && (
                <Button size="sm" variant="outline" onClick={() => addItem('menuItems')}>
                  <Icon name="Plus" size={16} />
                </Button>
              )}
            </nav>

            <div className="flex items-center space-x-4">
              <Button className="hidden lg:inline-flex gold-gradient text-background font-semibold">
                Бесплатная консультация
              </Button>
              
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Icon name="Menu" size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-card">
                  <nav className="flex flex-col space-y-4 mt-8">
                    {content.menuItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`text-left text-lg font-medium transition-colors hover:text-primary ${
                          activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                    <Button className="gold-gradient text-background font-semibold">
                      Бесплатная консультация
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <section id="home" className="pt-32 pb-20 px-4 min-h-screen flex items-center">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              {isAdminMode ? (
                <Textarea
                  value={content.heroTitle}
                  onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                  className="text-5xl lg:text-6xl font-bold leading-tight bg-muted h-32"
                />
              ) : (
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
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
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Наши услуги
                </Button>
              </div>
            </div>
            
            <Card className="p-8 bg-card border-primary/20 shadow-2xl animate-fade-in">
              <h3 className="text-2xl font-bold mb-6 text-primary">Запишитесь на консультацию</h3>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Имя</Label>
                  <Input id="name" placeholder="Ваше имя" className="bg-muted" />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" placeholder="+7 (___) ___-__-__" className="bg-muted" />
                </div>
                <div>
                  <Label htmlFor="message">Сообщение</Label>
                  <Textarea id="message" placeholder="Опишите вашу задачу" className="bg-muted" />
                </div>
                <Button className="w-full gold-gradient text-background font-semibold">
                  Отправить заявку
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          {isAdminMode ? (
            <Input
              value={content.aboutTitle}
              onChange={(e) => setContent({ ...content, aboutTitle: e.target.value })}
              className="text-4xl font-bold text-center mb-16 bg-transparent border-primary/30"
            />
          ) : (
            <h2 className="text-4xl font-bold text-center mb-16">{content.aboutTitle}</h2>
          )}
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {content.aboutStats.map((stat, index) => (
              <Card key={index} className="p-8 text-center bg-background border-primary/20 hover:border-primary transition-all relative group">
                {isAdminMode && (
                  <button
                    onClick={() => removeItem('aboutStats', index)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500 text-sm"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                )}
                {isAdminMode ? (
                  <Input
                    value={stat.value}
                    onChange={(e) => updateItem('aboutStats', index, 'value', e.target.value)}
                    className="text-5xl font-bold text-primary mb-4 text-center bg-transparent border-primary/30"
                  />
                ) : (
                  <div className="text-5xl font-bold text-primary mb-4">{stat.value}</div>
                )}
                {isAdminMode ? (
                  <Input
                    value={stat.label}
                    onChange={(e) => updateItem('aboutStats', index, 'label', e.target.value)}
                    className="text-xl text-muted-foreground text-center bg-transparent border-primary/30"
                  />
                ) : (
                  <p className="text-xl text-muted-foreground">{stat.label}</p>
                )}
              </Card>
            ))}
          </div>
          
          {isAdminMode && (
            <div className="text-center mb-8">
              <Button onClick={() => addItem('aboutStats')} variant="outline">
                <Icon name="Plus" className="mr-2" size={16} />
                Добавить показатель
              </Button>
            </div>
          )}
          
          {isAdminMode ? (
            <Textarea
              value={content.aboutDescription}
              onChange={(e) => setContent({ ...content, aboutDescription: e.target.value })}
              className="text-lg text-center text-muted-foreground max-w-3xl mx-auto bg-muted"
            />
          ) : (
            <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
              {content.aboutDescription}
            </p>
          )}
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          {isAdminMode ? (
            <Input
              value={content.servicesTitle}
              onChange={(e) => setContent({ ...content, servicesTitle: e.target.value })}
              className="text-4xl font-bold text-center mb-4 bg-transparent border-primary/30"
            />
          ) : (
            <h2 className="text-4xl font-bold text-center mb-4">{content.servicesTitle}</h2>
          )}
          
          {isAdminMode ? (
            <Input
              value={content.servicesSubtitle}
              onChange={(e) => setContent({ ...content, servicesSubtitle: e.target.value })}
              className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto bg-transparent border-primary/30"
            />
          ) : (
            <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              {content.servicesSubtitle}
            </p>
          )}
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.services.map((service, index) => (
              <Card
                key={index}
                className="p-6 bg-card border-primary/20 hover:border-primary transition-all hover:scale-105 duration-300 relative group"
              >
                {isAdminMode && (
                  <button
                    onClick={() => removeItem('services', index)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500 z-10"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                )}
                
                {isAdminMode ? (
                  <Select
                    value={service.icon}
                    onValueChange={(value) => updateItem('services', index, 'icon', value)}
                  >
                    <SelectTrigger className="w-full mb-4">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((icon) => (
                        <SelectItem key={icon} value={icon}>
                          <div className="flex items-center">
                            <Icon name={icon as any} size={20} className="mr-2" />
                            {icon}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Icon name={service.icon as any} className="text-primary mb-4" size={40} />
                )}
                
                {isAdminMode ? (
                  <Input
                    value={service.title}
                    onChange={(e) => updateItem('services', index, 'title', e.target.value)}
                    className="text-xl font-bold mb-3 bg-transparent border-primary/30"
                  />
                ) : (
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                )}
                
                {isAdminMode ? (
                  <Textarea
                    value={service.description}
                    onChange={(e) => updateItem('services', index, 'description', e.target.value)}
                    className="text-muted-foreground bg-muted"
                  />
                ) : (
                  <p className="text-muted-foreground">{service.description}</p>
                )}
              </Card>
            ))}
          </div>
          
          {isAdminMode && (
            <div className="text-center mt-8">
              <Button onClick={() => addItem('services')} variant="outline">
                <Icon name="Plus" className="mr-2" size={16} />
                Добавить услугу
              </Button>
            </div>
          )}
        </div>
      </section>

      <section id="portfolio" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          {isAdminMode ? (
            <Input
              value={content.portfolioTitle}
              onChange={(e) => setContent({ ...content, portfolioTitle: e.target.value })}
              className="text-4xl font-bold text-center mb-16 bg-transparent border-primary/30"
            />
          ) : (
            <h2 className="text-4xl font-bold text-center mb-16">{content.portfolioTitle}</h2>
          )}
          
          <div className="grid md:grid-cols-3 gap-8">
            {content.portfolio.map((item, index) => (
              <Card key={index} className="p-6 bg-background border-primary/20 relative group">
                {isAdminMode && (
                  <button
                    onClick={() => removeItem('portfolio', index)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                )}
                
                {isAdminMode ? (
                  <Input
                    value={item.result}
                    onChange={(e) => updateItem('portfolio', index, 'result', e.target.value)}
                    className="text-3xl font-bold text-primary mb-4 bg-transparent border-primary/30"
                  />
                ) : (
                  <div className="text-3xl font-bold text-primary mb-4">{item.result}</div>
                )}
                
                {isAdminMode ? (
                  <Input
                    value={item.title}
                    onChange={(e) => updateItem('portfolio', index, 'title', e.target.value)}
                    className="text-xl font-bold mb-3 bg-transparent border-primary/30"
                  />
                ) : (
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                )}
                
                {isAdminMode ? (
                  <Textarea
                    value={item.description}
                    onChange={(e) => updateItem('portfolio', index, 'description', e.target.value)}
                    className="text-muted-foreground bg-muted"
                  />
                ) : (
                  <p className="text-muted-foreground">{item.description}</p>
                )}
              </Card>
            ))}
          </div>
          
          {isAdminMode && (
            <div className="text-center mt-8">
              <Button onClick={() => addItem('portfolio')} variant="outline">
                <Icon name="Plus" className="mr-2" size={16} />
                Добавить проект
              </Button>
            </div>
          )}
        </div>
      </section>

      <section id="cases" className="py-20 px-4">
        <div className="container mx-auto">
          {isAdminMode ? (
            <Input
              value={content.casesTitle}
              onChange={(e) => setContent({ ...content, casesTitle: e.target.value })}
              className="text-4xl font-bold text-center mb-16 bg-transparent border-primary/30"
            />
          ) : (
            <h2 className="text-4xl font-bold text-center mb-16">{content.casesTitle}</h2>
          )}
          
          <div className="max-w-4xl mx-auto space-y-8">
            {content.cases.map((caseItem, index) => (
              <Card key={index} className="p-8 bg-card border-primary/20 relative group">
                {isAdminMode && (
                  <button
                    onClick={() => removeItem('cases', index)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                )}
                
                <div className="flex items-start space-x-4">
                  <Icon name="CheckCircle" className="text-primary flex-shrink-0" size={32} />
                  <div className="flex-1">
                    {isAdminMode ? (
                      <Input
                        value={caseItem.title}
                        onChange={(e) => updateItem('cases', index, 'title', e.target.value)}
                        className="text-2xl font-bold mb-3 bg-transparent border-primary/30"
                      />
                    ) : (
                      <h3 className="text-2xl font-bold mb-3">{caseItem.title}</h3>
                    )}
                    
                    {isAdminMode ? (
                      <Textarea
                        value={caseItem.description}
                        onChange={(e) => updateItem('cases', index, 'description', e.target.value)}
                        className="text-muted-foreground mb-4 bg-muted"
                      />
                    ) : (
                      <p className="text-muted-foreground mb-4">{caseItem.description}</p>
                    )}
                    
                    <div className="flex items-center space-x-4 text-sm">
                      {isAdminMode ? (
                        <>
                          <Input
                            value={caseItem.duration}
                            onChange={(e) => updateItem('cases', index, 'duration', e.target.value)}
                            className="text-primary font-semibold bg-transparent border-primary/30"
                          />
                          <Input
                            value={caseItem.result}
                            onChange={(e) => updateItem('cases', index, 'result', e.target.value)}
                            className="text-primary font-semibold bg-transparent border-primary/30"
                          />
                        </>
                      ) : (
                        <>
                          <span className="text-primary font-semibold">{caseItem.duration}</span>
                          <span className="text-primary font-semibold">{caseItem.result}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {isAdminMode && (
            <div className="text-center mt-8">
              <Button onClick={() => addItem('cases')} variant="outline">
                <Icon name="Plus" className="mr-2" size={16} />
                Добавить кейс
              </Button>
            </div>
          )}
        </div>
      </section>

      <section id="blog" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          {isAdminMode ? (
            <Input
              value={content.blogTitle}
              onChange={(e) => setContent({ ...content, blogTitle: e.target.value })}
              className="text-4xl font-bold text-center mb-16 bg-transparent border-primary/30"
            />
          ) : (
            <h2 className="text-4xl font-bold text-center mb-16">{content.blogTitle}</h2>
          )}
          
          <div className="grid md:grid-cols-3 gap-8">
            {content.blogPosts.map((post, index) => (
              <Card key={index} className="p-6 bg-background border-primary/20 hover:border-primary transition-all cursor-pointer relative group">
                {isAdminMode && (
                  <button
                    onClick={() => removeItem('blogPosts', index)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                )}
                
                {isAdminMode ? (
                  <Input
                    value={post.category}
                    onChange={(e) => updateItem('blogPosts', index, 'category', e.target.value)}
                    className="text-sm text-primary mb-2 bg-transparent border-primary/30"
                  />
                ) : (
                  <div className="text-sm text-primary mb-2">{post.category}</div>
                )}
                
                {isAdminMode ? (
                  <Input
                    value={post.title}
                    onChange={(e) => updateItem('blogPosts', index, 'title', e.target.value)}
                    className="text-xl font-bold mb-3 bg-transparent border-primary/30"
                  />
                ) : (
                  <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                )}
                
                {isAdminMode ? (
                  <Input
                    value={post.date}
                    onChange={(e) => updateItem('blogPosts', index, 'date', e.target.value)}
                    className="text-sm text-muted-foreground bg-transparent border-primary/30"
                  />
                ) : (
                  <div className="text-sm text-muted-foreground">{post.date}</div>
                )}
              </Card>
            ))}
          </div>
          
          {isAdminMode && (
            <div className="text-center mt-8">
              <Button onClick={() => addItem('blogPosts')} variant="outline">
                <Icon name="Plus" className="mr-2" size={16} />
                Добавить статью
              </Button>
            </div>
          )}
        </div>
      </section>

      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto">
          {isAdminMode ? (
            <Input
              value={content.contactsTitle}
              onChange={(e) => setContent({ ...content, contactsTitle: e.target.value })}
              className="text-4xl font-bold text-center mb-16 bg-transparent border-primary/30"
            />
          ) : (
            <h2 className="text-4xl font-bold text-center mb-16">{content.contactsTitle}</h2>
          )}
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              {content.contacts.map((contact, index) => (
                <div key={index} className="flex items-start space-x-4 relative group">
                  {isAdminMode && (
                    <button
                      onClick={() => removeItem('contacts', index)}
                      className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 text-red-500 z-10"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  )}
                  
                  {isAdminMode ? (
                    <Select
                      value={contact.icon}
                      onValueChange={(value) => updateItem('contacts', index, 'icon', value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((icon) => (
                          <SelectItem key={icon} value={icon}>
                            <Icon name={icon as any} size={20} />
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Icon name={contact.icon as any} className="text-primary flex-shrink-0" size={24} />
                  )}
                  
                  <div className="flex-1">
                    {isAdminMode ? (
                      <Input
                        value={contact.title}
                        onChange={(e) => updateItem('contacts', index, 'title', e.target.value)}
                        className="font-bold mb-1 bg-transparent border-primary/30"
                      />
                    ) : (
                      <h3 className="font-bold mb-1">{contact.title}</h3>
                    )}
                    
                    {isAdminMode ? (
                      <Input
                        value={contact.value}
                        onChange={(e) => updateItem('contacts', index, 'value', e.target.value)}
                        className="text-muted-foreground bg-transparent border-primary/30"
                      />
                    ) : (
                      <p className="text-muted-foreground">{contact.value}</p>
                    )}
                  </div>
                </div>
              ))}
              
              {isAdminMode && (
                <Button onClick={() => addItem('contacts')} variant="outline" size="sm">
                  <Icon name="Plus" className="mr-2" size={16} />
                  Добавить контакт
                </Button>
              )}
            </div>
            
            <Card className="p-6 bg-card border-primary/20">
              <h3 className="text-xl font-bold mb-4">Напишите нам</h3>
              <form className="space-y-4">
                <Input placeholder="Ваше имя" className="bg-muted" />
                <Input placeholder="Email" className="bg-muted" />
                <Textarea placeholder="Сообщение" className="bg-muted" />
                <Button className="w-full gold-gradient text-background font-semibold">
                  Отправить
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-card py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              {content.logo ? (
                <img src={content.logo} alt="Logo" className="h-6 w-6 object-contain" />
              ) : (
                <Icon name="Shield" className="text-primary" size={24} />
              )}
              <span className="text-lg font-bold text-primary">{content.companyName}</span>
            </div>
            
            {isAdminMode ? (
              <Input
                value={content.footerText}
                onChange={(e) => setContent({ ...content, footerText: e.target.value })}
                className="text-muted-foreground text-sm bg-transparent border-primary/30 mb-4 md:mb-0"
              />
            ) : (
              <p className="text-muted-foreground text-sm">{content.footerText}</p>
            )}
            
            <button
              onClick={() => setShowAuthDialog(true)}
              className="text-xs text-muted-foreground/50 hover:text-primary transition-colors mt-4 md:mt-0"
            >
              admin
            </button>
          </div>
        </div>
      </footer>

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Вход в админ-панель</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                className="bg-muted"
                placeholder="admin123"
              />
            </div>
            <Button onClick={handleAuth} className="w-full gold-gradient text-background font-semibold">
              Войти
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {isAdminMode && (
        <div className="fixed bottom-4 right-4 z-50">
          <Card className="p-4 bg-primary text-background shadow-2xl">
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={20} />
              <span className="font-semibold">Режим редактирования</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsAdminMode(false);
                  toast.success('Изменения сохранены');
                }}
                className="ml-4 bg-background text-primary"
              >
                Сохранить и выйти
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;
