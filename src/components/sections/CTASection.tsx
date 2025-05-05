
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="gradient-gold py-20" id="cta">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-meraktos-darkBlue mb-6">
          Vamos conversar e dar o primeiro passo?
        </h2>
        <p className="text-meraktos-darkBlue text-lg md:text-xl max-w-3xl mx-auto mb-10">
          Você pode ter uma estratégia clara e personalizada para alcançar sua meta financeira 
          — sem custo, sem enrolação. Só com verdade e experiência.
        </p>
        <Button 
          onClick={scrollToContact}
          className="bg-meraktos-darkBlue text-white hover:bg-meraktos-mediumBlue text-lg px-8 py-6 rounded-md font-medium transition-all duration-300 transform hover:scale-105"
        >
          Agendar minha análise gratuita
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
