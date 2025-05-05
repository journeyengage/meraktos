
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ServicesSection = () => {
  const personalServices = [
    "Crédito imobiliário e consórcio",
    "Financiamento de veículos",
    "Empréstimo consignado",
    "Renegociação de dívidas",
    "Planejamento financeiro simples",
  ];

  const businessServices = [
    "Crédito com garantia de imóvel",
    "Capital de giro",
    "Desconto de recebíveis",
    "Renegociação com bancos",
    "Consultoria para MEI",
    "Consórcios e seguros empresariais",
  ];

  return (
    <section className="py-20 bg-white" id="services">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-meraktos-darkBlue mb-12">
          Soluções financeiras feitas sob medida
        </h2>

        {/* Tabs for larger screens */}
        <div className="hidden md:block">
          <Tabs defaultValue="personal" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="personal">Pessoa Física (PF)</TabsTrigger>
              <TabsTrigger value="business">Pessoa Jurídica (PJ)</TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {personalServices.map((service, index) => (
                  <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <p className="text-meraktos-darkBlue font-medium">{service}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="business">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {businessServices.map((service, index) => (
                  <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <p className="text-meraktos-darkBlue font-medium">{service}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Accordion for mobile screens */}
        <div className="md:hidden">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl font-semibold text-meraktos-darkBlue">
                Pessoa Física (PF)
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pl-2">
                  {personalServices.map((service, index) => (
                    <li key={index} className="text-meraktos-darkBlue p-2 border-b border-gray-100">
                      {service}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-xl font-semibold text-meraktos-darkBlue">
                Pessoa Jurídica (PJ)
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pl-2">
                  {businessServices.map((service, index) => (
                    <li key={index} className="text-meraktos-darkBlue p-2 border-b border-gray-100">
                      {service}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
