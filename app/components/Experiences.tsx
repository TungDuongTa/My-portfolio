import TextReveal1 from "./TextReveal1";

type ExperienceItemProps = {
  position: string;
  company: string;
  link: string;
  date: string;
  description: string;
  skills: string[];
};
function ExperienceItem({
  position,
  company,
  link,
  date,
  description,
  skills,
}: ExperienceItemProps) {
  return (
    <li className="mb-12">
      <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:opacity-100! lg:group-hover/list:opacity-50">
        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
        <header
          className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2"
          aria-label={date}
        >
          {date}
        </header>
        <div className="z-10 sm:col-span-6">
          <h3 className="font-medium leading-snug text-slate-200">
            <div>
              <a
                className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-sky-400 focus-visible:text-sky-400  group/link text-base"
                href={link}
                target="_blank"
                aria-label={`${position} at ${company} (opens in a new tab)`}
                rel="noreferrer noopener"
              >
                <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                <TextReveal1>
                  <span>
                    {position} · {company}
                  </span>
                </TextReveal1>
                <TextReveal1>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
                    aria-hidden="true"
                  >
                    <path d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"></path>
                  </svg>
                </TextReveal1>
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
type ExperiencesProps = {
  experiences: ExperienceItemProps[];
};
export default function Experiences({ experiences }: ExperiencesProps) {
  return (
    <div>
      <ol className="group/list">
        {experiences.map((experience, index) => (
          <ExperienceItem key={index} {...experience} />
        ))}
      </ol>
      <div className="mt-12">
        <a
          className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-sky-400 focus-visible:text-sky-400 font-semibold text-slate-200 group/link text-base"
          rel="noreferrer noopener"
          aria-label="View Full Résumé (opens in a new tab)"
          href="/DanResume.pdf"
          target="_blank"
        >
          {" "}
          <span>View Full Resume</span>
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
    </div>
  );
}
