const YOUTUBE = "https://youtube.com/@abhibuilds1yt";
const INSTAGRAM = "https://instagram.com/abhibuilds1";
const TIKTOK = "https://tiktok.com/@abhibuilds1";

export default function Home() {
  return (
    <main className="page">
      <h1>
        Check out my YouTube:{" "}
        <a href={YOUTUBE} target="_blank" rel="noopener noreferrer">
          {YOUTUBE.replace("https://", "")}
        </a>
      </h1>

      <ul className="socials">
        <li>
          Instagram:{" "}
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
            {INSTAGRAM.replace("https://", "")}
          </a>
        </li>
        <li>
          TikTok:{" "}
          <a href={TIKTOK} target="_blank" rel="noopener noreferrer">
            {TIKTOK.replace("https://", "")}
          </a>
        </li>
      </ul>

      <section>
        <h2>About me</h2>
        <p>
          I&apos;m a software engineer who enjoys exploring the use cases of ai
          agents and finding unique ways to use them.
        </p>
      </section>

      <footer>All views presented are my own.</footer>
    </main>
  );
}
