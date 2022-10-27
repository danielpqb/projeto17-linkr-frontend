import React from "react";
import Swal from "sweetalert2";
import { createPost, createHashtag, createPostsHashtags, getTrendingHashtags } from "../../services/linkrAPI";
import { getTimelinePosts } from "../../services/linkrAPI";
import PostsContext from "../../contexts/postsContext";
import UserContext from "../../contexts/userContext";
import { Container, LeftDiv, Form, Input, Button, RightDiv } from "./style";
import checkHashtags from "../functions/checkHashtags";
import { regexPatterns } from "../../constants/regexPatterns";

export default function Publish() {
  const [form, setForm] = React.useState({ link: "", text: "" });
  const [isLoading, setIsLoading] = React.useState(false);
  const { setArrPosts, setArrTrendingHashtags, refreshFeed, setRefreshFeed, setInfiniteScrollIndex } = React.useContext(PostsContext);
  const { userData } = React.useContext(UserContext);

  function validateUrl(value) {
    return regexPatterns.url.test(value);
  }

  function handleForm(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function publishPost(e) {
    e.preventDefault();

    if (!validateUrl(form.link)) {
      return Swal.fire({
        icon: "error",
        title: "Invalid link!",
        text: "Be sure that you inserted the complete URL(with 'http://' or 'https://').",
      });
    }

    setIsLoading(true);
    let postId;
    try {
      const promise = await createPost({
        userId: userData.id,
        text: form.text,
        link: form.link,
      });

      Swal.fire("Posted!", "", "success");
      setForm({ link: "", text: "" });

      setInfiniteScrollIndex(0);

      postId = promise.data.id;

      if (form.text) {
        const hashtags = checkHashtags(form.text);

        for (let j = 0; j < hashtags.length; j++) {
          const res = await createHashtag({ title: hashtags[j] });
          const hashtagId = res.data.id;

          await createPostsHashtags({
            hashtagId,
            postId,
          });
        }
      }
    } catch (error) {
      if (error.response.status === 409) {
        const hashtagId = error.response.data.hashtagId;
        await createPostsHashtags({
          hashtagId,
          postId,
        });
      }
      setIsLoading(false);
    }

    getTimelinePosts()
      .then((answer) => {
        setArrPosts(answer.data[0]);
      })
      .catch((res) => {
        Swal.fire(res.response.data.message);
      });

    getTrendingHashtags()
      .then((answer) => {
        setArrTrendingHashtags(answer.data[0]);
      })
      .catch((res) => {
        Swal.fire(res.response.data.message);
      });

    setIsLoading(false);
    setRefreshFeed(!refreshFeed);
  }

  return (
    <Container>
      <LeftDiv>
        <img src={userData.imageUrl} alt="profilePicture" onError={({ currentTarget }) => {
            currentTarget.onerror = null; 
            currentTarget.src="https://static.vecteezy.com/ti/vetor-gratis/p1/2318271-icone-do-perfil-do-usuario-gr%C3%A1tis-vetor.jpg";
          }}
        />
      </LeftDiv>
      <RightDiv>
        <h2>What are you going to share today?</h2>

        {isLoading ? (
          <Form>
            <Input disabled placeholder="Links que cabem no bolso" name="link" type="text" />
            <Input disabled placeholder="Awesome article about #javascript" name="text" type="text" />
            <Button disabled type="submit">
              Publishing...
            </Button>
          </Form>
        ) : (
          <Form onSubmit={publishPost}>
            <Input placeholder="http:// ..." name="link" type="text" value={form.link} onChange={handleForm} required />
            <Input
              placeholder="Awesome article about #javascript"
              name="text"
              type="text"
              value={form.text}
              onChange={handleForm}
            />
            <Button type="submit">Publish</Button>
          </Form>
        )}
      </RightDiv>
    </Container>
  );
}
