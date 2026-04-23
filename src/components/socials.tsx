type Item = { label: string; link: string; iconClass: string };

const socials: Item[] = [
  { label: "GitHub", link: "https://github.com/tjeastmond", iconClass: "fa-brands fa-github-alt" },
  { label: "LinkedIn", link: "https://www.linkedin.com/in/tjeastmond/", iconClass: "fa-brands fa-linkedin-in" },
  { label: "Steam", link: "https://steamcommunity.com/id/spiteshow", iconClass: "fa-brands fa-steam" },
  { label: "Bluesky", link: "https://bsky.app/profile/tjeastmond.bsky.social", iconClass: "fa-brands fa-bluesky" },
  { label: "Swoo.io", link: "https://swoo.io", iconClass: "fa-solid fa-globe" },
];

export default function Socials() {
  return (
    <ul className="social-media">
      {socials.map(({ label, link, iconClass }) => (
        <li key={label}>
          <a className="social-icon" href={link} rel="noopener noreferrer" target="_blank" aria-label={label}>
            <span className="label">{label}</span>
            <i className={`${iconClass} social-icon-fa`} aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}
