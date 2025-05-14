const AboutSection = () => {
  return <section className="py-20 bg-white" id="about">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <img alt="Helena Santos, Consultora Financeira" className="rounded-lg shadow-lg w-full max-w-md mx-auto" src="/lovable-uploads/e96e48f4-913b-4796-bf99-540fe42dc4fd.png" />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-meraktos-darkBlue mb-6">
              Quem está por trás da Meraktos?
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                <strong>Helena Santos</strong>, consultora financeira com 15 anos de experiência no mercado bancário.
              </p>
              <p className="text-lg">
                <strong>Personal Banker</strong> e ajudo pessoas como você a reorganizar a vida financeira, financiar um carro ou até mesmo conquistar a tão sonhada casa própria.
              </p>
              <p className="text-lg">
                Ajudo desde a limpar o nome até assinar contrato do seu primeiro imóvel.
              </p>
              <p className="text-lg">
                Pode me chamar de a  <strong>"Severina das Finanças"</strong>: faço um pouco de tudo, mas faço tudo com alma.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;