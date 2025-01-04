import React from "react";

function Project() {
  //  create obj
  const projects = [
    {
      id: 1,
      title: "Project 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, arcu id fermentum volutpat, nisi nisi tristique velit, in pellentesque massa ligula vel felis.",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Project 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, arcu id fermentum volutpat, nisi nisi tristique velit, in pellentesque massa ligula vel felis.",
      img: "https://via.placeholder.com/150",
    },
  ];

  console.log(projects);

  return (
    <>
      <h1 className="flex justify-center md:justify-start text-white text-3xl md:text-[10vh] p-3 font-bold font-serif">
        My Complete Projects
      </h1>
      <div className="flex flex-wrap justify-around gap-4 p-6">
      <div className="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
        <img
          src="https://source.unsplash.com/random/300x300/?2"
          alt=""
          className="object-cover object-center w-full rounded-t-md h-52 dark:bg-gray-500"
        />
        <div className="flex flex-col justify-between p-4 space-y-3">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-wide">
              Donec lectus leo
            </h2>
            <p className="dark:text-gray-800">
              Curabitur luctus erat nunc, sed ullamcorper erat vestibulum eget.
            </p>
          </div>
          <button
            type="button"
            className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-violet-600 dark:text-gray-50"
          >
            Read more
          </button>
        </div>
     
      </div>
      <div className="flex flex-wrap justify-center">
      <div className="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
        <img
          src="https://source.unsplash.com/random/300x300/?2"
          alt=""
          className="object-cover object-center w-full rounded-t-md h-52 dark:bg-gray-500"
        />
        <div className="flex flex-col justify-between p-4 space-y-3">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-wide">
              Donec lectus leo
            </h2>
            <p className="dark:text-gray-800">
              Curabitur luctus erat nunc, sed ullamcorper erat vestibulum eget.
            </p>
          </div>
          <button
            type="button"
            className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-violet-600 dark:text-gray-50"
          >
            Read more
          </button>
        </div>
      </div>
      </div>
      <div className="flex flex-wrap justify-center">
      <div className="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
        <img
          src="https://source.unsplash.com/random/300x300/?2"
          alt=""
          className="object-cover object-center w-full rounded-t-md h-52 dark:bg-gray-500"
        />
        <div className="flex flex-col justify-between p-4 space-y-3">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-wide">
              Donec lectus leo
            </h2>
            <p className="dark:text-gray-800">
              Curabitur luctus erat nunc, sed ullamcorper erat vestibulum eget.
            </p>
          </div>
          <button
            type="button"
            className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-violet-600 dark:text-gray-50"
          >
            Read more
          </button>
        </div>
      </div>
      </div>
      </div>
    </>
  );
}

export default Project;
