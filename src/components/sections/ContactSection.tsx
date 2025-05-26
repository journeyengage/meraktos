
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ContactSection = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    whatsapp: "",
    goal: "",
    budget: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Apply phone mask to WhatsApp field
    if (name === "whatsapp") {
      const numericValue = value.replace(/\D/g, "");
      let formattedValue = "";
      
      if (numericValue.length <= 2) {
        formattedValue = numericValue;
      } else if (numericValue.length <= 7) {
        formattedValue = `(${numericValue.slice(0, 2)}) ${numericValue.slice(2)}`;
      } else {
        formattedValue = `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 7)}-${numericValue.slice(7, 11)}`;
      }
      
      setFormState((prev) => ({ ...prev, whatsapp: formattedValue }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBudgetChange = (value: string) => {
    setFormState((prev) => ({ ...prev, budget: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Prepare data for webhook
    const payload = {
      nome_completo: formState.name,
      email: formState.email,
      whatsapp: formState.whatsapp,
      meta_financeira: formState.goal,
      investimento_planejado: formState.budget,
      porque_importante: formState.message
    };

    try {
      const response = await fetch("https://n8n.main.santto.co/webhook-test/meraktos-webform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Erro na resposta do servidor");
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Em até 24h entraremos em contato pelo seu WhatsApp. Vamos realizar?",
      });
      
      setFormState({
        name: "",
        email: "",
        whatsapp: "",
        goal: "",
        budget: "",
        message: "",
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      setIsSubmitting(false);
      toast({
        title: "Erro ao enviar dados",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-20 bg-white" id="contact">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-meraktos-darkBlue mb-12">
            Entre em contato
          </h2>

          {isSuccess ? (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 text-center animate-fadeInUp">
              <h3 className="text-xl font-semibold mb-2">Obrigado!</h3>
              <p>Em até 24h entraremos em contato pelo seu WhatsApp. Vamos realizar?</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-meraktos-darkBlue">
                    Nome completo
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    required
                    className="border-gray-300 focus:border-meraktos-goldLight focus:ring-meraktos-goldLight"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-meraktos-darkBlue flex items-center gap-2">
                    <Mail className="h-4 w-4" /> E-mail
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="seu.email@exemplo.com"
                    required
                    className="border-gray-300 focus:border-meraktos-goldLight focus:ring-meraktos-goldLight"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-meraktos-darkBlue flex items-center gap-2">
                  <Phone className="h-4 w-4" /> WhatsApp
                </Label>
                <Input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  value={formState.whatsapp}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  required
                  className="border-gray-300 focus:border-meraktos-goldLight focus:ring-meraktos-goldLight"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal" className="text-meraktos-darkBlue">
                  Qual sua meta financeira?
                </Label>
                <Textarea
                  id="goal"
                  name="goal"
                  value={formState.goal}
                  onChange={handleChange}
                  placeholder="Descreva o que você deseja alcançar"
                  required
                  className="border-gray-300 focus:border-meraktos-goldLight focus:ring-meraktos-goldLight min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget" className="text-meraktos-darkBlue">
                  Quanto você está disposto(a) a investir para alcançá-la?
                </Label>
                <Select value={formState.budget} onValueChange={handleBudgetChange}>
                  <SelectTrigger className="w-full border-gray-300 focus:border-meraktos-goldLight focus:ring-meraktos-goldLight">
                    <SelectValue placeholder="Selecione uma faixa de investimento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Até R$100">Até R$100</SelectItem>
                    <SelectItem value="De R$101 a R$300">De R$101 a R$300</SelectItem>
                    <SelectItem value="De R$301 a R$500">De R$301 a R$500</SelectItem>
                    <SelectItem value="De R$501 a R$1.000">De R$501 a R$1.000</SelectItem>
                    <SelectItem value="De R$1.001 a R$2.000">De R$1.001 a R$2.000</SelectItem>
                    <SelectItem value="Acima de R$2.000">Acima de R$2.000</SelectItem>
                    <SelectItem value="Ainda não sei / Preciso de orientação">Ainda não sei / Preciso de orientação</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-meraktos-darkBlue">
                  Por que essa meta financeira é importante pra você?
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Conte um pouco sobre a importância dessa meta para você"
                  className="border-gray-300 focus:border-meraktos-goldLight focus:ring-meraktos-goldLight min-h-[100px]"
                />
              </div>

              <div className="text-center pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-meraktos-darkBlue text-white hover:bg-meraktos-goldLight hover:text-meraktos-darkBlue w-full md:w-auto md:px-12 py-6 text-lg font-medium transition-all duration-300"
                >
                  {isSubmitting ? "Enviando..." : "Solicitar Análise"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
