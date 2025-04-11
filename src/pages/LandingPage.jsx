import { Link } from "react-router";
import IconBtn from "../components/IconBtn";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="flex flex-col overflow-x-hidden font-sora justify-center items-center">
      <header className="flex items-center justify-between p-4 gap-4 w-full bg-primary fixed top-0 shadow-sm">
        <Link to={"/get-started"}>
          <img src="./logoipsum-329.svg" alt="Logo" />
        </Link>
        <div className="flex gap-8 items-center">
          <span className="font-semibold">About</span>
          <span className="font-semibold">Features</span>
          <Link to={"/signin"}>
            <IconBtn
              text={"get started"}
              color={"lilac"}
              icon={"fi-rr-heart"}
            />
          </Link>
        </div>
      </header>
      <section className="bg-primary p-16 flex flex-col gap-8 justify-center items-center min-h-screen text-center w-full">
        <h1 className="text-lilac">welcome to the hub</h1>
        <span className="text-5xl/18 md:text-5xl/22 font-black lg:w-2/3">
          A very good{" "}
          <span className="text-base bg-ultramarine py-2 px-8 rounded-full m-2">
            headline
          </span>
          which says{" "}
          <span className="py-2 px-8 rounded-full border-4 border-lilac m-2">
            something
          </span>{" "}
          about our{" "}
          <span className="bg-neon py-2 px-8 rounded-full m-2">purpose</span>
        </span>
      </section>
      <section className="px-8 py-16 text-center flex flex-col gap-8 items-center justify-center lg:w-2/3 lg:py-28">
        <i className="fi-rr-user text-6xl text-ultramarine"></i>
        <h2>Who we are and what we do</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, quod!
          Totam suscipit quas maxime sint sed excepturi dicta, corporis, magnam
          repellat, soluta alias! Minus, repellat. Accusantium facilis assumenda
          error molestiae.
        </p>
        <div className="flex gap-4 items-center">
          <IconBtn
            text={"look at github"}
            color={"primary"}
            icon={"fi-rr-code-branch"}
          />
          <IconBtn text={"support us"} color={"lilac"} icon={"fi-rr-heart"} />
        </div>
      </section>
      <section className="px-8 py-16 text-center flex flex-col gap-12 items-center justify-center lg:w-2/3 lg:py-28">
        <h2>Core features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-2 border-ultramarine rounded-4xl p-8">
          <div className="p-4 py-8 flex flex-col gap-4 rounded-3xl hover:bg-primary">
            <i className="fi-rr-text text-neon text-6xl pt-1"></i>
            <h3>Posts</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos
              assumenda, repellendus vitae eligendi veniam eum nemo dignissimos
              recusandae tenetur consectetur commodi dolorem quam ut rem quod
              quae odio autem repudiandae.
            </p>
          </div>
          <div className="p-4 py-8 flex flex-col gap-4 rounded-3xl hover:bg-primary">
            <i className="fi-rs-list-check text-aquamarine text-6xl pt-1"></i>
            <h3>Lists</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos
              assumenda, repellendus vitae eligendi veniam eum nemo dignissimos
              recusandae tenetur consectetur commodi dolorem quam ut rem quod
              quae odio autem repudiandae.
            </p>
          </div>
          <div className="p-4 py-8 flex flex-col gap-4 rounded-3xl hover:bg-primary">
            <i className="fi-rr-megaphone text-sage text-6xl pt-1"></i>
            <h3>Messages</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos
              assumenda, repellendus vitae eligendi veniam eum nemo dignissimos
              recusandae tenetur consectetur commodi dolorem quam ut rem quod
              quae odio autem repudiandae..
            </p>
          </div>
          <div className="p-4 py-8 flex flex-col gap-4 rounded-3xl hover:bg-primary">
            <i className="fi-rr-calendar text-lilac text-6xl pt-1"></i>
            <h3>Calendar</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos
              assumenda, repellendus vitae eligendi veniam eum nemo dignissimos
              recusandae tenetur consectetur commodi dolorem quam ut rem quod
              quae odio autem repudiandae.
            </p>
          </div>
        </div>
        <Link to={"/signup"}>
          <IconBtn text={"get started"} color={"lilac"} icon={"fi-rr-heart"} />
        </Link>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
