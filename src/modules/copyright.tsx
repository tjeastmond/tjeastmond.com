export default function Copyright() {
  let date = new Date().getFullYear().toString();
  return (
    <div className="copyright">
      <a target="_blank" href="https://tjeastmond.com">
        &copy; TJ Eastmond {date}
      </a>
    </div>
  );
}
