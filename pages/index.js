import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import Video from "./video";
import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://spkualsbpbefdkszrwae.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwa3VhbHNicGJlZmRrc3pyd2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMDU1MDgsImV4cCI6MTk4Mzc4MTUwOH0.-DWv0yvPzl8nsJlXNXGiBeEm_YMohUYycV5etwMJ5AY";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function HomePage() {
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");
  const [playLists, setPlayLists] = React.useState({}); //config.playLists

  React.useEffect(() => {
    console.log("useEffect");

    supabase
      .from("video")
      .select("*")
      .then((dados) => {
        console.log(dados.data);
        // Forma imutavel
        const novasPlayLists = { ...playLists };
        dados.data.forEach((video) => {
          if (!novasPlayLists[video.playList]) {
            novasPlayLists[video.playList] = [];
          }
          novasPlayLists[video.playList].push(video);
        });
        setPlayLists(novasPlayLists);
      });
  }, []);

  return (
    <>
      <div>
        <Menu //prop DRILLING
          valorDoFiltro={valorDoFiltro}
          setValorDoFiltro={setValorDoFiltro}
        />
        <Header />
        <Timeline searchValue={valorDoFiltro} playlists={playLists} />
        <Favoritos fav={config.favorites} />
      </div>
    </>
  );
}

export default HomePage;

/*function Menu() {
  return <div>Menu</div>;
}*/

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};
  .img-perfil {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

const StyledFav = styled.div`
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  section {
    display: flex;
  }
  div {
    margin: 0 15px;
  }
`;

const StyledBanner = styled.div`
  background-color: aqua;
  background-image: url(${({ bg }) => bg});
  height: 230px;
`;

export function Header() {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bg} />
      <section className="user-info">
        <img
          className="img-perfil"
          src={`https://github.com/${config.github}.png`}
        />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function Timeline({ searchValue, ...props }) {
  const playlistNames = Object.keys(props.playlists);
  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = props.playlists[playlistName];
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const searchNormalized = searchValue.toLowerCase();
                  return titleNormalized.includes(searchNormalized);
                })
                .map((video) => {
                  return (
                    <a key={video.url} href={"./video?video=" + video.url}>
                      <img src={video.thumb} />
                      <span>{video.title}</span>
                    </a>
                  );
                })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}

function Favoritos({ fav }) {
  console.log(fav);
  //const imgs = Object.keys(fav);
  console.log(fav);
  return (
    <StyledFav>
      <h2>Favoritos</h2>
      <section>
        {fav.map((img) => {
          return (
            <div key={img.name}>
              <img src={img.img} />
              <p>{img.name}</p>
            </div>
          );
        })}
      </section>
    </StyledFav>
  );
}
