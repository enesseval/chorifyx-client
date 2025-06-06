"use client"; // Animasyonlar için client component'e çeviriyoruz

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Zap, Users, ArrowRight, CheckCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

// İnternetten bulduğum ve projeye uygun görseller
const heroImage = "https://images.unsplash.com/photo-1658937409953-152c15555473?q=80&w=2835&auto=format&fit=crop"; // Soyut takvim arayüzü
const featureImage1 = "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2874&auto=format&fit=crop"; // Toplantı
const featureImage2 = "https://images.unsplash.com/photo-1588196749107-15d05b41054e?q=80&w=2942&auto=format&fit=crop"; // Odaklanmış çalışma

export default function LandingPage() {
   const FADE_IN_UP_VARIANTS = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
   };

   const staggerContainer = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            staggerChildren: 0.2,
         },
      },
   };

   return (
      <div className="flex flex-col min-h-screen bg-white text-gray-800">
         {/* Header */}
         <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
               <Link href="/" className="flex items-center gap-2">
                  <Image src="/logo.png" alt="Chorifyx Logo" width={40} height={40} />
                  <span className="font-bold text-xl text-gray-800">Chorifyx</span>
               </Link>
               <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                  <Link href="#features" className="hover:text-blue-600 transition-colors">
                     Özellikler
                  </Link>
                  <Link href="#testimonials" className="hover:text-blue-600 transition-colors">
                     Yorumlar
                  </Link>
                  <Link href="#pricing" className="hover:text-blue-600 transition-colors">
                     Fiyatlandırma
                  </Link>
               </nav>
               <div className="flex items-center gap-4">
                  <Button variant="ghost" asChild>
                     <Link href="/auth/login">Giriş Yap</Link>
                  </Button>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-transform duration-200 hover:scale-105">
                     <Link href="/auth/register">
                        Ücretsiz Başla <ArrowRight className="ml-2 h-4 w-4" />
                     </Link>
                  </Button>
               </div>
            </div>
         </header>

         <main className="flex-1">
            {/* Hero Section */}
            <section className="relative py-20 md:py-28 text-center bg-gray-50 overflow-hidden">
               <div className="container mx-auto px-4 relative">
                  <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                     <motion.h1 variants={FADE_IN_UP_VARIANTS} className="text-4xl md:text-6xl font-extrabold tracking-tighter text-gray-900">
                        Tüm Takvimleriniz, <br />
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">Tek Bir Senkronize Noktada.</span>
                     </motion.h1>
                     <motion.p variants={FADE_IN_UP_VARIANTS} className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-600">
                        Chorifyx ile kişisel, iş ve freelance programlarınızı zahmetsizce birleştirin. Zamanınızı geri kazanın, verimliliğinizi ikiye katlayın.
                     </motion.p>
                     <motion.div variants={FADE_IN_UP_VARIANTS} className="mt-10 flex justify-center gap-4">
                        <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-transform duration-200 hover:scale-105">
                           <Link href="/auth/register">14 Gün Ücretsiz Deneyin</Link>
                        </Button>
                        <Button size="lg" variant="outline">
                           Demoyu İncele
                        </Button>
                     </motion.div>
                  </motion.div>
                  <motion.div
                     initial={{ opacity: 0, y: 50, scale: 0.8 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                     className="mt-16 mx-auto max-w-5xl"
                  >
                     <div className="relative rounded-xl shadow-2xl shadow-blue-500/20">
                        <Image src={heroImage} alt="Chorifyx App Interface Mockup" width={1200} height={675} className="rounded-xl object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/50 to-transparent"></div>
                     </div>
                  </motion.div>
               </div>
            </section>

            {/* Social Proof Section */}
            <section className="py-12 bg-white">
               <div className="container mx-auto px-4 text-center">
                  <p className="text-sm font-semibold text-gray-500 tracking-wider">DÜNYANIN EN İNOVATİF EKİPLERİ TARAFINDAN KULLANILIYOR</p>
                  <div className="mt-6 flex justify-center items-center gap-8 md:gap-12 flex-wrap opacity-60">
                     {/* Bu logoları kendi partnerlerinizle değiştirebilirsiniz */}
                     <p className="font-bold text-2xl">Google</p>
                     <p className="font-bold text-2xl">Microsoft</p>
                     <p className="font-bold text-2xl">Spotify</p>
                     <p className="font-bold text-2xl">Slack</p>
                     <p className="font-bold text-2xl">Dropbox</p>
                  </div>
               </div>
            </section>

            {/* Detailed Features Section */}
            <section id="features" className="py-20 bg-gray-50">
               <div className="container mx-auto px-4">
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={FADE_IN_UP_VARIANTS} className="text-center mb-16">
                     <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Çalışma Şeklinizi Dönüştürün</h2>
                     <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Chorifyx sadece bir takvim değil, zaman yönetimi için kişisel asistanınızdır.</p>
                  </motion.div>

                  {/* Feature 1 */}
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer} className="grid md:grid-cols-2 gap-12 items-center mb-20">
                     <motion.div variants={FADE_IN_UP_VARIANTS}>
                        <div className="flex items-center gap-3 mb-3">
                           <div className="bg-blue-100 p-2 rounded-full">
                              <Calendar className="h-6 w-6 text-blue-600" />
                           </div>
                           <h3 className="text-2xl font-semibold">Birleşik Takvim Görünümü</h3>
                        </div>
                        <p className="text-gray-600 mb-4">Google, Outlook, iCloud ve diğer takvimlerinizi tek bir çatı altında toplayın. Çakışmalara anında veda edin ve haftanıza kuşbakışı bakın.</p>
                        <ul className="space-y-2">
                           <li className="flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-green-500" /> Sınırsız takvim entegrasyonu
                           </li>
                           <li className="flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-green-500" /> Otomatik çakışma tespiti
                           </li>
                           <li className="flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-green-500" /> Kişiselleştirilebilir renk kodları
                           </li>
                        </ul>
                     </motion.div>
                     <motion.div variants={FADE_IN_UP_VARIANTS} className="rounded-lg shadow-xl overflow-hidden">
                        <Image src={featureImage1} alt="Team meeting" width={600} height={400} className="object-cover" />
                     </motion.div>
                  </motion.div>

                  {/* Feature 2 */}
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer} className="grid md:grid-cols-2 gap-12 items-center">
                     <motion.div variants={FADE_IN_UP_VARIANTS} className="rounded-lg shadow-xl overflow-hidden md:order-2">
                        <Image src={featureImage2} alt="Focused work" width={600} height={400} className="object-cover" />
                     </motion.div>
                     <motion.div variants={FADE_IN_UP_VARIANTS} className="md:order-1">
                        <div className="flex items-center gap-3 mb-3">
                           <div className="bg-amber-100 p-2 rounded-full">
                              <Zap className="h-6 w-6 text-amber-600" />
                           </div>
                           <h3 className="text-2xl font-semibold">Akıllı Randevu Linkleri</h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                           "Ne zaman müsaitsin?" e-postalarına son. Kişisel Chorifyx linkinizi paylaşın, insanlar sadece sizin belirlediğiniz kurallara göre, boş zamanlarınıza randevu alabilsin.
                        </p>
                        <ul className="space-y-2">
                           <li className="flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-green-500" /> Toplantı öncesi ve sonrası tampon zamanlar
                           </li>
                           <li className="flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-green-500" /> Farklı toplantı türleri için farklı linkler
                           </li>
                           <li className="flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-green-500" /> Otomatik zaman dilimi dönüştürme
                           </li>
                        </ul>
                     </motion.div>
                  </motion.div>
               </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 bg-white">
               <div className="container mx-auto px-4">
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={FADE_IN_UP_VARIANTS} className="text-center mb-12">
                     <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Kullanıcılarımız Ne Diyor?</h2>
                     <p className="mt-4 text-lg text-gray-600">Her gün yüzlerce profesyonelin hayatını kolaylaştırıyoruz.</p>
                  </motion.div>
                  <motion.div
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true, amount: 0.2 }}
                     variants={staggerContainer}
                     className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                     {[
                        {
                           name: "Ayşe Yılmaz",
                           title: "Freelance Geliştirici",
                           quote: "Chorifyx, hem kurumsal işimi hem de freelance projelerimi yönetirken aklımı kaçırmamı engelliyor. Müşterilerimle randevu ayarlamak hiç bu kadar kolay olmamıştı.",
                           avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                        },
                        {
                           name: "Mehmet Öztürk",
                           title: "Proje Yöneticisi, TechCorp",
                           quote: "Tüm ekibin takvimini tek bir yerden görmek ve çakışma olmadan toplantı planlamak inanılmaz bir verimlilik artışı sağladı. Chorifyx vazgeçilmezimiz oldu.",
                           avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                        },
                        {
                           name: "Elif Kaya",
                           title: "Girişimci & Danışman",
                           quote: "Bir girişimci olarak zamanım en değerli varlığım. Chorifyx sayesinde zamanımı planlamak yerine işimi büyütmeye odaklanabiliyorum. Harika bir ürün!",
                           avatar: "https://randomuser.me/api/portraits/women/33.jpg",
                        },
                     ].map((testimonial) => (
                        <motion.div key={testimonial.name} variants={FADE_IN_UP_VARIANTS}>
                           <Card className="h-full flex flex-col">
                              <CardContent className="pt-6 flex-1">
                                 <p className="text-gray-700">"{testimonial.quote}"</p>
                              </CardContent>
                              <CardFooter className="mt-4">
                                 <Avatar>
                                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                 </Avatar>
                                 <div className="ml-4">
                                    <p className="font-semibold">{testimonial.name}</p>
                                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                                 </div>
                              </CardFooter>
                           </Card>
                        </motion.div>
                     ))}
                  </motion.div>
               </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 bg-gray-50">
               <div className="container mx-auto px-4">
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={FADE_IN_UP_VARIANTS} className="text-center mb-12">
                     <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Size Uygun Planı Seçin</h2>
                     <p className="mt-4 text-lg text-gray-600">İster tek başınıza, ister ekibinizle çalışın, sizin için bir planımız var.</p>
                  </motion.div>
                  <motion.div
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true, amount: 0.2 }}
                     variants={staggerContainer}
                     className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
                  >
                     {/* Plan 1: Free */}
                     <motion.div variants={FADE_IN_UP_VARIANTS}>
                        <Card className="flex flex-col h-full">
                           <CardHeader>
                              <CardTitle>Başlangıç</CardTitle>
                              <CardDescription>Temel özelliklerle başlamak için ideal.</CardDescription>
                              <p className="text-4xl font-bold pt-4">₺0</p>
                           </CardHeader>
                           <CardContent className="flex-1">
                              <ul className="space-y-3">
                                 <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-gray-500" />1 Takvim Entegrasyonu
                                 </li>
                                 <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-gray-500" />1 Aktif Randevu Türü
                                 </li>
                                 <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-gray-500" />
                                    Temel Raporlama
                                 </li>
                              </ul>
                           </CardContent>
                           <CardFooter>
                              <Button variant="outline" className="w-full">
                                 Planı Seç
                              </Button>
                           </CardFooter>
                        </Card>
                     </motion.div>
                     {/* Plan 2: Pro (Öne Çıkan) */}
                     <motion.div variants={FADE_IN_UP_VARIANTS}>
                        <Card className="flex flex-col h-full border-2 border-blue-600 relative shadow-2xl shadow-blue-500/20">
                           <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                              <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">EN POPÜLER</div>
                           </div>
                           <CardHeader>
                              <CardTitle>Profesyonel</CardTitle>
                              <CardDescription>Profesyoneller ve yoğun çalışanlar için.</CardDescription>
                              <p className="text-4xl font-bold pt-4">
                                 ₺120<span className="text-lg font-normal text-gray-500">/ay</span>
                              </p>
                           </CardHeader>
                           <CardContent className="flex-1">
                              <ul className="space-y-3">
                                 <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-blue-600" />
                                    Sınırsız Takvim Entegrasyonu
                                 </li>
                                 <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-blue-600" />
                                    Sınırsız Randevu Türü
                                 </li>
                                 <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-blue-600" />
                                    Marka Özelleştirme
                                 </li>
                                 <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-blue-600" />
                                    Gelişmiş Raporlama
                                 </li>
                              </ul>
                           </CardContent>
                           <CardFooter>
                              <Button className="w-full bg-blue-600 hover:bg-blue-700">Profesyonel'e Geç</Button>
                           </CardFooter>
                        </Card>
                     </motion.div>
                     {/* Plan 3: Ekip */}
                     <motion.div variants={FADE_IN_UP_VARIANTS}>
                        <Card className="flex flex-col h-full">
                           <CardHeader>
                              <CardTitle>Ekip</CardTitle>
                              <CardDescription>İşbirliği ve ekip yönetimi için.</CardDescription>
                              <p className="text-4xl font-bold pt-4">Bize Ulaşın</p>
                           </CardHeader>
                           <CardContent className="flex-1">
                              <ul className="space-y-3">
                                 <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-gray-500" />
                                    Tüm Pro Özellikleri
                                 </li>
                                 <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-gray-500" />
                                    Ekip Yönetim Paneli
                                 </li>
                                 <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-gray-500" />
                                    Merkezi Faturalandırma
                                 </li>
                                 <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-gray-500" />
                                    Öncelikli Destek
                                 </li>
                              </ul>
                           </CardContent>
                           <CardFooter>
                              <Button variant="outline" className="w-full">
                                 Satış ile Görüş
                              </Button>
                           </CardFooter>
                        </Card>
                     </motion.div>
                  </motion.div>
               </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
               <div className="container mx-auto px-4 max-w-3xl">
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={FADE_IN_UP_VARIANTS} className="text-center mb-12">
                     <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Sıkça Sorulan Sorular</h2>
                  </motion.div>
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
                     <Accordion type="single" collapsible className="w-full">
                        {/* AccordionItem'ları motion.div ile sarmalayabiliriz */}
                        <AccordionItem value="item-1">
                           <AccordionTrigger>Hangi takvimlerle entegre olabilirim?</AccordionTrigger>
                           <AccordionContent>
                              Chorifyx, Google Calendar, Outlook/Office 365, Apple iCloud Calendar ve CalDAV destekleyen diğer tüm takvimlerle sorunsuz bir şekilde çalışır.
                           </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                           <AccordionTrigger>Verilerim güvende mi?</AccordionTrigger>
                           <AccordionContent>
                              Kesinlikle. Güvenliğiniz bizim önceliğimizdir. Tüm verileriniz endüstri standardı şifreleme yöntemleri ile korunur ve asla üçüncü partilerle paylaşılmaz.
                           </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                           <AccordionTrigger>Deneme süresi sonunda ne olacak?</AccordionTrigger>
                           <AccordionContent>
                              14 günlük ücretsiz deneme süreniz boyunca tüm Profesyonel plan özelliklerini kullanabilirsiniz. Süre sonunda, devam etmek için bir plan seçebilir veya ücretsiz Başlangıç
                              planı ile sınırlı özelliklerle devam edebilirsiniz.
                           </AccordionContent>
                        </AccordionItem>
                     </Accordion>
                  </motion.div>
               </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-20 bg-gray-50">
               <div className="container mx-auto px-4 text-center">
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={staggerContainer}>
                     <motion.h2 variants={FADE_IN_UP_VARIANTS} className="text-3xl font-bold tracking-tight text-gray-900">
                        Zamanınızın Kontrolünü Bugün Elinize Alın
                     </motion.h2>
                     <motion.p variants={FADE_IN_UP_VARIANTS} className="mt-4 text-lg text-gray-600">
                        Daha organize bir hayata ilk adımı atın. Kredi kartı gerekmez.
                     </motion.p>
                     <motion.div variants={FADE_IN_UP_VARIANTS} className="mt-8">
                        <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-transform duration-200 hover:scale-105">
                           <Link href="/auth/register">
                              Chorifyx'i Ücretsiz Deneyin <ArrowRight className="ml-2 h-5 w-5" />
                           </Link>
                        </Button>
                     </motion.div>
                  </motion.div>
               </div>
            </section>
         </main>

         {/* Footer */}
         <footer className="bg-white border-t">
            <div className="container mx-auto px-4 py-8">
               <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="flex items-center gap-2">
                     <Image src="/logo.png" alt="Chorifyx Logo" width={32} height={32} />
                     <span className="font-bold text-lg">Chorifyx</span>
                  </div>
                  <div className="flex gap-6 mt-4 md:mt-0">
                     <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">
                        Gizlilik
                     </Link>
                     <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">
                        Kullanım Koşulları
                     </Link>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 md:mt-0">© {new Date().getFullYear()} Chorifyx. Tüm hakları saklıdır.</p>
               </div>
            </div>
         </footer>
      </div>
   );
}
