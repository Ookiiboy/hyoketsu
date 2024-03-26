export default function Home() {
  return (
    <div>
      <h1 className={`h2`}>Hyōketsu <br/><b className={`h1`}>票決</b></h1>
      <p>Ephemeral voting made easy.</p>
      <a href="/poll/new" className="c-button c-button--primary">Make a New Poll</a>
    </div>
  );
}
