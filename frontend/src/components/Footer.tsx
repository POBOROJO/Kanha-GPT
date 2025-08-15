
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white/20 backdrop-blur-sm py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-xl font-serif mb-4">Kanha GPT</h4>
            <p className="text-krishna-darkBlue/70 mb-4">
              Engage in meaningful conversations with Lord Krishna and explore the timeless wisdom of the Bhagavad Gita.
            </p>
          </div>
          
          <div>
            <h4 className="text-xl font-serif mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-krishna-darkBlue/70 hover:text-krishna-darkBlue transition-colors">Home</a></li>
              <li><a href="/about" className="text-krishna-darkBlue/70 hover:text-krishna-darkBlue transition-colors">About</a></li>
              <li><a href="/contact" className="text-krishna-darkBlue/70 hover:text-krishna-darkBlue transition-colors">Contact</a></li>
              <li><a href="/privacy" className="text-krishna-darkBlue/70 hover:text-krishna-darkBlue transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-serif mb-4">Connect</h4>
            <p className="text-krishna-darkBlue/70 mb-2">Email: info@kanhagpt.com</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-krishna-darkBlue hover:text-krishna-gold transition-colors">
                <span className="sr-only">Twitter</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="text-krishna-darkBlue hover:text-krishna-gold transition-colors">
                <span className="sr-only">Facebook</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="text-krishna-darkBlue hover:text-krishna-gold transition-colors">
                <span className="sr-only">Instagram</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-krishna-darkBlue/70">
            © {currentYear} Kanha GPT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
