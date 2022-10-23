import axios from "axios";
import { useState, useEffect, useId } from "react";
import ReactTooltip from "react-tooltip";
import { handlePostLike } from "./utils/handlePostLike";
import { StyledLikeButton, HeartFill, HeartLine } from "./style";

const API_URL = process.env.REACT_APP_API_BASE_URL;
const api = axios.create({
  baseURL: API_URL,
});

export default function LikeButton({ userId, postId }) {
  const [showTooltip, setShowTooltip] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState({
    total: "0",
    user: "0",
  });
  const [whoElseLiked, setWhoElseLiked] = useState({
    first: "",
    second: "",
  });

  const tipId = useId();

  useEffect(() => {
    const fetchUserLike = async () => {
      try {
        const userLike = await api.get(`likes/${postId}/?userId=${userId}`);
        setLikes({ ...likes, user: userLike.data.likes * 1 });

        if (userLike.data.likes * 1 === 1) {
          setLiked(true);
          setLikes({ ...likes, total: likes.total * 1 + 1 });
          return;
        }
      } catch (err) {
        console.error("Error fetching user like: ", err);
      }
    };

    fetchUserLike();

    const fetchWhoElseLiked = async () => {
      try {
        const whoElseLikedResponse = await api.get(
          `likes/who/${postId}/${userId}`
        );

        setWhoElseLiked({
          first: whoElseLikedResponse.data[0]?.name,
          second: whoElseLikedResponse.data[1]?.name,
        });
      } catch (err) {
        console.error("Error fetching who else liked: ", err);
      }
    };

    fetchWhoElseLiked();

    const fetchLikes = async () => {
      try {
        const totalLikes = await api.get(`likes/${postId}/`);

        const likesCount = Number(totalLikes.data?.likes);
        setLikes({ ...likes, total: likesCount });
      } catch (err) {
        console.error("Error fetching total likes: ", err);
      }
    };

    fetchLikes();
  }, []); // eslint-disable-line

  function handleClick() {
    setLiked(!liked);
    liked
      ? setLikes({ ...likes, total: likes.total * 1 - 1 })
      : setLikes({ ...likes, total: likes.total * 1 + 1 });
    liked
      ? handlePostLike(false, postId, userId)
      : handlePostLike(true, postId, userId);
  }

  function likeDataTip() {
    // TODO: refactor function for better performance
    if (liked && likes.total * 1 === 1) {
      return `You liked this post`;
    }
    if (liked && likes.total * 1 === 2) {
      return `You and ${whoElseLiked.first}`;
    }
    if (liked && likes.total * 1 > 2) {
      return `You, ${whoElseLiked.first} and other ${
        likes.total * 1 - 2
      } people.`;
    }
    if (!liked && likes.total * 1 === 1) {
      return `${whoElseLiked.first} liked this post`;
    }
    if (!liked && likes.total * 1 === 2) {
      return `${whoElseLiked.first} and ${whoElseLiked.second}`;
    }
    if (!liked && likes.total * 1 > 2) {
      return `${whoElseLiked.first}, ${whoElseLiked.second} and other ${
        likes.total * 1 - 2
      } people.`;
    }
    return "Like!";
  }

  function getTotalLikes() {
    return likes.total * 1;
  }

  return (
    <StyledLikeButton>
      {showTooltip && (
        <ReactTooltip
          id={tipId}
          className="toolTip"
          effect="solid"
          place="bottom"
          type="light"
        >
          <span>{likeDataTip()}</span>
        </ReactTooltip>
      )}
      <>
        {liked ? (
          <HeartFill onClick={() => handleClick()} />
        ) : (
          <HeartLine onClick={() => handleClick()} />
        )}
        <p
          data-tip="ReactTooltip"
          data-for={tipId}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => {
            setShowTooltip(false);
            setTimeout(() => setShowTooltip(true), 50);
          }}
        >
          {getTotalLikes()}
        </p>
      </>
    </StyledLikeButton>
  );
}
