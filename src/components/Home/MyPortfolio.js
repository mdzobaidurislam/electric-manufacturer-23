import React from "react";
import { Link } from "react-router-dom";

const MyPortfolio = () => {
  return (
    <>
      <div className="container mx-auto lg:px-16 px-4 mt-5 mb-5 ">
        <div className="card  bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex justify-between">
              <div>
                <h2 className="card-title">Md.Zobaidur Islam</h2>
                <h3>Full Stack Web Developer</h3>
              </div>
              <div>
                <p>
                  <strong> Address:</strong> Dhaka, Bangladesh <br />
                  <strong> Phone: </strong>+8801890 - 373925
                  <br />
                  <strong> Email: </strong>{" "}
                  <Link to="mailto:md.zobaidurislam@gmail.com">
                    md.zobaidurislam@gmail.com
                  </Link>
                  <br />
                  <strong> Linkedin:</strong>{" "}
                  <Link to="https://www.linkedin.com/in/mdzobaidurislam/">
                    mdzobaidurislam
                  </Link>
                  <br />
                  <strong> Github: </strong>
                  <Link to="https://github.com/zobaidurislam">
                    zobaidurislam
                  </Link>
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-bold">CAREER OBJECTIVE </h3>
              <p>
                I’m a full-stack web developer and my passion is coding. I want
                to improve my coding skills by joining a company where I can
                learn new skills and technologies. I can work well both
                independently and as a part of a team.
              </p>
            </div>
            <div>
              <h3 className="font-bold">SKILLS </h3>
              <div className="divider m-0 bg-black h-[1.5px]"></div>
              <p>
                <strong>Front-End Technologies:</strong> React, React Hook,
                React Bootstrap, HTML5, CSS3, BootStrap, JavaScript, Tailwind
                CSS
              </p>
              <p>
                <strong>Back-End Technologies:</strong> NodeJS, ExpressJS,
                MongoDB, Mongoose, API, Firebase, PHP, MySQL, Laravel
              </p>
              <p>
                <strong>Familiar:</strong> Material UI, Daisy UI
              </p>
              <p>
                {" "}
                <strong>Tools:</strong> Vs Code, Notepad++, Git, Github, Xampp,
                Chrome Dev Tools, Adobe Photoshop, Adobe XD, Figma
              </p>
            </div>

            <div>
              <h3 className="font-bold">PROJECTS </h3>
              <div className="divider m-0 bg-black h-[1.5px]"></div>
              <p>
                <strong>E-Book - Inventory Management:</strong>{" "}
                <Link
                  className="text-primary"
                  to="https://e-book-b1c3b.web.app/"
                >
                  Live website
                </Link>
                ,
                <Link
                  className="text-primary"
                  to="https://github.com/zobaidurislam/warehouse-management-client-code-md.zobaidurislam"
                >
                  Client code
                </Link>
                ,{" "}
                <Link
                  className="text-primary"
                  to="https://github.com/zobaidurislam/warehouse-management-server-code-md.zobaidurislam"
                >
                  Server code
                </Link>
              </p>

              <ul className="ml-6 mmarker:text-black list-disc pl-5 space-y-3">
                <li>
                  Login, Registration, Email verification, Reset password system
                  added.
                </li>
                <li>
                  Inventory Management Edit, Delete, Add and My Items delete
                  implement
                </li>
                <li>Google and GitHub popup login system </li>
                <li>
                  Inventory item delivered and restock in single a page
                  implement
                </li>
              </ul>
              <p>
                <strong>Technology:</strong> React, React Bootstrap, NodeJS,
                ExpressJS, MongoDB,
              </p>
              <p className="mt-5">
                <strong>
                  Gym Tainer || Personal individual services provide
                </strong>{" "}
                <Link
                  className="text-primary"
                  to="https://gym-trainer-35cee.web.app"
                >
                  Live website
                </Link>
                ,
                <Link
                  className="text-primary"
                  to="https://github.com/zobaidurislam/-independent-service-provider-md.zobaidurislam"
                >
                  Client code
                </Link>
              </p>
              <ul className="ml-6 mmarker:text-black list-disc pl-5 space-y-3">
                <li>Modern and beautiful design.</li>
                <li>Login and registration system added.</li>
                <li>Google and GitHub popup login implement</li>
                <li>You will get the service efficiently.</li>
                <li>
                  Technology: React, React Bootstrap, NodeJS, ExpressJS, MongoDB
                </li>
              </ul>
              <p>
                <h3 className="font-bold mt-5">EDUCATION</h3>
                <div className="divider m-0 bg-black h-[1.5px]"></div>
                <p>
                  Bachelor of Science - Mathematics Govt. Titumir College,
                  Dhaka, Bangladesh
                </p>
                <p>September 2018 - Running(3rd Year)</p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPortfolio;
