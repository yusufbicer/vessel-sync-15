
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Tedarikçileri Ekleyin",
      description: "Yurt dışı tedarikçilerinizi sisteme ekleyin ve tüm iletişim bilgilerini yönetin.",
    },
    {
      number: "02",
      title: "Sevkiyat Oluşturun",
      description: "Tedarikçilerinizden sipariş verin ve yeni sevkiyatlarınızı sisteme kaydedin.",
    },
    {
      number: "03",
      title: "Süreçleri Takip Edin",
      description: "Sevkiyatlarınızın üretim, kontrol, nakliye ve gümrük süreçlerini adım adım izleyin.",
    },
    {
      number: "04",
      title: "Belgeleri Yönetin",
      description: "Tüm ithalat belgelerini dijital ortamda saklayın ve yönetin.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Nasıl Çalışır?
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Groop ile ithalat süreçlerinizi dört kolay adımda yönetin.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col p-6 bg-background rounded-lg border border-border relative"
            >
              <div className="absolute -top-5 left-6 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground text-xl font-bold">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mt-5 mb-3">{step.title}</h3>
              <p className="text-muted-foreground flex-grow">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-8 w-8 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="rounded-full" asChild>
            <a href="/signup">Hemen Başlayın</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
