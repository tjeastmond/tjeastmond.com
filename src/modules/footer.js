import Copyright from "./copyright";

export default function Footer() {
  return (
    <div style={{ marginTop: "0rem" }}>
      <div className="footer">
        <ul className="icons">
          <li>
            <a
              href="https://github.com/tjeastmond"
              className="fa-brands icon fa-github"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="label">Github</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/tjeastmond/"
              className="fa-brands icon fa-linkedin"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="label">LinkedIn</span>
            </a>
          </li>
          <li>
            <a
              href="https://medium.com/@spiteshow"
              className="fa-brands icon fa-medium"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="label">Medium</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.threads.net/@tjeastmond"
              className="fa-brands icon fa-threads"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="label">Facebook</span>
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/tjeastmond22"
              className="fa-brands icon fa-x-twitter"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="label">X | Twitter</span>
            </a>
          </li>
        </ul>
        <Copyright />
      </div>
    </div>
  );
}
