
import { Check } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      title: "Análise gratuita",
      description: "Você conta seu plano ou desafio. Eu avalio possibilidades reais.",
    },
    {
      title: "Plano sob medida",
      description: "Estrutura clara, viável e acessível.",
    },
    {
      title: "Ação com orientação",
      description: "Você executa com confiança.",
    },
    {
      title: "Acompanhamento de verdade",
      description: "Eu sigo com você até a conquista.",
    },
  ];

  return (
    <section className="py-20 bg-meraktos-lightGray" id="how-it-works">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-meraktos-darkBlue mb-16">
          Como funciona na prática?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center transition-transform hover:transform hover:scale-105">
              <div className="bg-meraktos-goldLight w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-meraktos-darkBlue" />
              </div>
              <span className="text-meraktos-goldDark font-semibold mb-2">
                Etapa {index + 1}
              </span>
              <h3 className="text-xl font-bold text-meraktos-darkBlue mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
