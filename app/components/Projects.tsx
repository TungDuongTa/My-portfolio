import Image from "next/image";
import TextReveal1 from "./TextReveal1";

type ProjectItemProps = {
  image: string;
  title: string;
  link: string;
  description: string;
  skills: string[];
};
function ProjectItem({
  title,
  link,
  description,
  skills,
  image,
}: ProjectItemProps) {
  return (
    <li className="mb-12">
      <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:opacity-100! lg:group-hover/list:opacity-50">
        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
        <div className="sm:col-span-2 relative order-1 sm:order-0">
          <Image
            src={image}
            width={200}
            height={108}
            className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:col-span-2 sm:translate-y-1 "
            alt="image"
          />
        </div>

        <div className="z-10 sm:col-span-6 order-0 sm:order-1">
          <h3 className="font-medium leading-snug text-slate-200">
            <div>
              <a
                className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-sky-400 focus-visible:text-sky-400  group/link text-base"
                href={link}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                <TextReveal1>
                  <span>{title}</span>
                </TextReveal1>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
                  aria-hidden="true"
                >
                  <path d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"></path>
                </svg>
              </a>
            </div>
          </h3>
          <TextReveal1>
            <p className="mt-2 text-sm leading-normal">{description}</p>
          </TextReveal1>

          <ul className="mt-2 flex flex-wrap">
            {skills.map((skill, index) => (
              <TextReveal1 key={index}>
                <li key={index} className="mr-1.5 mt-2">
                  <div className="flex items-center rounded-full bg-sky-400/10 px-3 py-1 text-xs font-medium leading-5 text-sky-400 ">
                    {skill}
                  </div>
                </li>
              </TextReveal1>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}
type ProjectsProps = {
  projects: ProjectItemProps[];
};
export default function Projects({ projects }: ProjectsProps) {
  return (
    <div>
      <ol className="group/list">
        {projects.map((project, index) => (
          <ProjectItem key={index} {...project} />
        ))}
      </ol>
    </div>
  );
}
