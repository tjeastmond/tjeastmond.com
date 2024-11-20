// prettier-ignore
const socials = [
  { icon: "fa-github-alt", label: "GitHub", link: "https://github.com/tjeastmond" },
  { icon: "fa-linkedin-in", label: "LinkedIn", link: "https://www.linkedin.com/in/tjeastmond/" },
  { icon: "fa-medium-m", label: "Medium", link: "https://medium.com/@spiteshow" },
  { icon: "fa-steam", label: "Steam", link: "https://steamcommunity.com/id/spiteshow" },
  { icon: "fa-threads", label: "Threads", link: "https://www.threads.net/@tjeastmond" },
  { icon: "fa-bluesky", label: "Threads", link: "https://bsky.app/profile/tjeastmond.bsky.social" },
];

export default function Socials() {
  return (
    <ul className="social-media">
      {socials.map((social, i) => (
        <Social key={i} {...social} />
      ))}
    </ul>
  );
}

function Social({ icon, label, link }) {
  const style = `fab social-icon ${icon}`;
  return (
    <li>
      <a href={link} className={style} rel="noopener noreferrer" target="_blank">
        <span className="label">{label}</span>
      </a>
    </li>
  );
}
