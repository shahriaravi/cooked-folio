const TRAKT_API_URL = "https://api.trakt.tv";
const JIKAN_API_URL = "https://api.jikan.moe/v4";

export interface TraktStats {
  movies: { played: number; minutes: number; watched: number };
  shows: { played: number; watched: number };
  episodes: { played: number; minutes: number };
}

export interface MalData {
  stats: {
    anime: {
      days_watched: number;
      mean_score: number;
      watching: number;
      completed: number;
      total_entries: number;
    };
  };
}

export async function getTraktData(): Promise<TraktStats | null> {
  const username = process.env.NEXT_PUBLIC_TRAKT_USERNAME;
  const clientId = process.env.TRAKT_CLIENT_ID;

  if (!username || !clientId) return null;

  try {
    const res = await fetch(`${TRAKT_API_URL}/users/${username}/stats`, {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": clientId,
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    return null;
  }
}

export async function getMalData(): Promise<MalData | null> {
  const username = process.env.NEXT_PUBLIC_MAL_USERNAME;
  if (!username) return null;

  try {
    const res = await fetch(`${JIKAN_API_URL}/users/${username}/statistics`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    const stats = await res.json();

    return {
      stats: stats.data,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}