import { brand } from "../data/portfolioData";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <p>
        © {brand.year} <span>{brand.fullName}</span> &nbsp;|&nbsp; VIT CSE Core Mainframe
      </p>
    </footer>
  );
}
