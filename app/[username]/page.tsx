import { Metadata } from "next";
import RoastPage from "@/components/roastpage";
import { fetchGitHubData } from "../utils/user_data";

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `Roasting ${username} | GitHub Roaster`,
  };
}

// Page component
export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  try {
    // Await the username from params
    const { username: fullParam } = await params;
    const [username, personality] = decodeURIComponent(fullParam).split("&&");

    const profiledata = await fetchGitHubData(username);

    if (!profiledata) {
      throw new Error("Failed to fetch GitHub data");
    }

    return (
      <div className="min-h-screen bg-black">
        <RoastPage profiledata={profiledata} personality={personality || 'savage'} />
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error instanceof Error ? error.message : "An error occurred"}</p>
        </div>
      </div>
    );
  }
}

// Configuration options
export const dynamic = "force-dynamic";
export const revalidate = 0;