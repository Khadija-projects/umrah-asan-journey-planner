import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I book a hotel with Umrah Asan?",
      answer: "You can easily book a hotel by browsing our verified options, selecting your dates, and clicking 'Book Now.' You'll receive payment instructions to transfer the amount to our bank account. Once we confirm payment, your voucher is generated instantly."
    },
    {
      question: "Is online card payment required?",
      answer: "No. With Umrah Asan, you don't need to pay by card online. Simply transfer the amount to our official bank account and your booking is confirmed."
    },
    {
      question: "How does the bank transfer work?",
      answer: "After choosing your hotel or taxi, you'll get clear bank details. Transfer the full amount within 4 hours. Once we receive the payment, your booking is secured and a voucher is issued."
    },
    {
      question: "What happens if I don't pay in 4 hours?",
      answer: "If payment is not received within 4 hours, your booking will automatically expire and the slot will be offered to other pilgrims."
    },
    {
      question: "When will I get my booking voucher?",
      answer: "As soon as your payment is confirmed, we send your voucher instantly to your email and WhatsApp."
    },
    {
      question: "Can I cancel my hotel booking?",
      answer: "Yes, you can cancel up to 48 hours before your check-in date. Please read our Cancellation Policy for details."
    },
    {
      question: "Will I get a refund if I cancel?",
      answer: "If you cancel within the allowed time, you'll get a refund minus any bank transfer charges. Refunds are processed within 7 business days."
    },
    {
      question: "How close are the hotels to Haram?",
      answer: "All our hotels are carefully selected within walking distance to Haram in Makkah and Madinah. Distance is mentioned clearly in each listing."
    },
    {
      question: "Can I book Ziaraat tours without booking a hotel?",
      answer: "Yes! You can book Ziaraat tours even if you already have your own accommodation. Just visit our Ziaraat page and book your slots."
    },
    {
      question: "Do you provide female-friendly guides for Ziaraat?",
      answer: "Yes, we have trusted, approved guides who can assist families and female groups with comfort and privacy."
    },
    {
      question: "Are the taxi drivers verified?",
      answer: "Absolutely. All drivers are verified, licensed and experienced in handling pilgrims respectfully and safely."
    },
    {
      question: "What are the taxi charges?",
      answer: "Taxi fares depend on distance and vehicle type. All prices are transparent — you'll see the fare before booking."
    },
    {
      question: "Can I book a taxi at midnight or late night?",
      answer: "Yes! Our taxi service is available 24/7, including late-night pickups for airport and Haram transfers."
    },
    {
      question: "How do I book an airport pickup or drop?",
      answer: "Go to our Taxi Booking page, select Airport Transfer, enter your flight details, pay via bank transfer and you're set."
    },
    {
      question: "Is the Umrah Guide free?",
      answer: "Yes. Our complete Umrah Guide is free to read online and download as a PDF for your convenience."
    },
    {
      question: "Can you book my Haramain train ticket?",
      answer: "No. We only provide the latest fare details and official links. You must book directly with the Haramain High-Speed Train website."
    },
    {
      question: "Do you help with Umrah visas?",
      answer: "Currently, we don't provide visa services. We recommend applying through trusted local travel agents in your country."
    },
    {
      question: "How do I become an Umrah Asan partner?",
      answer: "Visit our footer link 'Partner Login' and register your interest. Our team will contact you to verify and onboard you as an agent or partner."
    },
    {
      question: "What is your refund and cancellation policy?",
      answer: "If you cancel within the allowed time, you'll get a refund minus transfer charges. If you fail to pay within the given 4-hour window, your booking expires automatically with no penalty."
    },
    {
      question: "How can I contact Umrah Asan quickly?",
      answer: "You can reach us 24/7 via WhatsApp, call or email. Details are always available in the header, footer, and your booking confirmation."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find answers to common questions about our services, booking process, and policies.
            Can't find what you're looking for? Contact our 24/7 support team.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-primary">
                    {index + 1}. {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Our support team is available 24/7 to help with any questions about your blessing journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-primary-foreground/10 rounded-lg p-4">
              <div className="font-semibold mb-2">WhatsApp Support</div>
              <div>+966 123 456 789</div>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg p-4">
              <div className="font-semibold mb-2">Phone Support</div>
              <div>+966 123 456 789</div>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg p-4">
              <div className="font-semibold mb-2">Email Support</div>
              <div>info@umrahasan.com</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;