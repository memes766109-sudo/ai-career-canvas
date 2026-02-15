import { WizardData } from "@/lib/wizard-types";

interface Props { data: WizardData; }

export default function ResumeClassicATS({ data }: Props) {
  const { personalDetails: p, education: edu, targetRole, skills, projects, experiences, certifications } = data;
  const certList = certifications.split("\n").filter(Boolean);
  const skillItems = [
    skills.languages && `Languages: ${skills.languages}`,
    skills.mlSkills && `AI/ML: ${skills.mlSkills}`,
    skills.frameworks && `Frameworks: ${skills.frameworks}`,
    skills.tools && `Tools: ${skills.tools}`,
    skills.databases && `Databases: ${skills.databases}`,
  ].filter(Boolean);

  return (
    <div className="p-8 font-sans text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: "#1a1a2e" }}>
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-4">
        <h1 className="text-2xl font-bold tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {p.fullName || "Your Name"}
        </h1>
        {targetRole && <p className="text-sm font-medium mt-1" style={{ color: "#6c3ce0" }}>{targetRole}</p>}
        <div className="flex flex-wrap justify-center gap-3 mt-2 text-xs text-gray-600">
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>• {p.phone}</span>}
          {p.location && <span>• {p.location}</span>}
          {p.linkedin && <span>• {p.linkedin}</span>}
          {p.github && <span>• {p.github}</span>}
        </div>
      </div>

      {/* Education */}
      {edu.degree && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Education</h2>
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">{edu.degree}</p>
              <p className="text-gray-600">{edu.college}</p>
            </div>
            <div className="text-right text-gray-600 text-xs">
              {edu.gradYear && <p>{edu.gradYear}</p>}
              {edu.cgpa && <p>CGPA: {edu.cgpa}</p>}
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {skillItems.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Technical Skills</h2>
          <ul className="space-y-1">
            {skillItems.map((s, i) => (
              <li key={i} className="text-xs">{s}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} className="mb-3">
              <div className="flex justify-between">
                <p className="font-semibold">{proj.title}</p>
                <p className="text-xs text-gray-500">{proj.techStack}</p>
              </div>
              {proj.problem && <p className="text-xs text-gray-600 italic">{proj.problem}</p>}
              {proj.contributions && (
                <ul className="list-disc list-inside text-xs mt-1 space-y-0.5">
                  {proj.contributions.split("\n").filter(Boolean).map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              )}
              {proj.outcome && <p className="text-xs mt-1 font-medium" style={{ color: "#6c3ce0" }}>→ {proj.outcome}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Experience</h2>
          {experiences.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between">
                <p className="font-semibold">{exp.title} — {exp.company}</p>
                <p className="text-xs text-gray-500">{exp.duration}</p>
              </div>
              {exp.description && (
                <ul className="list-disc list-inside text-xs mt-1 space-y-0.5">
                  {exp.description.split("\n").filter(Boolean).map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certList.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Certifications & Achievements</h2>
          <ul className="list-disc list-inside text-xs space-y-0.5">
            {certList.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
