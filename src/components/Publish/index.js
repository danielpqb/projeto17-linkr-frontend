import React from "react";
import Swal from "sweetalert2";
import {
  createPost,
  createHashtag,
  createPostsHashtags,
} from "../../services/linkrAPI";
import { getTimelinePosts } from "../../services/linkrAPI";
import PostsContext from "../../contexts/postsContext";
import UserContext from "../../contexts/userContext";
import { Container, LeftDiv, Form, Input, Button, RightDiv } from "./style";

export default function Publish() {
  const [form, setForm] = React.useState({ link: "", text: "" });
  const [isLoading, setIsLoading] = React.useState(false);
  const { setArrPosts } = React.useContext(PostsContext);
  const { userData } = React.useContext(UserContext);

  function validateUrl(value) {
    return /^(?:(?:(?:https?|http):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      value
    );
  }

  function checkHashtags(text) {
    const splitText = text.split(" ");
    let hashtags = [];

    for (let i = 0; i < splitText.length; i++) {
      if (splitText[i][0] === "#") {
        hashtags.push(splitText[i].substring(1));
      }
    }
    return hashtags;
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

    getTimelinePosts(1)
      .then((answer) => {
        setArrPosts(answer.data);
      })
      .catch((res) => {
        Swal.fire(res.response.data.message);
      });

    setIsLoading(false);
  }

  return (
    <Container>
      <LeftDiv>
        <img src={userData.imageUrl} alt="profilePicture" />
      </LeftDiv>
      <RightDiv>
        <h2>What are you going to share today?</h2>

        {isLoading ? (
          <Form>
            <Input
              disabled
              placeholder="Links que cabem no bolso"
              name="link"
              type="text"
            />
            <Input
              disabled
              placeholder="Awesome article about #javascript"
              name="text"
              type="text"
            />
            <Button disabled type="submit">
              Publishing...
            </Button>
          </Form>
        ) : (
          <Form onSubmit={publishPost}>
            <Input
              placeholder="http:// ..."
              name="link"
              type="text"
              value={form.link}
              onChange={handleForm}
              required
            />
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
