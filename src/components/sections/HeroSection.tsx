
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section relative min-h-[90vh] flex items-center">
      <div className="hero-overlay absolute inset-0"></div>
      <div className="container mx-auto px-4 relative z-10 text-center py-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Crédito que transforma.{" "}
          <span className="block">Realize o que parecia distante.</span>
        </h1>
        <p className="text-white text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
          Casa, carro, paz financeira. A gente mostra o caminho com clareza, acolhimento e experiência de quem já ajudou centenas de pessoas a destravar seus sonhos.
        </p>
        <Button 
          onClick={scrollToContact}
          className="bg-meraktos-goldLight text-meraktos-darkBlue hover:bg-meraktos-goldDark text-lg px-8 py-6 rounded-md font-medium transition-all duration-300 transform hover:scale-105"
        >
          Quero uma análise gratuita agora
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
