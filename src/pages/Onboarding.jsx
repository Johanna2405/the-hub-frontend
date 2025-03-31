import IconBtn from "../components/IconBtn";

const Onboarding = () => {
  return (
    <div className="flex flex-col gap-8 items-center py-12">
      <h1 className="text-center">Welcome to the community.</h1>
      <h2 className="text-neon">Choose your community...</h2>
      <form>
        <select className="w-full p-3 border-base text-text bg-primary rounded-2xl appearance-none pr-10 focus:outline-lilac">
          <option value="CommunityName">Community name</option>
        </select>
      </form>
      <h3 className="text-neon">...or create a new one.</h3>
      <form className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="creative name"
          className="w-full bg-primary px-3 py-2 text-text rounded-2xl focus:outline-lilac"
          required
        />
        <IconBtn text={"create"} icon={"fi-rr-plus-small"} color={"lilac"} />
      </form>
    </div>
  );
};

export default Onboarding;
