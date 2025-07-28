import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "~/constatnts";
import Resumecard from "~/components/Resumecard";
import { usePuterStore } from "~/lib/puter";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumemind" },
    { name: "description", content: "Resume feedback for your dream job" },
  ];
}

export default function Home() {
  const {auth} = usePuterStore();
    const navigate = useNavigate();
    useEffect(() => {
      if(!auth.isAuthenticated)
      {
        navigate('/auth?next=/');
      }
    }, [auth.isAuthenticated])
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar/>
    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track your Application & Resume Ratings</h1>
        <h2>Review your submissions and check AI-powered feedback</h2>

      </div>

    
    {resumes.length>0 && (
      <div className="resume-selection">
        {resumes.map((resume)=>(
      <div>
        <Resumecard key={resume.id} resume={resume}/>
      </div>
    ))}

    </div>
    )}
    </section> 
    

  </main>;
}
