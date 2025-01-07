import React from "react";

function Project() {
  //  create obj
  const projects = [
    {
      id: 1,
      title: "Project 1",
      description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
      img: "/ProjectImages/LMS.png",
    },
    {
      id: 2,
      title: "Project 2",
      description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
      img: "/ProjectImages/ecommerce.png",
    },
    {
      id: 3,
      title: "Project 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
      img: "/ProjectImages/VehicleBooking.jpg",
    }
  ];

  console.log(projects);

  return (
    <>
      <h1 className="flex justify-center md:ml-9  md:justify-start text-white text-3xl md:text-[5vh] md:mt-6 font-bold font-serif">
        My Complete Projects
      </h1>
      <div className="flex flex-wrap justify-around gap-4 p-4">
      {projects.length !== 0 ? projects.map((res) => (
        <div key={res.id} className="max-w-xs rounded-md hover:ring-8 hover:ring-indigo-900 hover:bg-indigo-900 ring-2 hover:rounded-sm text-white  shadow-md bg-indigo-950">
        <img
          src={res.img}
          alt=""
          className="object-cover object-center w-full border-none rounded-t-md hover:rounded-t-none h-52 dark:bg-gray-500"
        />
        <div className="flex flex-col justify-between p-4 space-y-2">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold tracking-wide">
             {res.title}
            </h2>
            <p>
              {res.description}
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
      )) : 
      <>
      <h1>Loading...</h1>
      </>}
      
      </div>
    </>
  );
}

export default Project;
