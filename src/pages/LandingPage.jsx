import { Link } from "react-router";
import IconBtn from "../components/IconBtn";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="flex flex-col overflow-x-hidden font-sora justify-center items-center">
      <header className="flex items-center justify-between p-4 gap-4 w-full bg-primary fixed top-0 shadow-sm">
        <Link to={"/get-started"}>
          <img src="./hub-dark.svg" alt="Logo" className="w-32" />
        </Link>
        <nav className="flex gap-4 items-center">
          <span className="font-semibold text-xs md:text-sm ">Features</span>
          <Link to={"/signin"}>
            <IconBtn text={"sign in"} color={"lilac"} />
          </Link>
        </nav>
      </header>
      <section className="bg-primary p-y16 px-4 flex flex-col gap-8 justify-center items-center min-h-screen text-center w-full">
        <h1 className="text-lilac">welcome to the hub</h1>
        <span className="text-4xl/18 md:text-5xl/22 font-black lg:w-2/3">
          A digital{" "}
          <span className="text-base bg-ultramarine py-2 px-6 rounded-full m-2">
            home
          </span>
          where{" "}
          <span className="py-2 px-6 rounded-full border-4 border-lilac m-2">
            communities
          </span>{" "}
          connect, share, and <br />
          <span className="bg-neon py-2 px-6 rounded-full m-2">
            thrive together.
          </span>
        </span>
      </section>
      <section className="px-8 py-16 text-center flex flex-col gap-8 items-center justify-center lg:w-2/3 lg:py-28">
        <i className="fi-rr-user text-6xl text-ultramarine"></i>
        <h2>Who we are and what we do</h2>
        <p>
          We’re a team of four web developers, each bringing our own skills to
          the table — from clean code to thoughtful design. We’re building The
          Hub to make community life simpler, more connected, and just a bit
          more awesome.
        </p>
        <div className="flex gap-4 items-center">
          <Link
            to={"https://github.com/WBS-Bootcamp-Repos/the-hub-frontend"}
            target="_blank"
          >
            <IconBtn
              text={"look at github"}
              color={"primary"}
              icon={"fi-rr-code-branch"}
            />
          </Link>
          <IconBtn text={"support us"} color={"lilac"} icon={"fi-rr-heart"} />
        </div>
      </section>
      <section className="px-8 py-16 text-center flex flex-col gap-12 items-center justify-center lg:w-2/3 lg:py-28">
        <h2>the hub core features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-2 border-ultramarine rounded-4xl p-8">
          <div className="p-4 py-8 flex flex-col gap-4 rounded-3xl hover:bg-primary">
            <i className="fi-rr-text text-neon text-6xl pt-1"></i>
            <h3>Posts</h3>
            <p>
              Share updates, ideas, or important news. Posts are the heartbeat
              of your community — clear, easy to read, and always right where
              everyone can see them.
            </p>
          </div>
          <div className="p-4 py-8 flex flex-col gap-4 rounded-3xl hover:bg-primary">
            <i className="fi-rs-list-check text-aquamarine text-6xl pt-1"></i>
            <h3>Lists</h3>
            <p>
              From shopping to task management, Lists help your group stay
              productive. Create, share, and check things off together — it’s
              teamwork made simple.
            </p>
          </div>
          <div className="p-4 py-8 flex flex-col gap-4 rounded-3xl hover:bg-primary">
            <i className="fi-rr-megaphone text-sage text-6xl pt-1"></i>
            <h3>Messages</h3>
            <p>
              Quick chats or deeper conversations — Messages let your community
              talk, plan, and connect in real time, without the noise of other
              platforms.
            </p>
          </div>
          <div className="p-4 py-8 flex flex-col gap-4 rounded-3xl hover:bg-primary">
            <i className="fi-rr-calendar text-lilac text-6xl pt-1"></i>
            <h3>Calendar</h3>
            <p>
              Stay organized with shared events and deadlines. Our collaborative
              calendar keeps your community in sync, whether it’s meetings,
              birthdays, or project milestones.
            </p>
          </div>
        </div>
        <Link to={"/signup"}>
          <IconBtn
            text={"get started"}
            color={"lilac"}
            icon={"fi-rr-angle-small-right"}
          />
        </Link>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
