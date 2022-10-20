import React from "react";
import Swal from "sweetalert2";
import {
  createPost,
  createHashtag,
  createPostsHashtags,
  getPosts,
  getHashtags,
} from "../../services/linkrAPI";
import { Container, LeftDiv, Form, Input, Button, RightDiv } from "./style";

export default function Publish() {
  const [form, setForm] = React.useState({ userId: 1, link: "", text: "" });
  const [isLoading, setIsLoading] = React.useState(false);

  const imgSrc =
    "https://static1.personality-database.com/profile_images/c192170f01b245a1a180eb77aa6bb40f.png";

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

  function publishPost(e) {
    e.preventDefault();

    if (!validateUrl(form.link)) {
      return Swal.fire({
        icon: "error",
        title: "Invalid link!",
        text:
          "Be sure that you inserted the complete URL(with 'http://' or 'https://').",
      });
    }

    setIsLoading(true);

    const promise = createPost({
      userId: form.userId,
      text: form.text,
      link: form.link,
    });

    promise.catch((res) => {
      Swal.fire(res.response.data.message);
      setIsLoading(false);
    });

    promise.then(() => {
      Swal.fire("Posted!", "", "success");
      setForm({ userId: 1, link: "", text: "" });

      const postsPromise = getPosts();

      let postId;
      postsPromise.catch((res) => {
        Swal.fire(res.response.data.message);
      });

      postsPromise.then((res) => {
        for (let i = res.data.length - 1; i > 0; i--) {
          if (res.data[i].userId === form.userId) {
            postId = res.data[i].id;
            break;
          }
        }
      });

      if (form.text) {
        const hashtags = checkHashtags(form.text);

        hashtags.forEach((hashtag) => {
          const hashtagPromise = createHashtag({ title: hashtag });

          hashtagPromise.catch((res) => {
            const hashtagId = res.response.data.hashtagId;

            const createPostsHashtagsPromise = createPostsHashtags({
              hashtagId,
              postId,
            });

            createPostsHashtagsPromise.catch((res) => {
              Swal.fire(res.response.data.message);
            });
            createPostsHashtagsPromise.then((res) => {});
          });

          hashtagPromise.then(() => {
            const getHashtagPromise = getHashtags();

            getHashtagPromise.catch((res) => {
              Swal.fire(res.response.data.message);
            });

            getHashtagPromise.then((res) => {
              let hashtagId;
              for (let i = res.data.length - 1; i > 0; i--) {
                if (res.data[i].title === hashtag) {
                  hashtagId = res.data[i].id;
                  break;
                }
              }
              const createPostsHashtagsPromise = createPostsHashtags({
                hashtagId,
                postId,
              });

              createPostsHashtagsPromise.catch((res) => {
                Swal.fire(res.response.data.message);
              });
              createPostsHashtagsPromise.then((res) => {});
            });
          });
        });
      }

      setIsLoading(false);
    });
  }

  return (
    <Container>
      <LeftDiv>
        <img src={imgSrc} alt="profilePicture" />
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
