import React, { useEffect, useState } from "react";

export default function YoutubeVideoListing() {
  const [videosData, setVideosData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVideosData = async () => {
    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/youtube/videos",
      );
      const res = await response.json();
      const videos = res.data?.data?.map((e: any) => e.items) || [];
      setVideosData(videos);
    } catch (error) {
      console.error("Error fetching videos data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideosData();
  }, []);

  const formatViews = (views: string) => {
    const num = parseInt(views);
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(0) + "K";
    return num.toLocaleString();
  };

  const timeAgo = (publishedAt: string) => {
    const published = new Date(publishedAt);
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - published.getTime()) / 1000,
    );

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "min", seconds: 60 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count > 0) return `${count}${interval.label} ago`;
    }
    return "Just now";
  };

  if (loading)
    return (
      <div className="text-center py-20 text-xl">
        Loading beautiful videos...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-950 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-10 text-center">FreeApi Youtube videos Listing</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {videosData.map((video) => {
            const snippet = video.snippet;
            const stats = video.statistics || {};

            return (
              <div key={video.id} className="group cursor-pointer">
                <div className="relative rounded-xl overflow-hidden aspect-video bg-zinc-900 mb-3 shadow-lg">
                  <img
                    src={
                      snippet?.thumbnails?.high?.url ||
                      snippet?.thumbnails?.medium?.url
                    }
                    alt={snippet?.title}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                  />

                  {video.contentDetails?.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/90 text-xs font-medium px-2 py-0.5 rounded-md">
                      {video.contentDetails.duration
                        .replace("PT", "")
                        .replace("H", ":")
                        .replace("M", ":")
                        .replace("S", "")}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform">
                      ▶
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-zinc-700 flex-shrink-0 mt-1"></div>

                  <div className="flex-1">
                    <h3 className="font-medium leading-tight line-clamp-2 mb-2 group-hover:text-blue-400 transition-colors">
                      {snippet?.title}
                    </h3>

                    <p className="text-sm text-gray-400">
                      {snippet?.channelTitle}
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      {formatViews(stats.viewCount || "0")} views •{" "}
                      {timeAgo(snippet?.publishedAt)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
