import IconBtn from "../components/IconBtn";

const Home = () => {
  return (
    <>
      <h1>Headline to test MainLayout</h1>
      <h2>IconBtn component:</h2>
      <IconBtn text={"test button"} color={"ultramarine"} icon={"fi-rr-disk"} />
      <h3>IconBtn without text props:</h3>
      <IconBtn color={"neon"} icon={"fi-rr-disk"} />
    </>
  );
};

export default Home;
