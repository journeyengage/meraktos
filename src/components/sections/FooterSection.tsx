
const FooterSection = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-meraktos-darkBlue text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Meraktos Consultoria</h2>
            <p className="opacity-80">Transformando sonhos em realidade financeira</p>
          </div>
          
          <div className="flex flex-col space-y-2 text-center md:text-right">
            <a href="mailto:contato@meraktos.com" className="text-meraktos-goldLight hover:underline">
              contato@meraktos.com
            </a>
            <a href="https://wa.me/5511932990106" className="text-meraktos-goldLight hover:underline">
              WhatsApp (11) 93299-0106
            </a>
            <a href="https://instagram.com/meraktos" className="text-meraktos-goldLight hover:underline" target="_blank" rel="noopener noreferrer">
              Instagram: @meraktos
            </a>
          </div>
        </div>
        
        <hr className="border-white/20 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-70">
          <p>© {currentYear} Meraktos Consultoria. Todos os direitos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-meraktos-goldLight transition-colors">
              Política de Privacidade
            </a>
            <span className="hidden md:inline">|</span>
            <a href="#" className="hover:text-meraktos-goldLight transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
