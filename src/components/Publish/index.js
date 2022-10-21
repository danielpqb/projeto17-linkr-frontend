import React from "react";
import Swal from "sweetalert2";
import {
  createPost,
  createHashtag,
  createPostsHashtags,
  getAllPosts,
  getHashtags,
} from "../../services/linkrAPI";
import { getTimelinePosts } from "../../services/linkrAPI";
import PostsContext from "../../contexts/postsContext";
import { Container, LeftDiv, Form, Input, Button, RightDiv } from "./style";

export default function Publish() {
  const [form, setForm] = React.useState({ userId: 1, link: "", text: "" });
  const [isLoading, setIsLoading] = React.useState(false);
  const { setArrPosts } = React.useContext(PostsContext);

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
        userId: form.userId,
        text: form.text,
        link: form.link,
      });

      Swal.fire("Posted!", "", "success");
      setForm({ userId: 1, link: "", text: "" });

      const postsPromise = await getAllPosts();
      
      for (let i = postsPromise.data.length - 1; i > 0; i--) {
        if (postsPromise.data[i].userId === form.userId) {
          postId = postsPromise.data[i].id;
          break;
        }
      }

      if (form.text) {
        const hashtags = checkHashtags(form.text);

        for (let j = 0; j < hashtags.length; j++){

            const res = await createHashtag({ title: hashtags[j] });
            console.log(res)
            console.log(res.data.id, " | ", postId)
            let hashtagId = res.data.id;

            const getHashtagPromise = await getHashtags();
              //console.log(getHashtagPromise)
              
              /*for (let i = getHashtagPromise.data.length - 1; i > 0; i--) {
                if (getHashtagPromise.data[i].title === hashtags[j]) {
                  hashtagId = getHashtagPromise.data[i].id;
                  break;
                }
              }*/
              //console.log(hashtagId);
              await createPostsHashtags({
                hashtagId,
                postId,
              });

        }

      }
    } catch (error) {
      if (error.response.status === 409){
        const hashtagId = error.response.data.hashtagId;

            await createPostsHashtags({
              hashtagId,
              postId,
            });

        console.log('ja existe')
      }
      console.log('2o erro')
      console.log(error)
      //Swal.fire(res.response.data.message);
      setIsLoading(false);
    }

    
      
          /*
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

      getTimelinePosts(1)
        .then((answer) => {
          setArrPosts(answer.data);
        })
        .catch((res) => {
          Swal.fire(res.response.data.message);
        });

      setIsLoading(false);
    });*/

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
