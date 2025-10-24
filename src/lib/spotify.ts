// Spotify API service for fetching track data
export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{
    id: string;
    name: string;
  }>;
  album: {
    id: string;
    name: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
  };
  duration_ms: number;
  external_urls: {
    spotify: string;
  };
  preview_url: string | null;
  popularity: number;
}

export interface SpotifyTrackResponse {
  tracks: SpotifyTrack[];
}

/**
 * Extracts track ID from Spotify URL
 * @param url - Spotify track URL
 * @returns track ID or null if invalid
 */
export function extractTrackId(url: string): string | null {
  const match = url.match(/\/track\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

/**
 * Fetches track data from Spotify API using track ID
 * @param trackId - Spotify track ID
 * @returns Promise<SpotifyTrack | null>
 */
export async function fetchSpotifyTrack(trackId: string): Promise<SpotifyTrack | null> {
  try {
    // Note: This is a simplified implementation
    // In a real app, you'd need to handle authentication with Spotify's API
    // For now, we'll create a mock response based on the track ID
    
    // Since we don't have Spotify API credentials, we'll return mock data
    // In production, you'd make a request to: 
    // `https://api.spotify.com/v1/tracks/${trackId}`
    
    const mockTrack: SpotifyTrack = {
      id: trackId,
      name: "Sample Track",
      artists: [
        {
          id: "artist123",
          name: "Sample Artist"
        }
      ],
      album: {
        id: "album123",
        name: "Sample Album",
        images: [
          {
            url: "https://via.placeholder.com/300x300/1db954/ffffff?text=Album+Art",
            height: 300,
            width: 300
          }
        ]
      },
      duration_ms: 180000, // 3 minutes
      external_urls: {
        spotify: `https://open.spotify.com/track/${trackId}`
      },
      preview_url: null,
      popularity: 75
    };

    return mockTrack;
  } catch (error) {
    console.error('Error fetching Spotify track:', error);
    return null;
  }
}

/**
 * Formats duration from milliseconds to MM:SS
 */
export function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}