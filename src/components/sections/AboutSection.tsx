
const AboutSection = () => {
  return (
    <section className="py-20 bg-white" id="about">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80"
              alt="Helena Santos, Consultora Financeira" 
              className="rounded-lg shadow-lg w-full max-w-md mx-auto"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-meraktos-darkBlue mb-6">
              Quem está por trás da Meraktos?
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                Sou <strong>Helena Santos</strong>, consultora financeira com 15 anos de experiência (13 anos no Santander, 2 no Itaú).
              </p>
              <p className="text-lg">
                Hoje sou <strong>Personal Banker pela Franq</strong>, e ajudo pessoas como você a conquistar a casa própria, financiar um carro ou reorganizar a vida financeira.
              </p>
              <p className="text-lg">
                Já atendi desde quem estava sem crédito até quem assinou o primeiro contrato de imóvel.
              </p>
              <p className="text-lg">
                E sim, sou a <strong>Severina das Finanças</strong>: faço um pouco de tudo, e faço com alma.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
