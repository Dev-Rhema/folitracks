import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faqs() {
  const items = [
    {
      id: "1",
      title: "What does FoliTracks do?",
      content:
        "FoliTracks is a complete vehicle service management system that simplifies car maintenance for you. From car repairs and preventive maintenance to QR-enabled service history and authentic parts delivery, we provide everything your car needs through our automobile workshop in Lagos.",
    },
    {
      id: "2",
      title: "How does the QR code feature work?",
      content:
        "Each registered vehicle gets a unique QR code. When scanned, it instantly opens your car’s service history, showing past repairs, upcoming and overdue maintenance schedules. This makes it easy to keep track of your car’s health without paperwork.",
    },
    {
      id: "3",
      title:
        "Can I still use the system if I don’t know my car’s service history?",
      content:
        "Yes! If you’re unsure about past maintenance, simply bring your car to our mechanic shop in Lagos, and we will run a full health check. This helps establish a reliable service history going forward.",
    },
    {
      id: "4",
      title: "Does FoliTracks handle vehicle body work and paint jobs?",
      content:
        "Absolutely. In addition to car repair and servicing, our mechanic workshop also provides expert body work and professional paint jobs to restore your car’s look and performance.",
    },
    {
      id: "5",
      title: "Can I buy auto parts through FoliTracks?",
      content:
        "Yes. We make it simple to source authentic parts for your vehicle, including those that are hard to find. You can order from anywhere in Nigeria and get shipping directly from our automobile workshop in Lagos.",
    },
    {
      id: "6",
      title: "Why should I choose FoliTracks over a regular mechanic workshop?",
      content:
        "FoliTracks stands out from regular mechanic workshops by offering full transparency in every repair and service. With certified in-house mechanics, genuine spare parts, and a digital service history accessible through your car’s unique QR code, you always know what’s been done and what’s next.",
    },
  ];

  return (
    <Accordion className="w-full" defaultValue={["6"]}>
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>
            <p className="font-(--title) text-[20px] max-md:text-lg">
              {item.title}
            </p>
          </AccordionTrigger>
          <AccordionPanel>
            <p className="font-(--body) text-lg max-md:text-sm">
              {item.content}
            </p>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
