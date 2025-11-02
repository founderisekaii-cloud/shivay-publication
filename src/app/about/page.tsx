import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Edit3, BookImage, Handshake, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from '@/lib/placeholder-images';

const services = [
    {
        title: "Editing",
        description: "Our professional editors refine your manuscript, checking for grammar, style, and clarity to ensure your work is polished and ready for publication.",
        icon: Edit3,
    },
    {
        title: "Cover Design",
        description: "A great book needs a great cover. Our designers create stunning, marketable covers that capture the essence of your story and attract readers.",
        icon: BookImage,
    },
    {
        title: "Publishing & Distribution",
        description: "We handle the entire publishing process, including ISBN assignment and distribution to major online retailers and bookstores worldwide.",
        icon: Handshake,
    },
];

export const metadata = {
  title: "About Us | Shivay Publications",
  description: "Learn more about Shivay Publications, our services, and our mission to help authors succeed.",
};

export default function AboutPage() {
    const aboutImage = PlaceHolderImages.find(img => img.id === 'about-us');
    
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        {/* About Section */}
        <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold">About Shivay Publications</h1>
                    <p className="text-lg text-muted-foreground">
                        Shivay Publications is one of the fastest growing self-publishing platforms in India. We are a team of professionals dedicated to providing the best services to our authors. We have published more than 2000+ books in various languages and genres.
                    </p>
                    <p className="text-muted-foreground">
                       Our mission is to empower authors by providing a comprehensive suite of services including editing, cover design, ISBN allocation, marketing, and a strong distribution network in India and across the world. We have a team of experienced editors, designers, and marketers who are dedicated to providing the best services to our authors.
                    </p>
                     <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Professional and experienced team.</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Strong distribution network.</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Author-centric approach.</li>
                    </ul>
                </div>
                 <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                    {aboutImage && (
                        <Image
                        src={aboutImage.imageUrl}
                        alt={aboutImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={aboutImage.imageHint}
                        />
                    )}
                </div>
            </div>
        </section>

        {/* Services Section */}
        <section id="services" className="mb-16">
            <div className="text-center mb-12">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Services</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    We offer a complete range of services to take your manuscript from draft to published book.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service) => (
                    <Card key={service.title} className="text-center">
                        <CardHeader>
                            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                                <service.icon className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle className="font-headline">{service.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{service.description}</CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

        {/* Contact Section */}
        <section id="contact">
            <div className="text-center mb-12">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">Contact Us</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Have a question or ready to start your publishing journey? Get in touch!
                </p>
            </div>
            <Card className="max-w-4xl mx-auto">
                <CardContent className="p-8 grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="font-headline text-2xl font-semibold">Get in Touch</h3>
                        <div className="flex items-start gap-4">
                            <MapPin className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h4 className="font-semibold">Our Office</h4>
                                <p className="text-muted-foreground">Shop No. 2, Shivay Building, Near SBI Bank, Dehradun, Uttarakhand - 248001</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <Mail className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h4 className="font-semibold">Email Us</h4>
                                <a href="mailto:info@shivaypublications.com" className="text-muted-foreground hover:text-primary">info@shivaypublications.com</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Phone className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h4 className="font-semibold">Call Us</h4>
                                 <p className="text-muted-foreground">+91-9999999999</p>
                            </div>
                        </div>
                    </div>
                     <div className="rounded-lg overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.851052984534!2d78.03218961512096!3d30.32258598178826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929a739888889%3A0x8f039a5c0bfa1199!2sState%20Bank%20of%20India!5e0!3m2!1sen!2sin!4v1683803882582!5m2!1sen!2sin"
                            width="100%"
                            height="350"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </CardContent>
            </Card>
        </section>
    </div>
  );
}
