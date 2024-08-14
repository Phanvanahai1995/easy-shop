import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function HeaderSocial({ css }) {
  return (
    <div className={css}>
      <a href="#">
        <FaFacebook />
      </a>
      <a href="#">
        <FaTwitter />
      </a>
      <a href="#">
        <FaLinkedin />
      </a>
      <a href="#">
        <FaGithub />
      </a>
    </div>
  );
}

export default HeaderSocial;
