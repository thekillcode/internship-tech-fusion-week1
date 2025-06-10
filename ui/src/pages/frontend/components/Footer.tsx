import { 
  Facebook, Twitter, Instagram, Linkedin, Youtube,
  Mail, Phone, MapPin, 
  Home, Utensils, Users, CalendarDays, Gift
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background pt-16 pb-8 px-4 sm:px-8 lg:px-16 border-t border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-custom-primary flex items-center gap-2">
            <Utensils className="w-8 h-8" />
            Master Chief
          </h2>
          <p className="text-muted-foreground">
            Premium dining experience with the finest ingredients crafted by our master chefs.
          </p>
          <div className="flex gap-4">
            {[
              { icon: <Facebook className="w-5 h-5" />, label: "Facebook" },
              { icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
              { icon: <Instagram className="w-5 h-5" />, label: "Instagram" },
              { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
              { icon: <Youtube className="w-5 h-5" />, label: "YouTube" }
            ].map((social, index) => (
              <a 
                key={index}
                href="#" 
                className="text-background hover:text-custom-primary transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-custom-primary flex items-center gap-2">
            <Home className="w-5 h-5" />
            Quick Links
          </h3>
          <ul className="space-y-3">
            {[
              { icon: <Home className="w-4 h-4" />, text: "Home", href: "#" },
              { icon: <Utensils className="w-4 h-4" />, text: "Our Menu", href: "#" },
              { icon: <Users className="w-4 h-4" />, text: "About Us", href: "#" },
              { icon: <CalendarDays className="w-4 h-4" />, text: "Reservations", href: "#" },
              { icon: <Gift className="w-4 h-4" />, text: "Special Offers", href: "#" }
            ].map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href} 
                  className="flex items-center gap-2 hover:text-custom-primary transition-colors"
                >
                  {link.icon}
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-custom-primary flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Contact Us
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>reservations@masterchief.com</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>123 Gourmet Street, Foodville</span>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-custom-primary">Newsletter</h3>
          <p className="text-muted-foreground">
            Subscribe to get updates on special offers and events.
          </p>
          <form className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-2 rounded bg-background/10 border border-border focus:outline-none focus:ring-2 focus:ring-custom-primary focus:border-transparent"
              required
            />
            <button 
              type="submit" 
              className="bg-custom-primary hover:bg-custom-primary/90 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-border/50 mt-12 pt-8 text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} Master Chief Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;