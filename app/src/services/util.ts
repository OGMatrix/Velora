import { Network } from "@capacitor/network";

const beforeLeave = async (url: string) => {
    const elements2: any = await document.getElementsByName(
      "fade-in-left"
    );
    for (const element of elements2) {
      element.classList.remove("fade-in-left");
      element.classList.add("fade-out-left");
    }
    const elements1 = await document.getElementsByName("fade-in-top");
    const elements3 = await document.getElementsByName("fade-in-bottom");
    const elements4 = await document.getElementsByName("pop-in");
    for (const element of elements1) {
      element.classList.remove("fade-in-top");
      element.classList.add("fade-out-top");
    }
    for (const element of elements3) {
      element.classList.remove("fade-in-bottom");
      element.classList.add("fade-out-bottom");
    }
    for (const element of elements4) {
      element.classList.remove("pop-in");
      element.classList.add("pop-out");
    }
    setTimeout(async () => {
      if (url === 'back') window.history.back();
      else window.location.href = url;
    }, 800);
};

const checkNetwork = async() => {
  const status = await Network.getStatus();
  if (!status.connected) window.location.href = '/nowlan'
}

async function sortTracksByDay(tracks: any): Promise<any> {
  const sortedTracks: any = {};

  await tracks.forEach((track: any) => {
    const createdAtDate = new Date(track.createdAt);
    const dayKey = `${createdAtDate.getDate()}.${
      createdAtDate.getMonth() + 1
    }.${createdAtDate.getFullYear()}`;

    if (!sortedTracks[dayKey]) {
      sortedTracks[dayKey] = [];
    }

    sortedTracks[dayKey].push(track);
  });

  return sortedTracks;
}

const popupLeave = async (url: string) => {
  console.log(url)
  const elements: any = await document.getElementsByName(
    "popup-button"
  );
  const popup: any = await document.getElementById(
    "popup"
  );

  for (const element of elements) {
    element.classList.add("popup-button-leave");
  }
  if (popup) {
    popup.classList.add("fade-in-bottom")
    popup.classList.add("popup-leave");
  }

  setTimeout(async () => {
    if (url === 'back') window.history.back();
    else window.location.href = url;
  }, 400);
};

export {beforeLeave, checkNetwork, sortTracksByDay, popupLeave}