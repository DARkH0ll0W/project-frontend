import Link from "next/link";
import image from '../../public/chosen-soul.jpg'

export default function Home() {
  
  return (
          <div className={`flex flex-col bg-hero2 bg-cover bg-center text-white items-center justify-center min-h-screen`}>
            <h1 className="p-5 m-5 text-7xl text-center">Welcome to <br/>Health Metric Dashdoard</h1>
            <p className="p-5 m-5 text-2xl text-white text-center">
              Click &ensp;
              <Link href="/dashboard" className=" text-4xl text-decoration: none; text-blue-500 hover:p-2 hover:font-bold hover:text-blue-700 hover:border-2 hover:border-radius hover:rounded-lg hover:border-blue-700">
                Metrics Dashboard
              </Link>
              &ensp;to view your health metrics and track your progress over time.
            </p>
          </div>
      );
    }
