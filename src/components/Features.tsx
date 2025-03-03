
import { CheckCircle2, Globe, BanknoteIcon, Settings, TrendingUp, ShieldCheck } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "Global İthalat Yönetimi",
      description: "Tüm dünyadan ithalat süreçlerinizi tek bir platformdan yönetin ve takip edin.",
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      title: "Gerçek Zamanlı Takip",
      description: "Gönderilerinizin durumunu, konumunu ve teslim zamanını gerçek zamanlı izleyin.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      title: "Gümrük Belge Yönetimi",
      description: "Gümrük belgelerinizi otomatik oluşturun, onay süreçlerini hızlandırın.",
    },
    {
      icon: <BanknoteIcon className="h-10 w-10 text-primary" />,
      title: "Maliyet Optimizasyonu",
      description: "Nakliye ve depolama maliyetlerinizi optimize ederek tasarruf edin.",
    },
    {
      icon: <Settings className="h-10 w-10 text-primary" />,
      title: "Entegre Çözümler",
      description: "E-ticaret, ERP ve muhasebe sistemlerinizle kolay entegrasyon sağlayın.",
    },
    {
      icon: <CheckCircle2 className="h-10 w-10 text-primary" />,
      title: "Kalite Kontrol",
      description: "Ürünlerinizin kalitesini sevkiyat öncesi kontrol edin ve onaylayın.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            İthalat Süreçlerinizi Kolaylaştırın
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Uluslararası tedarik zinciri yönetiminde ihtiyacınız olan her şey tek bir platformda.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-background rounded-lg border border-border shadow-sm transition-all hover:shadow-md"
            >
              <div className="p-3 rounded-full bg-primary/10 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-center">{feature.title}</h3>
              <p className="text-muted-foreground text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
