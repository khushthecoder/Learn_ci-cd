function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-brand">Veloura</span>
        <span className="footer-text">© {new Date().getFullYear()} Veloura. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
