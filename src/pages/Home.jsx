// import { useEffect, useState } from "react";
// import appwriteService from "../appwrite/config";
// import { Container, PostCard } from "../components";
// import Spp from "@/components/ui/Spline";
// import Spline from "@splinetool/react-spline";
// import { Spline } from "lucide-react";
import { useSelector } from "react-redux";
import image_hero from "../lib/hero.png";
import { ButtonUI } from "@/components/ui/button";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { useState, useEffect } from "react";
import { Container, PostCard } from "@/components";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  initial: { opacity: 0, scale: 1 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1 },
};
function Home() {
  // const [posts, setPosts] = useState([]);
  const Login = useSelector((state) => state.auth.status);
  const [posts, setPosts] = useState([]);
  appwriteService.getPosts([]).then((posts) => {
    if (posts) {
      setPosts(posts.documents);
    }
    if (!posts) {
      return <div className="flex flex-col space-y-3">loading</div>;
    }
  });
  const [text, setText] = useState("");

  useEffect(() => {
    const words = ["Creative", "Bold", "Expressive"];
    const intervalId = setInterval(() => {
      setText(words[Math.floor(Math.random() * words.length)]);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);
  // useEffect(() => {
  //   appwriteService.getPosts().then((posts) => {
  //     if (posts) {
  //       setPosts(posts.documents);
  //     }
  //   });
  // }, []);

  return (
    <>
      {Login ? (
        <Container>
          <div className="flex flex-col items-center mt-2  w-full    ">
            <h1 className="text-white  text-[2.5rem] mb- ">
              Welcome to BlogTube
            </h1>
            <div className="grid grid-cols-4 gap-2 max-md:flex max-md:flex-wrap max-sm:grid-cols-1">
              {posts ? (
                posts.map((post) => (
                  <div
                    key={post.$id}
                    className="p-2 sm:w-1/2 min-h-[345px] w-full lg:w-1/3 xl:w-1/4"
                  >
                    <PostCard {...post} />
                  </div>
                ))
              ) : (
                <div className="flex flex-col space-y-3"></div>
              )}
            </div>
            <div className="flex flex-row justify-around ">
              <ButtonUI size="lg" asChild variant="default2">
                <Link
                  className="bg-lime-400 ml-1 mr-3  hover:bg-lime-500 rounded-xl mt-7"
                  to={"/all-posts"}
                >
                  more...
                </Link>
              </ButtonUI>
              <ButtonUI size="lg" asChild>
                <Link
                  className="bg-white hover:bg-slate-200 rounded-xl mt-7"
                  to={"/add-post"}
                >
                  Add Your Own
                </Link>
              </ButtonUI>
            </div>
          </div>
        </Container>
      ) : (
        <div>
          <div className="grid grid-cols-2 m-0 max-sm:grid-cols-1 ">
            <div className="flex flex-col items-start mt-14  ml-16 h-screen  max-sm:ml-0  max-sm:items-center ">
              <h1 className="text-white  text-left tex text-6xl max-sm:text-center max-sm:text-5xl">
                Always Be{" "}
                <AnimatePresence mode="wait">
                  <motion.span
                    className="text-amber-300"
                    Variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    key={text}
                  >
                    {text}
                  </motion.span>
                </AnimatePresence>
              </h1>
              <h1 className="text-white  text-left  text-[2.3rem]  max-sm:text-center max-sm:text-3xl">
                Welcome to BlogTube
              </h1>
              <p className="text-white w-5/6 pt-4  text-sm  text-left max-sm:text-center  ">
                Dive into a world of inspiring stories, helpful tips, and
                thoughtful insights. Join our community of curious minds and
                lifelong learners. Explore, engage, and grow with our latest
                articles and discussions.
              </p>
              <div className="flex flex-row justify-around items-end ">
                <ButtonUI size="lg" asChild>
                  <Link
                    className="bg-amber-500  ml-1  mr-3 hover:bg-amber-500 rounded-xl mt-7"
                    to={"/login"}
                  >
                    Login
                  </Link>
                </ButtonUI>
                <ButtonUI size="lg" asChild>
                  <Link
                    className="bg-white hover:bg-slate-200 rounded-xl mt-7"
                    to={"/signup"}
                  >
                    Sign up
                  </Link>
                </ButtonUI>
              </div>
            </div>
            <div className="mt-0 max-sm:hidden">
              <img src={image_hero} alt="hero image" className="scale-[70%] " />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

{
  /* <Container>
            <div className="flex flex-wrap">
              {posts.map((post) => (
                <div key={post.$id} className="p-2 w-1/4">
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </Container> */
}

export default Home;
