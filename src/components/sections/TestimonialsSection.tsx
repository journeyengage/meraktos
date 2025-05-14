
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Achei que nunca sairia do aluguel. A Helena montou um plano comigo, buscou taxas melhores e em 6 meses eu estava com a chave na mão!",
      author: "Luciana F., São Paulo/SP",
    },
    {
      quote: "Depois de 5 anos tentando, finalmente consegui comprar meu carro com um financiamento justo e dentro das minhas possibilidades.",
      author: "Carlos M., São Paulo/SP",
    },
    {
      quote: "Eu estava afogada em dívidas e sem esperança. A orientação da Helena me ajudou a renegociar tudo e hoje estou respirando novamente.",
      author: "Mariana S., São Paulo/SP",
    },
    {
      quote: "Como MEI, eu não conseguia crédito em lugar nenhum. A Helena encontrou soluções que nem sabia que existiam para o meu negócio.",
      author: "Pedro A., São Paulo/SP",
    },
  ];

  return (
    <section className="py-20 bg-meraktos-mediumBlue text-white" id="testimonials">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Quem já confiou, conquistou
        </h2>

        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <Card className="bg-transparent border border-white/20">
                    <CardContent className="p-6">
                      <div className="flex flex-col h-full space-y-4">
                        <div className="text-4xl text-meraktos-goldLight">"</div>
                        <p className="flex-1 italic text-white/90 mb-4">
                          {testimonial.quote}
                        </p>
                        <p className="font-semibold text-meraktos-goldLight">— {testimonial.author}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static transform-none bg-meraktos-goldLight text-meraktos-darkBlue hover:bg-meraktos-goldDark hover:text-white" />
              <CarouselNext className="static transform-none bg-meraktos-goldLight text-meraktos-darkBlue hover:bg-meraktos-goldDark hover:text-white" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
