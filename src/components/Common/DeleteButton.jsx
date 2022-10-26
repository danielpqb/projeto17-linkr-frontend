import axios from "axios";
import styled from "styled-components";
import { useState, useContext } from "react";
import { Oval } from "react-loader-spinner";
import { TiTrash } from "react-icons/ti";
import Modal from "react-modal";
import PostsContext from "../../contexts/postsContext";
const API_URL = process.env.REACT_APP_API_BASE_URL;

export default function DeleteButton({ postId }) {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { refreshFeed, setRefreshFeed } = useContext(PostsContext);
  const { arrPosts, setArrPosts } = useContext(PostsContext);

  function createHeader() {
    const auth = localStorage.getItem("userToken");
    const config = { headers: { Authorization: `Bearer ${auth}` } };
    return config;
  }
  const config = createHeader();

  let loadingAnimation = (
    <Oval
      height={80}
      width={80}
      color="#FFFFFF"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#000000"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );

  function showModal() {
    setModalOpen(!modalOpen);
  }

  function deletePost(event) {
    event.preventDefault();
    setLoadingDelete(true);
    const request = axios.delete(`${API_URL}/post/delete/${postId}`, config);
    request
      .then((response) => {
        setLoadingDelete(false);
        setModalOpen(false);
        setRefreshFeed(!refreshFeed);
        setArrPosts([]);
      })
      .catch((err) => {
        console.error(err);
        setLoadingDelete(false);
        setModalOpen(false);
        alert("Houve um erro ao excluir seu post");
      });
  }

  return (
    <>
      <TiTrash onClick={() => setModalOpen(!modalOpen)} />

      <Modal isOpen={modalOpen} onRequestClose={showModal} contentLabel="Delete Modal" style={modalStyle}>
        <ContainerModal>
          {loadingDelete ? (
            loadingAnimation
          ) : (
            <>
              <h4>Are you sure you want to delete this post?</h4>
              <div className="modalButtons">
                <button className="back" onClick={showModal}>
                  No, go back
                </button>
                <button type="submit" className="delete" onClick={deletePost}>
                  {" "}
                  Yes, delete it
                </button>
              </div>
            </>
          )}
        </ContainerModal>
      </Modal>
    </>
  );
}

const ContainerModal = styled.div`
  width: 597px;
  height: 262px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  h4 {
    width: 350px;
    height: 82px;
    font-size: 34px;
    font-family: "Lato", sans-serif;
    font-weight: 700;
    color: #ffffff;
    text-align: center;
  }
  .modalButtons {
    width: 338px;
    display: flex;
    justify-content: space-evenly;
  }
  .modalButtons > button {
    width: 134px;
    height: 37px;
    border-radius: 5px;
    font-size: 18px;
    font-weight: 700;
    border: 0;
  }
  .back {
    background-color: #ffffff;
    color: #1877f2;
  }
  .delete {
    background-color: #1877f2;
    color: #ffffff;
  }
  @media (max-width: 935px) {
    width: 70vw;
    height: 262px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    box-sizin: border-box;
    h4 {
      width: 50vw;
      height: 82px;
      font-size: 24px;
      font-family: "Lato", sans-serif;
      font-weight: 700;
      color: #ffffff;
      text-align: center;
    }
    .modalButtons {
      width: 50vw;
      display: flex;
      justify-content: space-evenly;
    }
    .modalButtons > button {
      width: 20vw;
      height: 37px;
      border-radius: 5px;
      font-size: 14px;
      font-weight: 700;
      border: 0;
    }
    .back {
      background-color: #ffffff;
      color: #1877f2;
    }
    .delete {
      background-color: #1877f2;
      color: #ffffff;
    }
  }
`;

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "fit-content",
    width: "fit-content",
    backgroundColor: "#333333",
    borderRadius: "50px",
    border: "0",
  },
};
