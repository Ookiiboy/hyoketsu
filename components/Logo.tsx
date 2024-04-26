const Check = () => <span style={{color: "var(--primary-accent-color)"}}>✔</span>

export default function Logo() {
  return (
    <h1 className={`h2`}>Hyōketsu <Check/><br/><b className={`h1`}>票決</b></h1>
  )
};