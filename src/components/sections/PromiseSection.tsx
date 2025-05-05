
import { Home, Car, ArrowDownUp, Briefcase, FileText } from "lucide-react";

const PromiseSection = () => {
  return (
    <section className="py-20 bg-meraktos-darkBlue text-white" id="benefits">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Com minha consultoria, você pode:
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="flex items-start gap-4 p-6 rounded-lg transition-all hover:bg-opacity-10 hover:bg-white">
            <div className="bg-meraktos-goldLight p-3 rounded-full">
              <Home className="w-6 h-6 text-meraktos-darkBlue" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Casa própria</h3>
              <p className="opacity-90">
                Comprar sua casa própria com <span className="text-meraktos-goldLight">aprovação facilitada</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-6 rounded-lg transition-all hover:bg-opacity-10 hover:bg-white">
            <div className="bg-meraktos-goldLight p-3 rounded-full">
              <Car className="w-6 h-6 text-meraktos-darkBlue" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Financiar veículos</h3>
              <p className="opacity-90">
                Financiar seu carro com segurança e <span className="text-meraktos-goldLight">sem juros abusivos</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-6 rounded-lg transition-all hover:bg-opacity-10 hover:bg-white">
            <div className="bg-meraktos-goldLight p-3 rounded-full">
              <ArrowDownUp className="w-6 h-6 text-meraktos-darkBlue" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Renegociar dívidas</h3>
              <p className="opacity-90">
                Renegociar dívidas e <span className="text-meraktos-goldLight">voltar a respirar</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-6 rounded-lg transition-all hover:bg-opacity-10 hover:bg-white">
            <div className="bg-meraktos-goldLight p-3 rounded-full">
              <Briefcase className="w-6 h-6 text-meraktos-darkBlue" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Crédito para negócios</h3>
              <p className="opacity-90">
                Conseguir crédito para seu <span className="text-meraktos-goldLight">negócio ou MEI</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-6 rounded-lg transition-all hover:bg-opacity-10 hover:bg-white">
            <div className="bg-meraktos-goldLight p-3 rounded-full">
              <FileText className="w-6 h-6 text-meraktos-darkBlue" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Clareza financeira</h3>
              <p className="opacity-90">
                Ter clareza sobre suas finanças, <span className="text-meraktos-goldLight">sem enrolação</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Prova:</h3>
          <p className="text-lg">
            Mais de <span className="text-meraktos-goldLight font-bold">300 pessoas atendidas</span> com histórias reais de transformação:
            clientes que <span className="text-meraktos-goldLight">saíram do aluguel</span>, 
            <span className="text-meraktos-goldLight"> quitaram dívidas</span> ou 
            <span className="text-meraktos-goldLight"> destravaram crédito</span> com confiança.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PromiseSection;
