const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-2">
          <p className="text-muted-foreground">
            Built with React, TypeScript, and Tailwind CSS
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lucas de Almeida. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
