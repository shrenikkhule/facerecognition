export const getFakeCameras = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Main Gate",
          location: "Entrance",
          video: "https://www.w3schools.com/html/mov_bbb.mp4",
        },
        {
          id: 2,
          name: "Office Floor",
          location: "Workspace",
          video:
            "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
        {
          id: 3,
          name: "Lobby",
          location: "Reception",
          video: "https://media.w3.org/2010/05/sintel/trailer.mp4",
        },
        {
          id: 4,
          name: "Parking Area",
          location: "Basement",
          video: "https://media.w3.org/2010/05/bunny/movie.mp4",
        },
      ]);
    }, 1000);
  });
};
