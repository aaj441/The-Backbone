import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Music, Play, ExternalLink } from "lucide-react";
import { extractTrackId, fetchSpotifyTrack, formatDuration, type SpotifyTrack } from "@/lib/spotify";

const SpaceExplorationDashboard = () => {
  const [fuelLevel, setFuelLevel] = useState(75);
  const [spotifyTrack, setSpotifyTrack] = useState<SpotifyTrack | null>(null);
  const [isLoadingTrack, setIsLoadingTrack] = useState(false);

  const consumeFuel = () => {
    setFuelLevel((prevLevel) => Math.max(prevLevel - 10, 0));
  };

  // Spotify track URL from the user
  const spotifyUrl = "https://open.spotify.com/track/5bQ1qgqZhpCS9RQCUZaqBO?si=UVvlYxxbSjuhQqy-39ZrrA";

  useEffect(() => {
    const loadSpotifyTrack = async () => {
      const trackId = extractTrackId(spotifyUrl);
      if (trackId) {
        setIsLoadingTrack(true);
        try {
          const track = await fetchSpotifyTrack(trackId);
          setSpotifyTrack(track);
        } catch (error) {
          console.error('Failed to load Spotify track:', error);
        } finally {
          setIsLoadingTrack(false);
        }
      }
    };

    loadSpotifyTrack();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        Space Exploration Dashboard
      </h1>

      {/* Spotify Track Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="h-5 w-5" />
            Current Track
          </CardTitle>
          <CardDescription>
            Music to fuel your space exploration
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingTrack ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : spotifyTrack ? (
            <div className="flex items-center space-x-4">
              <img
                src={spotifyTrack.album.images[0]?.url}
                alt={spotifyTrack.album.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">{spotifyTrack.name}</h3>
                <p className="text-muted-foreground truncate">
                  {spotifyTrack.artists.map(artist => artist.name).join(', ')}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {spotifyTrack.album.name} • {formatDuration(spotifyTrack.duration_ms)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">
                    {spotifyTrack.popularity}% popular
                  </Badge>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={spotifyTrack.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Open in Spotify
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Track Not Found</AlertTitle>
              <AlertDescription>
                Unable to load the Spotify track. Please check the URL.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mission Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Attention</AlertTitle>
              <AlertDescription>
                Approaching asteroid field. Proceed with caution.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button onClick={consumeFuel}>Engage Thrusters</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fuel Levels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={fuelLevel} className="w-full" />
            <p className="text-center">{fuelLevel}% Remaining</p>
          </CardContent>
          <CardFooter>
            <Badge variant={fuelLevel > 20 ? "secondary" : "destructive"}>
              {fuelLevel > 20 ? "Sufficient" : "Low Fuel"}
            </Badge>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Communication</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="incoming" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="incoming">Incoming</TabsTrigger>
                <TabsTrigger value="outgoing">Outgoing</TabsTrigger>
              </TabsList>
              <TabsContent value="incoming">
                <p>Last message: "Good luck, explorers!"</p>
              </TabsContent>
              <TabsContent value="outgoing">
                <p>Signal strength: Strong</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mission Progress</CardTitle>
          <CardDescription>Distance traveled over time</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-lg font-semibold">
            Total Distance: 19,550 km
          </p>
          <p className="text-center text-sm text-muted-foreground">
            (Data visualization not available in this view)
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nearby Celestial Bodies</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Mars (Red Planet) - Distance: 78.3 million km</li>
            <li>Europa (Jupiter's Moon) - Distance: 628.3 million km</li>
            <li>Andromeda Galaxy - Distance: 2.537 million light-years</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpaceExplorationDashboard;
