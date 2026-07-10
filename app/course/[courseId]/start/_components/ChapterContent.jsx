import React, { useState } from "react";
import YouTube from "react-youtube";
import ReactMarkdown from "react-markdown";

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 0,
  },
};

function ChapterContent({ chapter, content }) {
  const [videoError, setVideoError] = useState(false);

  const handleError = (event) => {
    console.error("YouTube Player Error:", event.data);
    setVideoError(true);
  };

  return (
    <div className="p-10">
      <h2 className="font-medium text-2xl">{chapter?.name}</h2>
      <p className="text-gray-500">{chapter?.about}</p>

      <div className="flex justify-center my-6 ">
        {!content?.videoId ? (
          <div className="text-red-600">
            No video available for this chapter.
          </div>
        ) : videoError ? (
          <div className="text-red-600">
            Video cannot be played. Please try another video.
          </div>
        ) : (
          <YouTube
            videoId={content?.videoId}
            opts={opts}
            onError={handleError}
          />
        )}
      </div>

      <div>
        {content?.content?.map((item, index) => (
          <div className="p-5 bg-sky-50 mb-3 rounded-lg" key={item.id || index}>
            <h2 className="font-medium text-lg">{item.title}</h2>
            <ReactMarkdown>{item?.description}</ReactMarkdown>
            {item.codeExample && (
              <div className="p-4 bg-black text-white rounded-md mt-3">
                <pre>
                  <code>{item?.codeExample}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterContent;
